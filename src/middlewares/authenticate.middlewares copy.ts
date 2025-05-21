import { Request, Response, NextFunction } from 'express'
import { checkSchema, validationResult } from 'express-validator'
import { serverLanguage } from '~/index'
import { verifyToken } from '~/utils/jwt.utils'
import { TokenPayload } from '~/models/requests/authentication.requests'
import databaseService from '~/services/database.services'
import { ObjectId } from 'mongodb'
import HTTPSTATUS from '~/constants/httpStatus.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { UserRoleEnum, UserTypeEnum } from '~/constants/users.constants'
import { TokenType } from '~/constants/jwt.constants'
import { MESSAGE } from '~/constants/message.constants'
import User from '~/models/schemas/users.shemas'

export const authenticateValidator = async (req: Request, res: Response, next: NextFunction) => {
  const language = req.body.language || serverLanguage

  checkSchema(
    {
      authorization: {
        notEmpty: {
          errorMessage: MESSAGE.AUTHENTICATE_MESSAGE.ACCESS_TOKEN_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.AUTHENTICATE_MESSAGE.ACCESS_TOKEN_MUST_BE_A_STRING
        },
        custom: {
          options: async (value, { req }) => {
            const authorization = value.split(' ')

            if (authorization[0] !== 'Bearer') {
              throw new Error(MESSAGE.AUTHENTICATE_MESSAGE.ACCESS_TOKEN_INVALID)
            }

            if (authorization[1] === '') {
              throw new Error(MESSAGE.AUTHENTICATE_MESSAGE.ACCESS_TOKEN_INVALID)
            }

            try {
              const decoded_access_token = (await verifyToken({
                token: authorization[1],
                publicKey: process.env.SECURITY_JWT_SECRET_ACCESS_TOKEN as string
              })) as TokenPayload

              if (!decoded_access_token || decoded_access_token.token_type !== TokenType.AccessToken) {
                throw new Error(MESSAGE.AUTHENTICATE_MESSAGE.ACCESS_TOKEN_INVALID)
              }

              ;(req as Request).decoded_access_token = decoded_access_token

              const user = await databaseService.users.findOne({
                _id: new ObjectId(decoded_access_token.user_id)
              })

              if (!user) {
                throw new Error(MESSAGE.AUTHENTICATE_MESSAGE.USER_DOES_NOT_EXIST)
              }

              ;(req as Request).user = user
            } catch {
              throw new Error(MESSAGE.AUTHENTICATE_MESSAGE.ACCESS_TOKEN_INVALID)
            }

            return true
          }
        }
      },
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

              if (!decoded_refresh_token || decoded_refresh_token.token_type !== TokenType.RefreshToken) {
                throw new Error(MESSAGE.AUTHENTICATE_MESSAGE.REFRESH_TOKEN_INVALID)
              }

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
      }
      next()
      return
    })
    .catch((err) => {
      res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
        code: RESPONSE_CODE.FATAL_AUTHENTICATION_FAILURE,
        message: err
      })
      return
    })
}

export const authenticateAdministratorValidator = async (req: Request, res: Response, next: NextFunction) => {
  const language = req.body.language || serverLanguage
  const user = req.user as User

  if (user.user_role !== UserRoleEnum.ADMINISTRATOR) {
    res.status(HTTPSTATUS.UNAUTHORIZED).json({
      code: RESPONSE_CODE.AUTHENTICATION_FAILED,
      message:
        MESSAGE.AUTHENTICATE_MESSAGE.YOU_DONT_HAVE_PERMISSION_TO_DO_THIS
    })
    return
  }

  next()
}
