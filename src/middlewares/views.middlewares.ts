import { Request, Response, NextFunction } from 'express'
import { checkSchema, validationResult } from 'express-validator'
import { ObjectId } from 'mongodb'
import HTTPSTATUS from '~/constants/httpStatus.constants'
import { MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import databaseService from '~/services/database.services'

export const viewValidator = (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      post_id: {
        notEmpty: {
          errorMessage: MESSAGE.VIEW_MESSAGE.POST_ID_IS_REQUIRED
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.VIEW_MESSAGE.POST_ID_MUST_BE_A_STRING
        },
        isMongoId: {
          errorMessage: MESSAGE.VIEW_MESSAGE.POST_ID_MUST_BE_A_ID
        },
        custom: {
          options: async (value) => {
            const post = await databaseService.posts.findOne({
              _id: new ObjectId(value)
            })

            if (!post) {
              throw new Error(MESSAGE.VIEW_MESSAGE.POST_ID_NOT_FOUND)
            }

            ;(req as Request).post = post

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
