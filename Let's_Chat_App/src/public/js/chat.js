let receiverId = null;
const senderId = $('#chatInputField').data('uid');
let receiverAvatar = null;
let allMessages = [];

function appendMessagesToView(messages){
  messages.forEach(function(message){
    let messageElement = '';
    if (senderId == message.senderId && receiverId == message.receiverId){
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
    $.get(`/get-messages?senderId=${senderId}&receiverId=${receiverId}`, function(data, status){
      allMessages[receiverId] = data.messages;
      appendMessagesToView(allMessages[receiverId]);
    });
  }else{
    appendMessagesToView(allMessages[receiverId]);
  }
  
};

function focusReceiver(receiverId){
  receiverAvatar = $(`#li-${receiverId}`)
      .find('img')
      .attr('src');
  $('.person').css('background-color', 'white');
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
  $(document).on('click', '.person', function() {
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
      $('.person').hide().filter(function () {
        return $(this).find('span.name').text().toLowerCase().indexOf($('.searchBox').val().toLowerCase()) != -1;
      }).show(); 
    }  
    else { 
      $('.person').show();
    }
    if ($('.person:visible').length > 0){
      receiverId = $('.person:visible').first().data('uid');
      focusReceiver(receiverId);
    } 
  }); 
}

function onEnter() {
  $('#chatInputField').keypress(function(e) {
    if (e.which == 13) {
      let message = $(this).val();
      const data = {
        senderId: senderId,
        receiverId: receiverId,
        messageContent: message
      };
      socket.emit('send-message', data);
    }
  });
}

function updateSenderMessageBox() {
  socket.on('update-sender-message-box', function(message) {
    const messageElement = `<div class="line-chat">
		<div id="message" class="bubble me">
			${message}
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
    $(`#li-${receiverId}`).find('span.preview').text('Bạn: ' + message);
  });
}

function receiveMessage() {
  socket.on('receive-message', function(message) {
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
}

function init(){
  receiverId = $('.person')
    .first()
    .data('uid');
  focusReceiver(receiverId);
}

$(document).ready(function() {
  init();
  selectReceiver();
  selectReceiverFromModal();
  onEnter();
  updateSenderMessageBox();
  receiveMessage();
  findConversationBySearchBox();
});
