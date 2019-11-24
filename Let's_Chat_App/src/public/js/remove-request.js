function removeRequestContact() {
  $('.user-remove-request-contact').bind('click', function() {
    const targetId = $(this).data('uid');
    $.ajax({
      url: '/contact/remove-request-contact',
      type: 'delete',
      data: { uid: targetId },
      success: function(data) {
        if (data) {
          $('#find-user')
            .find(`div.user-remove-request-contact[data-uid = ${targetId}]`)
            .hide();
          $('#find-user')
            .find(`div.user-add-new-contact[data-uid = ${targetId}]`)
            .css('display', 'inline-block');
        }
        decreaseNotification('count-request-contact-sent');
      }
    });
  });
}
socket.on('respond-remove-request-contact', function(user) {
  $('.noti_content')
    .find(`span[data-uid=${user.id}]`)
    .remove();
  console.log(user.id);
  decreaseNotification('count-request-contact-received');
  decreaseNotificationNavbar('noti_contact_counter');
  decreaseNotificationNavbar('noti_counter');
});