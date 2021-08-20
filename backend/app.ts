import cors from 'cors'
import type { Request, Response } from 'express'
import Express from 'express'

const app = Express()
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.json({ msg: 'This is CORS-enabled for an allowed domain.' })
})

export default app
