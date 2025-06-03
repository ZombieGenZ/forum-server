import cron from 'node-cron'
import { autoCallService } from './functions/autoCallService.functions'

const runAllCrons = () => {
  // Cron job dùng để tự động gọi API kiểm tra sự sống (Render Only)
  cron.schedule('* * * * *', autoCallService)
}

export default runAllCrons
