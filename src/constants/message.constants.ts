export class MESSAGE {
  static SYSTEM_MESSAGE = {
    VALIDATION_ERROR: 'Lỗi dữ liệu đầu vào'
  } as const

  static AUTHENTICATE_MESSAGE = {
    ACCESS_TOKEN_IS_REQUIRED: 'Không được bỏ trống Access token',
    ACCESS_TOKEN_MUST_BE_A_STRING: 'Access token phải là một chuỗi ký tự',
    ACCESS_TOKEN_INVALID: 'Access token không hợp lệ',
    USER_DOES_NOT_EXIST: 'Người dùng không tồn tại',
    REFRESH_TOKEN_IS_REQUIRED: 'Không được bỏ trống Refresh token',
    REFRESH_TOKEN_MUST_BE_A_STRING: 'Refresh token phải là một chuỗi ký tự',
    REFRESH_TOKEN_INVALID: 'Refresh token không hợp lệ',
    AUTHENTICATION_FAILED: 'Yêu cầu xác thực trước khi thực hiện hành động này',
    YOU_DONT_HAVE_PERMISSION_TO_DO_THIS: 'Bạn không có quyền làm điều này',
    YOUR_ACCOUNT_IS_NOT_VERIFIED:
      'Tài khoản của bạn chưa được xác thực, vui lòng xác thực tài khoản trước khi thực hiện hành động này',
    CHECK_PERMISSION_SUCCESS: 'Kiểm tra quyền thành công',
    CHECK_PERMISSION_FAILURE: 'Kiểm tra quyền thất bại'
  } as const

  static USER_MESSAGE = {
    DISPLAY_NAME_IS_REQUIRED: 'Không được bỏ trống tên hiển thị',
    DISPLAY_NAME_MUST_BE_A_STRING: 'Tên hiển thị phải là chuỗi ký tự',
    DISPLAY_NAME_LENGTH_MUST_BE_FROM_1_TO_50: 'Tên hiển thị phải có độ dài từ 1 đến 50 ký tự',
    USERNAME_IS_REQUIRED: 'Không được bỏ trống tên tài khoản',
    USERNAME_MUST_BE_A_STRING: 'Tên tài khoản phải là một chuỗi ký tự',
    USERNAME_LENGTH_MUST_BE_FROM_3_TO_50: 'Tên tài khoản phải có độ dài từ 3 đến 50 ký tự',
    USERNAME_MUST_BE_ALPHANUMERIC: 'Tên tài khoản phải là chữ cái hoặc số',
    USERNAME_ALREADY_EXISTS: 'Tên tài khoản đã được sử dụng',
    EMAIL_IS_REQUIRED: 'Không được bỏ trống địa chỉ email',
    EMAIL_MUST_BE_A_STRING: 'Địa chỉ email phải là một chuỗi ký tự',
    EMAIL_LENGTH_MUST_BE_FROM_5_TO_100: 'Địa chỉ email phải có độ dài từ 5 đến 100 ký tự',
    EMAIL_IS_NOT_VALID: 'Địa chỉ email không đúng định dạng',
    EMAIL_ALREADY_EXISTS: 'Địa chỉ email đã được sử dụng',
    ACCOUNT_IS_NOT_VALID: 'Địa chỉ email hoặc mật khẩu không hợp lệ',
    EMAIL_NOT_FOUND: 'Email không tồn tại',
    PHONE_IS_REQUIRED: 'Không được bỏ trống số điện thoại',
    PHONE_MUST_BE_A_STRING: 'Số điện thoại phải là một chuỗi ký tự',
    PHONE_LENGTH_MUST_BE_FROM_10_TO_11: 'Số điện thoại phải có độ dài từ 10 đến 11 ký tự',
    PHONE_IS_NOT_VALID: 'Số điện thoại không hợp lệ',
    PHONE_ALREADY_EXISTS: 'Số điện thoại đã được sử dụng',
    PASSWORD_IS_REQUIRED: 'Không được bỏ trống mật khẩu',
    PASSWORD_MUST_BE_A_STRING: 'Mật khẩu phải là một chuỗi ký tự',
    PASSWORD_LENGTH_MUST_BE_FROM_8_TO_100: 'Mật khẩu phải có độ dài từ 8 đến 100 ký tự',
    PASSWORD_MUST_BE_STRONG: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt',
    CONFIRM_PASSWORD_IS_REQUIRED: 'Không được bỏ trống xác nhận mật khẩu',
    CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Xác nhận mật khẩu phải là một chuỗi ký tự',
    CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_100: 'Xác nhận mật khẩu phải có độ dài từ 8 đến 100 ký tự',
    CONFIRM_PASSWORD_MUST_BE_STRONG:
      'Xác nhận mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt',
    CONFIRM_PASSWORD_DOES_NOT_MATCH_PASSWORD: 'Xác nhận mật khẩu phải khớp với mật khẩu',
    REGISTER_SUCCESS: 'Đăng ký tài khoản thành công',
    REGISTER_FAILURE: 'Đăng ký tài khoản thất bại',
    INCORRECT_EMAIL_OR_PASSWORD: 'Địa chỉ email hoặc mật khẩu không chính xác',
    LOGIN_SUCCESS: 'Đăng nhập tài khoản thành công',
    LOGIN_FAILURE: 'Đăng nhập tài khoản thất bại',
    LOGOUT_SUCCESS: 'Đăng xuất tài khoản thành công',
    LOGOUT_FAILURE: 'Đăng xuất tài khoản thất bại',
    VERIFY_TOKEN_SUCCESS: 'Xác thực token thành công',
    VERIFY_TOKEN_FAILURE: 'Xác thực token thất bại',
    GET_USER_INFORMATION_SUCCESS: 'Lấy thông tin người dùng thành công',
    GET_USER_INFORMATION_FAILURE: 'Lấy thông tin người dùng thất bại',
    USER_NOT_FOUND: 'Người dùng không hợp lệ',
    SEND_EMAIL_VERIFY_SUCCESS: 'Gửi thư xác nhận tài khoản thành công',
    SEND_EMAIL_VERIFY_FAILURE: 'Gửi thư xác nhận tài khoản thất bại',
    ACCOUNT_IS_VERIFIED: 'Tài khoản của bạn đã được xác thực',
    ACCOUNT_IS_NOT_VERIFIED: 'Tài khoản của bạn chưa được xác thực',
    TOKEN_IS_REQUIRED: 'Không được bỏ trống token',
    TOKEN_MUST_BE_A_STRING: 'Token phải là một chuỗi kí tự',
    TOKEN_INVALID: 'Token không hợp lệ',
    PASSWORD_CONFIRM_NOT_MATCH: 'Mật khẩu xác nhận phải trùng với mật khẩu mới',
    VERIFY_ACCOUNT_SUCCESS: 'Xác thực tài khoản thành công',
    VERIFY_ACCOUNT_FAILURE: 'Xác thực tài khoản thất bại',
    SEND_MAIL_FORGOT_PASSWORD_SUCCESS: 'Gửi yêu cầu đặt lại mật khẩu thành công',
    SEND_MAIL_FORGOT_PASSWORD_FAILURE: 'Gửi yêu cầu đặt lại mật khẩu thất bại',
    CHANGE_PASSWORD_SUCCESS: 'Cập nhật mật khẩu thành công',
    CHANGE_PASSWORD_FAILURE: 'Cập nhật mật khẩu thất bại',
    CHANGE_INFORMATION_SUCCESS: 'Cập nhật thông tin tài khoản thành công',
    CHANGE_INFORMATION_FAILURE: 'Cập nhật thông tin tài khoản thất bại',
    INCORRECT_PASSWORD: 'Mật khẩu không chính xác',
    VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS: 'Xác thực token yêu cầu đặt lại mật khẩu thành công',
    VERIFY_FORGOT_PASSWORD_TOKEN_FAILURE: 'Xác thực token yêu cầu đặt lại mật khẩu thất bại',
    VERIFY_EMAIL_VERIFY_TOKEN_SUCCESS: 'Xác thực token xác thực tài khoản thành công',
    VERIFY_EMAIL_VERIFY_TOKEN_FAILURE: 'Xác thực token xác thực tài khoản thất bại'
  } as const

  static FILE_MANAGEMENT_MESSAGE = {
    IMAGE_IS_REQUIRED: 'Không được bỏ trống hình ảnh',
    UPLOAD_IMAGE_SUCCESS: 'Tải lên hình ảnh thành công',
    UPLOAD_IMAGE_FAILURE: 'Tải lên hình ảnh thất bại'
  } as const

  static COLOR_MESSAGE = {
    COLOR_TYPE_IS_REQUIRED: 'Không được bỏ trống loại màu',
    COLOR_INVALID: 'Loại màu không hợp lệ'
  } as const

  static TOPIC_MESSAGE = {
    TOPIC_ID_MUST_NOT_BE_EMPTY: 'Không được bỏ trống ID chủ đề',
    TOPIC_ID_MUST_BE_A_STRING: 'ID chủ đề phải là một chuỗi ký tự',
    TOPIC_ID_MUST_BE_A_VALID_MONGO_ID: 'ID chủ đề phải là một ID Mongo hợp lệ',
    TOPIC_ID_NOT_FOUND: 'ID chủ đề không tồn tại',
    TOPIC_MUST_NOT_BE_EMPTY: 'Chủ đề không được để trống',
    TOPIC_MUST_BE_A_STRING: 'Chủ đề phải là một chuỗi ký tự',
    TOPIC_LENGTH_MUST_BE_FROM_1_TO_30: 'Chủ đề phải có độ dài từ 1 đến 30 ký tự',
    TOPIC_IS_BEING_USED_ON_THE_POST: 'Không thể xóa chủ đề đang được sử dụng',
    CREATE_TOPIC_SUCCESS: 'Tạo chủ đề thành công',
    CREATE_TOPIC_FAILURE: 'Tạo chủ đề thất bại',
    UPDATE_TOPIC_SUCCESS: 'Cập nhật chủ đề thành công',
    UPDATE_TOPIC_FAILURE: 'Cập nhật chủ đề thất bại',
    DELETE_TOPIC_SUCCESS: 'Xóa chủ đề thành công',
    DELETE_TOPIC_FAILURE: 'Xóa chủ đề thất bại',
    GET_TOPIC_SUCCESS: 'Lấy thông tin chủ đề thành công',
    GET_TOPIC_FAILURE: 'Lấy thông tin chủ đề thất bại'
  } as const

  static POST_MESSAGE = {
    POST_ID_IS_REQUIRED: 'Không được bỏ trống ID bài viết',
    POST_ID_MUST_BE_A_STRING: 'ID bài viết phải là một chuỗi ký tự',
    POST_ID_MUST_BE_A_ID: 'ID bài viết phải là một ID hợp lệ',
    POST_ID_NOT_FOUND: 'ID bài viết không tồn tại',
    TITLE_IS_REQUIRED: 'Không được bỏ trống tiêu đề',
    TITLE_MUST_BE_A_STRING: 'Tiêu đề phải là một chuỗi ký tự',
    TITLE_LENGTH_MUST_BE_FROM_1_TO_150: 'Tiêu đề phải có độ dài từ 1 đến 150 ký tự',
    CONTENT_IS_REQUIRED: 'Không được bỏ trống nội dung',
    CONTENT_MUST_BE_A_STRING: 'Nội dung phải là một chuỗi ký tự',
    TOPIC_ID_IS_REQUIRED: 'Không được bỏ trống ID chủ đề',
    TOPIC_ID_MUST_BE_A_STRING: 'ID chủ đề phải là một chuỗi ký tự',
    TOPIC_ID_MUST_BE_A_ID: 'ID chủ đề phải là một ID hợp lệ',
    TOPIC_ID_NOT_FOUND: 'ID chủ đề không tồn tại',
    CREATE_POST_SUCCESS: 'Tạo bài viết thành công',
    CREATE_POST_FAILURE: 'Tạo bài viết thất bại',
    UPDATE_POST_SUCCESS: 'Cập nhật bài viết thành công',
    UPDATE_POST_FAILURE: 'Cập nhật bài viết thất bại',
    DELETE_POST_SUCCESS: 'Xóa bài viết thành công',
    DELETE_POST_FAILURE: 'Xóa bài viết thất bại',
    GET_POST_SUCCESS: 'Lấy thông tin bài viết thành công',
    GET_POST_FAILURE: 'Lấy thông tin bài viết thất bại',
    URL_IS_REQUIRED: 'Không được bỏ trống URL',
    URL_MUST_BE_A_STRING: 'URL phải là một chuỗi ký tự',
    URL_NOT_FOUND: 'URL không tồn tại'
  }

  static COMMENT_MESSAGE = {
    POST_ID_IS_REQUIRED: 'Không được bỏ trống ID bài viết',
    POST_ID_MUST_BE_A_STRING: 'ID bài viết phải là một chuỗi ký tự',
    POST_ID_MUST_BE_A_ID: 'ID bài viết phải là một ID hợp lệ',
    POST_ID_NOT_FOUND: 'ID bài viết không tồn tại',
    CONTENT_IS_REQUIRED: 'Không được bỏ trống nội dung',
    CONTENT_MUST_BE_A_STRING: 'Nội dung phải là một chuỗi ký tự',
    COMMENT_ID_IS_REQUIRED: 'Không được bỏ trống ID bình luận',
    COMMENT_ID_MUST_BE_A_STRING: 'ID bình luận phải là một chuỗi ký tự',
    COMMENT_ID_MUST_BE_A_ID: 'ID bình luận phải là một ID hợp lệ',
    COMMENT_ID_NOT_FOUND: 'ID bình luận không tồn tại',
    CREATE_COMMENT_SUCCESS: 'Tạo bình luận thành công',
    CREATE_COMMENT_FAILURE: 'Tạo bình luận thất bại',
    UPDATE_COMMENT_SUCCESS: 'Cập nhật bình luận thành công',
    UPDATE_COMMENT_FAILURE: 'Cập nhật bình luận thất bại',
    DELETE_COMMENT_SUCCESS: 'Xóa bình luận thành công',
    DELETE_COMMENT_FAILURE: 'Xóa bình luận thất bại',
    GET_COMMENT_SUCCESS: 'Lấy thông tin bình luận thành công',
    GET_COMMENT_FAILURE: 'Lấy thông tin bình luận thất bại'
  }
}
