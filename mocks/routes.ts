import { rest } from 'msw'

import { searchHandler } from './handlers/searchHandler'
import { statesHandler } from './handlers/statesHandler'

export const routes = [
  rest.get('http://localhost:3000/api/search', searchHandler),
  rest.get('http://localhost:3000/api/states', statesHandler),
]
