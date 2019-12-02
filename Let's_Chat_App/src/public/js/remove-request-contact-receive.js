function removeRequestContactReceive() {
    $('.user-remove-request-contact-receive').unbind('click').on('click', function() {
      const targetId = $(this).data('uid');
      $.ajax({
        url: '/contact/remove-request-contact-receive',
        type: 'delete',
        data: { uid: targetId },
        success: function(data) {
            if (data) {
                // hủy là xóa luôn thông báo
                $('.noti_content').find(`div[data-uid=${targetId}]`).remove();//xoa o popup
                $('ul.list-notifications').find(`li>div[data-uid=${targetId}]`).parent().remove();//xoa o modal    
                decreaseNotificationNavbar('noti_contact_counter', 1);
                decreaseNotificationNavbar('noti_counter', 1);
                decreaseNotification('count-request-contact-received');
                //xoa o modal-tab dang cho xac nhan
                $("#request-contact-received").find(`li[data-uid=${targetId}]`).remove();
                socket.emit('remove-request-contact-receive', {contactId: targetId});
          }
        }
      });
    });
  }
  socket.on('respond-remove-request-contact-receive', function(user) {
    $('#find-user').find(`div.user-remove-request-contact-sent[data-uid = ${user.id}]`).hide();
    $('#find-user').find(`div.user-add-new-contact[data-uid = ${user.id}]`).css('display', 'inline-block');  
    
    $("#request-contact-sent").find(`li[data-uid=${user.id}]`).remove();
   
    decreaseNotification('count-request-contact-sent');
    decreaseNotificationNavbar('noti_contact_counter', 1);
    decreaseNotificationNavbar('noti_counter', 1);
  });
  
  $(document).ready(function() {
    removeRequestContactReceive();
  });
  