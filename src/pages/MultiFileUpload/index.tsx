import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Image, FileText, X } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Header from '@/components/Header'
import { Page } from '@/components/Page'
import FileUploadZone from '@/pages/MultiFileUpload/FileUploadZone'
import type { UploadFileResponse } from 'mockAPI/handlers/uploadFileHandler'

// Define Zod validation schema
const uploadFilesSchema = z.object({
  uploadFiles: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: 'Please select at least one file.',
    })
    .refine((files) => files.length <= 10, {
      message: 'You can upload up to 10 files at once.',
    })
    .refine(
      (files) => {
        return Array.from(files).every((file) => file.size <= 5 * 1024 * 1024)
      },
      {
        message: 'Each file must be 5MB or smaller.',
      },
    ),
})

// Type definition
type UploadFilesFormValues = z.infer<typeof uploadFilesSchema>

const FileUpload: React.FC = () => {
  const [uploadResult, setUploadResult] = useState<UploadFileResponse | null>(
    null,
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm<UploadFilesFormValues>({
    resolver: zodResolver(uploadFilesSchema),
    defaultValues: {
      uploadFiles: new DataTransfer().files,
    },
  })

  // Get real-time file list
  const files = watch('uploadFiles')

  // File removal
  const handleFileRemove = (index: number) => {
    // Get current file list
    const currentFiles = getValues('uploadFiles')
    if (!currentFiles) return

    // Create new FileList excluding the file to be removed
    const dataTransfer = new DataTransfer()
    Array.from(currentFiles).forEach((file, i) => {
      if (i !== index) {
        dataTransfer.items.add(file)
      }
    })

    // Update react-hook-form value
    setValue('uploadFiles', dataTransfer.files)
  }

  const onSubmit = async (data: UploadFilesFormValues) => {
    try {
      setUploadResult(null)

      const formData = new FormData()
      Array.from(data.uploadFiles).forEach((file, index) => {
        formData.append(`uploadFile${index}`, file as Blob)
      })

      const { data: response } = await axios.post<UploadFileResponse>(
        '/api/v1/uploadFiles',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      setUploadResult({
        success: response.success,
        message: response.message,
      })

      // Reset form
      reset()
    } catch (error) {
      console.error('Upload error:', error)
      setUploadResult({
        success: false,
        message: 'An error occurred during upload',
      })
    }
  }

  return (
    <Page.Container>
      <Header>
        <Header.H1>MultiFileUpload</Header.H1>
      </Header>
      <div className="mx-auto w-full max-w-md p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* File upload */}
          <div className="space-y-2">
            <label htmlFor="uploadFiles" className="block text-sm font-medium">
              Images, Excel, Word (up to 10 files)
            </label>
            <FileUploadZone
              accept="image/jpeg,image/jpg,image/png,image/gif,.xlsx,.xls,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              multiple
              onFilesSelected={(files) => {
                setValue('uploadFiles', files)
              }}
              {...register('uploadFiles')}
            />
            {errors.uploadFiles && (
              <p className="text-sm text-red-500">
                {errors.uploadFiles.message}
              </p>
            )}
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium">File List</p>
              <ul className="space-y-2">
                {Array.from(files).map((file, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="flex items-center">
                      {/* Display icon based on file type */}
                      {file.name.endsWith('.jpg') ||
                      file.name.endsWith('.jpeg') ||
                      file.name.endsWith('.png') ||
                      file.name.endsWith('.gif') ? (
                        <Image className="mr-2 h-4 w-4" />
                      ) : null}
                      {file.name.endsWith('.xlsx') ? (
                        <FileText className="mr-2 h-4 w-4" />
                      ) : null}
                      {file.name.endsWith('.docx') ? (
                        <FileText className="mr-2 h-4 w-4" />
                      ) : null}
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleFileRemove(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none disabled:bg-blue-300"
          >
            {isSubmitting ? 'Uploading...' : 'Upload'}
          </button>
        </form>

        {/* Result message */}
        {uploadResult && (
          <div
            className={`mt-4 rounded p-3 ${
              uploadResult.success
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
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
