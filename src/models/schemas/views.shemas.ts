import { ObjectId } from 'mongodb'

interface ViewType {
  _id?: ObjectId
  user_id: ObjectId
  post_id: ObjectId
  created_at?: Date
}

export default class View {
  _id: ObjectId
  user_id: ObjectId
  post_id: ObjectId
  created_at: Date
  constructor(view: ViewType) {
    this._id = view._id || new ObjectId()
    this.user_id = view.user_id
    this.post_id = view.post_id
    this.created_at = view.created_at || new Date()
  }
}
