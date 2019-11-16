const socket = io();
let receiver = null;

function selectReceiver(){
    $('.person').on('click', function(){
        $("li").css("background-color","white");
        $(this).css("background-color","green");
        receiver = $(this).data('uid');
    });
}

function onEnter(){
    $('#chatInputField').keypress(function (e) {
        if (e.which == 13) {
            let message = $(this).val();
            const data = {
                senderId: $(this).data('uid'),
                receiverId: receiver,
                messageContent: message
            }
            console.log(data);
            socket.emit('send-message', data);
        }
      });
}

function updateSenderMessageBox(){
    socket.on('update-sender-message-box', function(message){
        const messageElement = `<div id="message" class="bubble me">
        ${message}
        </div>`;
        $('#chat-field').append(messageElement);
        $('#chat-field').stop().animate ({
            scrollTop: $('#chat-field')[0].scrollHeight
        });
        $('#chatInputField').val('');
    });
}

function receiveMessage(){
    socket.on('receive-message', function(message){
        const messageElement = `<div id="message" class="bubble you">
        ${message}
        </div>`;
        $('#chat-field').append(messageElement);
        $('#chat-field').stop().animate ({
            scrollTop: $('#chat-field')[0].scrollHeight
        });
    });
}

$( document ).ready(function() {
    $('.person').first().css("background-color","green");
    receiver = $('.person').first().data('uid');
    selectReceiver();
    onEnter();
    updateSenderMessageBox();
    receiveMessage();
});
