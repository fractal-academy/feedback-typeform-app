import React from 'react'
import { DatePicker, message } from 'antd'
import { useKeyPress } from '@umijs/hooks'

const DateTimeInput = (props) => {
  const { onDateChange, question, currentSlide } = props

  // [CLEAN FUNCTIONS]
  const onChange = (date, dateString) => {
    const data = { question, answer: { value: dateString } }
    !!dateString && onDateChange && onDateChange(data)
  }

  // [ADDITIONAL_HOOKS]
  useKeyPress(
    (event) => event.keyCode === 13 && currentSlide === question?.order,
    (event) => {
      if (event.type === 'keyup') {
        const answerData = { question, answer: { value: '' } }

        !question?.isRequired
          ? onDateChange && onDateChange(answerData)
          : message.error('It`s required question, please answer')
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

  return <DatePicker onChange={onChange} {...props} />
}

export default DateTimeInput
