import React from 'react'

import ConversationList from './ConversationList'
import ConversationThread from './ConversationThread'
import type { Conversation, Message } from './types'

interface MessagesProps {
  conversations: Conversation[]
  selectedConversationId?: string
  selectedConversationMessages?: Message[]
  onSelectConversation: (conversationId: string) => void
  onSendMessage: (
    conversationId: string,
    content: string,
    images?: string[],
    links?: Array<{ url: string; title: string }>
  ) => void
  onCreateConversation?: () => void
  currentUserId: string
}

const Messages: React.FC<MessagesProps> = ({
  conversations,
  selectedConversationId,
  selectedConversationMessages = [],
  onSelectConversation,
  onSendMessage,
  onCreateConversation,
  currentUserId,
}) => {
  const selectedConversation = selectedConversationId
    ? conversations.find((c) => c.id === selectedConversationId)
    : null

  if (selectedConversation) {
    return (
      <ConversationThread
        participant={selectedConversation.participant}
        messages={selectedConversationMessages}
        onBack={() => onSelectConversation('')}
        onSendMessage={(content, images, links) => {
          if (selectedConversationId) {
            onSendMessage(selectedConversationId, content, images, links)
          }
        }}
        currentUserId={currentUserId}
      />
    )
  }

  return (
    <ConversationList
      conversations={conversations}
      onSelectConversation={onSelectConversation}
      onCreateConversation={onCreateConversation}
    />
  )
}

export default Messages

