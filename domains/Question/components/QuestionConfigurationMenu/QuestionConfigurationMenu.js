import { Typography, Switch } from 'antd'
import { Row, Col, Box } from '@qonsoll/react-design'
import { QUESTION_TYPES } from 'app/constants'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from 'app/context/CurrentQuestion'
import {
  OpinionScaleCustomConfig,
  RatingCustomConfig
} from './QuestionCustomConfigurations'
import { styles } from './QuestionConfigurationMenu.styles'

const { Text } = Typography

function QuestionConfigurationMenu() {
  // [CUSTOM HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [CLEAN FUNCTIONS]
  const requireStateChange = (switchValue) => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { isRequired: switchValue }
    })
  }

  return (
    <Box px={3} pt={2}>
      <Row mb={3} noGutters>
        <Col>
          <Text style={styles.requiredStyle}>Required</Text>
        </Col>
        <Col cw="auto">
          <Switch size="small" onChange={requireStateChange} />
        </Col>
      </Row>
      {currentQuestion.questionType === QUESTION_TYPES.OPINION_SCALE && (
        <Row noGutters>
          <Col>
            <OpinionScaleCustomConfig />
          </Col>
        </Row>
      )}
      {currentQuestion.questionType === QUESTION_TYPES.RATING && (
        <Row noGutters>
          <Col>
            <RatingCustomConfig />
          </Col>
        </Row>
      )}
    </Box>
  )
}

export default QuestionConfigurationMenu
