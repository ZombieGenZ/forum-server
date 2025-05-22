import { ObjectId } from 'mongodb'

interface PostType {
  _id?: ObjectId
  title: string
  content: string
  user: ObjectId
  url: string
  created_at?: Date
  created_by?: ObjectId
  updated_at?: Date
  updated_by?: ObjectId
  can_comment?: boolean
  updated_can_commnet?: ObjectId
}

export default class Post {
  _id: ObjectId
  title: string
  content: string
  user: ObjectId
  url: string
  created_at: Date
  created_by: ObjectId
  updated_at: Date
  updated_by: ObjectId
  can_comment: boolean
  updated_can_commnet: ObjectId

  constructor(post: PostType) {
    const date = new Date()

    this._id = post._id || new ObjectId()
    this.title = post.title
    this.content = post.content
    this.user = post.user
    this.url = post.url
    this.created_at = post.created_at || date
    this.created_by = post.created_by || post.user
    this.updated_at = post.updated_at || date
    this.updated_by = post.updated_by || post.user
    this.can_comment = post.can_comment || true
    this.updated_can_commnet = post.updated_can_commnet || post.user
  }
}
