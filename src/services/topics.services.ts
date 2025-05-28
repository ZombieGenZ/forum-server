import { CreateTopicRequest } from '~/models/requests/topics.requests'
import databaseService from './database.services'
import Topic from '~/models/schemas/topics.shemas'
import { ColorType } from '~/constants/colors.constants'
import User from '~/models/schemas/users.shemas'

class TopicService {
  async create(payload: CreateTopicRequest, user: User) {
    let color
    if (payload.colorType == 'basic') {
      color = {
        type: ColorType.COLOR_BASIC,
        color: {
          color: payload.BasicColor as string
        }
      }
    } else if (payload.colorType == 'gradient2') {
      color = {
        type: ColorType.COLOR_GRADIENT_2,
        color: {
          color1: payload.gradient2Color1 as string,
          color2: payload.gradient2Color2 as string
        }
      }
    } else if (payload.colorType == 'gradient3') {
      color = {
        type: ColorType.COLOR_GRADIENT_3,
        color: {
          color1: payload.gradient3Color1 as string,
          color2: payload.gradient3Color2 as string,
          color3: payload.gradient3Color3 as string
        }
      }
    } else {
      color = {
        type: ColorType.COLOR_RAMBOW,
        color: null
      }
    }

    await databaseService.topics.insertOne(
      new Topic({
        ...payload,
        color,
        created_by: user._id
      })
    )
  }
}

const topicService = new TopicService()
export default topicService
