import { Plus, X } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'


interface HobbiesEditorProps {
  hobbies: string[]
  onChange: (hobbies: string[]) => void
  maxHobbies?: number
}

const HobbiesEditor: React.FC<HobbiesEditorProps> = ({
  hobbies,
  onChange,
  maxHobbies = 10,
}) => {
  const [inputValue, setInputValue] = useState('')

  const handleAdd = () => {
    const trimmed = inputValue.trim()
    if (
      trimmed &&
      !hobbies.includes(trimmed) &&
      hobbies.length < maxHobbies &&
      trimmed.length <= 30
    ) {
      onChange([...hobbies, trimmed])
      setInputValue('')
    }
  }

  const handleRemove = (hobby: string) => {
    onChange(hobbies.filter((h) => h !== hobby))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {hobbies.map((hobby) => (
          <span
            key={hobby}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
          >
            {hobby}
            <button
              onClick={() => handleRemove(hobby)}
              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors min-w-[20px] min-h-[20px] flex items-center justify-center"
              aria-label={`Remove ${hobby}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      {hobbies.length < maxHobbies && (
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a hobby..."
            maxLength={30}
            className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-sm min-h-[44px]"
          />
          <Button
            type="button"
            onClick={handleAdd}
            disabled={!inputValue.trim() || hobbies.length >= maxHobbies}
            size="lg"
            className="min-h-[44px] min-w-[44px] px-4"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      )}
      {hobbies.length >= maxHobbies && (
        <p className="text-xs text-muted-foreground">Maximum {maxHobbies} hobbies reached</p>
      )}
    </div>
  )
}

export default HobbiesEditor

