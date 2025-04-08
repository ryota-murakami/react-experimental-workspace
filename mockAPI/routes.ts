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
  // サムネイルアップロード用のモックAPI
  http.post('/api/thumbnailUpload', async ({ request }) => {
    try {
      const formData = await request.formData()
      const thumbnail = formData.get('thumbnail') as File
      const title = formData.get('title')

      console.log('サムネイルアップロード:', {
        title,
        fileName: thumbnail.name,
        fileSize: thumbnail.size,
        fileType: thumbnail.type
      })

      // 実際のアップロード処理をシミュレート
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(HttpResponse.json({ 
            success: true,
            message: 'サムネイルのアップロードに成功しました',
            data: {
              id: Math.floor(Math.random() * 10000),
              title: title,
              filename: thumbnail.name,
              url: `https://example.com/thumbnails/${thumbnail.name}`
            }
          }, { status: 201 }))
        }, 800) // 0.8秒の遅延を追加してアップロード処理をシミュレート
      })
    } catch (error) {
      console.error('サムネイルアップロードエラー:', error)
      return HttpResponse.json({ 
        success: false,
        message: 'サムネイルのアップロードに失敗しました'
      }, { status: 500 })
    }
  }),
]
