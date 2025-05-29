import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { UserRoleEnum } from '~/constants/users.constants'
import {
  CheckEditPostRequestBody,
  CreatePostRequestBody,
  DeletePostRequestBody,
  UpdatePostRequestBody
} from '~/models/requests/posts.requests'
import Post from '~/models/schemas/posts.shemas'
import Topic from '~/models/schemas/topics.shemas'
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
    const topic = req.topic as Topic
    const user = req.user as User

    await postService.update(req.body, user, topic)

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
    const post = req.post as Post
    await postService.delete(req.body, post)

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

export const getPostController = async (_: Request, res: Response) => {
  try {
    const posts = await postService.getPost()

    res.json({
      code: RESPONSE_CODE.GET_POST_SUCCESSFUL,
      message: MESSAGE.POST_MESSAGE.GET_POST_SUCCESS,
      posts
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.GET_POST_FAILED,
      message: MESSAGE.POST_MESSAGE.GET_POST_FAILURE
    })
  }
}

export const getPostDetailController = async (req: Request, res: Response) => {
  try {
    const url = req.query.url as string

    const posts = await postService.getPostDetail(url)

    res.json({
      code: RESPONSE_CODE.GET_POST_SUCCESSFUL,
      message: MESSAGE.POST_MESSAGE.GET_POST_SUCCESS,
      posts
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.GET_POST_FAILED,
      message: MESSAGE.POST_MESSAGE.GET_POST_FAILURE
    })
  }
}

export const checkEditPostController = async (
  req: Request<ParamsDictionary, any, CheckEditPostRequestBody>,
  res: Response
) => {
  try {
    const user = req.user as User
    const post = req.post as Post

    res.json({
      code: RESPONSE_CODE.CHECK_PERMISSION_SUCCESSFUL,
      message: MESSAGE.AUTHENTICATE_MESSAGE.CHECK_PERMISSION_SUCCESS,
      allow: user.user_role == UserRoleEnum.ADMINISTRATOR ? true : post.user.equals(user._id)
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.CHECK_PERMISSION_FAILED,
      message: MESSAGE.AUTHENTICATE_MESSAGE.CHECK_PERMISSION_FAILURE
    })
  }
}
