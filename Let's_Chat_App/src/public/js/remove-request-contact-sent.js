function removeRequestContactSent() {
  $('.user-remove-request-contact-sent').unbind('click').on('click', function() {
    const targetId = $(this).data('uid');
    $.ajax({
      url: '/contact/remove-request-contact-sent',
      type: 'delete',
      data: { uid: targetId },
      success: function(data) {
        if (data) {
          $('#find-user')
            .find(`div.user-remove-request-contact-sent[data-uid = ${targetId}]`)
            .hide();
          $('#find-user')
            .find(`div.user-add-new-contact[data-uid = ${targetId}]`)
            .css('display', 'inline-block');
        
        decreaseNotificationNavbar('noti_contact_counter', 1);
        decreaseNotification('count-request-contact-sent');
        //xoa o modal-tab dang cho xac nhan
        $("#request-contact-sent").find(`li[data-uid=${targetId}]`).remove();
        socket.emit('remove-request-contact-sent', {contactId: targetId});
        }
      }
    });
  });
}
socket.on('respond-remove-request-contact-sent', function(user) {
  $('.noti_content')
    .find(`div[data-uid=${user.id}]`)
    .remove();//xoa o popup
  $('ul.list-notifications').find(`li>div[data-uid=${user.id}]`).parent().remove();//xoa o modal
  $("#request-contact-received").find(`li[data-uid=${user.id}]`).remove();
  decreaseNotification('count-request-contact-received');
  decreaseNotificationNavbar('noti_contact_counter', 1);
  decreaseNotificationNavbar('noti_counter', 1);
});

$(document).ready(function() {
  removeRequestContactSent();
});
