import { MessageSquare, Plus } from 'lucide-react'
import React from 'react'


import { Button } from '@/components/ui/button'

import ConversationCard from './ConversationCard'
import type { Conversation } from './types'

interface ConversationListProps {
  conversations: Conversation[]
  onSelectConversation: (conversationId: string) => void
  onCreateConversation?: () => void
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  onSelectConversation,
  onCreateConversation,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Messages</h2>
          <p className="text-sm text-muted-foreground mt-1">Your conversations</p>
        </div>
        {onCreateConversation && (
          <Button onClick={onCreateConversation} size="lg" className="min-h-[44px]">
            <Plus className="w-5 h-5 mr-2" />
            New Message
          </Button>
        )}
      </div>

      {/* Conversations */}
      {conversations.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No conversations yet</p>
          <p className="text-sm mt-2">Start a conversation with your friends!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {conversations.map((conversation) => (
            <ConversationCard
              key={conversation.id}
              conversation={conversation}
              onClick={() => onSelectConversation(conversation.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ConversationList

