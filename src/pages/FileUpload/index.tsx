import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'

import Header from '@/components/Header'
import { Page } from '@/components/Page'

// Zodバリデーションスキーマの定義
const thumbnailSchema = z.object({
  thumbnail: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: 'サムネイル画像を選択してください。',
    })
    .refine((files) => files[0].size <= 5 * 1024 * 1024, {
      message: 'ファイルサイズは5MB以下にしてください。',
    })
    .refine(
      (files) => 
        ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(
          files[0].type
        ),
      {
        message: 'JPG、PNG、GIF形式のファイルを選択してください。',
      }
    ),
  title: z.string().min(1, 'タイトルを入力してください'),
})

// 型定義
type ThumbnailFormValues = z.infer<typeof thumbnailSchema>

const FileUpload: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadResult, setUploadResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ThumbnailFormValues>({
    resolver: zodResolver(thumbnailSchema),
  })

  // ファイル選択時にプレビュー表示
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
  }

  const onSubmit = async (data: ThumbnailFormValues) => {
    try {
      setIsSubmitting(true)
      setUploadResult(null)
      
      const file = data.thumbnail[0]
      const formData = new FormData()
      formData.append('thumbnail', file)
      formData.append('title', data.title)
      
      const response = await axios.post('/api/thumbnailUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      setUploadResult({
        success: true,
        message: 'サムネイルが正常にアップロードされました',
      })
      
      // フォームとプレビューのリセット
      reset()
      setPreviewUrl(null)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadResult({
        success: false,
        message: 'アップロード中にエラーが発生しました',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Page.Container>
      <Header>
        <Header.H1>サムネイルアップロード</Header.H1>
      </Header>
      <div className="w-full max-w-md mx-auto p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* タイトル入力 */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">
              タイトル
            </label>
            <input
              id="title"
              type="text"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              {...register('title')}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* サムネイルアップロード */}
          <div className="space-y-2">
            <label htmlFor="thumbnail" className="block text-sm font-medium">
              サムネイル画像
            </label>
            <input
              id="thumbnail"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              {...register('thumbnail')}
              onChange={handleFileChange}
            />
            {errors.thumbnail && (
              <p className="text-sm text-red-500">{errors.thumbnail.message}</p>
            )}
          </div>

          {/* プレビュー */}
          {previewUrl && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">プレビュー</p>
              <img
                src={previewUrl}
                alt="プレビュー"
                className="w-full max-h-64 object-contain rounded border border-gray-300"
              />
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
