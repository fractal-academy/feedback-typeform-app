import { useContext } from 'react'
import {
  CurrentQuestionContext,
  CurrentQuestionContextDispatch
} from './CurrentQuestionContext'

export const useCurrentQuestionContext = () =>
  useContext(CurrentQuestionContext)
export const useCurrentQuestionContextDispatch = () =>
  useContext(CurrentQuestionContextDispatch)
