import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { COLLECTIONS } from 'app/constants'
import { DragableList } from 'app/components'
import { setData } from 'app/services/Firestore'
import { QuestionSimpleView } from 'domains/Question/components'
import { message } from 'antd'
function QuestionsList(props) {
  const { data, setNewOrder, onItemClick } = props

  // [CLEAN FUNCTIONS]
  const onUpdate = (data) => {
    data.forEach((item) =>
      setData(COLLECTIONS.QUESTIONS, item?.id, {
        order: item?.order
      }).catch((e) => message.error(e.message))
    )
  }
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
