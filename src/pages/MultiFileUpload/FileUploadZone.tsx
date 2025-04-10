import {
  useState,
  useId,
  type DragEvent,
  type ChangeEvent,
  type ComponentProps,
} from 'react'
import { Upload } from 'lucide-react'

type FileUploadZoneProps = {
  onFilesSelected: (files: FileList) => void
} & Omit<ComponentProps<'input'>, 'id' | 'type' | 'className'>

export default function FileUploadZone({
  onFilesSelected,
  accept = '*',
  ...props
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const id = useId()

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    onFilesSelected(e.dataTransfer.files)
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(e.target.files)
    }
  }

  const openFileSelector = () => {
    document.getElementById(`${id}-file-input`)?.click()
  }

  return (
    <div
      className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
        isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={openFileSelector}
    >
      <input
        id={`${id}-file-input`}
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
        accept={accept}
        {...props}
      />
      <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
      <p className="mb-1 text-gray-700">
        Drop files here or click to select files
      </p>
      <p className="text-sm text-gray-500">You can select multiple files.</p>
    </div>
  )
}
