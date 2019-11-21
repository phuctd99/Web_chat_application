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