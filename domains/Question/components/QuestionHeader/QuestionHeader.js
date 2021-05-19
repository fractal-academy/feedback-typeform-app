import PropTypes from 'prop-types'
import { TextEditable } from 'components'
import { useState, useEffect } from 'react'
import { Row, Col } from '@qonsoll/react-design'
import {
  useCurrentQuestionContextDispatch,
  useCurrentQuestionContext,
  DISPATCH_EVENTS
} from 'app/context/CurrentQuestion'

function QuestionHeader(props) {
  const { titlePlaceholder, subtitlePlaceholder } = props

  // [CUSTOM HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPONENT STATE HOOKS]
  const [titleText, setTitleText] = useState()
  const [subtitleText, setSubtitleText] = useState(
    currentQuestion?.subtitle || ''
  )

  // [CLEAN FUNCTIONS]
  const onTitleBlur = async () => {
    if (currentQuestion?.title === titleText) return

    const title = titleText || ''
    await currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { title }
    })
  }
  const onSubtitleBlur = async () => {
    if (currentQuestion?.subtitle === subtitleText) return

    const subtitle = subtitleText || ''
    await currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { ...currentQuestion, subtitle }
    })
  }
  const onTitleChange = ({ target }) => {
    setTitleText(target.value)
  }
  const onSubtitleChange = ({ target }) => {
    setSubtitleText(target.value)
  }

  // [USE_EFFECTS]
  useEffect(() => {
    setTitleText(currentQuestion?.title || '')
    setSubtitleText(currentQuestion?.subtitle || '')
  }, [currentQuestion])

  return (
    <>
      <Row noGutters>
        <Col>
          <TextEditable
            isTitle
            onBlur={onTitleBlur}
            value={titleText}
            onChange={onTitleChange}
            placeholder={titlePlaceholder}
            {...props}
          />
        </Col>
      </Row>
      <Row noGutters>
        <Col>
          <TextEditable
            textSecondary
            onBlur={onSubtitleBlur}
            value={subtitleText}
            onChange={onSubtitleChange}
            placeholder={subtitlePlaceholder}
          />
        </Col>
      </Row>
    </>
  )
}

QuestionHeader.propTypes = {
  titlePlaceholder: PropTypes.string,
  subtitlePlaceholder: PropTypes.string
}

export default QuestionHeader
