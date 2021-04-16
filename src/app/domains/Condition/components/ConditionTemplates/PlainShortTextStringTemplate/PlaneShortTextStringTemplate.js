import { Box, Col, Row } from '@qonsoll/react-design'
import { Button, Input, Select } from 'antd'
import Text from 'antd/lib/typography/Text'
import React from 'react'
import { TEXT_CONDITION_RULES_VALUES } from 'app/constants/planeTextStringConditionRules'
import { QuestionSelect } from 'domains/Question/components'
import PropTypes from 'prop-types'
import { styles } from './PlainShortTextStringTemplate.style'
import { globalStyles } from 'app/styles'

const { Option } = Select

function PlaneShortTextStringTemplate(props) {
  const { answers, id, addCondition, questionList, addRedirectQuestion } = props
  // const [conditionArray, setConditionArray] = useState([''])
  // [CLEAN FUNCTIONS]

  const onClick = () => {
    addCondition({ name: '', redirectQuestion: null })
  }

  return (
    <>
      {answers.map((item, index) => (
        <Row noGutters mb={2} key={index}>
          <Col>
            <Box
              display="flex"
              alignItems="center"
              border="1px solid #bbbbbb"
              borderRadius="4px"
              mr={2}>
              <Select
                showSearch
                allowClear
                bordered={false}
                defaultValue={TEXT_CONDITION_RULES_VALUES[0]}
                style={styles.selectStyle}>
                {TEXT_CONDITION_RULES_VALUES.map((item, index) => (
                  <Option key={index} value={item} onClick={() => {}}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Box>
          </Col>
          <Col>
            <Box
              display="flex"
              alignItems="center"
              key={index}
              style={{}}
              p={2}
              mr={2}
              height="50px"
              border="1px solid #bbbbbb"
              borderRadius="4px">
              <Input style={globalStyles.fullWidth} bordered={false} />
            </Box>
          </Col>
          <Col>
            <QuestionSelect
              addRedirectQuestion={addRedirectQuestion}
              answers={answers}
              index={index}
              questionList={questionList}
            />
          </Col>
        </Row>
      ))}
      <Button size="large" style={styles.bgc} onClick={onClick}>
        <Text strong style={styles.fontColor}>
          + Add condition
        </Text>
      </Button>
    </>
  )
}
PlaneShortTextStringTemplate.propTypes = {
  answers: PropTypes.array,
  addCondition: PropTypes.func,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}
export default PlaneShortTextStringTemplate