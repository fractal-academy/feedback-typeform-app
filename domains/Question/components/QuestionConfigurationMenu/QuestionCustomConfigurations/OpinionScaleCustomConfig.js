import { Typography, Select } from 'antd'
import { Row, Col } from '@qonsoll/react-design'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from 'app/context/CurrentQuestion'

const { Text } = Typography
const { Option } = Select

const opinionScaleTo = [5, 6, 7, 8, 9, 10]

function OpinionScaleCustomConfig() {
  // [CUSTOM HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPUTED PROPERTIES]
  const btnProps = currentQuestion?.btnProps
  // [CLEAN FUNCTIONS]
  const onSelectFromChange = (switchFromValue) => {
    const computedBtnProps = btnProps
      ? { ...btnProps, to: switchFromValue }
      : { to: switchFromValue }

    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { btnProps: computedBtnProps }
    })
  }
  const onSelectToChange = (switchToValue) => {
    const computedBtnProps = btnProps
      ? { ...btnProps, to: switchToValue }
      : { to: switchToValue }

    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { btnProps: computedBtnProps }
    })
  }

  return (
    <Row noGutters>
      <Col cw="auto" mr={3}>
        <Text>From</Text>
      </Col>
      <Col>
        <Select defaultValue="0" size="small" onChange={onSelectFromChange}>
          <Option value="0">0</Option>
          <Option value="1">1</Option>
        </Select>
      </Col>
      <Col v="center" cw="auto" mr={3}>
        <Text>to</Text>
      </Col>
      <Col cw="auto">
        <Select
          defaultValue={opinionScaleTo[0]}
          size="small"
          onChange={onSelectToChange}>
          {opinionScaleTo.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}

export default OpinionScaleCustomConfig
