import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import {
  CreateCommentRequestBody,
  DeleteCommentRequestBody,
  GetCommentRequestBody,
  UpdateCommentRequestBody
} from '~/models/requests/comments.requests'
import User from '~/models/schemas/users.shemas'
import commentService from '~/services/comments.services'

export const createCommentController = async (
  req: Request<ParamsDictionary, any, CreateCommentRequestBody>,
  res: Response
) => {
  try {
    const user = req.user as User

    await commentService.create(req.body, user)

    res.json({
      code: RESPONSE_CODE.CREATE_COMMENT_SUCCESSFUL,
      message: MESSAGE.COMMENT_MESSAGE.CREATE_COMMENT_SUCCESS
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.CREATE_POST_FAILED,
      message: MESSAGE.POST_MESSAGE.CREATE_POST_FAILURE
    })
  }
}

export const updateCommentController = async (
  req: Request<ParamsDictionary, any, UpdateCommentRequestBody>,
  res: Response
) => {
  try {
    const user = req.user as User

    await commentService.update(req.body, user)

    res.json({
      code: RESPONSE_CODE.UPDATE_COMMENT_SUCCESSFUL,
      message: MESSAGE.COMMENT_MESSAGE.UPDATE_COMMENT_FAILURE
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.UPDATE_COMMENT_FAILED,
      message: MESSAGE.POST_MESSAGE.UPDATE_POST_FAILURE
    })
  }
}

export const deleteCommentController = async (
  req: Request<ParamsDictionary, any, DeleteCommentRequestBody>,
  res: Response
) => {
  try {
    await commentService.delete(req.body)

    res.json({
      code: RESPONSE_CODE.DELETE_COMMENT_SUCCESSFUL,
      message: MESSAGE.COMMENT_MESSAGE.DELETE_COMMENT_FAILURE
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.DELETE_COMMENT_FAILED,
      message: MESSAGE.POST_MESSAGE.DELETE_POST_FAILURE
    })
  }
}

export const getCommentController = async (
  req: Request<ParamsDictionary, any, GetCommentRequestBody>,
  res: Response
) => {
  try {
    const user = req.user as User

    const comments = await commentService.getComment(req.body.post_id, user)

    res.json({
      code: RESPONSE_CODE.GET_COMMENT_SUCCESSFUL,
      message: MESSAGE.COMMENT_MESSAGE.GET_COMMENT_FAILURE,
      comments
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.GET_COMMENT_FAILED,
      message: MESSAGE.POST_MESSAGE.GET_POST_FAILURE
    })
  }
}
