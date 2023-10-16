export enum ActionType {
  ON_DRAG = 'ON_DRAG',
  ON_DRAG_START = 'ON_DRAG_START',
  ON_DRAG_END = 'ON_DRAG_END',
  ON_DRAG_ENTER = 'ON_DRAG_ENTER',
  ON_DRAG_OVER = 'ON_DRAG_OVER',
  ON_DRAG_LEAVE = 'ON_DRAG_LEAVE',
  ON_DROP = 'ON_DROP',
}
/* eslint-enable no-unused-vars */

type DragEventState =
  | ActionType.ON_DRAG
  | ActionType.ON_DRAG_START
  | ActionType.ON_DRAG_END
  | ActionType.ON_DRAG_ENTER
  | ActionType.ON_DRAG_OVER
  | ActionType.ON_DRAG_LEAVE
  | ActionType.ON_DROP

interface DragEventHandlerAction {
  type: DragEventState
}

interface OnDragAction extends DragEventHandlerAction {
  payload: null
  type: ActionType.ON_DRAG
}

interface OnDragStartAction extends DragEventHandlerAction {
  payload: null
  type: ActionType.ON_DRAG_START
}

interface OnDragEndAction extends DragEventHandlerAction {
  payload: null
  type: ActionType.ON_DRAG_END
}

interface OnDragEnterAction extends DragEventHandlerAction {
  payload: null
  type: ActionType.ON_DRAG_ENTER
}

interface OnDragOverAction extends DragEventHandlerAction {
  payload: null
  type: ActionType.ON_DRAG_OVER
}

interface OnDragLeaveAction extends DragEventHandlerAction {
  payload: null
  type: ActionType.ON_DRAG_LEAVE
}

interface OnDropAction extends DragEventHandlerAction {
  payload: null
  type: ActionType.ON_DROP
}

type UseReducerAction =
  | OnDragAction
  | OnDragStartAction
  | OnDragEndAction
  | OnDragEnterAction
  | OnDragOverAction
  | OnDragLeaveAction
  | OnDropAction

interface UseReducerState {
  dragEventState: DragEventState | null
  isDrop: boolean
}

export const defaulState: UseReducerState = {
  dragEventState: null,
  isDrop: false,
}

export function reducer(
  state: UseReducerState,
  action: UseReducerAction,
): UseReducerState {
  switch (action.type) {
    case ActionType.ON_DRAG:
      return { ...state, dragEventState: ActionType.ON_DRAG }
    case ActionType.ON_DRAG_START:
      return { ...state, dragEventState: ActionType.ON_DRAG_START }
    case ActionType.ON_DRAG_ENTER:
      return { ...state, dragEventState: ActionType.ON_DRAG_ENTER }
    case ActionType.ON_DRAG_END:
      return { ...state, dragEventState: ActionType.ON_DRAG_END }
    case ActionType.ON_DRAG_OVER:
      return { ...state, dragEventState: ActionType.ON_DRAG_OVER }
    case ActionType.ON_DRAG_LEAVE:
      return {
        ...state,
        dragEventState: ActionType.ON_DRAG_LEAVE,
        isDrop: false,
      }
    case ActionType.ON_DROP:
      return { ...state, dragEventState: ActionType.ON_DROP, isDrop: true }
    default:
      throw new Error('Invalid Action!')
  }
}
