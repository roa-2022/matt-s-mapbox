import { ADD_FRUIT, SET_FRUITS } from '../actions/index'

const initialState = []

const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_FRUITS:
      return payload
    case ADD_FRUIT:
      return [...state, payload]
    default:
      return state
  }
}

export default reducer
