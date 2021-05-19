import PropTypes from 'prop-types'
import { globalStyles } from 'app/styles'
import { Box, Col, Row } from '@qonsoll/react-design'
import { QuestionSelect } from 'domains/Question/components'
import { Button, DatePicker, Select, Typography } from 'antd'
import { DATE_CONDITION_RULES_VALUES } from 'app/constants/dateConditionRules'
import { styles } from 'domains/Condition/components/ConditionTemplates/PlainShortTextStringTemplate/PlainShortTextStringTemplate.style'

const { Option } = Select
const { Text } = Typography

function PlaneTextDateTemplate(props) {
  const { answers, addCondition, questionList, addRedirectQuestion } = props

  // [CLEAN FUNCTIONS]
  const onClick = () => {
    addCondition({ name: '', redirectQuestion: null })
  }

  return (
    <>
      {answers.map((item, index) => (
        <Row noGutters mb={2} key={index}>
          <Col cw={6}>
            <Row noGutters>
              <Col cw="6">
                <Box
                  display="flex"
                  border="1px solid #bbbbbb"
                  borderRadius="4px">
                  <Select
                    showSearch
                    allowClear
                    bordered={false}
                    defaultValue={DATE_CONDITION_RULES_VALUES[0]}
                    style={styles.selectStyle}>
                    {DATE_CONDITION_RULES_VALUES.map((item, index) => (
                      <Option key={index} value={item} onClick={() => {}}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Box>
              </Col>
              <Col cw="6">
                <Box
                  display="flex"
                  alignItems="center"
                  key={index}
                  mr={4}
                  border="1px solid #bbbbbb"
                  borderRadius="4px">
                  <DatePicker style={styles.selectStyle} bordered={false} />
                </Box>
              </Col>
            </Row>
          </Col>

          <Col cw={6}>
            <QuestionSelect
              addRedirectQuestion={addRedirectQuestion}
              answers={answers}
              index={index}
              questionList={questionList}
            />
          </Col>
        </Row>
      ))}
      <Button size="medium" style={styles.bgc} onClick={onClick}>
        <Text strong style={styles.fontColor}>
          + Add condition
        </Text>
      </Button>
    </>
  )
}

PlaneTextDateTemplate.propTypes = {
  answers: PropTypes.array,
  addCondition: PropTypes.func,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}

export default PlaneTextDateTemplate
