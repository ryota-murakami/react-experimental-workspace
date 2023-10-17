import { rest } from 'msw'

import { usStates } from './usStates'

export const handlers = [
  rest.get('http://localhost:3000/api/search', async (req, res, ctx) => {
    const query = req.url.searchParams.get('q')!
    if (query.length === 0)
      return res(ctx.status(200), ctx.json(['Not Found.']))
    // Filter your data based on the query
    const data = usStates.filter((item) => item.includes(query))
    return res(ctx.status(200), ctx.json(data))
  }),
]
