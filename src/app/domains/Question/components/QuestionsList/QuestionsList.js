import { message } from 'antd'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { COLLECTIONS } from 'app/constants'
import { DragableList } from 'app/components'
import { setData, deleteData } from 'app/services/Firestore'
import { QuestionSimpleView } from 'domains/Question/components'
import {
  DISPATCH_EVENTS,
  useCurrentQuestionContext,
  useCurrentQuestionContextDispatch
} from 'app/context/CurrentQuestion'

function QuestionsList(props) {
  const { data, setNewOrder, onItemClick, disableDelete } = props

  const currentQuestion = useCurrentQuestionContext()
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [CLEAN FUNCTIONS]
  const onUpdate = (data) => {
    data.forEach((item) =>
      setData(COLLECTIONS.QUESTIONS, item?.id, item).catch((e) =>
        message.error(e.message)
      )
    )
  }

  const handleDelete = (e, questionId) => {
    e.stopPropagation()
    //filter all questions without deleted question
    const updatedData = data?.filter((item) => item.id !== questionId)
    const deletedItemIndex = data?.findIndex(
      (item) => item.id === questionId && item
    )
    const newCurrentQuestion =
      data[deletedItemIndex - 1] || data[deletedItemIndex + 1] || {}

    deleteData(COLLECTIONS.QUESTIONS, questionId).catch((e) =>
      message.error(e.message)
    )
    //update order for all questions
    updatedData?.forEach((item, index) => {
      setData(COLLECTIONS.QUESTIONS, item?.id, {
        ...item,
        order: index
      }).catch((e) => message.error(e.message))
    })

    currentQuestion.id === questionId &&
      currentQuestionDispatch({
        type: DISPATCH_EVENTS.SET_CURRENT_QUESTION_TO_STATE,
        payload: newCurrentQuestion
      })
  }
  // [COMPUTED PROPERTIES]
  const dataSource = useMemo(
    () => (data ? data.sort((a, b) => a.order - b.order) : []),
    [data]
  )

  return (
    <DragableList
      itemLayout="horizontal"
      dataSource={dataSource}
      onUpdate={onUpdate}
      setNewOrder={setNewOrder}
      renderItem={(item, index) => (
        <QuestionSimpleView
          {...item}
          action={handleDelete}
          number={index + 1}
          onClick={() => onItemClick(item, index)}
          disableDelete={disableDelete}
        />
      )}
    />
  )
}

QuestionsList.propTypes = {
  data: PropTypes.array,
  action: PropTypes.func,
  setNewOrder: PropTypes.func,
  onItemClick: PropTypes.func
}

export default QuestionsList
