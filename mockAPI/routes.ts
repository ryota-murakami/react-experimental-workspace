import { http, HttpResponse } from 'msw'

import { searchHandler } from './handlers/searchHandler'
import { statesHandler } from './handlers/statesHandler'
import { uploadFileHandler } from './handlers/uploadFileHandler'

export const routes = [
  http.get('/api/search', searchHandler),
  http.get('/api/states', statesHandler),
  http.post('/api/imageUpload', () => {
    return HttpResponse.json({ message: 'ok', status: 201 })
  }),
  http.post('http://localhost:3000/api/dataForm', () => {
    return HttpResponse.json({ message: 'ok', status: 201 })
  }),
  http.post('/api/v1/uploadFiles', uploadFileHandler),
]
