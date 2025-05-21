import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTPSTATUS from '~/constants/httpStatus.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true })
  })

  res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    code: RESPONSE_CODE.SERVER_SIDE_ERROR,
    message: err.message,
    errorInfo: omit(err, ['stack'])
  })

  return
}

export const notFoundHandler = (_: Request, res: Response) => {
  res.status(HTTPSTATUS.NOT_FOUND).render('NotFound', {
    title: 'Có vẻ như bạn đã bị mất kết nối',
    subtitle: 'Trang bạn tìm kiếm không tồn tại!',
    url: process.env.APP_URL,
    back_title: 'Về trang chủ',
    trademark_name: process.env.TRADEMARK_NAME
  })
}
