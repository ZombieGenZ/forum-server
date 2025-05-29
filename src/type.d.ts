import { Request } from 'express'
import { Server as SocketIOServer } from 'socket.io'
import { TokenPayload } from '~/models/requests/authentication.requests'
import User from '~/models/schemas/users.schemas'
import RefreshToken from './models/schemas/refreshtoken.schemas'
import { ImageType } from './constants/images.constants'
import { ProductList } from './constants/orders.constants'
import Topic from './models/schemas/topics.shemas'
import Post from './models/schemas/posts.shemas'
import Comment from './models/schemas/comments.shemas'

declare module 'express' {
  interface Request {
    io?: SocketIOServer
    user?: User
    decoded_access_token?: TokenPayload
    decoded_refresh_token?: TokenPayload
    decoded_email_verify_token?: TokenPayload
    decoded_forgot_password_token?: TokenPayload
    refresh_token?: RefreshToken
    image?: ImageType
    topic?: Topic
    post?: Post
    comment?: Comment
  }
}
