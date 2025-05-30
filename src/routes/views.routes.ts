import express from 'express'
import { viewsController } from '~/controllers/views.controllers'
import { authenticateValidator } from '~/middlewares/authenticate.middlewares'
import { viewValidator } from '~/middlewares/views.middlewares'
import { wrapRequestHandler } from '~/utils/handlers.utils'
const router = express.Router()

/*
 * Description: Xem bài viết
 * Path: /api/views/
 * Method: POST
 * headers: {
 *    authorization: Bearer <token>
 * },
 * body: {
 *    refresh_token?: string,
 *    post_id: string
 * }
 */
router.post('/', authenticateValidator, viewValidator, wrapRequestHandler(viewsController))

export default router
