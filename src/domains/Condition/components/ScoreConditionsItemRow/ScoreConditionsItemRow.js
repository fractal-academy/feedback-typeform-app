import React, { useState, useEffect } from 'react'
import { Row, Col } from '@qonsoll/react-design'
import {
  OptionBox,
  StyledInputNumber,
  CustomTextBox
} from './ScoreConditionsItemRow.style'
import { Typography } from 'antd'
import { useTranslation } from '../../../../context/Translation'

const { Text } = Typography
const startLetter = 65

const ScoreConditionsItemRow = (props) => {
  const {
    index,
    item,
    questionData,
    onMarkChange,
    questionScoresData,
    getScoreByAnswerOptionId
  } = props

  //[CUSTOM HOOKS]
  const { scoreWeightTranslation } = useTranslation()
  const [scoreValue, setScoreValue] = useState(
    getScoreByAnswerOptionId(item?.answerOptionId)
  )

  const onInputValueChange = (value) => {
    const computedValue = value || ''
    setScoreValue(computedValue)
  }

  //for reseting input values when press reset button
  useEffect(() => {
    if (!questionScoresData?.questionScores?.length) setScoreValue('')
  }, [questionScoresData])
  return (
    <Row noGutters mb={2} key={index}>
      <Col cw={8} style={{ paddingRight: '32px' }}>
        <OptionBox px={2}>
          <CustomTextBox mr={2} px={2}>
            <Text strong>{String.fromCharCode(startLetter + index)}</Text>
          </CustomTextBox>
          <Text ellipsis>{item?.answerOption}</Text>
        </OptionBox>
      </Col>
      <Col cw={4}>
        <StyledInputNumber
          min={0}
          onChange={onInputValueChange}
          value={scoreValue}
          placeholder={scoreWeightTranslation || 'Enter score weight of answer'}
          onBlur={() =>
            onMarkChange(
              questionData?.id,
              questionData?.formId,
              scoreValue,
              item?.answerOptionId
            )
          }
        />
      </Col>
    </Row>
  )
}

export default ScoreConditionsItemRow
