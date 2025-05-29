import express from 'express'
import {
  createTopicController,
  deleteTopicController,
  getTopicController,
  updateTopicController
} from '~/controllers/topics.controllers'
import {
  authenticateAdministratorValidator,
  authenticateValidator,
  verifiedAccountValidator
} from '~/middlewares/authenticate.middlewares'
import { colorTextValidator, colorValidator } from '~/middlewares/colors.middlewares'
import { createTopicValidator, deleteTopicValidator, updateTopicValidator } from '~/middlewares/topics.middlewares'
import { wrapRequestHandler } from '~/utils/handlers.utils'
const router = express.Router()

/*
 * Description: Tạo chủ đề mới
 * Path: /api/topics/create
 * Method: POST
 * headers: {
 *    authorization?: Bearer <token>
 * },
 * Body: {
 *    refresh_token: string,
 *    topic: string,
 *    colorType: number,
 *    basicColor?: string,
 *    gradient2Color1?: string,
 *    gradient2Color2?: string,
 *    gradient3Color1?: string,
 *    gradient3Color2?: string,
 *    gradient3Color3?: string,
 *    textColorType: number,
 *    textBasicColor?: string,
 *    textGradient2Color1?: string,
 *    textGradient2Color2?: string,
 *    textGradient3Color1?: string,
 *    textGradient3Color2?: string,
 *    textGradient3Color3?: string
 * }
 */
router.post(
  '/create',
  authenticateValidator,
  verifiedAccountValidator,
  authenticateAdministratorValidator,
  createTopicValidator,
  colorValidator,
  colorTextValidator,
  wrapRequestHandler(createTopicController)
)

/*
 * Description: Cập nhật chủ đề
 * Path: /api/topics/update
 * Method: POST
 * headers: {
 *    authorization?: Bearer <token>
 * },
 * Body: {
 *    refresh_token: string,
 *    topic_id: string,
 *    topic: string,
 *    colorType: number,
 *    basicColor?: string,
 *    gradient2Color1?: string,
 *    gradient2Color2?: string,
 *    gradient3Color1?: string,
 *    gradient3Color2?: string,
 *    gradient3Color3?: string,
 *    textColorType: number,
 *    textBasicColor?: string,
 *    textGradient2Color1?: string,
 *    textGradient2Color2?: string,
 *    textGradient3Color1?: string,
 *    textGradient3Color2?: string,
 *    textGradient3Color3?: string
 * }
 */
router.put(
  '/update',
  authenticateValidator,
  verifiedAccountValidator,
  authenticateAdministratorValidator,
  updateTopicValidator,
  colorValidator,
  colorTextValidator,
  wrapRequestHandler(updateTopicController)
)

/*
 * Description: Xóa chủ đề
 * Path: /api/topics/delete
 * Method: POST
 * headers: {
 *    authorization?: Bearer <token>
 * },
 * Body: {
 *    refresh_token: string,
 *    topic_id: string
 * }
 */
router.delete(
  '/delete',
  authenticateValidator,
  verifiedAccountValidator,
  authenticateAdministratorValidator,
  deleteTopicValidator,
  wrapRequestHandler(deleteTopicController)
)

/*
 * Description: Lấy thông tin chủ đề
 * Path: /api/topics/get-topic
 * Method: POST
 * headers: {
 *    authorization?: Bearer <token>
 * },
 * Body: {
 *    refresh_token: string,
 *    topic: string
 * }
 */
router.post('/get-topic', authenticateValidator, verifiedAccountValidator, wrapRequestHandler(getTopicController))

export default router
