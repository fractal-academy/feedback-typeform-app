import React from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { StyledSelect } from './QuestionSelect.styles'

const { Option, OptGroup } = Select

function QuestionSelect(props) {
  const { questionList, questionOptions, index, addRedirectQuestion } = props

  // [CLEAN FUNCTIONS]
  const onChange = (question, index) => {
    addRedirectQuestion(question, index)
  }

  return (
    <StyledSelect
      value={
        // questionOptions[index]?.redirectQuestion ||
        'Go to the next question'
      }
      showSearch
      allowClear
      onChange={(name) => onChange(name, index)}
      defaultValue="Go to the next question">
      <Option value="Submit form">
        <Text strong>Submit form</Text>
      </Option>
      <OptGroup label="JUMP TO...">
        {questionList.map((item, index) => (
          <Option key={index} value={item.id} onClick={() => {}}>
            {item.title}
          </Option>
        ))}
      </OptGroup>
    </StyledSelect>
  )
}

QuestionSelect.propTypes = {
  questionList: PropTypes.array.isRequired,
  questionOptions: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  addRedirectQuestion: PropTypes.func.isRequired
}

export default QuestionSelect
