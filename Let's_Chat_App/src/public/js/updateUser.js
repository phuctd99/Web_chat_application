let userAvatar = null;
let userInfo = {};
let oldAvatar = null;

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
    userInfo.username = $(this).val();
  });

  $('#input-change-gender-male').bind('click', function() {
    userInfo.gender = $(this).val();
  });

  $('#input-change-gender-female').bind('click', function() {
    userInfo.gender = $(this).val();
  });

  $('#input-change-address').bind('change', function() {
    userInfo.address = $(this).val();
  });

  $('#input-change-phone').bind('change', function() {
    userInfo.phone = $(this).val();
  });
}

$(document).ready(function() {
  updateUserInfo();

  oldAvatar = $('#user-modal-avatar').attr('src');

  $('#input-btn-update-user').bind('click', function() {
    if ($.isEmptyObject(userInfo) && !userAvatar) {
      alertify.notify(
        'Bạn phải thay đổi thông tin trước khi cập nhật',
        'error',
        7
      );
      return false;
    }

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
  });
  $('#input-btn-cancel-update-user').bind('click', function() {
    userAvatar = null;
    userInfo = {};
    $('#input-change-avatar').val(null);
    $('#user-modal-avatar').attr('src', oldAvatar);
  });
});