import express from 'express'
import { createTopicController } from '~/controllers/topics.controllers'
import { authenticateAdministratorValidator, authenticateValidator } from '~/middlewares/authenticate.middlewares'
import { colorTextValidator, colorValidator } from '~/middlewares/colors.middlewares'
import { createTopicValidator } from '~/middlewares/topics.middlewares'
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
 *    colorType: string,
 *    basicColor?: string,
 *    gradient2Color1?: string,
 *    gradient2Color2?: string,
 *    gradient3Color1?: string,
 *    gradient3Color2?: string,
 *    gradient3Color3?: string,
 *    textColorType: string,
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
  authenticateAdministratorValidator,
  createTopicValidator,
  colorValidator,
  colorTextValidator,
  wrapRequestHandler(createTopicController)
)

export default router
