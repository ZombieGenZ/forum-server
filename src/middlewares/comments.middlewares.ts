import { Request, Response, NextFunction } from 'express'
import { checkSchema, validationResult } from 'express-validator'
import { ObjectId } from 'mongodb'
import HTTPSTATUS from '~/constants/httpStatus.constants'
import { MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { UserRoleEnum } from '~/constants/users.constants'
import User from '~/models/schemas/users.shemas'
import databaseService from '~/services/database.services'

export const createCommentValidator = (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      post_id: {
        notEmpty: {
          errorMessage: MESSAGE.COMMENT_MESSAGE.POST_ID_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.COMMENT_MESSAGE.POST_ID_MUST_BE_A_STRING
        },
        isMongoId: {
          errorMessage: MESSAGE.COMMENT_MESSAGE.POST_ID_MUST_BE_A_ID
        },
        custom: {
          options: async (value, { req }) => {
            const post = await databaseService.posts.findOne({
              _id: new ObjectId(value)
            })

            if (!post) {
              throw new Error(MESSAGE.COMMENT_MESSAGE.POST_ID_NOT_FOUND)
            }

            ;(req as Request).post = post

            return true
          }
        }
      },
      content: {
        notEmpty: {
          errorMessage: MESSAGE.COMMENT_MESSAGE.CONTENT_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.COMMENT_MESSAGE.CONTENT_MUST_BE_A_STRING
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

export const updateCommentValidator = (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      comment_id: {
        notEmpty: {
          errorMessage: MESSAGE.COMMENT_MESSAGE.COMMENT_ID_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.COMMENT_MESSAGE.COMMENT_ID_MUST_BE_A_STRING
        },
        isMongoId: {
          errorMessage: MESSAGE.COMMENT_MESSAGE.COMMENT_ID_MUST_BE_A_ID
        },
        custom: {
          options: async (value, { req }) => {
            const user = req.user as User

            const comment = await databaseService.comments.findOne({
              _id: new ObjectId(value)
            })

            if (!comment) {
              throw new Error(MESSAGE.COMMENT_MESSAGE.COMMENT_ID_NOT_FOUND)
            }

            if (user.user_role !== UserRoleEnum.ADMINISTRATOR && !comment.user.equals(user._id)) {
              throw new Error(MESSAGE.COMMENT_MESSAGE.COMMENT_ID_NOT_FOUND)
            }

            ;(req as Request).comment = comment

            return true
          }
        }
      },
      content: {
        notEmpty: {
          errorMessage: MESSAGE.COMMENT_MESSAGE.CONTENT_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.COMMENT_MESSAGE.CONTENT_MUST_BE_A_STRING
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

export const deleteCommentValidator = (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      comment_id: {
        notEmpty: {
          errorMessage: MESSAGE.COMMENT_MESSAGE.COMMENT_ID_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.COMMENT_MESSAGE.COMMENT_ID_MUST_BE_A_STRING
        },
        isMongoId: {
          errorMessage: MESSAGE.COMMENT_MESSAGE.COMMENT_ID_MUST_BE_A_ID
        },
        custom: {
          options: async (value, { req }) => {
            const user = req.user as User

            const comment = await databaseService.comments.findOne({
              _id: new ObjectId(value)
            })

            if (!comment) {
              throw new Error(MESSAGE.COMMENT_MESSAGE.COMMENT_ID_NOT_FOUND)
            }

            if (user.user_role !== UserRoleEnum.ADMINISTRATOR && !comment.user.equals(user._id)) {
              throw new Error(MESSAGE.COMMENT_MESSAGE.COMMENT_ID_NOT_FOUND)
            }

            ;(req as Request).comment = comment

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

export const getCommentValidator = (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      post_id: {
        notEmpty: {
          errorMessage: MESSAGE.COMMENT_MESSAGE.POST_ID_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.COMMENT_MESSAGE.POST_ID_MUST_BE_A_STRING
        },
        isMongoId: {
          errorMessage: MESSAGE.COMMENT_MESSAGE.POST_ID_MUST_BE_A_ID
        },
        custom: {
          options: async (value) => {
            const post = await databaseService.posts.findOne({
              _id: new ObjectId(value)
            })

            if (!post) {
              throw new Error(MESSAGE.COMMENT_MESSAGE.POST_ID_NOT_FOUND)
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
