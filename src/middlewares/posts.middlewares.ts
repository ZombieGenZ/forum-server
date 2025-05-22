import { UserRoleEnum } from './../constants/users.constants'
import { Request, Response, NextFunction } from 'express'
import { checkSchema, validationResult } from 'express-validator'
import { ObjectId } from 'mongodb'
import HTTPSTATUS from '~/constants/httpStatus.constants'
import { MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import User from '~/models/schemas/users.shemas'
import databaseService from '~/services/database.services'

export const createPostValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      title: {
        notEmpty: {
          errorMessage: MESSAGE.POST_MESSAGE.TITLE_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.POST_MESSAGE.TITLE_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 150
          },
          errorMessage: MESSAGE.POST_MESSAGE.TITLE_LENGTH_MUST_BE_FROM_1_TO_150
        }
      },
      content: {
        notEmpty: {
          errorMessage: MESSAGE.POST_MESSAGE.CONTENT_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.POST_MESSAGE.CONTENT_MUST_BE_A_STRING
        }
      },
      can_comment: {
        notEmpty: {
          errorMessage: MESSAGE.POST_MESSAGE.CAN_COMMENT_IS_REQUIRED
        },
        isBoolean: {
          errorMessage: MESSAGE.POST_MESSAGE.CAN_COMMENT_MUST_BE_A_BOOLEAN
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

export const updatePostValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      post_id: {
        notEmpty: {
          errorMessage: MESSAGE.POST_MESSAGE.POST_ID_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.POST_MESSAGE.POST_ID_MUST_BE_A_STRING
        },
        isMongoId: {
          errorMessage: MESSAGE.POST_MESSAGE.POST_ID_MUST_BE_A_ID
        },
        custom: {
          options: async (value, { req }) => {
            const user = (req as Request).user as User

            const post = await databaseService.posts.findOne({
              _id: new ObjectId(value)
            })

            if (!post) {
              throw new Error(MESSAGE.POST_MESSAGE.POST_ID_NOT_FOUND)
            }

            if (user.user_role !== UserRoleEnum.ADMINISTRATOR && !post.user.equals(user._id)) {
              throw new Error(MESSAGE.POST_MESSAGE.POST_ID_NOT_FOUND)
            }

            return true
          }
        }
      },
      title: {
        notEmpty: {
          errorMessage: MESSAGE.POST_MESSAGE.TITLE_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.POST_MESSAGE.TITLE_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 150
          },
          errorMessage: MESSAGE.POST_MESSAGE.TITLE_LENGTH_MUST_BE_FROM_1_TO_150
        }
      },
      content: {
        notEmpty: {
          errorMessage: MESSAGE.POST_MESSAGE.CONTENT_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.POST_MESSAGE.CONTENT_MUST_BE_A_STRING
        }
      },
      can_comment: {
        notEmpty: {
          errorMessage: MESSAGE.POST_MESSAGE.CAN_COMMENT_IS_REQUIRED
        },
        isBoolean: {
          errorMessage: MESSAGE.POST_MESSAGE.CAN_COMMENT_MUST_BE_A_BOOLEAN
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

export const deletePostValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      post_id: {
        notEmpty: {
          errorMessage: MESSAGE.POST_MESSAGE.POST_ID_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.POST_MESSAGE.POST_ID_MUST_BE_A_STRING
        },
        isMongoId: {
          errorMessage: MESSAGE.POST_MESSAGE.POST_ID_MUST_BE_A_ID
        },
        custom: {
          options: async (value, { req }) => {
            const user = (req as Request).user as User

            const post = await databaseService.posts.findOne({
              _id: new ObjectId(value)
            })

            if (!post) {
              throw new Error(MESSAGE.POST_MESSAGE.POST_ID_NOT_FOUND)
            }

            if (user.user_role !== UserRoleEnum.ADMINISTRATOR && !post.user.equals(user._id)) {
              throw new Error(MESSAGE.POST_MESSAGE.POST_ID_NOT_FOUND)
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
