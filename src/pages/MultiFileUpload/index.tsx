import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'

import Header from '@/components/Header'
import { Page } from '@/components/Page'

// Zodバリデーションスキーマの定義
const thumbnailSchema = z.object({
  thumbnails: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: '画像を選択してください。',
    })
    .refine((files) => files.length <= 10, {
      message: '一度にアップロードできるのは10個までです。',
    })
    .refine((files) => {
      return Array.from(files).every((file) => file.size <= 5 * 1024 * 1024)
    }, {
      message: '各ファイルのサイズは5MB以下にしてください。',
    })
})

// 型定義
type ThumbnailFormValues = z.infer<typeof thumbnailSchema>

const FileUpload: React.FC = () => {
  // const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [uploadResult, setUploadResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ThumbnailFormValues>({
    resolver: zodResolver(thumbnailSchema),
  })

  // ファイル選択時にプレビュー表示
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file))
      setPreviewUrls(urls)
    } else {
      setPreviewUrls([])
    }
  }

  const onSubmit = async (data: ThumbnailFormValues) => {
    try {
      setUploadResult(null)
      
      const formData = new FormData()
      Array.from(data.thumbnails).forEach((file, index) => {
        formData.append(`thumbnail${index}`, file)
      })
      
      const response = await axios.post('/api/thumbnailUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      setUploadResult({
        success: true,
        message: '画像が正常にアップロードされました',
      })
      
      // フォームとプレビューのリセット
      reset()
      setPreviewUrls([])
    } catch (error) {
      console.error('Upload error:', error)
      setUploadResult({
        success: false,
        message: 'アップロード中にエラーが発生しました',
      })
    }
  }

  return (
    <Page.Container>
      <Header>
        <Header.H1>MultiFileUpload</Header.H1>
      </Header>
      <div className="w-full max-w-md mx-auto p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* サムネイルアップロード */}
          <div className="space-y-2">
            <label htmlFor="thumbnails" className="block text-sm font-medium">
              画像（最大10枚まで）
            </label>
            <input
              id="thumbnails"
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/gif"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              {...register('thumbnails')}
              onChange={handleFileChange}
            />
            {errors.thumbnails && (
              <p className="text-sm text-red-500">{errors.thumbnails.message}</p>
            )}
          </div>

          {/* プレビュー */}
          {previewUrls.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">プレビュー</p>
              <div className="grid grid-cols-2 gap-2">
                {previewUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`プレビュー ${index + 1}`}
                    className="w-full h-32 object-cover rounded border border-gray-300"
                  />
                ))}
              </div>
            </div>
          )}

          {/* 送信ボタン */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none disabled:bg-blue-300"
          >
            {isSubmitting ? 'アップロード中...' : 'アップロード'}
          </button>
        </form>

        {/* 結果メッセージ */}
        {uploadResult && (
          <div
            className={`mt-4 p-3 rounded ${
              uploadResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {uploadResult.message}
          </div>
        )}
      </div>
    </Page.Container>
  )
}

export default FileUpload
