import {
  CreateCommentRequestBody,
  DeleteCommentRequestBody,
  UpdateCommentRequestBody
} from '~/models/requests/comments.requests'
import User from '~/models/schemas/users.shemas'
import databaseService from './database.services'
import Comment from '../models/schemas/comments.shemas'
import { ObjectId } from 'mongodb'
import { UserRoleEnum } from '~/constants/users.constants'

class CommentService {
  async create(payload: CreateCommentRequestBody, user: User) {
    await databaseService.comments.insertOne(
      new Comment({
        ...payload,
        user: user._id,
        post: new ObjectId(payload.post_id)
      })
    )
  }
  async update(payload: UpdateCommentRequestBody, user: User) {
    await databaseService.comments.updateOne(
      {
        _id: new ObjectId(payload.comment_id)
      },
      {
        $set: {
          content: payload.content,
          update_by: user._id
        },
        $currentDate: {
          update_at: true
        }
      }
    )
  }
  async delete(payload: DeleteCommentRequestBody) {
    await databaseService.comments.deleteOne({
      _id: new ObjectId(payload.comment_id)
    })
  }
  async getComment(post_id: string, user?: User) {
    return await databaseService.comments
      .aggregate([
        {
          $match: {
            post: new ObjectId(post_id)
          }
        },
        {
          $lookup: {
            from: process.env.DATABASE_USER_COLLECTION,
            localField: 'user',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: '$user'
        },
        {
          $project: {
            'user.password': 0,
            'user.verify_token': 0,
            'user.forget_password_token': 0
          }
        },
        {
          $addFields: {
            can_edit: {
              $or: [
                { $eq: ['$user._id', new ObjectId(user?._id)] },
                { $eq: ['$user.user_role', UserRoleEnum.ADMINISTRATOR] }
              ]
            }
          }
        }
      ])
      .toArray()
  }
}

const commentService = new CommentService()
export default commentService
