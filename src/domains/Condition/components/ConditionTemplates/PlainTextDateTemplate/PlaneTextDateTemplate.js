import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from '@qonsoll/react-design'
import { QuestionSelect } from '../../../../../domains/Question/components'
import { Select, Typography} from 'antd'
import { DATE_CONDITION_RULES_VALUES } from '../../../../../constants/dateConditionRules'
import {
  CustomButton,
  CustomText,
  StyledDatePicker,
  StyledSelect
} from './PlainTextDateTemplate.style'

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
            <Row noGutters width="100%">
              <Col cw={6}>
                <Box width="100%" mr={2}>
                  <StyledSelect
                    showSearch
                    allowClear
                    defaultValue={DATE_CONDITION_RULES_VALUES[0]}>
                    {DATE_CONDITION_RULES_VALUES.map((item, index) => (
                      <Option key={index} value={item} onClick={() => {}}>
                        {item}
                      </Option>
                    ))}
                  </StyledSelect>
                </Box>
              </Col>
              <Col cw={6}>
                <Box width="100%" mr={4}>
                  <StyledDatePicker />
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
      <CustomButton size="medium" onClick={onClick}>
        <CustomText strong>+ Add condition</CustomText>
      </CustomButton>
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