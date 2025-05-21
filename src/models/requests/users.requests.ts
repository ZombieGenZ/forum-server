export interface RegisterUserRequestBody {
  display_name: string
  username: string
  email: string
  phone: string
  password: string
  confirm_password: string
}

export interface LoginUserRequestBody {
  email_or_phone_or_username: string
  password: string
}

export interface LogoutUserRequestBody {
  refresh_token: string
}

// export interface VerifyEmailVerifyTokenRequestsBody {
//   language?: string
//   token: string
// }

// export interface VerifyAccountRequestsBody {
//   language?: string
//   refresh_token: string
// }

// export interface SendForgotPasswordRequestsBody {
//   language?: string
//   refresh_token: string
// }

// export interface VerifyForgotPasswordTokenRequestsBody {
//   language?: string
//   token: string
// }

// export interface ForgotPasswordRequestsBody {
//   language?: string
//   token: string
//   new_password: string
//   confirm_new_password: string
// }

// export interface ChangeInfomationRequestsBody {
//   language?: string
//   display_name: string
//   phone: string
// }

// export interface ChangePasswordRequestsBody {
//   language?: string
//   password: string
//   new_password: string
//   confirm_new_password: string
// }
