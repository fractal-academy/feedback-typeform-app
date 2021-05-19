import PropTypes from 'prop-types'
import { ChoiceEditable } from 'components'
import { Box } from '@qonsoll/react-design'
import { PlusOutlined } from '@ant-design/icons'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from 'app/context/CurrentQuestion'
import { styles } from './ChoiceEditableGroup.styles'

function ChoiceEditableGroup(props) {
  const { withImage } = props

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPUTED PROPERTIES]
  const choiceProps = currentQuestion.btnProps || []

  // [CLEAN FUNCTIONS]
  const onAddChoice = () => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: {
        btnProps: choiceProps
          ? [...choiceProps, { name: '', image: '' }]
          : [{ name: '', image: '' }]
      }
    })
  }

  return (
    <Box {...styles.mainBox} flexDirection={withImage ? 'row' : 'column'}>
      {choiceProps?.map((item, index) => (
        <ChoiceEditable
          key={index}
          data={item}
          index={index}
          withImage={withImage}
        />
      ))}
      <Box
        height={withImage ? '146px' : '38px'}
        width={withImage ? '166px' : '150px'}
        {...styles.addNewChoiceBox}
        onClick={onAddChoice}>
        <PlusOutlined />
      </Box>
    </Box>
  )
}

ChoiceEditableGroup.propTypes = {
  withImage: PropTypes.bool
}

export default ChoiceEditableGroup
