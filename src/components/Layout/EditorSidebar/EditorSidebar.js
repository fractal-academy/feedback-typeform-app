import PropTypes from 'prop-types'
import { Row, Col, Box } from '@qonsoll/react-design'
import React, { useEffect, useState, useMemo } from 'react'
import { Typography, Button, Popover, Tooltip, message } from 'antd'
import { QUESTION_TYPES, COLLECTIONS } from '../../../constants'
import { LAYOUT_TYPE_KEYS } from '../../../constants/layoutTypes'
import { ModalWithFormConditionsForm } from '../../../domains/Condition/components'
import FormConditionsForm from '../../../domains/Form/components/FormConditionsForm'
import {
  QuestionTypeSelect,
  QuestionsList
} from '../../../domains/Question/components'
import {
  useCurrentQuestionContextDispatch,
  DISPATCH_EVENTS
} from '../../../context/CurrentQuestion'
import {
  CustomDivider,
  SidebarBoxWrapper,
  styles
} from './EditorSidebar.styles'
import { v4 as uuid } from 'uuid'
import useFunctions from '../../../hooks/useFunctions'
import { useTranslation } from '../../../context/Translation'
import { PlusOutlined, SettingOutlined } from '@ant-design/icons'
import { PopoverNegativeMarin } from '../../../../styles/NegativeMargin'

const { Title } = Typography

function EditorSidebar(props) {
  const {
    id,
    endings,
    formData,
    questions,
    transparent,
    answerScoresData,
    customQuestionTypes,
    welcomeScreenShowRule
  } = props

  //[CUSTOM HOOKS]
  const { getCollectionRef, setData } = useFunctions()
  const {
    editorSidebarEndingsTitle,
    editorSidebarQuestionsTitle,
    createNewQuestionTooltip,
    endingCreateTooltip
  } = useTranslation()

  // [ADDITIONAL HOOKS]
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPONENT STATE HOOKS]
  // const [open, setOpen] = useState(true)
  const [showPopover, setShowPopover] = useState(false)
  const [tabKey, setTabKey] = useState('1')

  // [CLEAN FUNCTIONS]
  const addQuestion = async ({ key }) => {
    const questionId = getCollectionRef(COLLECTIONS.QUESTIONS).doc().id
    //Boolean conditions
    const isChoices = [
      QUESTION_TYPES.CHOICE,
      QUESTION_TYPES.PICTURE_CHOICE
    ].includes(key)

    const isOpinionOrRating = [
      QUESTION_TYPES.OPINION_SCALE,
      QUESTION_TYPES.RATING
    ].includes(key)

    const isYesNo = key === QUESTION_TYPES.YES_NO
    //configuration for certain types of questions
    const choicesConfiguration = [
      {
        answerOptionId: uuid(),
        answerOption: 'default',
        image: '',
        redirectQuestion: '',
        redirectConditionRule: ''
      }
    ]
    const yesNoConfiguration = [
      {
        answerOptionId: uuid(),
        answerOption: 'Yes',
        redirectQuestion: '',
        redirectConditionRule: ''
      },
      {
        answerOptionId: uuid(),
        answerOption: 'No',
        redirectQuestion: '',
        redirectConditionRule: ''
      }
    ]
    const opinionAndRatingConfiguration = Array(5)
      .fill(0)
      ?.map((_, index) => ({
        answerOptionId: uuid(),
        answerOption: 1 + index,
        redirectQuestion: '',
        redirectConditionRule: ''
      }))

    const defaultConfiguration = [
      {
        answerOptionId: '',
        answerOption: '',
        redirectQuestion: '',
        redirectConditionRule: ''
      }
    ]

    //pass data to question configurations depending on question type
    const questionConfigurations = isChoices
      ? choicesConfiguration
      : isYesNo
      ? yesNoConfiguration
      : isOpinionOrRating
      ? opinionAndRatingConfiguration
      : defaultConfiguration

    const containWelcomeScreen = questions.some(
      (q) => q.questionType === QUESTION_TYPES.WELCOME_SCREEN
    )
    const isEnding = !key

    // default data for created question
    const newQuestion = {
      questionConfigurations: isEnding ? [] : questionConfigurations,
      id: questionId,
      formId: id,
      layoutType: LAYOUT_TYPE_KEYS[0],
      questionType: key || QUESTION_TYPES.ENDING,
      title: '',
      order:
        key === QUESTION_TYPES.WELCOME_SCREEN
          ? 0
          : containWelcomeScreen
          ? isEnding
            ? questions?.length + endings?.length
            : questions?.length
          : isEnding
          ? questions?.length + endings?.length + 1
          : questions?.length + 1
    }

    await setData(COLLECTIONS?.QUESTIONS, newQuestion?.id, newQuestion).catch(
      (e) => message.error(e)
    )
    // set it into context as current
    await currentQuestionDispatch({
      type: DISPATCH_EVENTS.SET_CURRENT_QUESTION_TO_STATE,
      payload: newQuestion
    })

    key && setShowPopover(!showPopover)
  }

  const popoverShowChange = () => {
    setShowPopover(!showPopover)
  }

  const onItemClick = (item) => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.SET_CURRENT_QUESTION_TO_STATE,
      payload: item
    })
  }

  const onTabChange = (key) => {
    key !== tabKey && setTabKey(key)
  }

  const onResetLogic = () => {
    questions?.forEach((item) => {
      const condition = [
        QUESTION_TYPES.OPINION_SCALE,
        QUESTION_TYPES.RATING,
        QUESTION_TYPES.PICTURE_CHOICE,
        QUESTION_TYPES.CHOICE,
        QUESTION_TYPES.YES_NO
      ].includes(item.questionType)
      const newQuestionConfigs = item?.questionConfigurations?.map(
        (answerConfig) => {
          const formattedObject = Object.entries(answerConfig)
          const resetFields = formattedObject?.map((tuple) => {
            if (
              ['answerOption', 'answerOptionId'].includes(tuple[0]) &&
              condition
            ) {
              return tuple
            } else {
              return [tuple[0], '']
            }
          })
          return Object.fromEntries(resetFields)
        }
      )
      if (condition) {
        setData(COLLECTIONS.QUESTIONS, item.id, {
          questionConfigurations: newQuestionConfigs || []
        })
      } else {
        newQuestionConfigs?.[0] &&
          setData(COLLECTIONS.QUESTIONS, item.id, {
            questionConfigurations: [newQuestionConfigs?.[0]] || []
          })
      }
    })
  }

  const onResetEndings = () => {
    endings?.forEach((ending) =>
      setData(COLLECTIONS.QUESTIONS, ending?.id, {
        questionConfigurations: []
      })
    )
  }
  const onResetAnswersScore = () => {
    answerScoresData?.forEach((item) =>
      setData(COLLECTIONS.ANSWERS_SCORES_CONDITIONS, item?.id, {
        questionScores: []
      })
    )
  }

  //[COMPUTED PROPERTIES]
  const resetActionsMap = {
    1: onResetLogic,
    2: onResetEndings,
    3: onResetAnswersScore
  }

  const conditionsQuestionsList = useMemo(
    () =>
      questions
        ? questions?.filter(
            (item) =>
              ![
                QUESTION_TYPES.ENDING,
                QUESTION_TYPES.WELCOME_SCREEN,
                QUESTION_TYPES.STATEMENT
              ].includes(item.questionType)
          )
        : [],
    [questions]
  )
  const containWelcomeScreen = useMemo(
    () =>
      !!questions?.filter(
        (question) => question?.questionType === QUESTION_TYPES.WELCOME_SCREEN
      )?.length,
    [questions]
  )

  useEffect(() => {
    //when add/delete question - update endings order
    endings?.map((item, index) =>
      setData(COLLECTIONS.QUESTIONS, item?.id, {
        ...item,
        order: containWelcomeScreen
          ? questions?.length + index
          : questions?.length + index + 1
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions?.length])

  return (
    <Box position="relative" display="flex">
      {/* <SidebarStateSwitcher
        onClick={() => {
          setOpen(!open)
        }}>
        {open ? <RightOutlined /> : <LeftOutlined />}
      </SidebarStateSwitcher> */}
      {/* {open && ( */}
      <SidebarBoxWrapper transparent={transparent}>
        <Box p={3}>
          <Row noGutters>
            <Col v="center">
              <Title level={5}>
                {editorSidebarQuestionsTitle || 'Questions'}
              </Title>
            </Col>
            <Col cw="auto">
              <Popover
                trigger="click"
                placement="bottomRight"
                visible={showPopover}
                onVisibleChange={() => {
                  setShowPopover(!showPopover)
                }}
                content={
                  <Box my={PopoverNegativeMarin.v} mx={PopoverNegativeMarin.h}>
                    <QuestionTypeSelect
                      questions={questions}
                      onClick={addQuestion}
                      customQuestionTypes={customQuestionTypes}
                      welcomeScreenShowRule={welcomeScreenShowRule}
                    />
                  </Box>
                }>
                <Tooltip
                  placement="bottom"
                  title={createNewQuestionTooltip || 'Create new question'}>
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={popoverShowChange}
                    onMouseDown={(e) => e.preventDefault()}
                  />
                </Tooltip>
              </Popover>
            </Col>

            <Col cw="auto" v="center" ml={1}>
              <ModalWithFormConditionsForm
                onResetClick={resetActionsMap[tabKey]}
                btnProps={{ icon: <SettingOutlined />, type: 'text' }}>
                <FormConditionsForm
                  endings={endings}
                  formData={formData}
                  onTabChange={onTabChange}
                  answerScores={answerScoresData}
                  conditionsQuestionsList={conditionsQuestionsList}
                />
              </ModalWithFormConditionsForm>
            </Col>
          </Row>
        </Box>
        {/* Question List*/}
        <Box overflow="auto" pr={2}>
          {!!questions?.length && (
            <QuestionsList
              data={questions}
              onItemClick={onItemClick}
              disableDelete={questions?.length === 1}
            />
          )}
        </Box>
        <Box mt="auto">
          <Row>
            <Col>
              <CustomDivider type="horizontal" />
            </Col>
          </Row>
          <Row p={3} noGutters>
            <Col v="center">
              <Title level={5}>{editorSidebarEndingsTitle || 'Endings'}</Title>
            </Col>
            <Col cw="auto">
              <Tooltip
                placement="topRight"
                title={endingCreateTooltip || 'Create new ending'}>
                <Button
                  // disabled={endings.length >= 1}
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={addQuestion}
                />
              </Tooltip>
            </Col>
          </Row>
          <Box {...styles.endingsList}>
            {!!endings?.length && (
              <QuestionsList
                data={endings}
                questionsData={questions}
                onItemClick={onItemClick}
                disableDelete={endings?.length === 1}
              />
            )}
          </Box>
        </Box>
      </SidebarBoxWrapper>
      {/* )} */}
    </Box>
  )
}

EditorSidebar.defaultProps = {
  questionsList: 'Questions list',
  questionsEndingsList: 'Question endings list'
}

EditorSidebar.propTypes = {
  questionsList: PropTypes.node.isRequired,
  questionsEndingsList: PropTypes.node.isRequired
}

export default EditorSidebar
