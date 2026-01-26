import { Heart } from 'lucide-react'
import { useOptimistic, useTransition } from 'react'

interface LikeButtonProps {
  postId: number
  likes: number
  liked: boolean
  onLike: (postId: number) => Promise<void>
}

/**
 * LikeButton component demonstrating React 19's useOptimistic hook
 *
 * This component shows how useOptimistic enables instant UI feedback
 * while waiting for the server response. The API has a 1000ms delay
 * to make the optimistic update effect clearly visible.
 *
 * @param postId - The ID of the post to like/unlike
 * @param likes - Current number of likes
 * @param liked - Whether the current user has liked this post
 * @param onLike - Async callback to handle the like action
 *
 * @example
 * <LikeButton
 *   postId={1}
 *   likes={42}
 *   liked={false}
 *   onLike={handleLike}
 * />
 */
export function LikeButton({ postId, likes, liked, onLike }: LikeButtonProps) {
  const [isPending, startTransition] = useTransition()

  /**
   * useOptimistic hook usage:
   * - First argument: actual state from server
   * - Second argument: reducer function to compute optimistic state
   *
   * The optimistic state is displayed immediately when setOptimistic is called,
   * and automatically reverts to actual state when the transition completes
   * (either success or error).
   */
  const [optimisticState, setOptimistic] = useOptimistic(
    { likes, liked },
    (currentState, _action: 'toggle') => ({
      likes: currentState.liked ? currentState.likes - 1 : currentState.likes + 1,
      liked: !currentState.liked,
    })
  )

  /**
   * Handle click event
   * Uses startTransition to wrap the async action, enabling optimistic updates
   */
  const handleClick = () => {
    startTransition(async () => {
      // Apply optimistic update immediately
      setOptimistic('toggle')

      // Wait for server response (1000ms delay in MSW handler)
      // If this fails, React automatically reverts to the actual state
      await onLike(postId)
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
        text-sm font-medium transition-all duration-200
        ${
          optimisticState.liked
            ? 'bg-red-100 text-red-600 hover:bg-red-200'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
        ${isPending ? 'opacity-70 cursor-wait' : 'cursor-pointer'}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
      `}
      aria-label={optimisticState.liked ? 'Unlike this post' : 'Like this post'}
      aria-pressed={optimisticState.liked}
    >
      <Heart
        className={`w-4 h-4 transition-all duration-200 ${
          optimisticState.liked ? 'fill-red-500 text-red-500' : 'fill-none'
        }`}
      />
      <span className="tabular-nums">{optimisticState.likes}</span>
      {isPending && (
        <span className="ml-1 text-xs text-gray-400">(syncing...)</span>
      )}
    </button>
  )
}
