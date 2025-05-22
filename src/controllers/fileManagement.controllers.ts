import { Request, Response } from 'express'
import { ImageType } from '~/constants/images.constants'
import { MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import User from '~/models/schemas/users.shemas'
import fileManagementService from '~/services/fileManagement.services'

export const uploadImageController = async (req: Request, res: Response) => {
  try {
    const image = req.image as ImageType

    await fileManagementService.upload(image, (req.user as User)._id)

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
