import React from 'react'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { Box, Col, Row } from '@qonsoll/react-design'
import { QuestionSelect } from 'domains/Question/components'

function FileUploadTemplate(props) {
  const { answers, isUploaded, questionList, addRedirectQuestion } = props

  return (
    <>
      {answers.map((item, index) => (
        <Row noGutters mb={2} key={index}>
          <Col cw={6}>
            <Box
              display="flex"
              alignItems="center"
              key={index}
              p={2}
              mr={4}
              height="50px"
              border="1px solid #bbbbbb"
              borderRadius="4px">
              {isUploaded ? (
                <Text>is uploaded</Text>
              ) : (
                <Text>not uploaded</Text>
              )}
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
FileUploadTemplate.propTypes = {
  answers: PropTypes.array,
  isUploaded: PropTypes.bool.isRequired,
  questionList: PropTypes.array,
  addRedirectQuestion: PropTypes.func
}
export default FileUploadTemplate
