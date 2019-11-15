let userAvatar = null;
let userInfo = {};
let oldAvatar = null;
let oldInfo = {};
function updateUserInfo() {
  $('#input-change-avatar').bind('change', function() {
    const fileData = $(this).prop('files')[0];
    const math = ['image/png', 'image/jpg', 'image/jpeg'];
    const limit = 1048576; // 1 MB

    if ($.inArray(fileData.type, math) === -1) {
      alertify.notify('Kiểu file không hợp lệ!', 'error', 7);
      $.this.val(null);
      return false;
    }
    if (fileData.size > limit) {
      alertify.notify('Dung lượng ảnh tối đa 1 MB!', 'error', 7);
      $.this.val(null);
      return false;
    }

    if (typeof FileReader !== 'undefined') {
      const imagePreview = $('#image-edit-profile');
      imagePreview.empty();

      let fileReader = new FileReader();
      fileReader.onload = function(element) {
        $('<img>', {
          src: element.target.result,
          class: 'avatar img-circle',
          id: 'user-modal-avatar',
          alt: 'avatar'
        }).appendTo(imagePreview);
      };
      imagePreview.show();
      fileReader.readAsDataURL(fileData);

      let formData = new FormData();
      formData.append('avatar', fileData);
      userAvatar = formData;
    } else {
      alertify.notify('Trình duyệt không hỗ trợ FileReader!', 'error', 7);
    }
  });

  $('#input-change-username').bind('change', function() {
    let username = $(this).val();
    let regexUsername = new RegExp(
      '^[s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$'
    );
    if (
      !regexUsername.test(username) ||
      username.length < 3 ||
      username.length > 17
    ) {
      alertify.notify(
        'Xin đặt tên từ 3-17 ký tự và không có ký tự đặc biệt!',
        'error',
        7
      );
      $(this).val(oldInfo.username);
      delete userInfo.username;
      return false;
    }
    userInfo.username = username;
  });

  $('#input-change-gender-male').bind('click', function() {
    let gender = $(this).val();
    if (gender !== 'male') {
      alertify.notify('Giới tính không hợp lệ!', 'error', 7);
      $(this).val(oldInfo.gender);
      delete userInfo.gender;
      return false;
    }
    userInfo.gender = gender;
  });

  $('#input-change-gender-female').bind('click', function() {
    let gender = $(this).val();
    if (gender !== 'female') {
      alertify.notify('Giới tính không hợp lệ!', 'error', 7);
      $(this).val(oldInfo.gender);
      delete userInfo.gender;
      return false;
    }
    userInfo.gender = gender;
  });

  $('#input-change-address').bind('change', function() {
    let address = $(this).val();
    if (address.length < 3 || address.length > 30) {
      alertify.notify('Địa chỉ phải từ 3-30 ký tự!', 'error', 7);
      $(this).val(oldInfo.address);
      delete userInfo.address;
      return false;
    }
    userInfo.address = address;
  });

  $('#input-change-phone').bind('change', function() {
    let phone = $(this).val();
    let regexPhone = new RegExp('^(0)[0-9]{9,10}$');
    if (!regexPhone.test(phone)) {
      alertify.notify(
        'Số điện thoại bắt đầu bằng số 0 và có 10 ký tự!',
        'error',
        7
      );
      $(this).val(oldInfo.phone);
      delete userInfo.phone;
      return false;
    }
    userInfo.phone = phone;
  });
}
function updateAvt() {
  $.ajax({
    url: '/user/update-avatar',
    type: 'put',
    cache: false,
    contentType: false,
    processData: false,
    data: userAvatar,
    success: function(result) {
      // console.log(result);
      // display success
      $('.user-modal-alert-success')
        .find('span')
        .text(result.message);
      $('.user-modal-alert-success').css('display', 'block');

      $('#navbar-avatar').attr('src', result.imageSrc);
      oldAvatar = result.imageSrc;

      $('#input-btn-cancel-update-user').click();
    },
    error: function(err) {
      // console.log(err);
      // display error
      $('.user-modal-alert-error')
        .find('span')
        .text(err.responseText);
      $('.user-modal-alert-error').css('display', 'block');

      // reset input
      $('#input-btn-cancel-update-user').click();
    }
  });
}

function updateInfo() {
  $.ajax({
    url: '/user/update-info',
    type: 'put',
    data: userInfo,
    success: function(result) {
      $('.user-modal-alert-success')
        .find('span')
        .text(result.message);
      $('.user-modal-alert-success').css('display', 'block');

      oldInfo = Object.assign(oldInfo, userInfo);

      $('#navbar-username').text(oldInfo.username);

      $('#input-btn-cancel-update-user').click();
    },
    error: function(err) {
      // console.log(err);
      // display error
      $('.user-modal-alert-error')
        .find('span')
        .text(err.responseText);
      $('.user-modal-alert-error').css('display', 'block');

      // reset input
      $('#input-btn-cancel-update-user').click();
    }
  });
}
$(document).ready(function() {
  

  oldAvatar = $('#user-modal-avatar').attr('src');
  
  oldInfo = {
    username: $('#input-change-username').val(),
      gender: $('#input-change-gender-male').is(':checked')
        ? $('#input-change-gender-male').val()
        : $('#input-change-gender-female').val(),
      address: $('#input-change-address').val(),
      phone: $('#input-change-phone').val()
  };
  updateUserInfo();
  

  $('#input-btn-update-user').bind('click', function() {
    if ($.isEmptyObject(userInfo) && !userAvatar) {
      alertify.notify(
        'Bạn phải thay đổi thông tin trước khi cập nhật',
        'error',
        7
      );
      return false;
    }

    if (userAvatar) {
      updateAvt();
    }
    if (!$.isEmptyObject(userInfo)) {
      updateInfo();
    }
  });
  $('#input-btn-cancel-update-user').bind('click', function() {
    userAvatar = null;
    userInfo = {};

    $('#input-change-avatar').val(null);
    $('#user-modal-avatar').attr('src', oldAvatar);
    $('#input-change-username').val(oldInfo.username);
    oldInfo.gender === 'male'
      ? $('#input-change-gender-male').click()
      : $('#input-change-gender-female').click();
    $('#input-change-address').val(oldInfo.address);
    $('#input-change-phone').val(oldInfo.phone);
  });
});