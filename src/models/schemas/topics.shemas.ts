import { ObjectId } from 'mongodb'
import { ColorTypeFull } from '~/constants/colors.constants'

interface TopicType {
  _id?: ObjectId
  topic: string
  color: ColorTypeFull
  created_at?: Date
  created_by: ObjectId
  updated_at?: Date
  updated_by?: ObjectId
}

export default class Topic {
  _id: ObjectId
  topic: string
  color: ColorTypeFull
  created_at: Date
  created_by: ObjectId
  updated_at: Date
  updated_by: ObjectId

  constructor(topic: TopicType) {
    const date = new Date()

    this._id = topic._id || new ObjectId()
    this.topic = topic.topic
    this.color = topic.color
    this.created_at = topic.created_at || date
    this.created_by = topic.created_by
    this.updated_at = topic.updated_at || date
    this.updated_by = topic.updated_by || topic.created_by
  }
}
