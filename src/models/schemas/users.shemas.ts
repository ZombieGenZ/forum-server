import { ObjectId } from 'mongodb'
import { BadgeType } from '~/constants/badge.constants'
import { ImageType } from '~/constants/images.constants'
import { UserRoleEnum, UserTypeEnum } from '~/constants/users.constants'

interface UserType {
  _id?: ObjectId
  display_name: string
  username: string
  email: string
  phone: string
  password: string
  user_type?: UserTypeEnum
  user_role?: UserRoleEnum
  badge?: BadgeType[]
  verify_token?: string
  forget_password_token?: string
  avatar?: ImageType
  cover?: ImageType
  created_at?: Date
  updated_at?: Date
}

export default class User {
  _id: ObjectId
  display_name: string
  username: string
  email: string
  phone: string
  password: string
  user_type: UserTypeEnum
  user_role: UserRoleEnum
  badge: BadgeType[]
  verify_token: string
  forget_password_token: string
  avatar: ImageType
  cover: ImageType
  created_at: Date
  updated_at: Date

  constructor(user: UserType) {
    this._id = user._id || new ObjectId()
    this.display_name = user.display_name
    this.username = user.username
    this.email = user.email
    this.phone = user.phone
    this.password = user.password
    this.user_type = user.user_type || UserTypeEnum.UNVERIFIED
    this.user_role = user.user_role || UserRoleEnum.MEMBER
    this.badge = user.badge || []
    this.verify_token = user.verify_token || ''
    this.forget_password_token = user.forget_password_token || ''
    this.avatar = user.avatar || {
      type: '',
      path: '',
      url: '',
      size: 0
    }
    this.cover = user.cover || {
      type: '',
      path: '',
      url: '',
      size: 0
    }
    this.created_at = user.created_at || new Date()
    this.updated_at = user.updated_at || new Date()
  }
}
