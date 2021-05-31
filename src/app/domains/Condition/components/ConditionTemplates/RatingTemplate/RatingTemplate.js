import React from 'react'
import PropTypes from 'prop-types'
import theme from 'app/styles/theme'
import Text from 'antd/lib/typography/Text'
import { styles } from './RatingTemplate.styles'
import { Box, Col, Row } from '@qonsoll/react-design'
import { QuestionSelect } from 'domains/Question/components'

let startLetter = 65

function RatingTemplate(props) {
  const { answers, questionList, addRedirectQuestion } = props

  return (
    <>
      {answers.map((item, index) => (
        <Row noGutters mb={2} key={index}>
          <Col cw={6}>
            <Box
              display="flex"
              alignItems="center"
              width="100%"
              key={index}
              bg={theme.color.dark.t.lighten9}
              pl={theme.space[2]}
              mr={4}
              border="1px solid"
              borderColor={theme.color.dark.t.lighten5}
              borderRadius={theme.borderRadius.md}>
              <Box style={styles.buttonM}>
                <Text strong>{String.fromCharCode(startLetter++)}</Text>
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

RatingTemplate.propTypes = {
  answers: PropTypes.array,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}

export default RatingTemplate
