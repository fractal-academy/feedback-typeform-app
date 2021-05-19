import { cloneElement } from 'react'
import { Card, Tag } from 'antd'
import {
  Rate,
  ShortText,
  ChoiceEditableGroup,
  YesnoButton,
  RangeButton,
  SubmitButton,
  FileUploader,
  TextAreaForm,
  DateTimeInput
} from 'components'
import PropTypes from 'prop-types'
import { DEFAULT_IMAGE } from 'app/constants'
import { Col, Row, Box } from '@qonsoll/react-design'
import { styles } from './QuestionForm.styles'
import { QUESTION_TYPES, LAYOUT_TYPES } from 'app/constants'
import { useCurrentQuestionContext } from 'app/context/CurrentQuestion'
import {
  QuestionConfigurationPopover,
  QuestionHeader,
  QuestionMediaPopover
} from 'domains/Question/components'

function QuestionForm(props) {
  const { data, onQuestionTypeChange } = props

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()

  // [COMPUTED PROPERTIES]
  const questionTypesMap = {
    [QUESTION_TYPES.WELCOME_SCREEN]: {
      component: <SubmitButton>START</SubmitButton>
    },
    [QUESTION_TYPES.YES_NO]: {
      component: <YesnoButton />
    },
    [QUESTION_TYPES.PICTURE_CHOICE]: {
      component: <ChoiceEditableGroup withImage />
    },
    [QUESTION_TYPES.CHOICE]: {
      component: <ChoiceEditableGroup />
    },
    [QUESTION_TYPES.OPINION_SCALE]: {
      component: <RangeButton from={1} to={5} />
    },
    [QUESTION_TYPES.RATING]: {
      component: <Rate />
    },
    [QUESTION_TYPES.SHORT_TEXT]: {
      component: (
        <ShortText btnProps={{ type: 'primary', children: 'Submit' }} />
      )
    },
    [QUESTION_TYPES.LONG_TEXT]: {
      component: (
        <TextAreaForm btnProps={{ type: 'primary', children: 'Submit' }} />
      )
    },
    [QUESTION_TYPES.DATE]: {
      component: <DateTimeInput />
    },
    [QUESTION_TYPES.FILE_UPLOAD]: {
      component: <FileUploader />
    },
    [QUESTION_TYPES.STATEMENT]: {
      component: <SubmitButton>Next</SubmitButton>
    },
    [QUESTION_TYPES.ENDING]: {
      component: <SubmitButton>Finish</SubmitButton>
    }
  }

  const computedMediaUrl = `url(${currentQuestion?.image || DEFAULT_IMAGE})`
  const questionTag =
    currentQuestion.questionType === QUESTION_TYPES.ENDING
      ? 'Ending'
      : `Question ${data?.order + 1}`
  const layoutType = LAYOUT_TYPES[data?.layoutType]
  //rule for template to render column with image, when layout type === left/right(small/big)
  const imageShowRule =
    layoutType?.type !== LAYOUT_TYPES.BETWEEN.type &&
    layoutType?.type !== LAYOUT_TYPES.FULL_SCREEN.type &&
    layoutType?.type !== LAYOUT_TYPES.DEFAULT.type
  const bgImage =
    layoutType?.type === LAYOUT_TYPES.FULL_SCREEN.type && computedMediaUrl

  return (
    <Row
      {...styles.mainRowStyle}
      style={styles.rowStyle}
      backgroundImage={bgImage}>
      <Col {...styles.questionCardColumnStyle} style={styles.columnStyle}>
        <Card style={styles.cardStyle} bordered={false}>
          <Row noGutters>
            <Col>
              <Tag color="blue">{questionTag}</Tag>
            </Col>
            <Col cw="auto">
              <QuestionConfigurationPopover
                onQuestionTypeChange={onQuestionTypeChange}
              />
            </Col>
            {layoutType?.type === LAYOUT_TYPES.FULL_SCREEN.type && (
              <Col cw="auto" ml={2}>
                <QuestionMediaPopover
                  MediaModalButtonBackground={computedMediaUrl}
                />
              </Col>
            )}
          </Row>
          <Row noGutters h="between" mb={4}>
            <Col cw="auto">
              <QuestionHeader
                titlePlaceholder={'Editable question title'}
                subtitlePlaceholder={'Description(optional)'}
              />
            </Col>
          </Row>
          {layoutType?.type === LAYOUT_TYPES.BETWEEN.type && (
            <Row>
              <Col cw="auto">
                <Box
                  {...layoutType.imgSize}
                  {...styles.imageBetweenStyle}
                  backgroundImage={computedMediaUrl}>
                  <QuestionMediaPopover
                    MediaModalButtonBackground={computedMediaUrl}
                  />
                </Box>
              </Col>
            </Row>
          )}
          <Row noGutters>
            <Col>
              {cloneElement(
                questionTypesMap[data?.questionType].component,
                data
              )}
            </Col>
          </Row>
        </Card>
      </Col>
      {imageShowRule && (
        <Col
          {...styles.sideImageColumnStyle}
          style={styles.columnStyle}
          order={layoutType?.imageOrder}>
          <Box
            {...layoutType?.imgSize}
            {...styles.sideImageBoxStyle}
            backgroundImage={computedMediaUrl}>
            <Row h="right">
              <Col cw="auto" mr={4}>
                <QuestionMediaPopover
                  MediaModalButtonBackground={computedMediaUrl}
                />
              </Col>
            </Row>
          </Box>
        </Col>
      )}
    </Row>
  )
}

QuestionForm.propTypes = {
  data: PropTypes.object,
  onQuestionTypeChange: PropTypes.func,
  setShowPopover: PropTypes.func,
  showPopover: PropTypes.bool,
  setIsImageEditVisible: PropTypes.func,
  isImageEditVisible: PropTypes.bool
}

export default QuestionForm
