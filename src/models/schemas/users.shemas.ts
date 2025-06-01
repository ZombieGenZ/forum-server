import { ObjectId } from 'mongodb'
import { ColorType, ColorTypeFull } from '~/constants/colors.constants'
import { UserRoleEnum, UserTypeEnum } from '~/constants/users.constants'

interface UserType {
  _id?: ObjectId
  display_name?: string
  display_color?: ColorTypeFull
  username: string
  email: string
  phone: string
  password: string
  user_type?: UserTypeEnum
  user_role?: UserRoleEnum
  is_verified?: boolean
  verify_token?: string
  forgot_password_token?: string
  created_at?: Date
  updated_at?: Date
}

export default class User {
  _id: ObjectId
  display_name: string
  display_color: ColorTypeFull
  username: string
  email: string
  phone: string
  password: string
  user_type: UserTypeEnum
  user_role: UserRoleEnum
  is_verified: boolean
  verify_token: string
  forgot_password_token: string
  created_at: Date
  updated_at: Date

  constructor(user: UserType) {
    const date = new Date()

    this._id = user._id || new ObjectId()
    this.display_name = user.display_name || user.username
    this.display_color = user.display_color || {
      type: ColorType.COLOR_BASIC,
      color: {
        color: '#000000'
      }
    }
    this.username = user.username
    this.email = user.email
    this.phone = user.phone
    this.password = user.password
    this.user_type = user.user_type || UserTypeEnum.UNVERIFIED
    this.user_role = user.user_role || UserRoleEnum.MEMBER
    this.is_verified = user.is_verified || false
    this.verify_token = user.verify_token || ''
    this.forgot_password_token = user.forget_password_token || ''
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
  }
}
