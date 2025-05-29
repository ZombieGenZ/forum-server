import { CreatePostRequestBody, DeletePostRequestBody, UpdatePostRequestBody } from '~/models/requests/posts.requests'
import User from '~/models/schemas/users.shemas'
import databaseService from './database.services'
import { generateUrl } from '~/utils/url.utils'
import Post from '~/models/schemas/posts.shemas'
import { ObjectId } from 'mongodb'

class PostService {
  async checkUrl(url: string) {
    const post = await databaseService.posts.findOne({ url })
    return Boolean(post)
  }
  async create(payload: CreatePostRequestBody, user: User) {
    const url = await generateUrl(payload.title)

    await databaseService.posts.insertOne(
      new Post({
        ...payload,
        topic: new ObjectId(payload.topic_id),
        user: user._id,
        url
      })
    )
  }
  async update(payload: UpdatePostRequestBody, user: User) {
    const url = await generateUrl(payload.title)

    await databaseService.posts.updateOne(
      {
        _id: new ObjectId(payload.post_id)
      },
      {
        $set: {
          title: payload.title,
          content: payload.content,
          topic: new ObjectId(payload.topic_id),
          updated_by: user._id,
          updated_can_commnet: user._id,
          url: url
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
  }
  async delete(payload: DeletePostRequestBody) {
    await databaseService.posts.deleteOne({
      _id: new ObjectId(payload.post_id)
    })
  }
  async getPost() {
    return await databaseService.posts
      .aggregate([
        {
          $lookup: {
            from: process.env.DATABASE_TOPIC_COLLECTION as string,
            localField: 'topic',
            foreignField: '_id',
            as: 'topic'
          }
        },
        {
          $unwind: '$topic'
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
        }
      ])
      .toArray()
  }
}

const postService = new PostService()
export default postService
