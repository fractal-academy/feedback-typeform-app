import React from 'react'
import Fuse from 'fuse.js'
import { useState, useEffect, useRef } from 'react'
import { Row, Col, Box } from '@qonsoll/react-design'
import {
  Breadcrumb,
  Typography,
  message,
  Divider,
  Button,
  Menu,
  Input
} from 'antd'
import {
  ArrowLeftOutlined,
  FolderOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { Spinner } from '../../../../components'
import { useHistory } from 'react-router-dom'
import { globalStyles } from '../../../../../styles'
import { styles } from './FormsAll.style'
import COLLECTIONS from '../../../../constants/collection'
import { FormSimpleView } from '../../components'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import FormSimpleFormWithModal from '../../components/FormSimpleFormWithModal'
import setData from '../../../../services/setData'
import getTimestamp from '../../../../services/getTimestamp'
import getCollectionRef from '../../../../services/getCollectionRef'
const { Title, Text } = Typography
const mockRoutes = [
  { path: '/forms', page: 'Forms' },
  { path: '/images', page: 'Images' },
  { path: '/videos', page: 'Videos' }
]
function FormsAll(props) {
  // const {getCollectionRef,getTimestamp,setData}=props
  // [ADDITIONAL HOOKS]
  const searchRef = useRef()
  const history = useHistory()
  const [data] = useCollectionData(
    getCollectionRef(COLLECTIONS.FORMS)
  )
  console.log(data)
  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentData, setCurrentData] = useState(data)
  const fuse = new Fuse(data, { keys: ['title'] })
  // [COMPUTED PROPERTIES]
  let amountFiles = data?.length
  const formId = getCollectionRef(COLLECTIONS.FORMS).doc().id
  // [CLEAN FUNCTIONS]
  const searchData = () => {
    if (searchRef.current.input.value) {
      const searchRes = fuse.search(searchRef.current.input.value)
      setCurrentData(searchRes.map((item) => item.item))
    } else setCurrentData(data)
  }
  // // [USE_EFFECTS]
  useEffect(() => {
    data && setCurrentData(data)
  }, [data])
  const onFormCreate = async (data) => {
    await setData(COLLECTIONS.FORMS, formId, {
      id: formId,
      title: data?.name,
      subtitle: data?.description || '',
      creationDate: getTimestamp().now()
    }).catch((e) => message.error(e.message))
  }
  const menu = (
    <Menu>
      {mockRoutes.map((item, index) => (
        <Menu.Item key={index}>
          {/* <Link to={item.path}>{item.page}</Link> */}
          <Text>{item.page}</Text>
        </Menu.Item>
      ))}
    </Menu>
  )
  const showModal = () => {
    setIsModalVisible(true)
  }
  // if (!data) {
  //   return <Spinner />
  // }
  return (
    <Box {...styles.mainWrapper}>
      {/* Page Header */}
      <Row noGutters display="flex">
        <Col cw="auto" v="center">
          <Button
            size="small"
            type="text"
            style={globalStyles.resetPadding}
            icon={<ArrowLeftOutlined style={globalStyles.iconSize} />}
            onClick={() => history.goBack()}
          />
        </Col>
        <Col cw="auto" v="center">
          <Divider type="vertical" />
        </Col>
        <Col v="center">
          <Breadcrumb>
            <Breadcrumb.Item>
              <FolderOutlined />
              <Text>Folder</Text>
            </Breadcrumb.Item>
            <Breadcrumb.Item overlay={menu}>
              <Text>Forms</Text>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      {/* SecondaryTitle */}
      <Row noGutters v="center" mb={1} mt={3}>
        <Col>
          <Title level={2} style={globalStyles.resetMargin}>
            Forms
          </Title>
        </Col>
      </Row>
      <Row noGutters mb={3}>
        <Col>
          <Text>You have {amountFiles} files.</Text>
        </Col>
      </Row>
      <Row noGutters mb={3}>
        <Col>
          <Input
            ref={searchRef}
            placeholder="Search folder/file by name..."
            onChange={(input) => searchData(input.target.value)}
          />
        </Col>
      </Row>
      <Box
        display="flex"
        flexWrap="wrap"
        flexDirection="row"
        className="custom-scroll">
        {/* Here should be list of data Images/Video */}
        {currentData && currentData?.map((item, index) => (
          <Box pr={3} pb={3} key={index}>
            <FormSimpleView
              id={item?.id}
              key={item?.id}
              title={item?.title}
              imageURL={item?.image}
              subtitle={item?.subtitle}
            />
          </Box>
        ))}
        <Box
          {...styles.addNewItemStyles}
          style={globalStyles.cursorPointer}
          onClick={showModal}>
          <PlusOutlined />
        </Box>
        <FormSimpleFormWithModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onModalSubmit={onFormCreate}
        />
      </Box>
    </Box>
  )
}
FormsAll.propTypes = {}
export default FormsAll