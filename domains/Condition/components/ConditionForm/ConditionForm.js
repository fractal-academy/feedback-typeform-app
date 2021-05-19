import { NumberedCard } from 'app/components'
import PropTypes from 'prop-types'
import { cloneElement } from 'react'
import { Box } from '@qonsoll/react-design'
import Title from 'antd/lib/typography/Title'
import { QUESTION_TYPES } from 'app/constants'
import { RatingTemplate } from 'domains/Condition/components/ConditionTemplates'
import { FileUploadTemplate } from 'domains/Condition/components/ConditionTemplates'
import { YesNoChoiceTemplate } from 'domains/Condition/components/ConditionTemplates'
import { OpinionScaleTemplate } from 'domains/Condition/components/ConditionTemplates'
import { PlaneTextDateTemplate } from 'domains/Condition/components/ConditionTemplates'
import { PictureChoiceTemplate } from 'domains/Condition/components/ConditionTemplates'
import { PlaneLongTextStringTemplate } from 'domains/Condition/components/ConditionTemplates'
import { PlaneShortTextStringTemplate } from 'domains/Condition/components/ConditionTemplates'
import theme from 'app/styles/theme'

const questionTypesMap = {
  [QUESTION_TYPES.YES_NO]: {
    component: <YesNoChoiceTemplate />
  },
  [QUESTION_TYPES.PICTURE_CHOICE]: {
    component: <PictureChoiceTemplate />
  },
  [QUESTION_TYPES.OPINION_SCALE]: {
    component: <OpinionScaleTemplate />
  },
  [QUESTION_TYPES.RATING]: {
    component: <RatingTemplate />
  },
  [QUESTION_TYPES.SHORT_TEXT]: {
    component: <PlaneShortTextStringTemplate />
  },
  [QUESTION_TYPES.LONG_TEXT]: {
    component: <PlaneLongTextStringTemplate />
  },
  [QUESTION_TYPES.DATE]: {
    component: <PlaneTextDateTemplate />
  },
  [QUESTION_TYPES.FILE_UPLOAD]: {
    component: <FileUploadTemplate isUploaded />
  }
}

function ConditionForm(props) {
  const {
    mockQuestionIndex,
    item,
    addCondition,
    addRedirectQuestion,
    getQuestionListRedirect
  } = props
  return (
    <NumberedCard number={mockQuestionIndex + 2} key={mockQuestionIndex}>
      <Box ml={3}>
        <Title level={5} strong>
          {item.name}
        </Title>
        {cloneElement(questionTypesMap[item.questionType].component, {
          ...item,
          addCondition: (answer) => addCondition(answer, mockQuestionIndex),
          addRedirectQuestion: (question, answerIndex) =>
            addRedirectQuestion(question, answerIndex, mockQuestionIndex),
          questionList: getQuestionListRedirect(mockQuestionIndex)
        })}
      </Box>
    </NumberedCard>
  )
}
ConditionForm.propTypes = {
  mockQuestionIndex: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  addCondition: PropTypes.func.isRequired,
  addRedirectQuestion: PropTypes.func.isRequired,
  getQuestionListRedirect: PropTypes.func.isRequired
}
export default ConditionForm
