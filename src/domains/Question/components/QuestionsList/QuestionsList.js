import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { COLLECTIONS } from '../../../../constants'
import { DragableList } from '../../../../components'
import { QuestionSimpleView } from '../index'
import { message } from 'antd'
function QuestionsList(props) {
  const { data, setNewOrder, onItemClick, onQuestionListUpdate } = props

  // [CLEAN FUNCTIONS]
  // const onUpdate = (data) => {
  //   data.forEach((item) =>
  //    setData(COLLECTIONS.QUESTIONS, item?.id, {
  //        order: item?.order
  //      }).catch((e) => message.error(e.message))
  //     onQuestionListUpdate?.(item)
  //   )
  // }
  const dataSource = useMemo(
    () => (data ? data.sort((a, b) => a.order - b.order) : []),
    [data]
  )
  return (
    <DragableList
      itemLayout="horizontal"
      dataSource={dataSource}
      onUpdate={onQuestionListUpdate}
      setNewOrder={setNewOrder}
      renderItem={(item, index) => (
        <QuestionSimpleView
          {...item}
          number={index + 1}
          onClick={() => onItemClick(item, index)}
        />
      )}
    />
  )
}

QuestionsList.propTypes = {
  data: PropTypes.array
}

export default QuestionsList
