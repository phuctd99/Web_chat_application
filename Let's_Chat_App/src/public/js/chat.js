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

function selectReceiver() {
  $(document).on('click', '.person', function() {
    $('.person').css('background-color', 'white');
    $(this).css('background-color', '#e6e6e6');
    $('#nameOfReceiver').text(
      $(this)
        .find('span.name')
        .text()
    );
    receiverId = $(this).data('uid');
    receiverAvatar = $(this)
      .find('img')
      .attr('src');
    $('#chat-field').empty();
    getMessages();
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
  $('.person')
    .first()
    .css('background-color', '#e6e6e6');
  receiverId = $('.person')
    .first()
    .data('uid');
  receiverAvatar = $('.person')
    .first()
    .find('img')
    .attr('src');
  $('#nameOfReceiver').text(
    $('.person')
      .first()
      .find('span.name')
      .text()
  );
  getMessages();
}

$(document).ready(function() {
  init();
  selectReceiver();
  onEnter();
  updateSenderMessageBox();
  receiveMessage();
});
