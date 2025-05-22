import { Request, Response } from 'express'
import { ImageType } from '~/constants/images.constants'
import { MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const image = req.image as ImageType

    res.json({
      code: RESPONSE_CODE.UPLOAD_IMAGE_SUCCESSFUL,
      message: MESSAGE.FILE_MANAGEMENT_MESSAGE.UPLOAD_IMAGE_SUCCESS,
      url: image.url
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.UPLOAD_IMAGE_FAILED,
      message: MESSAGE.FILE_MANAGEMENT_MESSAGE.UPLOAD_IMAGE_FAILURE
    })
  }
}
