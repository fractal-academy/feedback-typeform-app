import { useContext } from 'react'
import { TypeformConfigurationContext } from './TypeformConfigurationContext'

export const useTypeformConfiguration = () =>
  useContext(TypeformConfigurationContext)
