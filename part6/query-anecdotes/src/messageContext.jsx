import { createContext } from "react";

export const messageReducer = (state, action) => {
  switch(action.type) {
    case 'VOTE':
      return action.payload
    case 'NEW':
      return action.payload
    case 'ERROR':
      return action.payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

const MessageContext = createContext()

export default MessageContext