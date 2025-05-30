import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import {
  RegisterUserRequestBody,
  LoginUserRequestBody,
  LogoutUserRequestBody,
  VerifyTokenRequestBody,
  VerifyAccountRequestBody,
  SendForgotPasswordRequestBody,
  VerifyForgotPasswordTokenRequestBody,
  ForgotPasswordRequestBody,
  ChangeInfomationRequestBody,
  ChangePasswordRequestBody
} from '~/models/requests/users.requests'
import userService from '~/services/users.services'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { MESSAGE } from '~/constants/message.constants'
import User from '~/models/schemas/users.shemas'
import RefreshToken from '~/models/schemas/refreshtoken.schemas'
import { AuthenticateRequestBody } from '~/models/requests/authenticate.requests'
import { TokenPayload } from '~/models/requests/authentication.requests'
import { verifyToken } from '~/utils/jwt.utils'
import databaseService from '~/services/database.services'
import { ObjectId } from 'mongodb'
import { omit } from 'lodash'
import axios from 'axios'

export const registerUserController = async (
  req: Request<ParamsDictionary, any, RegisterUserRequestBody>,
  res: Response
) => {
  try {
    const authenticate = await userService.register(req.body)

    res.json({
      code: RESPONSE_CODE.USER_REGISTRATION_SUCCESSFUL,
      message: MESSAGE.USER_MESSAGE.REGISTER_SUCCESS,
      authenticate: {
        access_token: authenticate[0],
        refresh_token: authenticate[1]
      }
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.USER_REGISTRATION_FAILED,
      message: MESSAGE.USER_MESSAGE.REGISTER_FAILURE
    })
  }
}

export const loginUserController = async (req: Request<ParamsDictionary, any, LoginUserRequestBody>, res: Response) => {
  const user = req.user as User

  try {
    const authenticate = await userService.login(user)

    res.json({
      code: RESPONSE_CODE.USER_LOGIN_SUCCESSFUL,
      message: MESSAGE.USER_MESSAGE.LOGIN_SUCCESS,
      authenticate: {
        access_token: authenticate[0],
        refresh_token: authenticate[1]
      }
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.USER_LOGIN_FAILED,
      message: MESSAGE.USER_MESSAGE.LOGIN_FAILURE
    })
  }
}

export const logoutUserController = async (
  req: Request<ParamsDictionary, any, LogoutUserRequestBody>,
  res: Response
) => {
  const refresh_token = req.refresh_token as RefreshToken

  try {
    await userService.logout(refresh_token.token)

    res.json({
      code: RESPONSE_CODE.USER_LOGOUT_SUCCESSFUL,
      message: MESSAGE.USER_MESSAGE.LOGOUT_SUCCESS
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.USER_LOGOUT_FAILED,
      message: MESSAGE.USER_MESSAGE.LOGOUT_FAILURE
    })
  }
}

export const verifyTokenUserController = async (
  req: Request<ParamsDictionary, any, AuthenticateRequestBody>,
  res: Response
) => {
  const access_token = req.headers.authorization || null
  const refresh_token = req.refresh_token as RefreshToken

  try {
    const access = access_token?.split(' ')
    let changed: boolean
    let result: {
      access_token: string
      refresh_token: string
    }
    if (!access || access[0] !== 'Bearer' || access[1] == '') {
      const authenticate = await userService.signAccessTokenAndRefreshToken(refresh_token.user_id.toString())

      await userService.updateRefreshToken(refresh_token.token, authenticate[1])

      result = {
        access_token: authenticate[0],
        refresh_token: authenticate[1]
      }

      changed = true
    } else {
      try {
        const decoded_access_token = (await verifyToken({
          token: access[1],
          publicKey: process.env.SECURITY_JWT_SECRET_ACCESS_TOKEN as string
        })) as TokenPayload

        const user = await databaseService.users.findOne({ _id: new ObjectId(decoded_access_token.user_id) })

        if (!decoded_access_token || !user) {
          const authenticate = await userService.signAccessTokenAndRefreshToken(refresh_token.user_id.toString())

          await userService.updateRefreshToken(refresh_token.token, authenticate[1])

          result = {
            access_token: authenticate[0],
            refresh_token: authenticate[1]
          }

          changed = true
        } else {
          result = {
            access_token: access[1],
            refresh_token: refresh_token.token
          }

          changed = false
        }
      } catch {
        const authenticate = await userService.signAccessTokenAndRefreshToken(refresh_token.user_id.toString())

        await userService.updateRefreshToken(refresh_token.token, authenticate[1])

        result = {
          access_token: authenticate[0],
          refresh_token: authenticate[1]
        }

        changed = true
      }
    }

    res.json({
      code: changed
        ? RESPONSE_CODE.TOKEN_AUTHENTICATION_SUCCESSFUL_TOKEN_CHANGED
        : RESPONSE_CODE.TOKEN_VERIFICATION_SUCCESSFUL,
      message: MESSAGE.USER_MESSAGE.VERIFY_TOKEN_SUCCESS,
      authenticate: result
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.TOKEN_VERIFICATION_FAILED,
      message: MESSAGE.USER_MESSAGE.VERIFY_TOKEN_FAILURE
    })
  }
}

export const getUserInfomationController = async (
  req: Request<ParamsDictionary, any, AuthenticateRequestBody>,
  res: Response
) => {
  const user = req.user as User

  try {
    res.json({
      code: RESPONSE_CODE.GET_USER_INFOMATION_SUCCESSFUL,
      message: MESSAGE.USER_MESSAGE.GET_USER_INFORMATION_SUCCESS,
      account: omit(user, ['password', 'verify_token', 'forgot_password_token'])
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.GET_USER_INFOMATION_FAILED,
      message: MESSAGE.USER_MESSAGE.GET_USER_INFORMATION_FAILURE
    })
  }
}

export const getUserStatisticalController = async (req: Request, res: Response) => {
  const user = req.user as User

  try {
    const statistical = await userService.getUserStatistical(user._id)
    const posts = await userService.getUserPost(user._id)

    res.json({
      code: RESPONSE_CODE.GET_USER_INFOMATION_SUCCESSFUL,
      message: MESSAGE.USER_MESSAGE.GET_USER_INFORMATION_SUCCESS,
      account: omit(user, ['password', 'verify_token', 'forgot_password_token']),
      statistical,
      posts
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.GET_USER_INFOMATION_FAILED,
      message: MESSAGE.USER_MESSAGE.GET_USER_INFORMATION_FAILURE
    })
  }
}

// export const sendVerifyTokenController = async (
//   req: Request<ParamsDictionary, any, AuthenticateRequestBody>,
//   res: Response
// ) => {
//   const user = req.user as User

//   try {
//     await userService.sendEmailVerify(user)

//     res.json({
//       code: RESPONSE_CODE.SEND_EMAIL_VERIFY_SUCCESSFUL,
//       message: MESSAGE.USER_MESSAGE.SEND_EMAIL_VERIFY_SUCCESS
//     })
//   } catch (err) {
//     res.json({
//       code: RESPONSE_CODE.SEND_EMAIL_VERIFY_FAILED,
//       message: MESSAGE.USER_MESSAGE.SEND_EMAIL_VERIFY_FAILURE
//     })
//   }
// }

// export const verifyTokenController = async (
//   req: Request<ParamsDictionary, any, VerifyTokenRequestBody>,
//   res: Response
// ) => {
//   try {
//     const result = await userService.verifyToken(req.body)

//     res.json({
//       code: RESPONSE_CODE.VERIFY_EMAIL_VERIFY_TOKEN_SUCCESSFUL,
//       message: MESSAGE.USER_MESSAGE.VERIFY_EMAIL_VERIFY_TOKEN_SUCCESS,
//       result
//     })
//   } catch (err) {
//     res.json({
//       code: RESPONSE_CODE.VERIFY_EMAIL_VERIFY_TOKEN_FAILED,
//       message: MESSAGE.USER_MESSAGE.VERIFY_EMAIL_VERIFY_TOKEN_FAILURE
//     })
//   }
// }

// export const verifyAccountController = async (
//   req: Request<ParamsDictionary, any, VerifyAccountRequestBody>,
//   res: Response
// ) => {
//   const user = req.user as User

//   try {
//     await userService.verifyAccount(user)

//     res.json({
//       code: RESPONSE_CODE.VERIFY_ACCOUNT_SUCCESSFUL,
//       message: MESSAGE.USER_MESSAGE.VERIFY_ACCOUNT_SUCCESS
//     })
//   } catch (err) {
//     res.json({
//       code: RESPONSE_CODE.VERIFY_ACCOUNT_FAILED,
//       message: MESSAGE.USER_MESSAGE.VERIFY_ACCOUNT_FAILURE
//     })
//   }
// }

// export const sendEmailForgotPasswordController = async (
//   req: Request<ParamsDictionary, any, SendForgotPasswordRequestBody>,
//   res: Response
// ) => {
//   const user = req.user as User

//   try {
//     await userService.sendForgotPassword(user)

//     res.json({
//       code: RESPONSE_CODE.SEND_MAIL_FORGOT_PASSWORD_SUCCESSFUL,
//       message: MESSAGE.USER_MESSAGE.SEND_MAIL_FORGOT_PASSWORD_SUCCESS
//     })
//   } catch (err) {
//     res.json({
//       code: RESPONSE_CODE.SEND_MAIL_FORGOT_PASSWORD_FAILED,
//       message: MESSAGE.USER_MESSAGE.SEND_MAIL_FORGOT_PASSWORD_FAILURE
//     })
//   }
// }

// export const verifyForgotPasswordTokenController = async (
//   req: Request<ParamsDictionary, any, VerifyForgotPasswordTokenRequestBody>,
//   res: Response
// ) => {
//   try {
//     const result = await userService.verifyForgotPasswordToken(req.body)

//     res.json({
//       code: RESPONSE_CODE.VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESSFUL,
//       message: MESSAGE.USER_MESSAGE.VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS,
//       result
//     })
//   } catch (err) {
//     res.json({
//       code: RESPONSE_CODE.VERIFY_FORGOT_PASSWORD_TOKEN_FAILED,
//       message: MESSAGE.USER_MESSAGE.VERIFY_FORGOT_PASSWORD_TOKEN_FAILURE
//     })
//   }
// }

// export const forgotPasswordController = async (
//   req: Request<ParamsDictionary, any, ForgotPasswordRequestBody>,
//   res: Response
// ) => {
//   const ip = (req.headers['cf-connecting-ip'] || req.ip) as string
//   const user = req.user as User

//   try {
//     const ipData = (await axios.get(`https://ipinfo.io/${ip}/?token=${process.env.IPINFO_TOKEN}`)).data
//     const [latitude, longitude] = ipData.loc.split(',')
//     const locationData = await axios.get(
//       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//     )
//     const userAgent = req.useragent
//     const deviceInfo = {
//       isMobile: userAgent?.isMobile,
//       browser: userAgent?.browser,
//       os: userAgent?.os
//     }

//     await userService.forgotPassword(
//       user,
//       req.body,
//       locationData.data.display_name,
//       ip,
//       deviceInfo.browser as string,
//       deviceInfo.os as string
//     )

//     res.json({
//       code: RESPONSE_CODE.FORGOT_PASSWORD_SUCCESSFUL,
//       message: MESSAGE.USER_MESSAGE.CHANGE_PASSWORD_SUCCESS
//     })
//   } catch (err) {
//     res.json({
//       code: RESPONSE_CODE.FORGOT_PASSWORD_FAILED,
//       message: MESSAGE.USER_MESSAGE.CHANGE_PASSWORD_FAILURE
//     })
//   }
// }

// export const changeInformationController = async (
//   req: Request<ParamsDictionary, any, ChangeInfomationRequestBody>,
//   res: Response
// ) => {
//   const user = req.user as User

//   try {
//     await userService.changeInfomation(req.body, user)

//     res.json({
//       code: RESPONSE_CODE.CHANGE_INFORMATION_SUCCESSFUL,
//       message: MESSAGE.USER_MESSAGE.CHANGE_INFORMATION_SUCCESS
//     })
//   } catch (err) {
//     res.json({
//       code: RESPONSE_CODE.CHANGE_INFORMATION_FAILED,
//       message: MESSAGE.USER_MESSAGE.CHANGE_INFORMATION_FAILURE
//     })
//   }
// }

// export const changePasswordController = async (
//   req: Request<ParamsDictionary, any, ChangePasswordRequestBody>,
//   res: Response
// ) => {
//   const ip = (req.headers['cf-connecting-ip'] || req.ip) as string
//   const user = req.user as User

//   try {
//     const ipData = (await axios.get(`https://ipinfo.io/${ip}/?token=${process.env.IPINFO_TOKEN}`)).data
//     const [latitude, longitude] = ipData.loc.split(',')
//     const locationData = await axios.get(
//       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//     )
//     const userAgent = req.useragent
//     const deviceInfo = {
//       isMobile: userAgent?.isMobile,
//       browser: userAgent?.browser,
//       os: userAgent?.os
//     }

//     await userService.changePassword(
//       req.body,
//       user,
//       locationData.data.display_name,
//       ip,
//       deviceInfo.browser as string,
//       deviceInfo.os as string
//     )

//     res.json({
//       code: RESPONSE_CODE.CHANGE_PASSWORD_SUCCESSFUL,
//       message: MESSAGE.USER_MESSAGE.CHANGE_PASSWORD_SUCCESS
//     })
//   } catch (err) {
//     res.json({
//       code: RESPONSE_CODE.CHANGE_PASSWORD_FAILED,
//       message: MESSAGE.USER_MESSAGE.CHANGE_PASSWORD_FAILURE
//     })
//   }
// }
