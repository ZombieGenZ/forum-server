import { CreatePostRequestBody, DeletePostRequestBody, UpdatePostRequestBody } from '~/models/requests/posts.requests'
import User from '~/models/schemas/users.shemas'
import databaseService from './database.services'
import { generateUrl } from '~/utils/url.utils'
import Post from '~/models/schemas/posts.shemas'
import { ObjectId } from 'mongodb'
import { summaryContent } from '~/utils/ai.utils'
import Topic from '~/models/schemas/topics.shemas'

class PostService {
  async checkUrl(url: string) {
    const post = await databaseService.posts.findOne({ url })
    return Boolean(post)
  }
  async create(payload: CreatePostRequestBody, user: User) {
    const url = await generateUrl(payload.title)

    const summary = await summaryContent(payload.content)

    await Promise.all([
      databaseService.posts.insertOne(
        new Post({
          ...payload,
          topic: new ObjectId(payload.topic_id),
          summary,
          user: user._id,
          url
        })
      ),
      databaseService.topics.updateOne(
        {
          _id: new ObjectId(payload.topic_id)
        },
        {
          $inc: { total_posts: 1 },
          $currentDate: {
            updated_at: true
          }
        }
      )
    ])
  }
  async update(payload: UpdatePostRequestBody, user: User, topic: Topic) {
    const url = await generateUrl(payload.title)

    const summary = await summaryContent(payload.content)

    await Promise.all([
      databaseService.posts.updateOne(
        {
          _id: new ObjectId(payload.post_id)
        },
        {
          $set: {
            title: payload.title,
            summary: summary,
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
      ),
      databaseService.topics.updateOne(
        {
          _id: new ObjectId(payload.topic_id)
        },
        {
          $inc: { total_posts: 1 },
          $currentDate: {
            updated_at: true
          }
        }
      ),
      databaseService.topics.updateOne(
        {
          _id: new ObjectId(topic._id)
        },
        {
          $inc: { total_posts: -1 },
          $currentDate: {
            updated_at: true
          }
        }
      )
    ])
  }
  async delete(payload: DeletePostRequestBody, post: Post) {
    await Promise.all([
      databaseService.posts.deleteOne({
        _id: new ObjectId(payload.post_id)
      }),
      databaseService.topics.updateOne(
        {
          _id: new ObjectId(post.topic)
        },
        {
          $inc: { total_posts: -1 },
          $currentDate: {
            updated_at: true
          }
        }
      )
    ])
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
