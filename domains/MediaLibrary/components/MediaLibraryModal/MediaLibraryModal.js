import React, { useEffect, useRef, useState } from 'react'
import {
  Modal,
  Button,
  Typography,
  Input,
  Divider,
  Upload,
  message
} from 'antd'
import { Row, Col, Box } from '@qonsoll/react-design'
import { FilterOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { globalStyles } from 'app/styles'
import { styles } from './MediaLibraryModal.styles'
import PropTypes from 'prop-types'
import './MediaLibraryModal.styles.css'
import {
  MediaLibraryFilter,
  MediaLibraryItemSimpleView
} from 'domains/MediaLibrary/components'
import firebase, { firestore } from 'app/services/Firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { getCollectionRef, setData } from 'app/services/Firestore'
import COLLECTIONS from 'app/constants/collection'
import Fuse from 'fuse.js'
import theme from 'app/styles/theme'

const { Title, Text } = Typography

function MediaLibraryModal(props) {
  const { btnProps, onClick, onContinue } = props

  // [ADDITIONAL HOOKS]
  const [media = []] = useCollectionData(getCollectionRef(COLLECTIONS.MEDIA))

  const searchRef = useRef()

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [switchState, setSwitchState] = useState(false)
  const [sidebarState, setSidebarState] = useState(true)
  const [imagesList, setImagesList] = useState(media)
  const [selectedBackgroundImg, setSelectedBackgroundImg] = useState(false)
  const fuse = new Fuse(media, { keys: ['name'] })

  // [COMPUTED PROPERTIES]
  const amountFiles = imagesList.length
  const mediaId = firestore.collection(COLLECTIONS.MEDIA).doc().id

  // [CLEAN FUNCTIONS]
  const onMediaUploaded = (data) => {
    const mediaId = getCollectionRef(COLLECTIONS.MEDIA).doc().id
    setData(COLLECTIONS?.MEDIA, mediaId, data).catch((e) =>
      message.error(e.message)
    )
  }
  const onModalContinue = async () => {
    setIsModalVisible(!isModalVisible)
    onContinue && onContinue(selectedBackgroundImg)
  }
  const onModalCancel = () => {
    setIsModalVisible(!isModalVisible)
  }
  const onFilterButtonClick = () => {
    setSidebarState(!sidebarState)
  }
  const onApplyFilter = () => {
    setSidebarState(!sidebarState)
  }
  const onCancelFilter = () => {
    setSidebarState(!sidebarState)
  }
  const onSwitchChange = () => {
    setSwitchState(!switchState)
  }
  const modalStateChange = () => {
    setIsModalVisible(!isModalVisible)
    onClick && onClick()
  }
  const onChange = (input) => {
    searchData(input.target.value)
  }
  const customRequest = (data) => {
    const { onSuccess } = data
    const ref = firebase.storage().ref('images').child(data.file.uid)
    const image = ref.put(data.file)
    image.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        // Handle error during the upload
        message.error(error.message)
      },
      () => {
        image.snapshot.ref
          .getDownloadURL()
          .then((downloadURL) => {
            setImagesList([
              ...imagesList,
              {
                id: mediaId,
                name: data.file.name,
                imageUrl: downloadURL,
                title: 'New title',
                subtitle: 'subtitle'
              }
            ])
            onMediaUploaded({
              id: mediaId,
              name: data.file.name,
              imageUrl: downloadURL,
              title: 'New title',
              subtitle: 'subtitle'
            })
          })
          .then(() => onSuccess())
      }
    )
  }
  const searchData = () => {
    if (searchRef.current.input.value) {
      const searchRes = fuse.search(searchRef.current.input.value)
      setImagesList(searchRes.map((item) => item.item))
    } else setImagesList(media)
  }
  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true
    isComponentMounted && imagesList && setImagesList(media)

    // [CLEAN UP FUNCTION]

    return () => {
      // [FINAL CLEAN UP]
      isComponentMounted = false
    }
  }, [media])
  return (
    <>
      <Button {...btnProps} onClick={modalStateChange} style={styles.btnStyle}>
        <Text style={styles.btnFont}>Change</Text>
      </Button>
      <Modal
        visible={isModalVisible}
        footer={null}
        closable={false}
        width="1024px"
        centered
        bodyStyle={styles.modalBodyStyle}>
        <Row noGutters pt={4}>
          <Col>
            <Row mb={1} v="center" px={3}>
              <Col>
                <Title
                  level={3}
                  style={(styles.boldFont, globalStyles.resetMargin)}>
                  Media Library
                </Title>
              </Col>
              <Col cw="auto" v="center">
                <Box bg="#eceff5" p={1} borderRadius="8px">
                  <Button
                    size="medium"
                    type={!switchState ? 'text' : 'secondary'}
                    //can`t move style to separate file because of state dependency
                    style={{
                      borderRadius: '8px',
                      border: 0,
                      color: !switchState ? '#1d6fdc' : '#82868c',
                      backgroundColor: !switchState ? 'white' : '#eceff5'
                    }}
                    onClick={onSwitchChange}>
                    Image
                  </Button>
                  <Button
                    size="medium"
                    type={switchState ? 'secondary' : 'text'}
                    //same here
                    style={{
                      borderRadius: '8px',
                      border: 0,
                      color: switchState ? '#1d6fdc' : '#82868c',
                      backgroundColor: !switchState ? '#eceff5' : 'white'
                    }}
                    onClick={onSwitchChange}>
                    Video
                  </Button>
                </Box>
              </Col>
            </Row>
            <Row pb={25} px={3}>
              <Col>
                <Text style={styles.textSecondary}>
                  You have {amountFiles} files.
                </Text>
              </Col>
            </Row>
            <Row px={3} pb={3} borderBottom="1px solid #d9d9d9">
              <Col>
                <Input
                  allowClear
                  ref={searchRef}
                  prefix={<SearchOutlined />}
                  style={styles.borderRadius}
                  placeholder="Search media file by name..."
                  onSearch={searchData}
                  onChange={onChange}
                />
              </Col>
              <Col cw="auto" noGutters>
                <Divider type="vertical" style={styles.dividerStyles} />
              </Col>
              <Col cw="auto" v="center">
                <Button
                  icon={<FilterOutlined />}
                  type="text"
                  style={styles.borderRadius}
                  onClick={onFilterButtonClick}>
                  Filter
                </Button>
              </Col>
            </Row>

            <Box
              height="500px"
              pl={4}
              overflow="auto"
              display="flex"
              flexWrap="wrap"
              flexDirection="row"
              bg={theme.color.dark.t.lighten9}
              className="custom-scroll">
              {/* RENDER MEDIA */}

              {imagesList.map((item) => (
                <Box mr={3} mt={4}>
                  <MediaLibraryItemSimpleView
                    {...item}
                    selectedBackgroundImg={selectedBackgroundImg}
                    setSelectedBackgroundImg={setSelectedBackgroundImg}
                  />
                </Box>
              ))}
              <Upload
                showUploadList={false}
                multiple
                name="file"
                customRequest={customRequest}>
                <Box
                  bg="#eceff5"
                  mr={3}
                  mt={4}
                  borderRadius="8px"
                  width="216px"
                  height="206px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  style={globalStyles.cursorPointer}>
                  <PlusOutlined />
                </Box>
              </Upload>
            </Box>
            <Row borderBottom="1px solid #d9d9d9"></Row>
            <Row noGutters h="right" p={3} bg="#fff">
              <Col cw="auto">
                <Button
                  type="text"
                  style={styles.footerButtonStyle}
                  onClick={onModalCancel}>
                  Cancel
                </Button>
              </Col>
              <Col cw="auto">
                <Button
                  type="primary"
                  style={styles.footerButtonStyle}
                  onClick={onModalContinue}>
                  Continue
                </Button>
              </Col>
            </Row>
          </Col>
          {sidebarState && (
            <MediaLibraryFilter
              onApplyFilter={onApplyFilter}
              onCancelFilter={onCancelFilter}
            />
          )}
        </Row>
      </Modal>
    </>
  )
}
MediaLibraryModal.defaultProps = {
  btnProps: { children: 'Open Modal' }
}
MediaLibraryModal.propTypes = {
  btnProps: PropTypes.object.isRequired,
  data: PropTypes.array
}

export default MediaLibraryModal
