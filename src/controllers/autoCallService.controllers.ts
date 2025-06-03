import { Request, Response } from 'express'

export const autoCallServiceHealthController = (req: Request, res: Response) => {
  res.send(`Service is running | ${process.env.API_URL}`)
}
