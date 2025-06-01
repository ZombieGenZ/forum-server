import { Request, Response, NextFunction } from 'express'
import { checkSchema, validationResult } from 'express-validator'
import { ParamsDictionary } from 'express-serve-static-core'
import databaseService from '~/services/database.services'
import { MESSAGE } from '~/constants/message.constants'
import userService from '~/services/users.services'
import HTTPSTATUS from '~/constants/httpStatus.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { HashPassword } from '~/utils/encryption.utils'
import { AuthenticateRequestBody } from '~/models/requests/authenticate.requests'
import { verifyToken } from '~/utils/jwt.utils'
import { TokenPayload } from '~/models/requests/authentication.requests'
import User from '~/models/schemas/users.shemas'
import { UserTypeEnum } from '~/constants/users.constants'
import { ObjectId } from 'mongodb'
import { TokenType } from '~/constants/jwt.constants'

export const registerUserValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      username: {
        notEmpty: {
          errorMessage: MESSAGE.USER_MESSAGE.USERNAME_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.USER_MESSAGE.USERNAME_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 3,
            max: 50
          },
          errorMessage: MESSAGE.USER_MESSAGE.USERNAME_LENGTH_MUST_BE_FROM_3_TO_50
        },
        matches: {
          options: /^[a-zA-Z0-9]+$/,
          errorMessage: MESSAGE.USER_MESSAGE.USERNAME_MUST_BE_ALPHANUMERIC
        },
        custom: {
          options: async (value) => {
            const result = await userService.checkUserNameExits(value)

            if (result) {
              throw new Error(MESSAGE.USER_MESSAGE.USERNAME_ALREADY_EXISTS)
            }

            return true
          }
        }
      },
      email: {
        notEmpty: {
          errorMessage: MESSAGE.USER_MESSAGE.EMAIL_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.USER_MESSAGE.EMAIL_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 5,
            max: 100
          },
          errorMessage: MESSAGE.USER_MESSAGE.EMAIL_LENGTH_MUST_BE_FROM_5_TO_100
        },
        isEmail: {
          errorMessage: MESSAGE.USER_MESSAGE.EMAIL_IS_NOT_VALID
        },
        custom: {
          options: async (value) => {
            const result = await userService.checkEmailExits(value)

            if (result) {
              throw new Error(MESSAGE.USER_MESSAGE.EMAIL_ALREADY_EXISTS)
            }

            return true
          }
        }
      },
      phone: {
        notEmpty: {
          errorMessage: MESSAGE.USER_MESSAGE.PHONE_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.USER_MESSAGE.PHONE_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 10,
            max: 11
          },
          errorMessage: MESSAGE.USER_MESSAGE.PHONE_LENGTH_MUST_BE_FROM_10_TO_11
        },
        isMobilePhone: {
          errorMessage: MESSAGE.USER_MESSAGE.PHONE_IS_NOT_VALID
        },
        custom: {
          options: async (value) => {
            const result = await userService.checkPhoneExits(value)

            if (result) {
              throw new Error(MESSAGE.USER_MESSAGE.PHONE_ALREADY_EXISTS)
            }

            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: MESSAGE.USER_MESSAGE.PASSWORD_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.USER_MESSAGE.PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 100
          },
          errorMessage: MESSAGE.USER_MESSAGE.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_100
        },
        isStrongPassword: {
          errorMessage: MESSAGE.USER_MESSAGE.PASSWORD_MUST_BE_STRONG
        }
      },
      confirm_password: {
        notEmpty: {
          errorMessage: MESSAGE.USER_MESSAGE.CONFIRM_PASSWORD_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.USER_MESSAGE.CONFIRM_PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 100
          },
          errorMessage: MESSAGE.USER_MESSAGE.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_100
        },
        isStrongPassword: {
          errorMessage: MESSAGE.USER_MESSAGE.CONFIRM_PASSWORD_MUST_BE_STRONG
        },
        custom: {
          options: async (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error(MESSAGE.USER_MESSAGE.CONFIRM_PASSWORD_DOES_NOT_MATCH_PASSWORD)
            }

            return true
          }
        }
      }
    },
    ['body']
  )
    .run(req)
    .then(() => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
          code: RESPONSE_CODE.INPUT_DATA_ERROR,
          message: MESSAGE.SYSTEM_MESSAGE.VALIDATION_ERROR,
          errors: errors.mapped()
        })
        return
      }
      next()
      return
    })
    .catch((err) => {
      res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
        code: RESPONSE_CODE.FATAL_INPUT_ERROR,
        message: err
      })
      return
    })
}

export const loginUserValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: MESSAGE.USER_MESSAGE.EMAIL_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.USER_MESSAGE.EMAIL_MUST_BE_A_STRING
        },
        isEmail: {
          errorMessage: MESSAGE.USER_MESSAGE.EMAIL_IS_NOT_VALID
        },
        custom: {
          options: async (value, { req }) => {
            // const result = await databaseService.users.findOne({
            //   $or: [{ email: value }, { phone: value }, { username: value }],
            //   password: HashPassword(req.body.password)
            // })
            const result = await databaseService.users.findOne({
              email: value,
              password: HashPassword(req.body.password)
            })

            if (!result) {
              throw new Error(MESSAGE.USER_MESSAGE.ACCOUNT_IS_NOT_VALID)
            }

            ;(req as Request).user = result

            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: MESSAGE.USER_MESSAGE.PASSWORD_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.USER_MESSAGE.PASSWORD_MUST_BE_A_STRING
        }
      }
    },
    ['body']
  )
    .run(req)
    .then(() => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
          code: RESPONSE_CODE.INPUT_DATA_ERROR,
          message: MESSAGE.SYSTEM_MESSAGE.VALIDATION_ERROR,
          errors: errors.mapped()
        })
        return
      }
      next()
      return
    })
    .catch((err) => {
      res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
        code: RESPONSE_CODE.FATAL_INPUT_ERROR,
        message: err
      })
      return
    })
}

export const verifyTokenValidator = async (
  req: Request<ParamsDictionary, any, AuthenticateRequestBody>,
  res: Response,
  next: NextFunction
) => {
  checkSchema(
    {
      refresh_token: {
        notEmpty: {
          errorMessage: MESSAGE.AUTHENTICATE_MESSAGE.REFRESH_TOKEN_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.AUTHENTICATE_MESSAGE.REFRESH_TOKEN_MUST_BE_A_STRING
        },
        custom: {
          options: async (value, { req }) => {
            try {
              const decoded_refresh_token = (await verifyToken({
                token: value,
                publicKey: process.env.SECURITY_JWT_SECRET_REFRESH_TOKEN as string
              })) as TokenPayload

              ;(req as Request).decoded_refresh_token = decoded_refresh_token

              const refresh_token = await databaseService.refreshToken.findOne({ token: value })

              if (!refresh_token) {
                throw new Error(MESSAGE.AUTHENTICATE_MESSAGE.REFRESH_TOKEN_INVALID)
              }

              ;(req as Request).refresh_token = refresh_token

              const user = await databaseService.users.findOne({
                _id: refresh_token.user_id
              })

              if (!user) {
                throw new Error(MESSAGE.AUTHENTICATE_MESSAGE.USER_DOES_NOT_EXIST)
              }

              ;(req as Request).user = user
            } catch {
              throw new Error(MESSAGE.AUTHENTICATE_MESSAGE.REFRESH_TOKEN_INVALID)
            }

            return true
          }
        }
      }
    },
    ['headers', 'body']
  )
    .run(req)
    .then(() => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(HTTPSTATUS.UNAUTHORIZED).json({
          code: RESPONSE_CODE.AUTHENTICATION_FAILED,
          message: MESSAGE.AUTHENTICATE_MESSAGE.AUTHENTICATION_FAILED,
          errors: errors.mapped()
        })
        return
      }
      next()
      return
    })
    .catch((err) => {
      res.status(HTTPSTATUS.UNAUTHORIZED).json({
        code: RESPONSE_CODE.FATAL_AUTHENTICATION_FAILURE,
        message: err
      })
      return
    })
}

export const getUserStatisticalValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      username: {
        notEmpty: {
          errorMessage: MESSAGE.USER_MESSAGE.USERNAME_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.USER_MESSAGE.USERNAME_MUST_BE_A_STRING
        },
        custom: {
          options: async (value, { req }) => {
            const result = await databaseService.users.findOne({
              username: value
            })

            if (!result) {
              throw new Error(MESSAGE.USER_MESSAGE.USER_NOT_FOUND)
            }

            ;(req as Request).user = result

            return true
          }
        }
      }
    },
    ['query']
  )
    .run(req)
    .then(() => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
          code: RESPONSE_CODE.INPUT_DATA_ERROR,
          message: MESSAGE.SYSTEM_MESSAGE.VALIDATION_ERROR,
          errors: errors.mapped()
        })
        return
      }
      next()
      return
    })
    .catch((err) => {
      res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
        code: RESPONSE_CODE.FATAL_INPUT_ERROR,
        message: err
      })
      return
    })
}

export const sendVerifyTokenValidator = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as User

  if (user.user_type === UserTypeEnum.VERIFIED) {
    res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
      code: RESPONSE_CODE.AUTHENTICATION_FAILED,
      message: MESSAGE.USER_MESSAGE.ACCOUNT_IS_VERIFIED
    })
    return
  }

  next()
}

export const verifyAccountValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      token: {
        notEmpty: {
          errorMessage: MESSAGE.USER_MESSAGE.TOKEN_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.USER_MESSAGE.TOKEN_MUST_BE_A_STRING
        },
        custom: {
          options: async (value, { req }) => {
            try {
              const decoded_email_verify_token = (await verifyToken({
                token: value,
                publicKey: process.env.SECURITY_JWT_SECRET_VERIFY_TOKEN as string
              })) as TokenPayload

              if (!decoded_email_verify_token || decoded_email_verify_token.token_type !== TokenType.VerifyToken) {
                throw new Error(MESSAGE.USER_MESSAGE.TOKEN_INVALID)
              }

              const user = await databaseService.users.findOne({
                _id: new ObjectId(decoded_email_verify_token.user_id),
                verify_token: value
              })

              if (!user) {
                throw new Error(MESSAGE.USER_MESSAGE.TOKEN_INVALID)
              }

              ;(req as Request).decoded_email_verify_token = decoded_email_verify_token
              ;(req as Request).user = user
            } catch {
              throw new Error(MESSAGE.USER_MESSAGE.TOKEN_INVALID)
            }

            return true
          }
        }
      }
    },
    ['body']
  )
    .run(req)
    .then(() => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
          code: RESPONSE_CODE.INPUT_DATA_ERROR,
          message: MESSAGE.SYSTEM_MESSAGE.VALIDATION_ERROR,
          errors: errors.mapped()
        })
        return
      }
      next()
      return
    })
    .catch((err) => {
      res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
        code: RESPONSE_CODE.FATAL_INPUT_ERROR,
        message: err
      })
      return
    })
}

export const sendEmailForgotPasswordValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: MESSAGE.USER_MESSAGE.EMAIL_IS_REQUIRED
        },
        trim: true,
        isEmail: {
          errorMessage: MESSAGE.USER_MESSAGE.EMAIL_IS_NOT_VALID
        },
        custom: {
          options: async (value, { req }) => {
            const user = await databaseService.users.findOne({ email: value })

            if (!user) {
              throw new Error(MESSAGE.USER_MESSAGE.EMAIL_NOT_FOUND)
            }

            ;(req as Request).user = user

            return true
          }
        }
      }
    },
    ['body']
  )
    .run(req)
    .then(() => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
          code: RESPONSE_CODE.INPUT_DATA_ERROR,
          message: MESSAGE.SYSTEM_MESSAGE.VALIDATION_ERROR,
          errors: errors.mapped()
        })
        return
      }
      next()
      return
    })
    .catch((err) => {
      res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
        code: RESPONSE_CODE.FATAL_INPUT_ERROR,
        message: err
      })
      return
    })
}

export const verifyForgotPasswordTokenValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      token: {
        notEmpty: {
          errorMessage: MESSAGE.USER_MESSAGE.TOKEN_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.USER_MESSAGE.TOKEN_MUST_BE_A_STRING
        }
      }
    },
    ['body']
  )
    .run(req)
    .then(() => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
          code: RESPONSE_CODE.INPUT_DATA_ERROR,
          message: MESSAGE.SYSTEM_MESSAGE.VALIDATION_ERROR,
          errors: errors.mapped()
        })
        return
      }
      next()
      return
    })
    .catch((err) => {
      res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
        code: RESPONSE_CODE.FATAL_INPUT_ERROR,
        message: err
      })
      return
    })
}

export const forgotPasswordValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      token: {
        notEmpty: {
          errorMessage: MESSAGE.USER_MESSAGE.TOKEN_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.USER_MESSAGE.TOKEN_MUST_BE_A_STRING
        },
        custom: {
          options: async (value, { req }) => {
            try {
              const decoded_forgot_password_token = (await verifyToken({
                token: value,
                publicKey: process.env.SECURITY_JWT_SECRET_FORGOT_PASSWORD_TOKEN as string
              })) as TokenPayload

              if (
                !decoded_forgot_password_token ||
                decoded_forgot_password_token.token_type !== TokenType.ForgotPasswordToken
              ) {
                throw new Error(MESSAGE.USER_MESSAGE.TOKEN_INVALID)
              }

              const user = await databaseService.users.findOne({
                _id: new ObjectId(decoded_forgot_password_token.user_id),
                forgot_password_token: value
              })

              if (!user) {
                throw new Error(MESSAGE.USER_MESSAGE.TOKEN_INVALID)
              }

              ;(req as Request).decoded_forgot_password_token = decoded_forgot_password_token
              ;(req as Request).user = user
            } catch {
              throw new Error(MESSAGE.USER_MESSAGE.TOKEN_INVALID)
            }

            return true
          }
        }
      },
      new_password: {
        notEmpty: {
          errorMessage: MESSAGE.USER_MESSAGE.PASSWORD_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.USER_MESSAGE.PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 100
          },
          errorMessage: MESSAGE.USER_MESSAGE.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_100
        },
        isStrongPassword: {
          errorMessage: MESSAGE.USER_MESSAGE.PASSWORD_MUST_BE_STRONG
        }
      },
      confirm_new_password: {
        notEmpty: {
          errorMessage: MESSAGE.USER_MESSAGE.CONFIRM_PASSWORD_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.USER_MESSAGE.CONFIRM_PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 100
          },
          errorMessage: MESSAGE.USER_MESSAGE.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_100
        },
        isStrongPassword: {
          errorMessage: MESSAGE.USER_MESSAGE.CONFIRM_PASSWORD_MUST_BE_STRONG
        },
        custom: {
          options: async (value, { req }) => {
            if (value !== req.body.new_password) {
              throw new Error(MESSAGE.USER_MESSAGE.CONFIRM_PASSWORD_DOES_NOT_MATCH_PASSWORD)
            }

            return true
          }
        }
      }
    },
    ['body']
  )
    .run(req)
    .then(() => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
          code: RESPONSE_CODE.INPUT_DATA_ERROR,
          message: MESSAGE.SYSTEM_MESSAGE.VALIDATION_ERROR,
          errors: errors.mapped()
        })
        return
      }
      next()
      return
    })
    .catch((err) => {
      res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
        code: RESPONSE_CODE.FATAL_INPUT_ERROR,
        message: err
      })
      return
    })
}

// export const changeInformationValidator = async (req: Request, res: Response, next: NextFunction) => {
//   checkSchema(
//     {
//       display_name: {
//         notEmpty: {
//           errorMessage: MESSAGE.USER_MESSAGE.DISPLAY_NAME_IS_REQUIRED
//         },
//         trim: true,
//         isString: {
//           errorMessage: MESSAGE.USER_MESSAGE.DISPLAY_NAME_MUST_BE_A_STRING
//         },
//         isLength: {
//           options: {
//             min: 5,
//             max: 100
//           },
//           errorMessage: MESSAGE.USER_MESSAGE.DISPLAY_NAME_LENGTH_MUST_BE_FROM_1_TO_50
//         }
//       },
//       username: {
//         notEmpty: {
//           errorMessage: MESSAGE.USER_MESSAGE.USERNAME_IS_REQUIRED
//         },
//         trim: true,
//         isString: {
//           errorMessage: MESSAGE.USER_MESSAGE.USERNAME_MUST_BE_A_STRING
//         },
//         isLength: {
//           options: {
//             min: 3,
//             max: 50
//           },
//           errorMessage: MESSAGE.USER_MESSAGE.USERNAME_LENGTH_MUST_BE_FROM_3_TO_50
//         },
//         matches: {
//           options: /^[a-zA-Z0-9]+$/,
//           errorMessage: MESSAGE.USER_MESSAGE.USERNAME_MUST_BE_ALPHANUMERIC
//         },
//         custom: {
//           options: async (value) => {
//             const result = await userService.checkUserNameExits(value)

//             if (result) {
//               throw new Error(MESSAGE.USER_MESSAGE.USERNAME_ALREADY_EXISTS)
//             }

//             return true
//           }
//         }
//       },
//       phone: {
//         notEmpty: {
//           errorMessage: MESSAGE.USER_MESSAGE.PHONE_IS_REQUIRED
//         },
//         trim: true,
//         isString: {
//           errorMessage: MESSAGE.USER_MESSAGE.PHONE_MUST_BE_A_STRING
//         },
//         isLength: {
//           options: {
//             min: 10,
//             max: 11
//           },
//           errorMessage: MESSAGE.USER_MESSAGE.PHONE_LENGTH_MUST_BE_FROM_10_TO_11
//         },
//         isMobilePhone: {
//           errorMessage: MESSAGE.USER_MESSAGE.PHONE_IS_NOT_VALID
//         },
//         custom: {
//           options: async (value) => {
//             const result = await userService.checkPhoneExits(value)

//             if (result) {
//               throw new Error(MESSAGE.USER_MESSAGE.PHONE_ALREADY_EXISTS)
//             }

//             return true
//           }
//         }
//       }
//     },
//     ['body']
//   )
//     .run(req)
//     .then(() => {
//       const errors = validationResult(req)
//       if (!errors.isEmpty()) {
//         res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
//           code: RESPONSE_CODE.INPUT_DATA_ERROR,
//           message: MESSAGE.SYSTEM_MESSAGE.VALIDATION_ERROR,
//           errors: errors.mapped()
//         })
//         return
//       }
//       next()
//       return
//     })
//     .catch((err) => {
//       res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
//         code: RESPONSE_CODE.FATAL_INPUT_ERROR,
//         message: err
//       })
//       return
//     })
// }

// export const changePasswordValidator = async (req: Request, res: Response, next: NextFunction) => {
//   checkSchema(
//     {
//       password: {
//         notEmpty: {
//           errorMessage: MESSAGE.USER_MESSAGE.PASSWORD_IS_REQUIRED
//         },
//         trim: true,
//         isString: {
//           errorMessage: MESSAGE.USER_MESSAGE.PASSWORD_MUST_BE_A_STRING
//         },
//         custom: {
//           options: async (value) => {
//             const user = req.user as User

//             if (HashPassword(value) !== user.password) {
//               throw new Error(MESSAGE.USER_MESSAGE.INCORRECT_PASSWORD)
//             }

//             return
//           }
//         }
//       },
//       new_password: {
//         notEmpty: {
//           errorMessage: MESSAGE.USER_MESSAGE.PASSWORD_IS_REQUIRED
//         },
//         trim: true,
//         isString: {
//           errorMessage: MESSAGE.USER_MESSAGE.PASSWORD_MUST_BE_A_STRING
//         },
//         isLength: {
//           options: {
//             min: 8,
//             max: 100
//           },
//           errorMessage: MESSAGE.USER_MESSAGE.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_100
//         },
//         isStrongPassword: {
//           errorMessage: MESSAGE.USER_MESSAGE.PASSWORD_MUST_BE_STRONG
//         }
//       },
//       confirm_new_password: {
//         notEmpty: {
//           errorMessage: MESSAGE.USER_MESSAGE.CONFIRM_PASSWORD_IS_REQUIRED
//         },
//         trim: true,
//         isString: {
//           errorMessage: MESSAGE.USER_MESSAGE.CONFIRM_PASSWORD_MUST_BE_A_STRING
//         },
//         isLength: {
//           options: {
//             min: 8,
//             max: 100
//           },
//           errorMessage: MESSAGE.USER_MESSAGE.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_100
//         },
//         isStrongPassword: {
//           errorMessage: MESSAGE.USER_MESSAGE.CONFIRM_PASSWORD_MUST_BE_STRONG
//         },
//         custom: {
//           options: async (value, { req }) => {
//             if (value !== req.body.new_password) {
//               throw new Error(MESSAGE.USER_MESSAGE.CONFIRM_PASSWORD_DOES_NOT_MATCH_PASSWORD)
//             }

//             return true
//           }
//         }
//       }
//     },
//     ['body']
//   )
//     .run(req)
//     .then(() => {
//       const errors = validationResult(req)
//       if (!errors.isEmpty()) {
//         res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
//           code: RESPONSE_CODE.INPUT_DATA_ERROR,
//           message: MESSAGE.SYSTEM_MESSAGE.VALIDATION_ERROR,
//           errors: errors.mapped()
//         })
//         return
//       }
//       next()
//       return
//     })
//     .catch((err) => {
//       res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
//         code: RESPONSE_CODE.FATAL_INPUT_ERROR,
//         message: err
//       })
//       return
//     })
// }
