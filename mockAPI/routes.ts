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
  // 複数サムネイルアップロード用のモックAPI
  http.post('/api/uploadFiles', async ({ request }) => {
    try {
      const formData = await request.formData()
      const uploadedFiles: { name: string; size: number; type: string }[] = []

      // FormDataから全てのファイルを取得
      for (const [key, value] of formData.entries()) {
        if (key.startsWith('uploadFile') && value instanceof File) {
          uploadedFiles.push({
            name: value.name,
            size: value.size,
            type: value.type,
          })
        }
      }

      console.log('複数ファイルアップロード:', {
        fileCount: uploadedFiles.length,
        files: uploadedFiles,
      })

      // 実際のアップロード処理をシミュレート
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            HttpResponse.json(
              {
                success: true,
                message: `${uploadedFiles.length}個の画像のアップロードに成功しました`,
                data: {
                  files: uploadedFiles.map((file, index) => ({
                    id: Math.floor(Math.random() * 10000),
                    filename: file.name,
                    url: `https://example.com/uploadFiles/${file.name}`,
                  })),
                },
              },
              { status: 201 },
            ),
          )
        }, 800) // 0.8秒の遅延を追加してアップロード処理をシミュレート
      })
    } catch (error) {
      console.error('ファイルアップロードエラー:', error)
      return HttpResponse.json(
        {
          success: false,
          message: 'ファイルのアップロードに失敗しました',
        },
        { status: 500 },
      )
    }
  }),
]
