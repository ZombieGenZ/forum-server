import { ObjectId } from 'mongodb'
import { ColorTypeFull } from '~/constants/colors.constants'

interface TopicType {
  _id?: ObjectId
  topic: string
  text_color: ColorTypeFull
  background_color: ColorTypeFull
  total_posts?: number
  created_at?: Date
  created_by: ObjectId
  updated_at?: Date
  updated_by?: ObjectId
}

export default class Topic {
  _id: ObjectId
  topic: string
  text_color: ColorTypeFull
  background_color: ColorTypeFull
  total_posts: number
  created_at: Date
  created_by: ObjectId
  updated_at: Date
  updated_by: ObjectId

  constructor(topic: TopicType) {
    const date = new Date()

    this._id = topic._id || new ObjectId()
    this.topic = topic.topic
    this.background_color = topic.background_color
    this.text_color = topic.text_color
    this.total_posts = topic.total_posts || 0
    this.created_at = topic.created_at || date
    this.created_by = topic.created_by
    this.updated_at = topic.updated_at || date
    this.updated_by = topic.updated_by || topic.created_by
  }
}
