import { useState, useEffect } from 'react'
import {
  PageLayout,
  EditorSidebar,
  QuestionLayoutSwitcher,
  FormContentArea,
  Spinner
} from 'components'
import { useParams } from 'react-router'
import { Box } from '@qonsoll/react-design'
import { QuestionForm } from 'app/domains/Question/components'
import { getCollectionRef, setData } from 'app/services/Firestore'
import { QUESTION_TYPES, COLLECTIONS, DEFAULT_IMAGE } from 'app/constants'
import {
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch,
  DISPATCH_EVENTS
} from 'app/context/CurrentQuestion'
import {
  useCollectionData,
  useDocumentData
} from 'react-firebase-hooks/firestore'

function FormEdit() {
  // [ADDITIONAL HOOKS]
  const { id } = useParams()
  const [form, formLoading] = useDocumentData(
    getCollectionRef(COLLECTIONS.FORMS).doc(id)
  )
  const [questionsList, questionsListLoading] = useCollectionData(
    getCollectionRef(COLLECTIONS.QUESTIONS).where('formId', '==', id)
  )
  // [CUSTOM_HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  //[COMPONENT STATE HOOKS]
  const [isImageEditVisible, setIsImageEditVisible] = useState(false)
  const [showPopover, setShowPopover] = useState(false)
  const [defaultTab, setDefaultTab] = useState(currentQuestion?.layoutType)

  // [COMPUTED PROPERTIES]
  let questions, endings
  if (!formLoading && !questionsListLoading) {
    questions = questionsList.filter(
      (item) => item.questionType !== QUESTION_TYPES.ENDING
    )

    endings = questionsList.filter(
      (item) => item.questionType === QUESTION_TYPES.ENDING
    )
  }

  // [CLEAN FUNCTIONS]
  const onChangeMenuItem = async ({ key }) => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: {
        layoutType: key,
        image: currentQuestion?.image || DEFAULT_IMAGE
      }
    })
  }
  const onQuestionTypeChange = async ({ key }) => {
    const btnProps =
      key === QUESTION_TYPES.CHOICE ? [{ name: '', image: '' }] : ''
    await currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { questionType: key, btnProps }
    })
    setShowPopover(false)
  }

  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true
    setDefaultTab(currentQuestion?.layoutType)
    setData(COLLECTIONS.QUESTIONS, currentQuestion?.id, currentQuestion)
    // [EFFECT LOGIC]
    // write code here...
    // code sample: isComponentMounted && setState(<your data for state updation>)

    // [CLEAN UP FUNCTION]
    return () => {
      // [OTHER CLEAN UP-S (UNSUBSCRIPTIONS)]
      // write code here...

      // [FINAL CLEAN UP]
      isComponentMounted = false
    }
  }, [currentQuestion])

  return (
    <>
      {formLoading || questionsListLoading ? (
        <Spinner />
      ) : (
        <Box display="flex" height="inherit" overflowX="hidden">
          <PageLayout title={form?.title}>
            <FormContentArea
              leftSideMenu={
                !!Object.keys(currentQuestion).length && (
                  <QuestionLayoutSwitcher
                    onChange={onChangeMenuItem}
                    defaultActive={defaultTab}
                  />
                )
              }>
              {!!Object.keys(currentQuestion).length && (
                <QuestionForm
                  data={currentQuestion}
                  onQuestionTypeChange={onQuestionTypeChange}
                  showPopover={showPopover}
                  setShowPopover={setShowPopover}
                  isImageEditVisible={isImageEditVisible}
                  setIsImageEditVisible={setIsImageEditVisible}
                />
              )}
            </FormContentArea>
          </PageLayout>

          <EditorSidebar questions={questions} endings={endings} />
        </Box>
      )}
    </>
  )
}

FormEdit.propTypes = {}

export default FormEdit
