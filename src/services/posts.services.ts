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
          updated_by: user._id,
          can_comment: payload.can_comment,
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
}

const postService = new PostService()
export default postService
