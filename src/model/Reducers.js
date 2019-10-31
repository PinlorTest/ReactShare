import { CHANGE_VALUE } from "./Actions"

// Reducers
const initialState = {
  value: 0
}

export function changeValueRC(state = initialState, action) {
  switch (action.type) {
    case CHANGE_VALUE:
      return { ...state, value: state.value + action.value }
    default:
      return state
  }
}

export default { changeValueRC }
