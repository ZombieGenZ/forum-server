import { ImageType } from '~/constants/images.constants'
import databaseService from './database.services'
import Image from '~/models/schemas/images.shemas'
import { ObjectId } from 'mongodb'
import { uploadAllToDrive } from '~/utils/drive.utils'

class FileManagementService {
  async upload(image: ImageType, user_id: ObjectId) {
    await Promise.all([
      databaseService.images.insertOne(
        new Image({
          ...image,
          user: user_id
        })
      ),
      uploadAllToDrive()
    ])
  }
}

const fileManagementService = new FileManagementService()
export default fileManagementService
