interface DragState {
  isDrop: boolean
}

export const defaulState: DragState = { isDrop: false }

export enum ActionType {
  ON_DROP = 'ON_DROP',
}

interface OnDropAction {
  type: ActionType.ON_DROP
  payload: null
}

type Action = OnDropAction

export function reducer(state: DragState, action: Action): DragState {
  switch (action.type) {
    case ActionType.ON_DROP:
      return { isDrop: true }
    default:
      throw new Error()
  }
}
