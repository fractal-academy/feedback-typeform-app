import { Typography, Select } from 'antd'
import { Row, Col } from '@qonsoll/react-design'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContextDispatch
} from 'app/context/CurrentQuestion'

const { Text } = Typography
const { Option } = Select

const rattingRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function RatingCustomConfig(props) {
  // [CUSTOM HOOKS]
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()
  // [CLEAN FUNCTIONS]
  const onRattingSelectChange = (starsAmount) => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { btnProps: starsAmount }
    })
  }

  return (
    <Row noGutters>
      <Col>
        <Text>Amount of stars</Text>
      </Col>
      <Col cw="auto">
        <Select
          defaultValue={rattingRange[0]}
          size="small"
          onChange={onRattingSelectChange}>
          {rattingRange.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}

export default RatingCustomConfig
