import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { ViewRequestBody } from '~/models/requests/views.requests'
import Post from '~/models/schemas/posts.shemas'
import User from '~/models/schemas/users.shemas'
import viewService from '~/services/views.services'

export const viewsController = async (req: Request<ParamsDictionary, any, ViewRequestBody>, res: Response) => {
  try {
    const post = req.post as Post
    const user = req.user as User

    await viewService.view(post, user)

    res.json({
      code: RESPONSE_CODE.VIEW_POST_SUCCESSFUL,
      message: MESSAGE.VIEW_MESSAGE.VIEW_POST_SUCCESS
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.VIEW_POST_FAILED,
      message: MESSAGE.VIEW_MESSAGE.VIEW_POST_FAILURE
    })
  }
}
