import Express, { Request, Response } from 'express'

const app = Express()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, VS Code!!!')
})

export default app
