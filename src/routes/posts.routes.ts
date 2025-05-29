import express from 'express'
import {
  createPostController,
  deletePostController,
  getPostController,
  updatePostController
} from '~/controllers/posts.controllers'
import { authenticateValidator, verifiedAccountValidator } from '~/middlewares/authenticate.middlewares'
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
 *    topic_id: string,
 *    title: string,
 *    content: string
 * }
 */
router.post(
  '/create',
  authenticateValidator,
  verifiedAccountValidator,
  createPostValidator,
  wrapRequestHandler(createPostController)
)

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
router.put(
  '/update',
  authenticateValidator,
  verifiedAccountValidator,
  updatePostValidator,
  wrapRequestHandler(updatePostController)
)

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
router.delete(
  '/delete',
  authenticateValidator,
  verifiedAccountValidator,
  deletePostValidator,
  wrapRequestHandler(deletePostController)
)

/*
 * Description: Lấy thông tin bài viết
 * Path: /api/posts/get-post
 * Method: GET
 */
router.get('/get-post', wrapRequestHandler(getPostController))

export default router
