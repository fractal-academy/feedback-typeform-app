import PropTypes from 'prop-types'
import { cloneElement } from 'react'
import './QuestionSimpleView.styles.css'
import { Popconfirm, message } from 'antd'
import { LAYOUT_TYPES } from 'app/constants'
import { NumberedCard } from 'app/components'
import { CloseOutlined } from '@ant-design/icons'
import COLLECTIONS from 'app/constants/collection'
import { deleteData } from 'app/services/Firestore'
import { Row, Col, Box } from '@qonsoll/react-design'

function QuestionSimpleView(props) {
  const { title, number, layoutType, onClick, id } = props

  // [CLEAN FUNCTIONS]
  const handleDelete = async () => {
    await deleteData(COLLECTIONS.QUESTIONS, id).catch((e) =>
      message.error(e.message)
    )
  }

  return (
    <Box onClick={onClick}>
      <NumberedCard number={number}>
        <Row h="around" v="center" noGutters ml={2}>
          <Col cw="auto" mr={2}>
            <Box display="flex" className="roundBox">
              {layoutType &&
                cloneElement(LAYOUT_TYPES[layoutType]?.icon, {
                  className: 'typeIcon'
                })}
            </Box>
          </Col>
          <Col width="120px" className="description">
            {title}
          </Col>
          <Col cw="auto">
            <Popconfirm title="Delete this question?" onConfirm={handleDelete}>
              <CloseOutlined />
            </Popconfirm>
          </Col>
        </Row>
      </NumberedCard>
    </Box>
  )
}

QuestionSimpleView.propTypes = {
  number: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  id: PropTypes.string,
  title: PropTypes.string,
  layoutType: PropTypes.string
}

export default QuestionSimpleView
