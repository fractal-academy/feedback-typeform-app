import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { QUESTION_TYPES } from 'app/constants'
import { Col, Row } from '@qonsoll/react-design'
import {
  QuestionsTypeMenu,
  QuestionMenuItem,
  Description
} from './QuestionTypeSelect.styles'
import {
  CalendarOutlined,
  CopyrightOutlined,
  FileTextOutlined,
  GoldOutlined,
  HomeOutlined,
  PictureOutlined,
  ShareAltOutlined,
  SmallDashOutlined,
  StarOutlined,
  UploadOutlined
} from '@ant-design/icons'
import { IconRoundContainer } from 'components'

const questionTypeMap = [
  {
    type: QUESTION_TYPES.WELCOME_SCREEN,
    description: 'Invite your audience in',
    icon: <HomeOutlined />
  },
  {
    type: QUESTION_TYPES.LONG_TEXT,
    description: 'Mote space to spill the beans',
    icon: <FileTextOutlined />
  },
  {
    type: QUESTION_TYPES.SHORT_TEXT,
    description: 'For short answers, like names',
    icon: <SmallDashOutlined />
  },
  {
    type: QUESTION_TYPES.DATE,
    description: 'Collect answers in date format',
    icon: <CalendarOutlined />
  },
  {
    type: QUESTION_TYPES.FILE_UPLOAD,
    description: 'Upload a file up to 10MB',
    icon: <UploadOutlined />
  },

  {
    type: QUESTION_TYPES.OPINION_SCALE,
    description: 'A customizable, numbered scale',
    icon: <HomeOutlined />
  },
  {
    type: QUESTION_TYPES.PICTURE_CHOICE,
    description: 'Multiple choice but prettier',
    icon: <PictureOutlined />
  },
  {
    type: QUESTION_TYPES.CHOICE,
    description: 'Multiple choice',
    icon: <GoldOutlined />
  },
  {
    type: QUESTION_TYPES.RATING,
    description: 'Choose from shapes like ⭐ or 🐶',
    icon: <StarOutlined />
  },
  {
    type: QUESTION_TYPES.STATEMENT,
    description: 'Take the mic for a moment',
    icon: <CopyrightOutlined />
  },
  {
    type: QUESTION_TYPES.YES_NO,
    description: 'Just 2 options: Yes or No',
    icon: <ShareAltOutlined />
  }
]
function QuestionTypeSelect(props) {
  const { onClick } = props

  return (
    <Row h="center" v="center" pl={2} noGutters>
      <Col>
        <QuestionsTypeMenu>
          {questionTypeMap.map((item) => (
            <QuestionMenuItem key={item.type} onClick={onClick}>
              <Row noGutters v="center">
                <Col v="center" cw="auto" mr={2}>
                  <IconRoundContainer>{item.icon}</IconRoundContainer>
                </Col>
                <Col>
                  <Row noGutters>
                    <Col v="center">
                      <Text strong>{item.type}</Text>
                    </Col>
                  </Row>
                  <Row noGutters>
                    <Col>
                      <Description type="secondary">
                        {item.description}
                      </Description>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </QuestionMenuItem>
          ))}
        </QuestionsTypeMenu>
      </Col>
    </Row>
  )
}

QuestionTypeSelect.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func
}

export default QuestionTypeSelect
