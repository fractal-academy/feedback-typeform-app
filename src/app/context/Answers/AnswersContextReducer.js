import ANSWERS_DISPATCH_EVENTS from './DispatchEventsTypes'

const AnswersContextReducer = (state, action) => {
  switch (action.type) {
    case ANSWERS_DISPATCH_EVENTS.ADD_RESPONSE:
      return { ...state, [action.payload.questionId]: action.payload }
    default:
      return state
  }
}

export default AnswersContextReducer