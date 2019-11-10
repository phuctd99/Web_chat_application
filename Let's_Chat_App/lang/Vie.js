export const validationMessage = {
    email_incorret: 'Email phải có dạng example@mail.com',
    gender_incorrect: 'Giới tính không hợp lệ!',
    password_incorrect: 'Mật khẩu phải chứa ít nhất 8 ký tự gồm chữ và số.',
    confirmedPassword_incorrect: 'Nhập lại mật khẩu chưa chính xác!'
};

export const errorMessage = {
    account_is_used: "Email đã bị sử dụng!",
    account_is_removed: "Email đã bị xóa!",
    account_is_activated: "Email chưa được kích hoạt!"
};

export const successMessage = {
    userCreated: (userEmail) => {
        return `Vui lòng xác thực tài khoản qua email ${userEmail}!`;
    }
};