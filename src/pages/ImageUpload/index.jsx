import React from 'react'

import Header from '@/components/Header'
import { Page } from '@/components/Page'

async function handleSubmit(e) {
  // ブラウザのデフォルトのForm Submit挙動をキャンセル
  e.preventDefault()

  // Formからinput要素を取得
  const form = e.currentTarget
  const fileInput = form.querySelector('input[type="file"]')
  const descriptionInput = form.querySelector('textarea[name="description"]')

  const file = fileInput.files[0]
  const description = descriptionInput.value

  // 画像をFormData形式に変換
  const data = new FormData()
  data.append('file', file)
  data.append('upload_preset', 'sikfit')

  // クラウドストレージサービスに画像をアップロード
  const cloundResponse = await fetch(
    'https://api.cloudinary.com/v1_1/dqbtfiztl/image/upload',
    {
      method: 'POST',
      body: data,
    },
  )

  // クラウドストレージサービスから返ってきたデータを取得
  const uploadFile = await cloundResponse.json()

  // クラウドストレージサービスにアップロードされたファイルにアクスセスする為のURLが返却されるので、
  // 自社のプロダクトのDBにはそのURLを保存する
  const res = await fetch('/api/imageUpload', {
    headers: { 'content-type': 'application/json' },
    method: 'POST',
    body: {
      image: uploadFile.secure_url,
      largeImage: uploadFile.eager[0].secure_url,
      description: description,
    },
  })

  res.message === 'ok' ? alert('Image Uploaded!') : alert('Upload Failed!')
}
const ImageUpload = () => {
  return (
    <Page.Container>
      <Header>
        <Header.H1>ImageUpload</Header.H1>
      </Header>
      <div className="w-full grid place-content-center">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <label htmlFor="file" className="flex gap-4 items-baseline">
            Image
            <input
              type="file"
              id="file"
              name="file"
              placeholder="Upload an image"
              required
              accept="image/png, image/jpeg, image/jpg, image/gif"
            />
          </label>

          <label htmlFor="description" className="flex gap-4 items-baseline">
            Description
            <textarea
              id="description"
              name="description"
              placeholder="Enter A Description"
              required
            />
          </label>

          <button type="submit" className="p-2 border rounded border-slate-400">
            Submit
          </button>
        </form>
      </div>
    </Page.Container>
  )
}

export default ImageUpload
