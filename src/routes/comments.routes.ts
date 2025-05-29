import express from 'express'
import {
  createCommentController,
  deleteCommentController,
  getCommentController,
  updateCommentController
} from '~/controllers/comments.controllers'
import { authenticateValidator, haveUserValidator } from '~/middlewares/authenticate.middlewares'
import {
  createCommentValidator,
  deleteCommentValidator,
  getCommentValidator,
  updateCommentValidator
} from '~/middlewares/comments.middlewares'
import { wrapRequestHandler } from '~/utils/handlers.utils'
const router = express.Router()

/*
 * Description: Tạo bình luận mới cho một bài viết
 * Path: /api/posts/create
 * Method: POST
 * headers: {
 *    authorization: Bearer <token>
 * },
 * body: {
 *    refresh_token: string,
 *    post_id: string,
 *    content: string
 * }
 */
router.post('/create', authenticateValidator, createCommentValidator, wrapRequestHandler(createCommentController))

/*
 * Description: Chỉnh sửa bình luân
 * Path: /api/posts/update
 * Method: PUT
 * headers: {
 *    authorization: Bearer <token>
 * },
 * body: {
 *    refresh_token: string,
 *    comment_id: string,
 *    content: string
 * }
 */
router.put('/update', authenticateValidator, updateCommentValidator, wrapRequestHandler(updateCommentController))

/*
 * Description: Xóa bình luân
 * Path: /api/posts/delete
 * Method: DELETE
 * headers: {
 *    authorization: Bearer <token>
 * },
 * body: {
 *    refresh_token: string,
 *    comment_id: string
 * }
 */
router.delete('/delete', authenticateValidator, deleteCommentValidator, wrapRequestHandler(deleteCommentController))

/*
 * Description: Lấy thông tin bình luận của một bài viết
 * Path: /api/posts/get-comments
 * Method: POST
 * headers: {
 *    authorization: Bearer <token>
 * },
 * body: {
 *    refresh_token?: string,
 *    comment_id: string
 * }
 */
router.delete('/delete', haveUserValidator, getCommentValidator, wrapRequestHandler(getCommentController))

export default router
