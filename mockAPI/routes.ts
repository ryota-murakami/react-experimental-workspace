import { http, HttpResponse } from 'msw'

import { searchHandler } from './handlers/searchHandler'
import { statesHandler } from './handlers/statesHandler'

export const routes = [
  http.get('http://localhost:3000/api/search', searchHandler),
  http.get('http://localhost:3000/api/states', statesHandler),
  http.post('/api/imageUpload', () => {
    return HttpResponse.json({ message: 'ok', status: 201 })
  }),
  http.post('http://localhost:3000/api/dataForm', () => {
    return HttpResponse.json({ message: 'ok', status: 201 })
  }),
]
