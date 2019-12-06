let receiverId = null;
const senderId = $('#chatInputField').data('uid');
let receiverAvatar = null;

function appendMessagesToView(messages){
  messages.forEach(function(message){
    let messageElement = '';
    if (senderId == message.senderId && receiverId == message.receiverId){
      messageElement = `<div>
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
  $.get(`/get-messages?senderId=${senderId}&receiverId=${receiverId}`, function(data, status){
    appendMessagesToView(data.messages);
  });
};

function selectReceiver() {
  $('.person').on('click', function() {
    $('li').css('background-color', 'white');
    $(this).css('background-color', 'green');
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
    const messageElement = `<div>
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
  });
}

function receiveMessage() {
  socket.on('receive-message', function(message) {
    const messageElement = `<div class="line-chat">
		<div class="avatar-of-user-chatting">
			<img src="${receiverAvatar}" alt="" />
		</div>
		<div id="message" class="bubble you">
			${message}
		</div>
	</div>`;
    $('#chat-field').append(messageElement);
    $('#chat-field')
      .stop()
      .animate({
        scrollTop: $('#chat-field')[0].scrollHeight
      });
  });
}

function init(){
  $('.person')
    .first()
    .css('background-color', 'green');
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
