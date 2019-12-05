let receiverId = null;
let receiverAvatar = null;

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
  });
}

function onEnter() {
  $('#chatInputField').keypress(function(e) {
    if (e.which == 13) {
      let message = $(this).val();
      const data = {
        senderId: $(this).data('uid'),
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

$(document).ready(function() {
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
  selectReceiver();
  onEnter();
  updateSenderMessageBox();
  receiveMessage();
});
