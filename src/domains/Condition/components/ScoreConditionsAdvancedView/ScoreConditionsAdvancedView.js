import React from 'react'
import { Typography } from 'antd'
import useFunctions from '../../../../hooks/useFunctions'
import { COLLECTIONS } from '../../../../constants'
import { Box } from '@qonsoll/react-design'
import { NumberedCard } from '../../../../components'
import { ScoreConditionsItemRow } from '../'

const { Title } = Typography

const ScoreConditionsAdvancedView = (props) => {
  const { index, questionData, questionScoresData = {} } = props

  // [ADDITIONAL HOOKS]
  const { setData, getCollectionRef } = useFunctions()

  // [CLEAN FUNCTIONS]
  const onMarkChange = async (
    questionId,
    formId,
    questionScoreValue,
    answerOptionId
  ) => {
    const answerScoresId =
      questionScoresData?.id ||
      getCollectionRef(COLLECTIONS.ANSWERS_SCORES_CONDITIONS).doc().id
    const questionScores = questionScoresData.questionScores?.length
      ? [
          ...questionScoresData?.questionScores.filter(
            (item) => item.answerOptionId !== answerOptionId
          ),
          { answerOptionId, score: questionScoreValue || '' }
        ]
      : [{ answerOptionId, score: questionScoreValue || '' }]
    await setData(COLLECTIONS.ANSWERS_SCORES_CONDITIONS, answerScoresId, {
      questionId,
      formId: formId,
      questionScores,
      id: answerScoresId
    })
  }

  const getScoreByAnswerOptionId = (answerOptionId) =>
    questionScoresData?.questionScores?.find(
      (item) => item?.answerOptionId === answerOptionId
    )?.score

  return (
    <NumberedCard number={index + 1} key={index}>
      <Box ml={3}>
        <Title level={5} style={{ marginBottom: '10px' }}>
          {questionData?.title}
        </Title>
        {questionData?.questionConfigurations?.map((item, index) => (
          <ScoreConditionsItemRow
            index={index}
            item={item}
            questionData={questionData}
            onMarkChange={onMarkChange}
            questionScoresData={questionScoresData}
            getScoreByAnswerOptionId={getScoreByAnswerOptionId}
          />
        ))}
      </Box>
    </NumberedCard>
  )
}

export default ScoreConditionsAdvancedView
