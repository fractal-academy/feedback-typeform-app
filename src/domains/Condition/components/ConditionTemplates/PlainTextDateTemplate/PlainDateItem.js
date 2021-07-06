import React, { useState, useEffect } from 'react'
import { Col, Row, Box } from '@qonsoll/react-design'
import { QuestionSelect } from '../../../../../domains/Question/components'
import { Select } from 'antd'
import { DATE_CONDITION_RULES_VALUES } from '../../../../../constants/dateConditionRules'
import { StyledDatePicker, StyledSelect } from './PlainTextDateTemplate.style'
import { COLLECTIONS } from '../../../../../constants'
import useFunctions from '../../../../../hooks/useFunctions'
import moment from 'moment'

const { Option } = Select

const PlaneDateItem = (props) => {
  const {
    item,
    index,
    questionId,
    questionList,
    addRedirectQuestion,
    questionConfigurations
  } = props

  //[COMPONENT STATE HOOKS]
  const [datePickerValue, setDatePickerValue] = useState(
    item?.answerOption ? moment(item?.answerOption) : ''
  )
  const [ruleSelectValue, setRuleSelectValue] = useState(
    item?.redirectConditionRule || DATE_CONDITION_RULES_VALUES[0]
  )

  //[ADDITIONAL HOOKS]
  const { setData } = useFunctions()

  //[CLEAN FUNCTIONS]
  const onRuleSelectValueChange = (selectValue) => {
    setRuleSelectValue(selectValue || '')

    //create new array questionConfigurations of certain question
    const updatedQuestionConfigurations = questionConfigurations
    //update conditionRule of certain question
    updatedQuestionConfigurations[index].redirectConditionRule =
      selectValue || ''
    //write new data to db
    setData(COLLECTIONS.QUESTIONS, questionId, {
      questionConfigurations: updatedQuestionConfigurations
    })
  }

  const onDatePickerValueChange = (datePickerVal, stringDateValue) => {
    setDatePickerValue(datePickerVal || '')

    //create new array questionConfigurations of certain question
    const updatedQuestionConfigurations = questionConfigurations
    //update answer option of certain question
    updatedQuestionConfigurations[index].answerOption = stringDateValue || ''
    //write new data to db
    setData(COLLECTIONS.QUESTIONS, questionId, {
      questionConfigurations: updatedQuestionConfigurations
    })
  }

  useEffect(() => {
    setDatePickerValue(item?.answerOption ? moment(item?.answerOption) : '')
    setRuleSelectValue(
      item?.redirectConditionRule || DATE_CONDITION_RULES_VALUES[0]
    )
  }, [item])

  return (
    <Row noGutters mb={2} key={index}>
      <Col cw={6}>
        <Row noGutters width="100%">
          <Col cw={6}>
            <Box width="100%" mr={2}>
              <StyledSelect
                showSearch
                allowClear
                value={ruleSelectValue || DATE_CONDITION_RULES_VALUES[0]}
                onChange={onRuleSelectValueChange}>
                {DATE_CONDITION_RULES_VALUES?.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </StyledSelect>
            </Box>
          </Col>
          <Col cw={6}>
            <Box width="100%" mr={4}>
              <StyledDatePicker
                value={datePickerValue}
                onChange={onDatePickerValueChange}
              />
            </Box>
          </Col>
        </Row>
      </Col>

      <Col cw={6}>
        <QuestionSelect
          addRedirectQuestion={addRedirectQuestion}
          questionConfigurations={questionConfigurations}
          index={index}
          questionList={questionList}
        />
      </Col>
    </Row>
  )
}

export default PlaneDateItem
