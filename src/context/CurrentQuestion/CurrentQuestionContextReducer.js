import DISPATCH_EVENTS from './DispatchEventsTypes'

const CurrentQuestionContextReducer = (state, action) => {
  switch (action.type) {
    case DISPATCH_EVENTS.SET_CURRENT_QUESTION_TO_STATE:
      return action.payload
    case DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION:
      return { ...state, ...action.payload }
    case DISPATCH_EVENTS.CHANGE_CURRENT_QUESTION:
      return action.payload
    default:
      return state
  }
}

export default CurrentQuestionContextReducer
