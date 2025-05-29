import { Request, Response, NextFunction } from 'express'
import path from 'path'
import HTTPSTATUS from '~/constants/httpStatus.constants'
import { MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import User from '~/models/schemas/users.shemas'
import fs from 'fs'
import { ImageType } from '~/constants/images.constants'
import { deleteTemporaryFile } from '~/utils/image.utils'

export const setupUploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User
    const image = req.file as Express.Multer.File

    if (!image) {
      res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
        code: RESPONSE_CODE.INPUT_DATA_ERROR,
        message: MESSAGE.FILE_MANAGEMENT_MESSAGE.IMAGE_IS_REQUIRED
      })
      return
    }

    const directoryPath = path.join(__dirname, `../../public/images/upload/posts/${user._id}`)

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true })
    }

    try {
      fs.renameSync(image.path, path.join(directoryPath, image.filename))
    } catch (err) {
      return next(err)
    }

    const img: ImageType = {
      path: `../../public/images/upload/posts/${user._id}/${image.filename}`,
      type: image.mimetype,
      url: `${process.env.IMAGE_URL}/images/upload/posts/${user._id}/${image.filename}`,
      size: image.size
    }

    req.image = img
    next()
  } catch (error) {
    await deleteTemporaryFile(req.file)
    console.error('Lỗi khi xử lý hình ảnh:', error)
    next(error)
  }
}
