function findUsers(element) {
  if (element.which === 13 || element.type === 'click') {
    let keyword = $('#input-find-users-contact').val();
    if (!keyword.length) {
      alertify.notify('Bạn chưa nhập nội dung tìm kiếm!', 'error', 7);
      $('.contactList').empty();
      return false;
    }
    $.get(`/contact/find-users/${keyword}`, data => {
      $('#find-user ul').html(data);
      addContact(); // js/addContact.js
      removeRequestContactSent(); // js/removeRequestContact.js
    });
  }
}

$(document).ready(() => {
  $('#input-find-users-contact').bind('keypress', findUsers);
  $('#btn-find-users-contact').bind('click', findUsers);
});