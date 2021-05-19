import PropTypes from 'prop-types'
import { ROUTES_PATHS } from 'app/constants'
import { useState, cloneElement } from 'react'
import { styles } from './FormSimpleView.style'
import COLLECTIONS from 'app/constants/collection'
import { Row, Col, Box } from '@qonsoll/react-design'
import { generatePath, useHistory } from 'react-router-dom'
import { FileOutlined, MoreOutlined } from '@ant-design/icons'
import { deleteData, updateData } from 'app/services/Firestore'
import { Card, Typography, Dropdown, Menu, Popconfirm, message } from 'antd'
import FormSimpleFormWithModal from 'domains/Form/components/FormSimpleFormWithModal'

const { Meta } = Card
const { Text } = Typography

function FormSimpleView(props) {
  const { title, subtitle, id } = props

  // [ADDITIONAL HOOKS]
  const history = useHistory()

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  // [COMPUTED PROPERTIES]
  const formRoute = generatePath(ROUTES_PATHS.FORM_EDIT, { id })

  // [CLEAN FUNCTIONS]
  const onFormItemClick = () => {
    formRoute && history.push(formRoute)
  }
  const handleCancel = () => {
    setVisible(false)
  }

  const showPopconfirm = () => {
    setVisible(!visible)
  }
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleDelete = async () => {
    setConfirmLoading(true)
    await deleteData(COLLECTIONS.FORMS, id).catch((e) =>
      message.error(e.message)
    )

    setVisible(false)
    setConfirmLoading(false)
  }
  const onModalSubmit = async (data) => {
    await updateData(COLLECTIONS.FORMS, id, {
      title: data?.name,
      subtitle: data?.description
    }).catch((e) => message.error(e.message))
  }
  // [MENU TEMPLATE]
  const menu = (
    <Menu>
      <Menu.Item onClick={showModal} key={'showModal'}>
        <Text>Rename</Text>
        <FormSimpleFormWithModal
          formData={props}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onModalSubmit={onModalSubmit}
          isEdit
        />
      </Menu.Item>

      <Menu.Item onClick={showPopconfirm} key={'showPopconfirm'}>
        <Popconfirm
          title="Delete this form?"
          onConfirm={handleDelete}
          onCancel={handleCancel}
          visible={visible}
          okButtonProps={{ loading: confirmLoading }}>
          {/*<Box display="block">*/}
          <Text>Delete</Text>
          {/*</Box>*/}
        </Popconfirm>
      </Menu.Item>
    </Menu>
  )

  // [COMPONENT TEMPLATE]
  return (
    <Card
      style={styles.cardStyles}
      bodyStyle={styles.cardBodyStyle}
      cover={
        <Box
          bg="white"
          display="flex"
          height="140px"
          borderRadius="8px"
          alignItems="center"
          justifyContent="center"
          style={styles.boxStyles}
          onClick={onFormItemClick}>
          <FileOutlined style={styles.iconStyles} />
        </Box>
      }>
      <Meta
        description={
          <Row noGutters h="between" mt={3}>
            <Col display="grid">
              <Text style={styles.titleStyle} ellipsis>
                {title}
              </Text>
              <Text style={styles.descriptionTextSize} ellipsis>
                {subtitle || 'No description'}
              </Text>
            </Col>

            <Col cw="auto" v="center">
              <Dropdown overlay={menu} placement="bottomRight" trigger="click">
                {cloneElement(<MoreOutlined />, {
                  className: 'dropdownIcon'
                })}
              </Dropdown>
            </Col>
          </Row>
        }
      />
    </Card>
  )
}

FormSimpleView.propTypes = {
  imageURL: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
}

export default FormSimpleView
