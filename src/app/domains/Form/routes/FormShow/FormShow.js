import React, { useEffect, useState } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import { Button, Divider, Typography } from 'antd'
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router'
import { useKeyPress } from '@umijs/hooks'
import { globalStyles } from 'app/styles'
import { firestore } from 'app/services'
import { FormAdvancedView } from 'domains/Form/components'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { QuestionAdvancedView } from 'domains/Question/components'
import { LAYOUT_TYPES, QUESTION_TYPES } from 'app/constants'
import { styles } from './FormShow.style'
// import { useTranslation } from 'react-i18next'

const { Title } = Typography

function FormShow(props) {
  // const { WRITE_PROPS_HERE } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  const history = useHistory()
  const [data] = useCollectionData(firestore.collection('questions'))
  useKeyPress('enter', (event) => {
    onClick()
  })

  // [COMPONENT STATE HOOKS]
  const [isAnswered, setIsAnswered] = useState(false)

  // [COMPUTED PROPERTIES]
  const layoutTypeMap = {
    fullscreen: QUESTION_TYPES.FULL_SCREEN,
    between: QUESTION_TYPES.BETWEEN,
    leftsidesmall: QUESTION_TYPES.LEFT_SIDE_SMALL,
    leftsidebig: QUESTION_TYPES.LEFT_SIDE_BIG,
    rightsidesmall: QUESTION_TYPES.RIGHT_SIDE_SMALL,
    rightsidebig: QUESTION_TYPES.RIGHT_SIDE_BIG
  }

  // [CLEAN FUNCTIONS]
  const onRestart = () => {}
  const onClick = () => {
    setIsAnswered(true)
  }
  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true

    // [CLEAN UP FUNCTION]
    return () => {
      // [OTHER CLEAN UP-S (UNSUBSCRIPTIONS)]
      // write code here...

      // [FINAL CLEAN UP]
      isComponentMounted = false
    }
  }, [])

  return (
    <Box bg="#f6f9fe" display="flex" flexDirection="column" height="100%">
      <Row py={3} px={4} noGutters bg="white">
        <Col cw="auto" p={0} v="center">
          <Button
            size="small"
            type="text"
            style={globalStyles.resetPadding}
            icon={<ArrowLeftOutlined style={globalStyles.iconSize} />}
            onClick={() => history.goBack()}
          />
        </Col>

        <Col style={styles.textAlign}>
          <Title level={5} style={globalStyles.resetMargin}>
            Live Preview
          </Title>
        </Col>
        <Col cw="auto" v="center">
          <Button
            type="text"
            size="small"
            icon={<ReloadOutlined />}
            onClick={onRestart}>
            Restart
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Divider style={globalStyles.resetMargin} />
        </Col>
      </Row>
      <Box
        display="flex"
        flex={1}
        justifyContent="center"
        alignItems="center"
        p={4}
        m={4}
        borderRadius="8px"
        bg="white">
        <FormAdvancedView>
          {data?.map((item, index) => (
            <Box height="600px">
              <QuestionAdvancedView
                questionNumber={index + 1}
                title={item?.title}
                subtitle={item?.subtitle}
                image={item?.image}
                question={{
                  questionType: item?.questionType,
                  btnProps: {
                    type: item?.btnProps?.type,
                    children: item?.btnProps?.children
                  },
                  layoutType: LAYOUT_TYPES.RIGHT_SIDE_BIG
                }}
              />
            </Box>
          ))}
          {/* <Box height="600px">
           <FormAdvancedView isAnswered={isAnswered} setIsAnswered={setIsAnswered}>
          <Box height="500px">
            <QuestionAdvancedView
              questionNumber={1}
              question={{
                questionType: QUESTION_TYPES.WELCOME_SCREEN,
                layoutType: LAYOUT_TYPES.LEFT_SIDE_BIG,
                btnProps: {
                  type: 'primary',
                  children: 'Submit',
                  onClick: onClick
                }
              }}
            />
          </Box>
          <Box height="500px">
            <QuestionAdvancedView
              questionNumber={2}
              question={{
                questionType: QUESTION_TYPES.LONG_TEXT,
                layoutType: LAYOUT_TYPES.LEFT_SIDE_BIG,
                btnProps: {
                  type: 'primary',
                  children: 'Submit',
                  onClick: onClick
                }
              }}
            />
          </Box>
          <Box height="500px">
            <QuestionAdvancedView
              questionNumber={3}
              question={{
                questionType: QUESTION_TYPES.SHORT_TEXT,
                layoutType: LAYOUT_TYPES.RIGHT_SIDE_BIG,
                btnProps: {
                  type: 'primary',
                  children: 'Submit',
                  onClick: onClick
                }
              }}
            /> */}
          {/* 
          </Box>
          <Box height="500px">
            <QuestionAdvancedView
              questionNumber={4}
              question={{
                questionType: QUESTION_TYPES.DATE,
                layoutType: LAYOUT_TYPES.RIGHT_SIDE_BIG,
                btnProps: {
                  type: 'primary',
                  children: 'Submit',
                  onClick: onClick
                }
              }}
            />
          </Box>
          <Box height="500px">
            <QuestionAdvancedView
              questionNumber={5}
              question={{
                questionType: QUESTION_TYPES.RATING,
                layoutType: LAYOUT_TYPES.LEFT_SIDE_SMALL
              }}
            />
          </Box>
          <Box height="500px">
            <QuestionAdvancedView
              questionNumber={6}
              question={{
                questionType: QUESTION_TYPES.PICTURE_CHOICE,
                layoutType: LAYOUT_TYPES.BETWEEN,
                btnProps: {
                  type: 'primary',
                  children: 'Submit',
                  onClick: onClick
                }
              }}
            />
          </Box>
          <Box height="500px">
            <QuestionAdvancedView
              questionNumber={7}
              question={{
                questionType: QUESTION_TYPES.OPINION_SCALE,
                layoutType: LAYOUT_TYPES.FULL_SCREEN,
                btnProps: {
                  type: 'primary',
                  children: 'Submit',
                  onClick: onClick
                }
              }}
            />
          </Box>
          <Box height="500px">
            <QuestionAdvancedView
              questionNumber={8}
              question={{
                questionType: QUESTION_TYPES.YES_NO,
                layoutType: LAYOUT_TYPES.RIGHT_SIDE_BIG,
                btnProps: {
                  type: 'primary',
                  children: 'Submit',
                  onClick: onClick
                }
              }}
            />
          </Box>
          <Box height="500px">
            <QuestionAdvancedView
              questionNumber={9}
              question={{
                questionType: QUESTION_TYPES.FILE_UPLOAD,
                layoutType: LAYOUT_TYPES.RIGHT_SIDE_BIG,
                btnProps: {
                  type: 'primary',
                  children: 'Submit',
                  onClick: onClick
                }
              }}
            />
          </Box>
          <Box height="500px">
            <QuestionAdvancedView
              questionNumber={10}
              question={{
                questionType: QUESTION_TYPES.STATEMENT,
                layoutType: LAYOUT_TYPES.LEFT_SIDE_BIG,
                btnProps: {
                  type: 'primary',
                  children: 'Submit',
                  onClick: onClick
                }
              }}
            />
          </Box> */}
        </FormAdvancedView>
      </Box>
    </Box>
  )
}

FormShow.propTypes = {}

export default FormShow
