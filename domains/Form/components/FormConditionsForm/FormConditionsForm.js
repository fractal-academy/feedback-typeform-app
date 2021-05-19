import { useState } from 'react'
import { ConditionForm } from 'domains/Condition/components'
import { QUESTION_TYPES, ANSWER_TYPES } from 'app/constants'
import { Box } from '@qonsoll/react-design'

const mockQuestion = [
  {
    id: 1,
    name: 'Yes/no question example',
    questionType: QUESTION_TYPES.YES_NO,
    answerType: ANSWER_TYPES.CHOICE,
    answers: [
      { name: 'Yes', redirectQuestion: null },
      { name: 'No', redirectQuestion: null }
    ]
  },
  {
    id: 2,
    name: 'Picture choice question example',
    questionType: QUESTION_TYPES.PICTURE_CHOICE,
    answerType: ANSWER_TYPES.CHOICE,
    answers: [
      { name: 'Picture 1', redirectQuestion: null },
      { name: 'Picture 2', redirectQuestion: null },
      { name: 'Picture 3', redirectQuestion: null }
    ]
  },
  {
    id: 3,
    name: 'Opinion scale question example',
    questionType: QUESTION_TYPES.OPINION_SCALE,
    answerType: ANSWER_TYPES.CHOICE,
    answers: [
      { name: '1', redirectQuestion: null },
      { name: '2', redirectQuestion: null },
      { name: '3', redirectQuestion: null }
    ]
  },
  {
    id: 4,
    name: 'Rating question example',
    questionType: QUESTION_TYPES.RATING,
    answerType: ANSWER_TYPES.CHOICE,
    answers: [
      { name: '1', redirectQuestion: null },
      { name: '2', redirectQuestion: null },
      { name: '3', redirectQuestion: null }
    ]
  },
  {
    id: 5,
    name: 'Short text question example',
    questionType: QUESTION_TYPES.SHORT_TEXT,
    answerType: ANSWER_TYPES.PLAIN_TEXT_STRING,
    answers: [{ name: '', redirectQuestion: null }]
  },
  {
    id: 6,
    name: 'Long text question example',
    questionType: QUESTION_TYPES.LONG_TEXT,
    answerType: ANSWER_TYPES.PLAIN_TEXT_STRING,
    answers: [{ name: '', redirectQuestion: null }]
  },
  {
    id: 7,
    name: 'Date question example',
    questionType: QUESTION_TYPES.DATE,
    answerType: ANSWER_TYPES.PLAIN_TEXT_DATE,
    answers: [{ name: '', redirectQuestion: null }]
  },
  {
    id: 8,
    name: 'File upload question example',
    questionType: QUESTION_TYPES.FILE_UPLOAD,
    answerType: ANSWER_TYPES.FILE,
    answers: [{ name: '111', redirectQuestion: null }]
  }
]

function FormConditionsForm(props) {
  // [CLEAN FUNCTIONS]
  const [questionsData, setQuestionsData] = useState(mockQuestion)
  const getQuestionListRedirect = (itemIndex) => {
    return questionsData.filter((item, index) => itemIndex !== index)
  }

  const addCondition = (answer, index) => {
    questionsData[index].answers = [...questionsData[index].answers, answer]
    setQuestionsData([...questionsData])
  }
  const addRedirectQuestion = (nextQuestion, answerIndex, index) => {
    questionsData[index].answers[answerIndex].redirectQuestion = nextQuestion

    setQuestionsData([...questionsData])
  }

  return (
    <>
      {mockQuestion.map((item, mockQuestionIndex) => (
        <Box mb={3}>
          <ConditionForm
            key={mockQuestionIndex}
            mockQuestionIndex={mockQuestionIndex}
            item={item}
            addCondition={addCondition}
            addRedirectQuestion={addRedirectQuestion}
            getQuestionListRedirect={getQuestionListRedirect}
          />
        </Box>
      ))}
    </>
  )
}

FormConditionsForm.propTypes = {}

export default FormConditionsForm
