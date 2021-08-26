import React, { useState } from 'react'
import ActionsFunctionsContext from '../../../../context/ActionsFunctions/ActionsFunctionsContext'
import {
  TranslationContext,
  useTranslation
} from '../../../../context/Translation'
import TypeformConfigurationContext from '../../../../context/TypeformConfigurationContext'
import FirebaseContext from '../../../../context/Firebase/FirebaseContext'
import useFunctions from '../../../../hooks/useFunctions'
import { COLLECTIONS } from '../../../../constants'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'
import { Row, Col, Box } from '@qonsoll/react-design'
import { ResponseTable, ResponseList } from '../../../Response/components'
import { message } from 'antd'
import { EmptyState } from '../../../../../src/domains/Form/components/FormConditionsForm/FormConditionsForm.styles'
import useMedia from 'use-media'
import Text from 'antd/es/typography/Text'

function FormAnswers(props) {
  const { actions = {}, id, translate, firebase, configurations } = props
  const { emptyStateDescription } = useTranslation()

  // [COMPONENT STATE HOOKS]
  const [userAnswers, setUserAnswers] = useState([])
  const [userAnswersLoading, setUserAnswersLoading] = useState(false)
  // [CUSTOM HOOKS]
  const { getCollectionRef } = useFunctions(firebase)

  // [ADDITIONAL HOOKS]
  const [userAnswerGroup, userAnswerGroupLoading] = useCollectionData(
    getCollectionRef(COLLECTIONS.USER_ANSWERS_GROUP).where('formId', '==', id)
  )
  const [formData] = useDocumentData(
    getCollectionRef(COLLECTIONS.FORMS).doc(id)
  )
  const handleSmallScreen = useMedia({ minWidth: '900px' })
  const { smallScreenHandleWarning } = useTranslation()

  // [CLEAN FUNCTIONS]
  const onListItemClick = async (user, date) => {
    try {
      setUserAnswersLoading(true)
      const answers = await getCollectionRef(COLLECTIONS.ANSWERS)
        .where('user', '==', user)
        .where('date', '==', date)
        .where('formId', '==', id)
        .get()
      const answersData = answers?.docs?.map((item, index) => {
        const answerCheck =
          item?.data()?.questionType === 'File upload'
            ? Object.values(item?.data()?.answer)
                .map((uploadItem) => uploadItem.name)
                .toString()
            : item?.data()?.answer

        return {
          key: index,
          questionTitle: item?.data()?.questionTitle,
          answer: answerCheck,
          answerScore: item?.data()?.answerScore || 'No scores',
          order: item?.data()?.order
        }
      })
      setUserAnswers(answersData.sort((a, b) => a.order - b.order))
    } catch (e) {
      console.log(e)
      message.error('Error occurred during user answers loading')
    }
    setUserAnswersLoading(false)
  }
  const checkUserAswerGroup = userAnswerGroup?.length > 0

  return (
    <FirebaseContext.Provider value={firebase}>
      <ActionsFunctionsContext.Provider value={actions}>
        <TranslationContext.Provider value={{ t: translate }}>
          <TypeformConfigurationContext.Provider value={configurations}>
            {handleSmallScreen ? (
              checkUserAswerGroup ? (
                <Row noGutters height="inherit" my={3}>
                  <Col height="inherit" cw="auto" ml={3}>
                    <ResponseList
                      userAnswerGroup={userAnswerGroup}
                      loading={userAnswerGroupLoading}
                      onListItemClick={onListItemClick}
                    />
                  </Col>
                  <Col height="inherit" overflowY="scroll">
                    <ResponseTable
                      isFormQuiz={formData?.isQuiz}
                      data={userAnswers}
                      loading={userAnswersLoading}
                    />
                  </Col>
                </Row>
              ) : (
                <EmptyState
                  description={
                    emptyStateDescription ||
                    "This form doesn't have any responses yet"
                  }
                />
              )
            ) : (
              <Box
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center">
                <Text>
                  {smallScreenHandleWarning ||
                    'This feature is available only on desktop.'}
                </Text>
              </Box>
            )}
          </TypeformConfigurationContext.Provider>
        </TranslationContext.Provider>
      </ActionsFunctionsContext.Provider>
    </FirebaseContext.Provider>
  )
}

FormAnswers.propTypes = {}

export default FormAnswers
