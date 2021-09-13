import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from 'antd/lib/typography/Text'
import { Row, Col, Box } from '@qonsoll/react-design'
import { QUESTION_TYPES } from '../../../../constants'
import { useTranslation } from '../../../../context/Translation'
import {
  QuestionsTypeMenu,
  QuestionMenuItem
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

const StyledText = styled(Text)`
  cursor: pointer !important;
  color: var(--qf-font-color-caption1);
`

function QuestionTypeSelect(props) {
  const {
    //  questionData,
    onClick,
    welcomeScreenShowRule,
    customQuestionTypes
  } = props

  // [ADDITIONAL_HOOKS]
  const {
    welcomeScreenDesc,
    longTextDesc,
    shortTextDesc,
    dateDesc,
    fileUploadDesc,
    opinionDesc,
    pictureChoiceDesc,
    choiceDesc,
    ratingDesc,
    statementDesc,
    yesnoDesc
  } = useTranslation()

  // [COMPUTED_PROPERTIES]
  const questionTypeMap = customQuestionTypes || [
    {
      type: QUESTION_TYPES.WELCOME_SCREEN,
      description: welcomeScreenDesc || 'Invite your audience in',
      icon: <HomeOutlined />
    },
    {
      type: QUESTION_TYPES.LONG_TEXT,
      description: longTextDesc || 'More space to spill the beans',
      icon: <FileTextOutlined />
    },
    {
      type: QUESTION_TYPES.SHORT_TEXT,
      description: shortTextDesc || 'For short answers, like names',
      icon: <SmallDashOutlined />
    },
    {
      type: QUESTION_TYPES.DATE,
      description: dateDesc || 'Collect answers in date format',
      icon: <CalendarOutlined />
    },
    {
      type: QUESTION_TYPES.FILE_UPLOAD,
      description: fileUploadDesc || 'Upload a file up to 10MB',
      icon: <UploadOutlined />
    },

    {
      type: QUESTION_TYPES.OPINION_SCALE,
      description: opinionDesc || 'A customizable, numbered scale',
      icon: <HomeOutlined />
    },
    {
      type: QUESTION_TYPES.PICTURE_CHOICE,
      description: pictureChoiceDesc || 'Multiple choice but prettier',
      icon: <PictureOutlined />
    },
    {
      type: QUESTION_TYPES.CHOICE,
      description: choiceDesc || 'Multiple choice',
      icon: <GoldOutlined />
    },
    {
      type: QUESTION_TYPES.RATING,
      description: ratingDesc || 'Rate',
      icon: <StarOutlined />
    },
    {
      type: QUESTION_TYPES.STATEMENT,
      description: statementDesc || 'Take the mic for a moment',
      icon: <CopyrightOutlined />
    },
    {
      type: QUESTION_TYPES.YES_NO,
      description: yesnoDesc || 'Just 2 options: Yes or No',
      icon: <ShareAltOutlined />
    }
  ]

  const updatedMap =
    (welcomeScreenShowRule &&
      questionTypeMap?.filter(
        (item) => item.type !== QUESTION_TYPES.WELCOME_SCREEN
      )) ||
    questionTypeMap

  // const hasConditions = questionData?.questionConfigurations?.filter(
  //   (item) => item?.redirectQuestion.length > 0
  // ).length

  return (
    <Box
      pl={1}
      display="block"
      // TODO Keep this place for future improvements - make box receive negative margins based on vars instead of strict value
      // my={PopoverNegativeMarin.v}
      // mx={PopoverNegativeMarin.h}
    >
      <QuestionsTypeMenu>
        {updatedMap?.map((item) => (
          <QuestionMenuItem key={item.type} onClick={onClick}>
            <Row h="center" v="center" noGutters>
              <Col cw="auto" ml={2} mr={1}>
                {item.icon}
              </Col>
              <Col display="grid">
                {item.type}
                <StyledText disabled> {item.description}</StyledText>
              </Col>
            </Row>
          </QuestionMenuItem>
        ))}
      </QuestionsTypeMenu>
    </Box>
  )
}

QuestionTypeSelect.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func
}

export default QuestionTypeSelect
