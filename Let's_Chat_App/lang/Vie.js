export const validationMessage = {
    email_incorret: 'Email phải có dạng example@mail.com',
    gender_incorrect: 'Giới tính không hợp lệ!',
    password_incorrect: 'Mật khẩu phải chứa ít nhất 8 ký tự gồm chữ và số.',
    confirmedPassword_incorrect: 'Nhập lại mật khẩu chưa chính xác!',
    password_confirmation_incorrect: 'Password confirm hơi sai!',
    update_username: 'Xin đặt tên từ 3-17 ký tự và không có ký tự đặc biệt!',
    update_gender: 'Bạn là dev hả?',
    update_address: 'Địa chỉ từ 3-30 ký tự!',
    update_phone: 'Số điện thoại bắt đầu bằng số 0 và có 10 ký tự!'
};

export const errorMessage = {
    account_is_used: "Email đã bị sử dụng!",
    account_is_removed: "Email đã bị xóa!",
    account_is_activated: "Email chưa được kích hoạt!",
    token_undefined: "Token đã hết hạn",
    login_failed: "Tên đăng nhập hoặc mật khẩu sai",
    server_error: "Lỗi máy chủ",
    avatar_type: 'Kiểu tệp không hợp lệ!',
    avatar_size: 'Kích thước ảnh đại diện không quá 1MB!',
    password_incorrect: 'Mật khẩu hiện tại không chính xác!'
};

export const successMessage = {
    userCreated: (userEmail) => {
        return `Vui lòng xác thực tài khoản qua email ${userEmail}!`;
    },
    account_actived: "Kích hoạt tài khoản thành công",
    loginSuccess: (username) => {
        return `Hello ${username}`;
    },
    logoutSuccess: "Thoát thành công",
    info_updated: 'Cập nhật thông tin thành công!',
    password_updated: 'Cập nhật mật khẩu thành công!'
};
export const mailMessage = {
    subject: "Xác nhận đăng ký tài khoản",
    templace: (linkVerify) => {
        return `
            <h2>Vui lòng bấm vào link để xác thực tài khoản </h2>
            <h3><a href="${linkVerify}" target="blank">${linkVerify}</a><h3>
        `;
    },
    send_failed: "Có lỗi trong quá trình gửi email"
};
