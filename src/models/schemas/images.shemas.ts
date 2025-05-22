import { ObjectId } from 'mongodb'

interface ImageType {
  _id?: ObjectId
  type: string
  path: string
  url: string
  size: number
}

export default class Image {
  _id: ObjectId
  type: string
  path: string
  url: string
  size: number

  constructor(image: ImageType) {
    this._id = image._id || new ObjectId()
    this.type = image.type
    this.path = image.path
    this.url = image.url
    this.size = image.size
  }
}
