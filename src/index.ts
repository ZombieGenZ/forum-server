import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import bodyParser from 'body-parser'
import databaseService from './services/database.services'
import expressUserAgent from 'express-useragent'
import { downloadAllFromDrive } from './utils/drive.utils'
import { defaultErrorHandler, notFoundHandler } from './middlewares/errors.middlewares'

dotenv.config()
const port = process.env.APP_PORT || 3000

const app = express()
const server = createServer(app)
const serverRunningTime = new Date()
const serverLanguage = process.env.APP_LANGUAGE as string
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
    credentials: true
  },
  transports: ['websocket', 'polling'],
  allowUpgrades: true,
  pingTimeout: 60000,
  pingInterval: 25000,
  upgradeTimeout: 30000,
  maxHttpBufferSize: 10e7,
  allowEIO3: true
})

databaseService.connect()

// realtime middleware
app.use((req, res, next) => {
  ;(req as any).io = io
  next()
})

app.use(express.json())
app.use(expressUserAgent.express())
app.use(express.static(path.join(__dirname, '../public')))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('trust proxy', true)

// import api router
import api_users from '~/routes/users.routes'
import api_file_management from '~/routes/fileManagement.routes'
import api_topics from '~/routes/topics.routes'
import api_posts from '~/routes/posts.routes'
import api_comments from '~/routes/comments.routes'
import api_views from '~/routes/views.routes'

app.use('/api/users', api_users)
app.use('/api/file-management', api_file_management)
app.use('/api/topics', api_topics)
app.use('/api/posts', api_posts)
app.use('/api/comments', api_comments)
app.use('/api/views', api_views)

app.use(notFoundHandler)

app.use(defaultErrorHandler)

server.listen(port, async () => {
  await downloadAllFromDrive()
  console.log()
  console.log(`\x1b[33mMáy chủ đang chạy trên port \x1b[36m${port}\x1b[0m`)
  console.log(`\x1b[33mTruy cập tại: \x1b[36m${process.env.API_URL}/\x1b[0m`)
  console.log()
})

process.on('SIGINT', async () => {
  const date = new Date()
  console.log()
  console.log(`\x1b[33mMáy chủ đã ngừng hoạt động\x1b[0m`)
  console.log()
  process.exit(0)
})

export { io, serverRunningTime, serverLanguage }
