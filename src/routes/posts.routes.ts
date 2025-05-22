import express from 'express'
import { createPostController, deletePostController, updatePostController } from '~/controllers/posts.controllers'
import { authenticateValidator } from '~/middlewares/authenticate.middlewares'
import { createPostValidator, deletePostValidator, updatePostValidator } from '~/middlewares/posts.middlewares'
import { wrapRequestHandler } from '~/utils/handlers.utils'
const router = express.Router()

/*
 * Description: Tạo bài viết mới
 * Path: /api/posts/create
 * Method: POST
 * headers: {
 *    authorization?: Bearer <token>
 * },
 * body: {
 *    refresh_token: string,
 *    title: string,
 *    content: string,
 *    can_comment: boolean
 * }
 */
router.post('/create', authenticateValidator, createPostValidator, wrapRequestHandler(createPostController))

/*
 * Description: Chỉnh sửa bài viết
 * Path: /api/posts/update
 * Method: PUT
 * headers: {
 *    authorization?: Bearer <token>
 * },
 * body: {
 *    refresh_token: string,
 *    post_id: string,
 *    title: string,
 *    content: string,
 *    can_comment: boolean
 * }
 */
router.put('/update', authenticateValidator, updatePostValidator, wrapRequestHandler(updatePostController))

/*
 * Description: Xóa bài viết
 * Path: /api/posts/delete
 * Method: DELETE
 * headers: {
 *    authorization?: Bearer <token>
 * },
 * body: {
 *    refresh_token: string,
 *    post_id: string
 * }
 */
router.delete('/delete', authenticateValidator, deletePostValidator, wrapRequestHandler(deletePostController))

export default router
