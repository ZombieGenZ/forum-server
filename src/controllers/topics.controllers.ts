import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { CreateTopicRequest } from '~/models/requests/topics.requests'
import User from '~/models/schemas/users.shemas'
import topicService from '~/services/topics.services'

export const createTopicController = async (req: Request<ParamsDictionary, any, CreateTopicRequest>, res: Response) => {
  const user = req.user as User

  try {
    await topicService.create(req.body, user)

    res.json({
      code: RESPONSE_CODE.CREATE_TOPIC_SUCCESSFUL,
      message: MESSAGE.TOPIC_MESSAGE.CREATE_TOPIC_SUCCESS
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.CREATE_TOPIC_FAILED,
      message: MESSAGE.TOPIC_MESSAGE.CREATE_TOPIC_FAILURE
    })
  }
}
