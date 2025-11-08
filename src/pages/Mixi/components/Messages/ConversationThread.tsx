
import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useRef } from 'react'

import MessageBubble from './MessageBubble'
import MessageComposer from './MessageComposer'
import type { Message } from './types'

interface ConversationThreadProps {
  participant: {
    id: string
    name: string
    avatar: string
  }
  messages: Message[]
  onBack: () => void
  onSendMessage: (content: string, images?: string[], links?: Array<{ url: string; title: string }>) => void
  currentUserId: string
}

const ConversationThread: React.FC<ConversationThreadProps> = ({
  participant,
  messages,
  onBack,
  onSendMessage,
  currentUserId,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-[calc(100vh-300px)] max-h-[600px] bg-card rounded-xl shadow-sm border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border flex-shrink-0">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <img
          src={participant.avatar}
          alt={participant.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{participant.name}</h3>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <p className="text-lg">No messages yet</p>
              <p className="text-sm mt-2">Start the conversation!</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.sender.id === currentUserId}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Composer */}
      <MessageComposer onSend={onSendMessage} />
    </div>
  )
}

export default ConversationThread

