import { useState } from 'react'
import { Row, Col } from '@qonsoll/react-design'
import { Typography } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import {
  QuestionTypeSelect,
  QuestionConfigurationMenu
} from 'domains/Question/components'
import { useCurrentQuestionContext } from 'app/context/CurrentQuestion'
import theme from 'app/styles/theme'
import { globalStyles } from 'app/styles'

const { Title } = Typography

function QuestionConfigurationPopoverContent(props) {
  const { onQuestionTypeChange, setShowPopover } = props

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()

  // [COMPONENT STATE HOOKS]
  const [isQuestionConfig, setIsQuestionConfig] = useState(false)

  // [CLEAN FUNCTIONS]
  const changeQuestionConfigState = () => {
    setIsQuestionConfig(!isQuestionConfig)
  }
  const onQuestionTypeClick = (data) => {
    onQuestionTypeChange(data)
    setShowPopover(false)
  }

  return (
    <>
      <Row
        noGutters
        borderRadius={`${theme.borderRadius.md} ${theme.borderRadius.md} 0 0`}
        onClick={changeQuestionConfigState}
        bg={theme.color.text.dark}
        style={globalStyles.cursorPointer}
        width="300px"
        px={2}
        py={2}>
        <Col v="center" cw="auto" order={isQuestionConfig ? 1 : 3}>
          {isQuestionConfig ? <LeftOutlined /> : <RightOutlined />}
        </Col>
        <Col order={2} ml={2}>
          <Title level={4}>
            {isQuestionConfig ? currentQuestion?.questionType : 'Question Type'}
          </Title>
        </Col>
      </Row>
      <Row noGutters>
        <Col pr={0}>
          {isQuestionConfig ? (
            <QuestionConfigurationMenu />
          ) : (
            <QuestionTypeSelect onClick={onQuestionTypeClick} />
          )}
        </Col>
      </Row>
    </>
  )
}

QuestionConfigurationPopoverContent.propTypes = {}

export default QuestionConfigurationPopoverContent
