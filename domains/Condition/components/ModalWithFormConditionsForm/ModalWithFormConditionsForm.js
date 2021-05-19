import { useState } from 'react'
import PropTypes from 'prop-types'
import { globalStyles } from 'app/styles'
import { Modal, Button, Typography } from 'antd'
import { Row, Col } from '@qonsoll/react-design'
import { styles } from './ModalWithFormConditionsForm.styles'

const { Title, Text } = Typography

function ModalWithFormConditionsForm(props) {
  const { btnProps, children } = props

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)

  // [CLEAN FUNCTIONS]
  const resetLogic = () => {}
  const onSave = () => {
    setIsModalVisible(!isModalVisible)
  }
  const onCancel = () => {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <>
      <Button
        {...btnProps}
        onClick={() => {
          setIsModalVisible(!isModalVisible)
        }}
      />
      <Modal
        visible={isModalVisible}
        centered
        okText="Save"
        cancelButtonProps={{ type: 'text' }}
        onOk={onSave}
        onCancel={onCancel}
        closable={false}
        width="1024px"
        bodyStyle={styles.modalBodyStyle}
        title={
          <>
            <Row mb={1} v="center">
              <Col>
                <Title level={3} style={globalStyles.resetMargin}>
                  Logic jumps
                </Title>
              </Col>
              <Col cw="auto" v="center">
                <Button type="text" onClick={resetLogic}>
                  Reset logic
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Text>Here should be description</Text>
              </Col>
            </Row>
          </>
        }>
        {children}
      </Modal>
    </>
  )
}

ModalWithFormConditionsForm.propTypes = {
  btnProps: PropTypes.object.isRequired,
  children: PropTypes.node
}

export default ModalWithFormConditionsForm
