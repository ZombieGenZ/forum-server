import Post from '~/models/schemas/posts.shemas'
import User from '~/models/schemas/users.shemas'
import databaseService from './database.services'
import View from '~/models/schemas/views.shemas'

class ViewService {
  async view(post: Post, user: User) {
    const view = await databaseService.views.findOne({
      post_id: post._id,
      user_id: user._id
    })

    if (!view) {
      await Promise.all([
        databaseService.views.insertOne(
          new View({
            post_id: post._id,
            user_id: user._id
          })
        ),
        databaseService.posts.updateOne(
          {
            _id: post._id
          },
          {
            $inc: {
              total_view: 1
            }
          }
        )
      ])
    }
  }
}

const viewService = new ViewService()
export default viewService
