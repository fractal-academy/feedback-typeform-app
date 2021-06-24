import React from 'react'
import { DatePicker, message } from 'antd'
import { useKeyPress } from '@umijs/hooks'
import { useTranslation } from '../../context/Translation'

const DateTimeInput = (props) => {
  const { onDateChange, question, currentSlide } = props

  // [CLEAN FUNCTIONS]
  const onChange = (date, dateString) => {
    const data = { question, answer: { value: dateString } }
    !!dateString && onDateChange && onDateChange(data)
  }
  //[CUSTOM HOOKS]
  const { answerRequiredMessageError } = useTranslation()

  // [ADDITIONAL_HOOKS]
  useKeyPress(
    (event) => event.keyCode === 13 && currentSlide === question?.order,
    (event) => {
      if (event.type === 'keyup') {
        const answerData = { question, answer: { value: '' } }

        !question?.isRequired
          ? onDateChange && onDateChange(answerData)
          : message.error(
              answerRequiredMessageError ||
                'It`s required question, please answer'
            )
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

  return <DatePicker onChange={onChange} disabled={!onDateChange} {...props} />
}

export default DateTimeInput