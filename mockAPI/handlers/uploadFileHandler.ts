import type { ResponseResolver } from 'msw'
import { HttpResponse } from 'msw'

/**
 * Type representing uploaded file information
 */
export type UploadedFile = {
  /** File ID */
  id: number
  /** File name */
  filename: string
  /** File URL */
  url: string
}

/**
 * Response type for file upload API
 */
export type UploadFileResponse = {
  /** Upload success/failure */
  success: boolean
  /** Response message */
  message: string
  /** Uploaded file data */
  data?: {
    /** List of uploaded files */
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

    console.log('Multiple file upload:', {
      fileCount: uploadedFiles.length,
      files: uploadedFiles,
    })

    // Simulate actual upload process
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          HttpResponse.json(
            {
              success: true,
              message: `Successfully uploaded ${uploadedFiles.length} files`,
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
      }, 800) // Add 0.8 second delay to simulate upload process
    })
  } catch (error) {
    console.error('File upload error:', error)
    return HttpResponse.json(
      {
        success: false,
        message: 'Failed to upload files',
      },
      { status: 500 },
    )
  }
}
