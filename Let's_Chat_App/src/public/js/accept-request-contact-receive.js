function acceptRequestContactReceive() {
    $('.user-accept-request-contact-receive').unbind('click').on('click', function() {
      const targetId = $(this).data('uid');
      
        
      $.ajax({
        url: '/contact/accept-request-contact-receive',
        type: 'put',
        data: { uid: targetId },
        success: function(data) {
            if (data) {
              let userInfo = $("#request-contact-received").find(`ul li[data-uid = ${targetId}]`);
              $(userInfo).find("div.user-accept-request-contact-receive").remove();
              $(userInfo).find("div.user-remove-request-contact-receive").remove();
              $(userInfo).find("div.contactPanel").append(`
                <div class="user-talk" data-uid="${targetId}">
                    Trò chuyện
                </div>
                <div class="user-remove-contact action-danger" data-uid="${targetId}">
                    Xóa liên hệ
                </div>
              `);
              let userInfoHtml = userInfo.get(0).outerHTML;
              $("#contacts").find("ul").prepend(userInfoHtml);
              $(userInfo).remove();
              decreaseNotification("count-request-contact-received");
              increaseNotification("count-contacts");
              decreaseNotificationNavbar("noti_contact_counter", 1); 

              removeContact();   
              socket.emit('accept-request-contact-receive', {contactId: targetId});
          }
        }
      });
    });
}
socket.on('respond-accept-request-contact-receive', function(user) {
  let notification = `<div class="noti-readed-false" data-uid="${user.id}">
  <img
    class="avatar-small"
    src="/images/users/${user.avatar}"
    alt=""
  />
  <strong>${user.username}</strong> đã đồng ý lời mời kết
  bạn! </div>`;
  $('.noti_content').prepend(notification);
  $('ul.list-notifications').prepend(`<li>${notification}</li>`);

  decreaseNotificationNavbar('noti_contact_counter', 1);
  increaseNotificationNavbar('noti_counter', 1);
  decreaseNotification("count-request-contact-sent");
  increaseNotification("count-contacts");

  $("#request-contact-sent").find(`ul li[data-uid = ${user.id}]`).remove();
  $("#find-user").find(`ul li[data-uid = ${user.id}]`).remove();

  let userInfoHtml = `
      <li class="_contactList" data-uid="${user.id}">
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
            <div class="user-talk" data-uid="${user.id}">
                Trò chuyện
            </div>
            <div class="user-remove-contact action-danger" data-uid="${user.id}">
                Xóa liên hệ
            </div>
        </div>
      </li>
  `;
  $("#contacts").find("ul").prepend(userInfoHtml);
  removeContact();
});
  
$(document).ready(function() {
  acceptRequestContactReceive();
});
