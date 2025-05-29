import express from 'express'
import { uploadImageController } from '~/controllers/fileManagement.controllers'
import { authenticateUploadValidator, verifiedAccountUploadValidator } from '~/middlewares/authenticate.middlewares'
import { setupUploadImage } from '~/middlewares/fileManagement.middlewares'
import { wrapRequestHandler } from '~/utils/handlers.utils'
import { upload } from '~/utils/image.utils'
const router = express.Router()

/*
 * Description: Tải lên một tệp hình ảnh lên máy chủ
 * Path: /api/file-management/upload-image
 * Method: POST
 * headers: {
 *    authorization: Bearer <token>
 * },
 * body: {
 *    refresh_token: string,
 *    image: file
 * }
 */
router.post(
  '/upload-image',
  upload.single('image'),
  authenticateUploadValidator,
  verifiedAccountUploadValidator,
  setupUploadImage,
  wrapRequestHandler(uploadImageController)
)

export default router
