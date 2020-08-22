import Express, { Request, Response } from 'express'

const app = Express()

app.get('/', (req: Request, res: Response) => {
  res.send('Backend Server Working!')
})

export default app
