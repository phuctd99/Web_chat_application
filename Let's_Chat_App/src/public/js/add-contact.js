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
        
        let userInfoHtml = $("#find-user").find(`ul li[data-uid = ${targetId}]`).get(0).outerHTML;
        $("#request-contact-sent").find("ul").prepend(userInfoHtml);
        socket.emit('add-new-contact', {contactId: targetId});
      }
    });
    
  });
}
socket.on('respond-add-new-contact', function(user) {
  let notification = `<div class="noti-readed-false" data-uid="${user.id}">
  <img
    class="avatar-small"
    src="/images/users/${user.avatar}"
    alt=""
  />
  <strong>${user.username}</strong> đã gửi cho bạn một lời mời kết
  bạn! </div>`;
  $('.noti_content').prepend(notification);
  $('ul.list-notifications').prepend(`<li>${notification}</li>`);

  increaseNotification('count-request-contact-received');

  increaseNotificationNavbar('noti_contact_counter', 1);
  increaseNotificationNavbar('noti_counter', 1);

  let userInfoHtml = `<li class="_contactList" data-uid="${user.id}">
  <div class="contactPanel">
      <div class="user-avatar">
          <img src="../../images/users/${user.avatar}" alt="">
      </div>
      <div class="user-name">
          <p>
          ${user.username}
          </p>
      </div>
      <br>
      <div class="user-address">
          <span>&nbsp ${user.address}</span>
      </div>
      <div class="user-acccept-contact-received" data-uid="${user.id}">
          Chấp nhận
      </div>
      <div class="user-reject-request-contact-received action-danger" data-uid="${user.id}">
          Xóa yêu cầu
      </div>
  </div>
</li>`;
$("#request-contact-received").find("ul").prepend(userInfoHtml);
});