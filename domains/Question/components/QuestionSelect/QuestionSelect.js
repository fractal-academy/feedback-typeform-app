import { Select } from 'antd'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { Box } from '@qonsoll/react-design'
import { styles } from './QuestionSelect.styles'

const { Option, OptGroup } = Select

function QuestionSelect(props) {
  const { questionList, answers, index, addRedirectQuestion } = props

  // [CLEAN FUNCTIONS]
  const onChange = (question, index) => {
    addRedirectQuestion(question, index)
  }

  return (
    <Box>
      <Select
        value={answers[index].redirectQuestion || 'Go to the next question'}
        showSearch
        allowClear
        bordered={false}
        // cursor="pointer"
        onChange={(name) => onChange(name, index)}
        defaultValue="Go to the next question"
        style={styles.selectStyle}>
        <Option value={'Submit form'}>
          <Text strong>Submit form</Text>
        </Option>
        <OptGroup label="JUMP TO...">
          {questionList.map((item, index) => (
            <Option key={index} value={item.name} onClick={() => {}}>
              {item.name}
            </Option>
          ))}
        </OptGroup>
      </Select>
    </Box>
  )
}

QuestionSelect.propTypes = {
  questionList: PropTypes.array.isRequired,
  answers: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  addRedirectQuestion: PropTypes.func.isRequired
}

export default QuestionSelect
