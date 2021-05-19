import React, { useReducer } from 'react'
import CurrentQuestionContextReducer from './CurrentQuestionContextReducer'
import PropTypes from 'prop-types'

export const CurrentQuestionContext = React.createContext()
export const CurrentQuestionContextDispatch = React.createContext()

const CurrentQuestionContextProvider = (props) => {
  const { children } = props
  const [currentQuestion, dispatch] = useReducer(
    CurrentQuestionContextReducer,
    {}
  )

  return (
    <CurrentQuestionContextDispatch.Provider value={dispatch}>
      <CurrentQuestionContext.Provider value={currentQuestion}>
        {children}
      </CurrentQuestionContext.Provider>
    </CurrentQuestionContextDispatch.Provider>
  )
}

CurrentQuestionContextProvider.propTypes = {
  children: PropTypes.node
}

export default CurrentQuestionContextProvider
