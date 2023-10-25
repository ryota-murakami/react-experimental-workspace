import { http } from 'msw'

import { searchHandler } from './handlers/searchHandler'
import { statesHandler } from './handlers/statesHandler'

export const routes = [
  http.get('http://localhost:3000/api/search', searchHandler),
  http.get('http://localhost:3000/api/states', statesHandler),
]
