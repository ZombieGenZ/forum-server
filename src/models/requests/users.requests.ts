export interface RegisterUserRequestBody {
  username: string
  email: string
  phone: string
  password: string
  confirm_password: string
}

export interface LoginUserRequestBody {
  email: string
  password: string
}

export interface LogoutUserRequestBody {
  refresh_token: string
}

export interface VerifyTokenRequestBody {
  token: string
}

export interface VerifyAccountRequestBody {
  refresh_token: string
}

export interface SendForgotPasswordRequestBody {
  refresh_token: string
}

export interface VerifyForgotPasswordTokenRequestBody {
  token: string
}

export interface ForgotPasswordRequestBody {
  token: string
  new_password: string
  confirm_new_password: string
}

export interface ChangeInfomationRequestBody {
  display_name: string
  username: string
  phone: string
}

export interface ChangePasswordRequestBody {
  password: string
  new_password: string
  confirm_new_password: string
}
