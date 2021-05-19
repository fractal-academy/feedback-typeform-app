import { Menu } from 'antd'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import { QUESTION_TYPES } from 'app/constants'
import { Col, Row } from '@qonsoll/react-design'
import { styles } from './QuestionTypeSelect.styles'
import {
  CalendarOutlined,
  CopyrightOutlined,
  FileTextOutlined,
  HomeOutlined,
  PictureOutlined,
  ShareAltOutlined,
  SmallDashOutlined,
  StarOutlined,
  UploadOutlined
} from '@ant-design/icons'

const questionTypeMap = [
  {
    type: QUESTION_TYPES.WELCOME_SCREEN,
    description: 'Invite your audience in',
    icon: <HomeOutlined style={styles.iconFontSize} />
  },
  {
    type: QUESTION_TYPES.LONG_TEXT,
    description: 'Mote space to spill the beans',
    icon: <FileTextOutlined style={styles.iconFontSize} />
  },
  {
    type: QUESTION_TYPES.SHORT_TEXT,
    description: 'For short answers, like names',
    icon: <SmallDashOutlined style={styles.iconFontSize} />
  },
  {
    type: QUESTION_TYPES.DATE,
    description: 'Collect answers in date format',
    icon: <CalendarOutlined style={styles.iconFontSize} />
  },
  {
    type: QUESTION_TYPES.FILE_UPLOAD,
    description: 'Upload a file up to 10MB',
    icon: <UploadOutlined style={styles.iconFontSize} />
  },

  {
    type: QUESTION_TYPES.OPINION_SCALE,
    description: 'A customizable, numbered scale',
    icon: <HomeOutlined style={styles.iconFontSize} />
  },
  {
    type: QUESTION_TYPES.PICTURE_CHOICE,
    description: 'Multiple choice but prettier',
    icon: <PictureOutlined style={styles.iconFontSize} />
  },
  {
    type: QUESTION_TYPES.CHOICE,
    description: 'Multiple choice',
    icon: <PictureOutlined style={styles.iconFontSize} />
  },
  {
    type: QUESTION_TYPES.RATING,
    description: 'Choose from shapes like ⭐ or 🐶',
    icon: <StarOutlined style={styles.iconFontSize} />
  },
  {
    type: QUESTION_TYPES.STATEMENT,
    description: 'Take the mic for a moment',
    icon: <CopyrightOutlined style={styles.iconFontSize} />
  },
  {
    type: QUESTION_TYPES.YES_NO,
    description: 'Just 2 options: Yes or No',
    icon: <ShareAltOutlined style={styles.iconFontSize} />
  }
]
function QuestionTypeSelect(props) {
  const { onClick } = props

  return (
    <Row h="center" v={'center'} pl={2} pr={0} noGutters>
      <Col>
        <Menu style={styles.menuStyle}>
          {questionTypeMap.map((item, index) => (
            <Menu.Item
              style={styles.menuItemStyle}
              key={item.type}
              onClick={onClick}>
              <Row noGutters v="center">
                <Col v="center" cw="auto">
                  {item.icon}
                </Col>
                <Col>
                  <Row noGutters>
                    <Col v="center">
                      <Text style={styles.questionName}>{item.type}</Text>
                    </Col>
                  </Row>
                  <Row noGutters>
                    <Col>
                      <Text style={styles.questionDescr}>
                        {item.description}
                      </Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Menu.Item>
          ))}
        </Menu>
      </Col>
    </Row>
  )
}

QuestionTypeSelect.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func
}

export default QuestionTypeSelect
