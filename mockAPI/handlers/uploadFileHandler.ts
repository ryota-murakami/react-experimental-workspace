import type { ResponseResolver } from 'msw'
import { HttpResponse } from 'msw'

/**
 * アップロードされたファイルの情報を表す型
 */
export type UploadedFile = {
  /** ファイルID */
  id: number
  /** ファイル名 */
  filename: string
  /** ファイルのURL */
  url: string
}

/**
 * ファイルアップロードAPIのレスポンス型
 */
export type UploadFileResponse = {
  /** アップロードの成功/失敗 */
  success: boolean
  /** レスポンスメッセージ */
  message: string
  /** アップロードされたファイルのデータ */
  data?: {
    /** アップロードされたファイルの一覧 */
    files: UploadedFile[]
  }
} 


export const uploadFileHandler: ResponseResolver = async ({ request }) => {
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
}
