import {
  RegisterUserRequestBody,
  VerifyTokenRequestBody,
  VerifyForgotPasswordTokenRequestBody,
  ForgotPasswordRequestBody,
  ChangeInfomationRequestBody,
  ChangePasswordRequestBody
} from '~/models/requests/users.requests'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'
import User from '~/models/schemas/users.shemas'
import { HashPassword } from '~/utils/encryption.utils'
import { MAIL } from '~/constants/mail.constants'
import { sendMail } from '~/utils/mail.utils'
import { signToken, verifyToken } from '~/utils/jwt.utils'
import { TokenType } from '~/constants/jwt.constants'
import RefreshToken from '~/models/schemas/refreshtoken.schemas'
import { TokenPayload } from '~/models/requests/authentication.requests'
import { UserTypeEnum } from '~/constants/users.constants'
import { formatDateFull2 } from '~/utils/date.utils'

class UserService {
  async checkUserNameExits(username: string) {
    const user = await databaseService.users.findOne({ username })
    return Boolean(user)
  }
  async checkEmailExits(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
  async checkPhoneExits(phone: string) {
    const user = await databaseService.users.findOne({ phone })
    return Boolean(user)
  }
  async register(payload: RegisterUserRequestBody) {
    const user_id = new ObjectId()

    const verifyToken = await this.signEmailVerify(user_id.toString())
    const verifyUrl = `${process.env.APP_URL}/verify-account?token=${verifyToken}`

    await databaseService.users.insertOne(
      new User({ ...payload, _id: user_id, verify_token: verifyToken, password: HashPassword(payload.password) })
    )

    const authenticate = await this.signAccessTokenAndRefreshToken(user_id.toString())
    await this.insertRefreshToken(user_id.toString(), authenticate[1])

    const email_welcome_subject = MAIL.WELCOME.subject
    const email_welcome_html = MAIL.WELCOME.html
    const email_verify_subject = MAIL.VERIFY_ACCOUNT(verifyUrl).subject
    const email_verify_html = MAIL.VERIFY_ACCOUNT(verifyUrl).html

    await Promise.all([
      sendMail(payload.email, email_welcome_subject, email_welcome_html),
      sendMail(payload.email, email_verify_subject, email_verify_html)
    ])

    return authenticate
  }
  signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id: user_id,
        token_type: TokenType.AccessToken
      },
      privateKey: process.env.SECURITY_JWT_SECRET_ACCESS_TOKEN as string,
      options: {
        expiresIn: process.env.SECURITY_ACCESS_TOKEN_EXPIRES_IN as any
      }
    })
  }
  signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id: user_id,
        token_type: TokenType.RefreshToken
      },
      privateKey: process.env.SECURITY_JWT_SECRET_REFRESH_TOKEN as string,
      options: {
        expiresIn: process.env.SECURITY_REFRESH_TOKEN_EXPIRES_IN as any
      }
    })
  }
  private signEmailVerify(user_id: string) {
    return signToken({
      payload: {
        user_id: user_id,
        token_type: TokenType.VerifyToken
      },
      privateKey: process.env.SECURITY_JWT_SECRET_VERIFY_TOKEN as string,
      options: {
        expiresIn: process.env.SECURITY_VERIFY_EXPIRES_IN as any
      }
    })
  }
  private signForgotPassword(user_id: string) {
    return signToken({
      payload: {
        user_id: user_id,
        token_type: TokenType.ForgotPasswordToken
      },
      privateKey: process.env.SECURITY_JWT_SECRET_FORGOT_PASSWORD_TOKEN as string,
      options: {
        expiresIn: process.env.SECURITY_FORGOT_PASSWORD_EXPIRES_IN as any
      }
    })
  }
  signAccessTokenAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }
  async insertRefreshToken(user_id: string, token: string) {
    await databaseService.refreshToken.insertOne(
      new RefreshToken({
        token,
        user_id: new ObjectId(user_id)
      })
    )
  }
  async updateRefreshToken(old_token: string, new_token: string) {
    await databaseService.refreshToken.updateOne(
      {
        token: old_token
      },
      {
        $set: {
          token: new_token
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
  }
  async login(user: User) {
    const authenticate = await this.signAccessTokenAndRefreshToken(user._id.toString())
    await this.insertRefreshToken(user._id.toString(), authenticate[1])

    return authenticate
  }
  async logout(token: string) {
    await databaseService.refreshToken.deleteOne({
      token: token
    })
  }
  async getUserStatistical(user_id: ObjectId) {
    return {
      total_posts: await databaseService.posts.countDocuments({
        user: user_id
      }),
      total_comments: await databaseService.comments.countDocuments({
        user: user_id
      }),
      total_views: 0
    }
  }
  async getUserPost(user_id: ObjectId) {
    return await databaseService.posts
      .aggregate([
        {
          $match: {
            user: user_id
          }
        },
        {
          $lookup: {
            from: process.env.DATABASE_TOPIC_COLLECTION as string,
            localField: 'topic',
            foreignField: '_id',
            as: 'topic'
          }
        },
        {
          $unwind: '$topic'
        },
        {
          $lookup: {
            from: process.env.DATABASE_USER_COLLECTION,
            localField: 'user',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: '$user'
        },
        {
          $project: {
            'user.password': 0,
            'user.verify_token': 0,
            'user.forget_password_token': 0
          }
        }
      ])
      .toArray()
  }
  // async sendEmailVerify(user: User) {
  //   const verifyToken = await this.signEmailVerify(user._id.toString())
  //   const verifyUrl = `${process.env.APP_URL}/verify-account?token=${verifyToken}`

  //   const email_verify_subject = MAIL.VERIFY_ACCOUNT(verifyUrl).subject
  //   const email_verify_html = MAIL.VERIFY_ACCOUNT(verifyUrl).html

  //   await Promise.all([
  //     databaseService.users.updateOne(
  //       {
  //         _id: user._id
  //       },
  //       {
  //         $set: {
  //           verify_token: verifyToken
  //         },
  //         $currentDate: {
  //           updated_at: true
  //         }
  //       }
  //     ),
  //     sendMail(user.email, email_verify_subject, email_verify_html)
  //   ])
  // }
  // async verifyToken(payload: VerifyTokenRequestBody) {
  //   try {
  //     const decoded_verify_token = (await verifyToken({
  //       token: payload.token,
  //       publicKey: process.env.SECURITY_JWT_SECRET_VERIFY_TOKEN as string
  //     })) as TokenPayload

  //     if (!decoded_verify_token || decoded_verify_token.token_type !== TokenType.VerifyToken) {
  //       return false
  //     }

  //     const user = await databaseService.users.findOne({
  //       _id: new ObjectId(decoded_verify_token.user_id),
  //       email_verify_token: payload.token,
  //       user_type: UserTypeEnum.UNVERIFIED
  //     })

  //     if (!user) {
  //       return false
  //     }

  //     return true
  //   } catch {
  //     return false
  //   }
  // }
  // async verifyAccount(user: User) {
  //   // const data = {
  //   //   user_id: user._id.toString()
  //   // }
  //   await Promise.all([
  //     databaseService.users.updateOne(
  //       {
  //         _id: user._id
  //       },
  //       {
  //         $set: {
  //           user_type: UserTypeEnum.VERIFIED,
  //           email_verify_token: ''
  //         },
  //         $currentDate: {
  //           updated_at: true
  //         }
  //       }
  //     )
  //     // notificationRealtime(`freshSync-user-${user._id}`, 'verify-account', data)
  //   ])
  // }
  // async sendForgotPassword(user: User) {
  //   const forgotPasswordToken = await this.signForgotPassword(user._id.toString())
  //   const forgotPasswordUrl = `${process.env.APP_URL}/forgot-password?token=${forgotPasswordToken}`

  //   const email_forgot_password_subject = MAIL.FORGOT_PASSWORD(forgotPasswordUrl).subject
  //   const email_forgot_password_html = MAIL.FORGOT_PASSWORD(forgotPasswordUrl).html

  //   await Promise.all([
  //     databaseService.users.updateOne(
  //       {
  //         _id: user._id
  //       },
  //       {
  //         $set: {
  //           forgot_password_token: forgotPasswordToken
  //         },
  //         $currentDate: {
  //           updated_at: true
  //         }
  //       }
  //     ),
  //     sendMail(user.email, email_forgot_password_subject, email_forgot_password_html)
  //   ])
  // }
  // async verifyForgotPasswordToken(payload: VerifyForgotPasswordTokenRequestBody) {
  //   try {
  //     const decoded_forgot_password_token = (await verifyToken({
  //       token: payload.token,
  //       publicKey: process.env.SECURITY_JWT_SECRET_FORGOT_PASSWORD_TOKEN as string
  //     })) as TokenPayload

  //     if (
  //       !decoded_forgot_password_token ||
  //       decoded_forgot_password_token.token_type !== TokenType.ForgotPasswordToken
  //     ) {
  //       return false
  //     }

  //     const user = await databaseService.users.findOne({
  //       _id: new ObjectId(decoded_forgot_password_token.user_id),
  //       forgot_password_token: payload.token
  //     })

  //     if (!user) {
  //       return false
  //     }

  //     return true
  //   } catch {
  //     return false
  //   }
  // }
  // async forgotPassword(
  //   user: User,
  //   payload: ForgotPasswordRequestBody,
  //   location: string,
  //   ip: string,
  //   browser: string,
  //   os: string
  // ) {
  //   const date = formatDateFull2(new Date())
  //   const email_change_password_subject = MAIL.CHANGE_PASSWORD(date, location, ip, browser, os).subject
  //   const email_change_password_html = MAIL.CHANGE_PASSWORD(date, location, ip, browser, os).html

  //   // const data = {
  //   //   date
  //   // }

  //   await Promise.all([
  //     databaseService.users.updateOne(
  //       {
  //         _id: user._id
  //       },
  //       {
  //         $set: {
  //           password: HashPassword(payload.new_password),
  //           forgot_password_token: ''
  //         },
  //         $currentDate: {
  //           updated_at: true
  //         }
  //       }
  //     ),
  //     databaseService.refreshToken.deleteMany({
  //       user_id: user._id
  //     }),
  //     // notificationRealtime(`freshSync-user-${user._id}`, 'logout', `user/${user._id}/logout`, data),
  //     sendMail(user.email, email_change_password_subject, email_change_password_html)
  //   ])
  // }
  // async changeInfomation(payload: ChangeInfomationRequestBody, user: User) {
  //   // const data = {
  //   //   display_name: payload.display_name,
  //   //   phone: payload.phone
  //   // }

  //   await Promise.all([
  //     databaseService.users.updateOne(
  //       {
  //         _id: user._id
  //       },
  //       {
  //         $set: {
  //           display_name: payload.display_name,
  //           username: payload.username,
  //           phone: payload.phone
  //         },
  //         $currentDate: {
  //           updated_at: true
  //         }
  //       }
  //     )
  //     // notificationRealtime(`freshSync-admin`, 'change-infomation', `account-management/change-infomation`, data)
  //   ])
  // }
  // async changePassword(
  //   payload: ChangePasswordRequestBody,
  //   user: User,
  //   location: string,
  //   ip: string,
  //   browser: string,
  //   os: string
  // ) {
  //   const date = formatDateFull2(new Date())
  //   const email_change_password_subject = MAIL.CHANGE_PASSWORD(date, location, ip, browser, os).subject
  //   const email_change_password_html = MAIL.CHANGE_PASSWORD(date, location, ip, browser, os).html

  //   // const data = {
  //   //   date
  //   // }

  //   await Promise.all([
  //     databaseService.users.updateOne(
  //       {
  //         _id: user._id
  //       },
  //       {
  //         $set: {
  //           password: HashPassword(payload.new_password)
  //         },
  //         $currentDate: {
  //           updated_at: true
  //         }
  //       }
  //     ),
  //     databaseService.refreshToken.deleteMany({
  //       user_id: user._id
  //     }),
  //     // notificationRealtime(`freshSync-user-${user._id}`, 'logout', `user/${user._id}/logout`, data),
  //     sendMail(user.email, email_change_password_subject, email_change_password_html)
  //   ])
  // }
}

const userService = new UserService()
export default userService
