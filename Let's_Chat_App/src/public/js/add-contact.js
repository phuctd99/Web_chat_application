function addContact() {
  $('.user-add-new-contact').bind('click', function() {
    const targetId = $(this).data('uid');
    $.post('/contact/add-new', { uid: targetId }, function(data) {
      if (data) {
        $('#find-user')
          .find(`div.user-add-new-contact[data-uid = ${targetId}]`)
          .hide();
        $('#find-user')
          .find(`div.user-remove-request-contact[data-uid = ${targetId}]`)
          .css('display', 'inline-block');
        increaseNotification('count-request-contact-sent');
      }
    });
    
  });
}
socket.on('respond-add-new-contact', function(user) {
  let notification = `<span data-uid="${user.id}">
  <img
    class="avatar-small"
    src="/images/users/${user.avatar}"
    alt=""
  />
  <strong>${user.username}</strong> đã gửi cho bạn một lời mời kết
  bạn! </span><br /><br /><br />`;
  $('.noti_content').prepend(notification);

  increaseNotification('count-request-contact-received');
  increaseNotificationNavbar('noti_contact_counter');
  increaseNotificationNavbar('noti_counter');
});