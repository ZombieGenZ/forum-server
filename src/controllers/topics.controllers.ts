import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { CreateTopicRequest, DeleteTopicRequest, UpdateTopicRequest } from '~/models/requests/topics.requests'
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

export const updateTopicController = async (req: Request<ParamsDictionary, any, UpdateTopicRequest>, res: Response) => {
  const user = req.user as User

  try {
    await topicService.update(req.body, user)

    res.json({
      code: RESPONSE_CODE.UPDATE_TOPIC_SUCCESSFUL,
      message: MESSAGE.TOPIC_MESSAGE.UPDATE_TOPIC_SUCCESS
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.UPDATE_POST_FAILED,
      message: MESSAGE.TOPIC_MESSAGE.UPDATE_TOPIC_FAILURE
    })
  }
}

export const deleteTopicController = async (req: Request<ParamsDictionary, any, DeleteTopicRequest>, res: Response) => {
  try {
    await topicService.delete(req.body)

    res.json({
      code: RESPONSE_CODE.DELETE_POST_SUCCESSFUL,
      message: MESSAGE.TOPIC_MESSAGE.DELETE_TOPIC_SUCCESS
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.DELETE_POST_FAILED,
      message: MESSAGE.TOPIC_MESSAGE.DELETE_TOPIC_FAILURE
    })
  }
}

export const getTopicController = async (req: Request, res: Response) => {
  try {
    const topic = await topicService.getTopic()

    res.json({
      code: RESPONSE_CODE.GET_TOPIC_SUCCESSFUL,
      message: MESSAGE.TOPIC_MESSAGE.GET_TOPIC_SUCCESS,
      topic
    })
  } catch (err) {
    res.json({
      code: RESPONSE_CODE.GET_TOPIC_FAILED,
      message: MESSAGE.TOPIC_MESSAGE.GET_TOPIC_FAILURE
    })
  }
}
