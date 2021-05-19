import './EditorSidebar.styles.css'
import React, { useState } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import { Typography, Divider, message, Button, Popover } from 'antd'
import {
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { styles } from './EditorSidebar.styles'
import { globalStyles } from 'app/styles'
import PropTypes from 'prop-types'
import { QuestionTypeSelect, QuestionsList } from 'domains/Question/components'
import FormConditionsForm from 'domains/Form/components/FormConditionsForm'
import { ModalWithFormConditionsForm } from 'domains/Condition/components'
import { LAYOUT_TYPE_KEYS } from 'app/constants/layoutTypes'
import { QUESTION_TYPES, COLLECTIONS } from 'app/constants'
import { getCollectionRef, setData } from 'app/services/Firestore'
import { useParams } from 'react-router'
import {
  useCurrentQuestionContextDispatch,
  DISPATCH_EVENTS
} from 'app/context/CurrentQuestion'

const { Title } = Typography

function EditorSidebar(props) {
  const { questions, endings } = props

  // [ADDITIONAL HOOKS]
  const { id } = useParams()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [COMPONENT STATE HOOKS]
  const [open, setOpen] = useState(true)
  const [showPopover, setshowPopover] = useState(false)

  // [COMPUTED PROPERTIES]

  // [CLEAN FUNCTIONS]
  const addQuestion = async ({ key }) => {
    const questionId = getCollectionRef(COLLECTIONS.QUESTIONS).doc().id
    // default data for created question
    const newQuestion = {
      id: questionId,
      formId: id,
      layoutType: LAYOUT_TYPE_KEYS[0],
      questionType: key || QUESTION_TYPES.ENDING,
      title: '',
      order: questions?.length,
      btnProps: key === QUESTION_TYPES.CHOICE ? [{ name: '', image: '' }] : ''
    }
    // set it into context as current
    await currentQuestionDispatch({
      type: DISPATCH_EVENTS.SET_CURRENT_QUESTION_TO_STATE,
      payload: newQuestion
    })
    key && setshowPopover(!showPopover)
  }
  const popoverShowChange = () => {
    setshowPopover(!showPopover)
  }
  const setNewOrder = (item) => {
    setData(COLLECTIONS.QUESTIONS, item?.id, item).catch((e) =>
      message.error(e.message)
    )
  }
  const onItemClick = (item) => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.SET_CURRENT_QUESTION_TO_STATE,
      payload: item
    })
  }

  return (
    <Box position="relative" display="flex">
      <Box
        position="absolute"
        bg="white"
        borderRadius="0 0 0 8px"
        style={styles.siderStateSwitcherStyle}
        onClick={() => {
          setOpen(!open)
        }}>
        {open ? (
          <RightOutlined style={styles.siderStateSwithcerIcon} />
        ) : (
          <LeftOutlined style={styles.siderStateSwithcerIcon} />
        )}
      </Box>
      {open && (
        <Box
          bg="white"
          width="300px"
          display="flex"
          flexDirection="column"
          position="relative">
          <Box p={3}>
            <Row display="flex" flex={1}>
              <Col v="center">
                <Title level={5} style={globalStyles.resetMargin}>
                  Questions
                </Title>
              </Col>
              <Col cw="auto" px={10} py={1} mr={2} borderRadius="4px">
                <Popover
                  visible={showPopover}
                  onVisibleChange={() => {
                    setshowPopover(!showPopover)
                  }}
                  trigger={'click'}
                  placement={'bottomRight'}
                  content={<QuestionTypeSelect onClick={addQuestion} />}>
                  <Button
                    type="text"
                    icon={<PlusOutlined style={styles.hover} />}
                    onClick={popoverShowChange}
                  />
                </Popover>
              </Col>
              <Col cw="auto" px={1} borderRadius="4px" v="center">
                <ModalWithFormConditionsForm
                  btnProps={{ icon: <SettingOutlined />, type: 'text' }}>
                  <FormConditionsForm />
                </ModalWithFormConditionsForm>
              </Col>
            </Row>
          </Box>
          {/* Question List*/}
          <Box overflow="auto" p={3}>
            {!!questions?.length && (
              <QuestionsList
                setNewOrder={setNewOrder}
                onItemClick={onItemClick}
                data={questions}
              />
            )}
          </Box>
          <Box mt="auto" style={styles.endingsPosition}>
            <Row>
              <Col>
                <Divider type="horizontal" style={globalStyles.resetMargin} />
              </Col>
            </Row>
            <Row h="center" mt={1} style={globalStyles.cursorGrab}>
              <Col cw="auto">
                <Box
                  height="3px"
                  bg="#282c34"
                  width="50px"
                  borderRadius="8px"
                />
              </Col>
            </Row>
            <Row p={3}>
              <Col v="center">
                <Title level={5} style={globalStyles.resetMargin}>
                  Endings
                </Title>
              </Col>
              <Col onClick={addQuestion} cw="auto">
                <PlusOutlined style={styles.hover} />
              </Col>
            </Row>
            <Box pb={3} px={3} maxHeight="350px" overflow="auto">
              {/*<QuestionsList />*/}
              {!!endings?.length && (
                <QuestionsList
                  setNewOrder={setNewOrder}
                  onItemClick={onItemClick}
                  data={endings}
                />
              )}
            </Box>
          </Box>
        </Box>
      )}
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
