import { Db, MongoClient, Collection, IndexSpecification, CreateIndexesOptions } from 'mongodb'
import dotenv from 'dotenv'
import User from '~/models/schemas/users.shemas'

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
}

const databaseService = new DatabaseService()
export default databaseService
