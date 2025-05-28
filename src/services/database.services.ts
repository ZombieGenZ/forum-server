import { Db, MongoClient, Collection, IndexSpecification, CreateIndexesOptions } from 'mongodb'
import dotenv from 'dotenv'
import User from '~/models/schemas/users.shemas'
import RefreshToken from '~/models/schemas/refreshtoken.schemas'
import Image from '~/models/schemas/images.shemas'
import Post from '~/models/schemas/posts.shemas'
import Topic from '~/models/schemas/topics.shemas'

dotenv.config()

const uri = process.env.DATABASE_URL as string

class DatabaseService {
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DATABASE_NAME)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })

      console.log(`\x1b[33mĐã kết nối thành công đến cơ sở dữ liệu \x1b[36m${process.env.DATABASE_NAME}\x1b[0m`)
    } catch (err) {
      console.error('\x1b[31mLỗi kết nối đến cơ sở dữ liệu:\x1b[33m', err)
      console.log('\x1b[0m')
      throw err
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DATABASE_USER_COLLECTION as string)
  }
  get refreshToken(): Collection<RefreshToken> {
    return this.db.collection(process.env.DATABASE_REFRESH_TOKEN_COLLECTION as string)
  }
  get images(): Collection<Image> {
    return this.db.collection(process.env.DATABASE_IMAGE_COLLECTION as string)
  }
  get topics(): Collection<Topic> {
    return this.db.collection(process.env.DATABASE_TOPIC_COLLECTION as string)
  }
  get posts(): Collection<Post> {
    return this.db.collection(process.env.DATABASE_POST_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
