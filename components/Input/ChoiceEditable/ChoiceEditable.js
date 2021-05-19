import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import theme from 'app/styles/theme'
import {
  styles,
  LetterBox,
  DeleteButton,
  ChoiceInput
} from './ChoiceEditable.styles'
import { DEFAULT_IMAGE } from 'app/constants'
import { Row, Col, Box } from '@qonsoll/react-design'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { MediaLibraryModal } from 'domains/MediaLibrary/components'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from 'app/context/CurrentQuestion'

let startLetter = 65

function ChoiceEditable(props) {
  const { index, data, withImage } = props

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPONENT STATE HOOKS]
  const [value, setValue] = useState(data?.name)

  // [COMPUTED PROPERTIES]
  const choiceProps = currentQuestion.btnProps
  const letter = String.fromCharCode(startLetter + index)
  const bgImage = `url(${data?.image || DEFAULT_IMAGE})`

  // [CLEAN FUNCTIONS]
  const onChange = (e) => {
    setValue(e.target.value)
  }
  const onBlur = async () => {
    //if the value has not changed do nothing, reduce the number of queries to the database
    if (choiceProps[index].name === value) return
    // update the choice we need
    choiceProps[index].name = value
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { btnProps: choiceProps }
    })
  }
  const onDelete = async () => {
    //remove item from array with 'index' position,
    //'1' - amount of deleted elements from index position till the end(check how splice works for details)
    choiceProps.splice(index, 1)
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { btnProps: choiceProps }
    })
  }
  const onMediaModalContinue = (selectedImage) => {
    choiceProps[index].image = selectedImage
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { btnProps: choiceProps }
    })
  }
  // [USE_EFFECTS]
  useEffect(() => {
    //update text area value when delete element
    setValue(data?.name)
  }, [data])

  return (
    <Box
      bg={theme.color.primary.lighten6}
      borderRadius={theme.borderRadius.md}
      width={withImage ? 'auto' : '150px'}
      m={1}
      position="relative">
      {withImage && (
        <Box {...styles.MediaBox} backgroundImage={bgImage}>
          <MediaLibraryModal
            btnProps={{
              type: 'primary',
              icon: <EditOutlined style={styles.btnStyle} />
            }}
            onContinue={onMediaModalContinue}
          />
        </Box>
      )}
      <Row noGutters mx={2}>
        <Col cw="auto" v="center">
          <LetterBox>{letter}</LetterBox>
        </Col>
        <Col width={withImage ? '130px' : '100px'}>
          <ChoiceInput
            value={value}
            onBlur={onBlur}
            placeholder={`choice ${index}`}
            autoSize={{ minRows: 1, maxRows: 6 }}
            bordered={false}
            onChange={onChange}
          />
        </Col>
      </Row>
      <DeleteButton onClick={onDelete}>
        <CloseOutlined />
      </DeleteButton>
    </Box>
  )
}

ChoiceEditable.propTypes = {
  index: PropTypes.number,
  data: PropTypes.object,
  withImage: PropTypes.bool
}

export default ChoiceEditable
