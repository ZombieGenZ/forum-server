import { io } from '~/index'

export const notificationRealtime = async (
  socketRoom: string,
  socketEvent: string,
  data: any
) => {
  io.to(socketRoom).emit(socketEvent, data)
}
