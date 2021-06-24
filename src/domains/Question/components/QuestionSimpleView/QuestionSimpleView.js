import PropTypes from 'prop-types'
import { Popconfirm, Button } from 'antd'
import React, { cloneElement } from 'react'
import { LAYOUT_TYPES } from '../../../../constants'
import { Row, Col, Box } from '@qonsoll/react-design'
import { useTranslation } from '../../../../context/Translation'
import { DescriptionContainer } from './QuestionSimpleView.styles'
import { CloseOutlined, ExclamationOutlined } from '@ant-design/icons'
import { NumberedCard, IconRoundContainer } from '../../../../components'
import { useCurrentQuestionContext } from '../../../../context/CurrentQuestion'

function QuestionSimpleView(props) {
  const { title, action, number, layoutType, onClick, id, disableDelete } =
    props

  // [ADDITIONAL HOOKS]
  const currentQuestion = useCurrentQuestionContext()
  const { popconfirmTitle } = useTranslation()

  // [COMPUTED PROPERTIES]
  const current = currentQuestion && currentQuestion.id === id

  return (
    <Box onClick={onClick}>
      <NumberedCard current={current} number={number}>
        <Row h="around" v="center" ml={2} noGutters>
          <Col cw="auto" mr={2}>
            {!!title?.length ? (
              <IconRoundContainer>
                {layoutType && cloneElement(LAYOUT_TYPES[layoutType]?.icon)}
              </IconRoundContainer>
            ) : (
              <IconRoundContainer danger>
                {layoutType &&
                  cloneElement(
                    <ExclamationOutlined style={{ color: 'red' }} />
                  )}
              </IconRoundContainer>
            )}
          </Col>
          <Col width="150px">
            <DescriptionContainer>{title}</DescriptionContainer>
          </Col>
          <Col cw="auto">
            <Popconfirm
              title={popconfirmTitle || 'Delete this question?'}
              onConfirm={(e) => action(e, id)}
              disabled={disableDelete}>
              <Button
                icon={<CloseOutlined />}
                type="text"
                shape="circle"
                size="small"
                disabled={disableDelete}
              />
            </Popconfirm>
          </Col>
        </Row>
      </NumberedCard>
    </Box>
  )
}

QuestionSimpleView.propTypes = {
  id: PropTypes.string,
  action: PropTypes.func,
  title: PropTypes.string,
  onClick: PropTypes.func,
  layoutType: PropTypes.string,
  number: PropTypes.number.isRequired
}

export default QuestionSimpleView