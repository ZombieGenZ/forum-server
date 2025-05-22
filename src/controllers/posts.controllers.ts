import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { CreatePostRequestBody, DeletePostRequestBody, UpdatePostRequestBody } from '~/models/requests/posts.requests'
import User from '~/models/schemas/users.shemas'
import postService from '~/services/posts.services'

export const createPostController = async (
  req: Request<ParamsDictionary, any, CreatePostRequestBody>,
  res: Response
) => {
  try {
    const user = req.user as User

    await postService.create(req.body, user)

    res.json({
      code: RESPONSE_CODE.CREATE_POST_SUCCESSFUL,
      message: MESSAGE.POST_MESSAGE.CREATE_POST_SUCCESS
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.CREATE_POST_FAILED,
      message: MESSAGE.POST_MESSAGE.CREATE_POST_FAILURE
    })
  }
}

export const updatePostController = async (
  req: Request<ParamsDictionary, any, UpdatePostRequestBody>,
  res: Response
) => {
  try {
    const user = req.user as User

    await postService.update(req.body, user)

    res.json({
      code: RESPONSE_CODE.UPDATE_POST_SUCCESSFUL,
      message: MESSAGE.POST_MESSAGE.UPDATE_POST_SUCCESS
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.UPDATE_POST_FAILED,
      message: MESSAGE.POST_MESSAGE.UPDATE_POST_FAILURE
    })
  }
}

export const deletePostController = async (
  req: Request<ParamsDictionary, any, DeletePostRequestBody>,
  res: Response
) => {
  try {
    await postService.delete(req.body)

    res.json({
      code: RESPONSE_CODE.DELETE_POST_SUCCESSFUL,
      message: MESSAGE.POST_MESSAGE.DELETE_POST_SUCCESS
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.DELETE_POST_FAILED,
      message: MESSAGE.POST_MESSAGE.DELETE_POST_FAILURE
    })
  }
}
