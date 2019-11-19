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