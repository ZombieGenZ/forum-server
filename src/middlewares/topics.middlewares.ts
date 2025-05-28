import { Request, Response, NextFunction } from 'express'
import { checkSchema, validationResult } from 'express-validator'
import HTTPSTATUS from '~/constants/httpStatus.constants'
import { MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'

export const createTopicValidator = async (req: Request, res: Response, next: NextFunction) => {
  checkSchema(
    {
      topic: {
        notEmpty: {
          errorMessage: MESSAGE.TOPIC_MESSAGE.TOPIC_MUST_NOT_BE_EMPTY
        },
        trim: true,
        isString: {
          errorMessage: MESSAGE.TOPIC_MESSAGE.TOPIC_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 1,
            max: 30
          },
          errorMessage: MESSAGE.TOPIC_MESSAGE.TOPIC_LENGTH_MUST_BE_FROM_1_TO_30
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
