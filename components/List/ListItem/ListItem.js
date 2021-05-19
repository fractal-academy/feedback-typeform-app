// import PropTypes from 'prop-types'
// import { ROUTES_PATHS } from 'app/constants'
// import { useState, cloneElement } from 'react'
// import COLLECTIONS from 'app/constants/collection'
// import { deleteData } from 'app/services/Firestore'
// import { Row, Col, Box } from '@qonsoll/react-design'
// import { generatePath, useHistory } from 'react-router-dom'
// import { FormSimpleViewEdit } from 'domains/Form/components'
// import { FileOutlined, MoreOutlined } from '@ant-design/icons'
// import { Card, Typography, Dropdown, Menu, Popconfirm, message } from 'antd'

// const { Meta } = Card
// const { Text } = Typography

function ListItem(props) {
  // const { currentData, title, subtitle, id } = props

  // // [COMPONENT STATE HOOKS]
  // const [visible, setVisible] = useState(false)
  // const [confirmLoading, setConfirmLoading] = useState(false)

  // // [CLEAN FUNCTIONS]
  // const handleCancel = () => {
  //   setVisible(false)
  // }
  // const showPopconfirm = () => {
  //   setVisible(true)
  // }
  // const handleDelete = async () => {
  //   setConfirmLoading(true)
  //   await deleteData(COLLECTIONS.FORMS, id).catch((e) =>
  //     message.error(e.message)
  //   )

  //   setVisible(false)
  //   setConfirmLoading(false)
  // }

  // [MENU TEMPLATE]
  // const menu = (
  //   <Menu>
  //     <Menu.Item>{/* <FormSimpleViewEdit formData={props} /> */}</Menu.Item>
  //     <Menu.Item onClick={showPopconfirm}>
  //       <Popconfirm
  //         title="Delete this form?"
  //         onConfirm={handleDelete}
  //         onCancel={handleCancel}
  //         okButtonProps={{ loading: confirmLoading }}>
  //         <Text>Delete</Text>
  //       </Popconfirm>
  //     </Menu.Item>
  //   </Menu>
  // )

  return <></>
}

ListItem.propTypes = {
  // currentData: PropTypes.object
}

export default ListItem
