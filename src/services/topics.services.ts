import { CreateTopicRequest } from '~/models/requests/topics.requests'
import databaseService from './database.services'
import Topic from '~/models/schemas/topics.shemas'
import { ColorType } from '~/constants/colors.constants'
import User from '~/models/schemas/users.shemas'

class TopicService {
  async create(payload: CreateTopicRequest, user: User) {
    let text_color
    let background_color

    if (payload.textColorType == 'basic') {
      text_color = {
        type: ColorType.COLOR_BASIC,
        color: {
          color: payload.textBasicColor as string
        }
      }
    } else if (payload.textColorType == 'gradient2') {
      text_color = {
        type: ColorType.COLOR_GRADIENT_2,
        color: {
          color1: payload.textGradient2Color1 as string,
          color2: payload.textGradient2Color2 as string
        }
      }
    } else if (payload.textColorType == 'gradient3') {
      text_color = {
        type: ColorType.COLOR_GRADIENT_3,
        color: {
          color1: payload.textGradient3Color1 as string,
          color2: payload.textGradient3Color2 as string,
          color3: payload.textGradient3Color3 as string
        }
      }
    } else {
      text_color = {
        type: ColorType.COLOR_RAMBOW,
        color: null
      }
    }

    if (payload.colorType == 'basic') {
      background_color = {
        type: ColorType.COLOR_BASIC,
        color: {
          color: payload.basicColor as string
        }
      }
    } else if (payload.colorType == 'gradient2') {
      background_color = {
        type: ColorType.COLOR_GRADIENT_2,
        color: {
          color1: payload.gradient2Color1 as string,
          color2: payload.gradient2Color2 as string
        }
      }
    } else if (payload.colorType == 'gradient3') {
      background_color = {
        type: ColorType.COLOR_GRADIENT_3,
        color: {
          color1: payload.gradient3Color1 as string,
          color2: payload.gradient3Color2 as string,
          color3: payload.gradient3Color3 as string
        }
      }
    } else {
      background_color = {
        type: ColorType.COLOR_RAMBOW,
        color: null
      }
    }

    await databaseService.topics.insertOne(
      new Topic({
        ...payload,
        text_color,
        background_color,
        created_by: user._id
      })
    )
  }
}

const topicService = new TopicService()
export default topicService
