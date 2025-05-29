import { ObjectId } from 'mongodb'

interface PostType {
  _id?: ObjectId
  title: string
  summary?: string
  content: string
  user: ObjectId
  url: string
  topic: ObjectId
  created_at?: Date
  created_by?: ObjectId
  updated_at?: Date
  updated_by?: ObjectId
}

export default class Post {
  _id: ObjectId
  title: string
  summary: string
  content: string
  user: ObjectId
  url: string
  topic: ObjectId
  created_at: Date
  created_by: ObjectId
  updated_at: Date
  updated_by: ObjectId

  constructor(post: PostType) {
    const date = new Date()

    this._id = post._id || new ObjectId()
    this.title = post.title
    this.summary = post.summary || ''
    this.content = post.content
    this.user = post.user
    this.url = post.url
    this.topic = post.topic
    this.created_at = post.created_at || date
    this.created_by = post.created_by || post.user
    this.updated_at = post.updated_at || date
    this.updated_by = post.updated_by || post.user
  }
}
