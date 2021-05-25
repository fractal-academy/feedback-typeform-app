import React, {useReducer} from 'react'

export const TypeformConfigurationContext = React.createContext()


const TypeformConfigurationProvider = (props) => {
  const { children, firebase } = props

  return (
    <TypeformConfigurationContext.Provider value={firebase}>
        {children}
    </TypeformConfigurationContext.Provider>
  )
}

export default TypeformConfigurationProvider
