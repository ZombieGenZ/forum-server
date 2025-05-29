import { ObjectId } from 'mongodb'

interface CommentType {
  _id?: ObjectId
  post: ObjectId
  user: ObjectId
  content: string
  create_at?: Date
  create_by?: ObjectId
  update_at?: Date
  update_by?: ObjectId
}

export default class Comment {
  _id: ObjectId
  post: ObjectId
  user: ObjectId
  content: string
  create_at: Date
  create_by: ObjectId
  update_at: Date
  update_by: ObjectId

  constructor(comment: CommentType) {
    const date = new Date()

    this._id = comment._id || new ObjectId()
    this.post = comment.post
    this.user = comment.user
    this.content = comment.content
    this.create_at = comment.create_at || date
    this.create_by = comment.user
    this.update_at = comment.update_at || date
    this.update_by = comment.user
  }
}
