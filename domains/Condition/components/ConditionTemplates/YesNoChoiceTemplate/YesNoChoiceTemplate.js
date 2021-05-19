import { Button } from 'antd'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { styles } from './YesNoChoiceTemplate.styles'
import { Box, Col, Row } from '@qonsoll/react-design'
import { QuestionSelect } from 'domains/Question/components'
import theme from 'app/styles/theme'

function YesNoChoiceTemplate(props) {
  const { answers, questionList, addRedirectQuestion } = props

  return (
    <>
      {answers.map((item, index) => (
        <Row mb={2} key={index} noGutters>
          <Col cw={6}>
            <Box
              display="flex"
              alignItems="center"
              p={`${theme.grid.gutters.sm / 2 - 1}px`}
              mr={4}
              border="1px solid"
              borderColor={theme.color.dark.t.lighten5}
              borderRadius={theme.borderRadius.md}>
              <Box style={styles.firstLetter}>
                <Text strong>{item.name[0].toUpperCase()}</Text>
              </Box>
              {item.name}
            </Box>
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
    </>
  )
}

YesNoChoiceTemplate.propTypes = {
  answers: PropTypes.array,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}

export default YesNoChoiceTemplate
