let receiverId = null;
const senderId = $('#chatInputField').data('uid');
const senderName = $('#chatInputField').data('uname');
const senderAvatar = $('#chatInputField').data('ava');
let receiverAvatar = null;
let messageType = null;
let allMessages = [];

function appendMessagesToView(messages){
  messages.forEach(function(message){
    let messageElement = '';
    if (message.groupId){
      if (senderId == message.senderId._id){
        messageElement = 
        `<div class="line-chat">
          <div id="message" class="bubble me">
            ${message.text}
          </div>
        </div>`;
      } else {
        messageElement = `<div class="line-chat">
        <div><tag>${message.senderId.username}</tag></div>
      <div class="avatar-of-user-chatting">
        <img src="../../images/users/${message.senderId.avatar}" alt="" />
      </div>
      <div id="message" class="bubble you">
        ${message.text}
      </div>
    </div>`;
      }
    }else if (senderId == message.senderId && receiverId == message.receiverId){
      messageElement = `<div class="line-chat">
      <div id="message" class="bubble me">
        ${message.text}
      </div>
    </div>`;
    } else if (senderId == message.receiverId && receiverId == message.senderId) {
      messageElement = `<div class="line-chat">
      <div class="avatar-of-user-chatting">
        <img src="${receiverAvatar}" alt="" />
      </div>
      <div id="message" class="bubble you">
        ${message.text}
      </div>
    </div>`;
    }
    $('#chat-field').append(messageElement);
    $('#chat-field')
      .stop()
      .animate({
        scrollTop: $('#chat-field')[0].scrollHeight
      });
  });
}

function getMessages(){
  if (!allMessages[receiverId]){
    $.get(`/get-messages?senderId=${senderId}&receiverId=${receiverId}&type=${messageType}`, function(data, status){
      allMessages[receiverId] = data.messages;
      appendMessagesToView(allMessages[receiverId]);
    });
  }else{
    appendMessagesToView(allMessages[receiverId]);
  }
};

function focusReceiver(receiverId){
  messageType = $(`#li-${receiverId}`).attr('class');
  receiverAvatar = $(`#li-${receiverId}`)
      .find('img')
      .attr('src');
  $('#contact-list li').css('background-color', 'white');
  $(`#li-${receiverId}`).css('background-color', '#e6e6e6');
  $('#nameOfReceiver').text(
    $(`#li-${receiverId}`)
      .find('span.name')
      .text()
  );
  $('#chat-field').empty();
  getMessages();
}

function selectReceiver() {
  $(document).on('click', '#contact-list li', function() {
    receiverId = $(this).data('uid');
    focusReceiver(receiverId);
  });
}

function selectReceiverFromModal(){
  $(document).on('click', '.user-talk', function() {
    $('#contactsModal').modal('toggle');
    receiverId = $(this).data('uid');
    focusReceiver(receiverId);
  });
}

function findConversationBySearchBox(){
  $('.searchBox').on("keyup", function () {
    if (this.value.length > 0) {   
      $('#contact-list li').hide().filter(function () {
        return $(this).find('span.name').text().toLowerCase().indexOf($('.searchBox').val().toLowerCase()) != -1;
      }).show(); 
    }  
    else { 
      $('#contact-list li').show();
    }
    if ($('#contact-list li:visible').length > 0){
      receiverId = $('#contact-list li:visible').first().data('uid');
      focusReceiver(receiverId);
    } 
  }); 
}

function onEnter() {
  $('#chatInputField').keypress(function(e) {
    if (e.which == 13) {
      let message = $(this).val();
      if (messageType == 'person'){
        const data = {
          senderId: senderId,
          receiverId: receiverId,
          messageContent: message
        };
        socket.emit('send-message', data);
      }else if (messageType == 'group') {
        const data = {
          createdAt: new Date().getTime(),
          senderId: {
            _id: senderId,
            avatar: senderAvatar,
            username: senderName
          },
          groupId: receiverId,
          text: message
        }
        socket.emit('send-group-message', data);
      }
    }
  });
}

function updateSenderMessageBox() {
  socket.on('update-sender-message-box', function(message) {
    allMessages[receiverId].push(message);
    const messageElement = `<div class="line-chat">
		<div id="message" class="bubble me">
			${message.text}
		</div>
	</div>`;
    $('#chat-field').append(messageElement);
    $('#chat-field')
      .stop()
      .animate({
        scrollTop: $('#chat-field')[0].scrollHeight
      });
    $('#chatInputField').val('');
    const receiverLeftTag = $(`#li-${receiverId}`).prop('outerHTML');
    $(`#li-${receiverId}`).remove();
    $('#contact-list').prepend(receiverLeftTag);
    $(`#li-${receiverId}`).find('span.preview').text('Bạn: ' + message.text);
  });
}

function receiveMessage() {
  socket.on('receive-message', function(message) {
    if (allMessages[message.senderId]) {
      allMessages[message.senderId].push(message);
    } else {
      getMessages();
    }
    if (message.senderId == receiverId){
      const messageElement = `<div class="line-chat">
      <div class="avatar-of-user-chatting">
        <img src="${receiverAvatar}" alt="" />
      </div>
      <div id="message" class="bubble you">
        ${message.text}
      </div>
    </div>`;
      $('#chat-field').append(messageElement);
      $('#chat-field')
        .stop()
        .animate({
          scrollTop: $('#chat-field')[0].scrollHeight
        });
    }
    const receiverLeftTag = $(`#li-${message.senderId}`).prop('outerHTML');
    $(`#li-${message.senderId}`).remove();
    $('#contact-list').prepend(receiverLeftTag);
    $(`#li-${message.senderId}`).find('span.preview').text(message.text);
  });
  socket.on('receive-group-message', function(data){
    if (allMessages[data.groupId]) {
      allMessages[data.groupId].push(data);
    } else {
      getMessages();
    }
    if (data.groupId == receiverId){
      const messageElement = `<div class="line-chat">
      <div><tag>${data.senderId.username}</tag></div>
      <div class="avatar-of-user-chatting">
        <img src="../../images/users/${data.senderId.avatar}" alt="" />
      </div>
      <div id="message" class="bubble you">
        ${data.text}
      </div>
    </div>`;
      $('#chat-field').append(messageElement);
      $('#chat-field')
        .stop()
        .animate({
          scrollTop: $('#chat-field')[0].scrollHeight
        });
    }
    const receiverLeftTag = $(`#li-${data.groupId}`).prop('outerHTML');
    $(`#li-${data.groupId}`).remove();
    $('#contact-list').prepend(receiverLeftTag);
    $(`#li-${data.groupId}`).find('span.preview').text(`${data.senderId.username}: ${data.text}`);
  });
}

function init(){
  receiverId = $('#contact-list li')
    .first()
    .data('uid');
  focusReceiver(receiverId);
}

function getAllContact() {
  $.get(`/get-all-contacts`, function(data, status){
    data.usersAndGroups.forEach(function(item){
      let element = ``;
      if (item.user) {
        element += `<li
        id="li-${item.user._id}"
        class="person"
        data-uid="${item.user._id}">
        <div class="left-avatar">
          <div class="dot"></div>
          <img src="../../images/users/${item.user.avatar}" alt="" />
        </div>
        <span class="name">
        ${item.user.username}
        </span>
        <span class="time">Một phút trước</span>
        <span class="preview">`;
        if (senderId == item.user._id){
          element += `Bạn: `;
        }
        if (item.latestMessage.content){
          element +=`${item.latestMessage.content}`
        }
        element += `</span></li>`; 
      }else{
        element += `<li
        id="li-${item._id}"
        class="group"
        data-uid="${item._id}">
        <div class="left-avatar">
          <div class="dot"></div>
          <img src="../../images/users/group.png" alt="" />
        </div>
        <span class="name">
        ${item.name}
        </span>
        <span class="time">Một phút trước</span>
        <span class="preview">`;
        if (item.latestMessage){
          if (senderId == item.latestMessage.sender._id){
            element += `Bạn: `;
          } else {
            element += `${item.latestMessage.sender.username}: `;
          }
          if (item.latestMessage.content){
            element +=`${item.latestMessage.content}`
          }
        }
        element += `</span></li>`;
      }
      $('#contact-list').append(element);
    });
    init();
  });
}

$(document).ready(function() {
  getAllContact();
  selectReceiver();
  selectReceiverFromModal();
  onEnter();
  updateSenderMessageBox();
  receiveMessage();
  findConversationBySearchBox();
});
