import { Box, Container, Text, TextArea } from '@qonsoll/react-design'
import { Form, message } from 'antd'
import React, { useRef } from 'react'

import PropTypes from 'prop-types'
import { SubmitButton } from '../../components'
import { TEXTINGS } from '../../constants'
import { useKeyPress } from '@umijs/hooks'
import { useTranslation } from '../../context/Translation'

function LongText(props) {
  const { textAreaProps, onClick, question, currentSlide } = props

  // [ADDITIONAL HOOKS]
  const [form] = Form.useForm()
  const { longTextHint, requiredAnswerMessage, textQuestionPlaceholder } =
    useTranslation()
  const IsntDesktop = window.innerWidth >= 1024
  const textAreaRef = useRef()

  useKeyPress(
    (e) =>
      //if pressed enter without shift and this event on this question slide - dispatch second callback
      e.keyCode === 13 && !e.shiftKey && currentSlide === question?.order,
    (e) => {
      if (e.type === 'keyup') {
        onPressOk()
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

  // [CLEAN FUNCTIONS]
  const onFinish = ({ answer }) => {
    const data = { question, answer: { value: answer || '' } }
    onClick && onClick(data)
    textAreaRef.current.blur()
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  // [COMPUTED_PROPERTIES]
  const explanation = longTextHint || TEXTINGS.longTextHint

  const onPressOk = () => {
    //get values from form to check if there is any answer data
    //.trim() removes all useless spaces to prevent submit with only spaces
    const value = form.getFieldsValue()?.answer?.trim()
    //if required and empty answer - error message, else form submit and set data to context
    if (question?.isRequired && !value) {
      message.error(requiredAnswerMessage || TEXTINGS.requiredAnswerMessage)
    } else {
      form.submit()
    }
  }

  const onFocusedKeyPress = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      //Prevent line brake onEnter
      e.preventDefault()
    }
  }

  // THIS CODE ruining form on form view from android devices (inputs grab focus even on blur) - work fine on iPhones and MiBrowser
  // useEffect(
  // () =>
  //when question was skipped by navigation buttons and input was focused - reset focus
  // currentSlide === question?.order && textAreaRef?.current
  //   ? textAreaRef?.current?.focus?.()
  //   : textAreaRef?.current?.blur?.(),
  // [currentSlide]
  // )
  // THIS CODE ruining form on form view from android devices (inputs grab focus even on blur) - work fine on iPhones and MiBrowser

  return (
    <Container>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: '100%' }}>
        <Form.Item name="answer" rules={[{ required: question?.isRequired }]}>
          <TextArea
            {...textAreaProps}
            bordered
            ref={textAreaRef}
            maxLength={1000}
            autoSize={{ minRows: 1, maxRows: 4 }}
            placeholder={`${
              textQuestionPlaceholder || TEXTINGS.textQuestionPlaceholder
            }...`}
            onPressEnter={onFocusedKeyPress}
            disabled={!onClick}
          />
        </Form.Item>
        {IsntDesktop && (
          <Form.Item>
            <Text>{explanation}</Text>
          </Form.Item>
        )}
      </Form>
      <Box mt={4}>
        <SubmitButton onClick={onPressOk} disablePressEnter />
      </Box>
    </Container>
  )
}

LongText.propTypes = {
  textAreaProps: PropTypes.object,
  onClick: PropTypes.func
}

export default LongText
