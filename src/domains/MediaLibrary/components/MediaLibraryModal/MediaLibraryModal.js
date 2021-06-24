import Fuse from 'fuse.js'
import PropTypes from 'prop-types'
import theme from '../../../../../styles/theme'
import { Row, Col } from '@qonsoll/react-design'
import { SearchOutlined } from '@ant-design/icons'
import { StaticList } from '../../../../components'
import useFunctions from '../../../../hooks/useFunctions'
import React, { useEffect, useRef, useState } from 'react'
import COLLECTIONS from '../../../../constants/collection'
import { useTranslation } from '../../../../context/Translation'
import { Modal, Button, Typography, Upload, message } from 'antd'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import {
  CustomChangeButtonText,
  MediaListContainer,
  CustomButton,
  CustomInput,
  CustomText,
  styles
} from './MediaLibraryModal.styles'
import { MediaLibraryFilter } from '../../../../domains/MediaLibrary/components'

const { Title } = Typography

function MediaLibraryModal(props) {
  const { btnProps, onClick, onContinue } = props

  // [CUSTOM_HOOKS]
  const { getCollectionRef, setData, storage } = useFunctions()

  // [ADDITIONAL HOOKS]
  const [media = []] = useCollectionData(getCollectionRef(COLLECTIONS.MEDIA))
  const {
    addButton,
    amountTitle,
    changeButton,
    searchPlaceholder,
    mediaLibraryTitle
  } = useTranslation()

  const searchRef = useRef()

  // [COMPONENT STATE HOOKS]
  // const [switchState, setSwitchState] = useState(false)
  const [selectedBackgroundImg, setSelectedBackgroundImg] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [sidebarState, setSidebarState] = useState(true)
  const [imagesList, setImagesList] = useState(media)

  // [COMPUTED PROPERTIES]
  const amountFiles = imagesList.length
  const fuse = new Fuse(media, { keys: ['name'] })

  // [CLEAN FUNCTIONS]
  const onMediaUploaded = (data) => {
    const mediaId = getCollectionRef(COLLECTIONS.MEDIA).doc().id
    setData(COLLECTIONS?.MEDIA, mediaId, { id: mediaId, ...data }).catch((e) =>
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
  const onApplyFilter = () => {
    setSidebarState(!sidebarState)
  }
  const onCancelFilter = () => {
    setSidebarState(!sidebarState)
  }
  const modalStateChange = () => {
    setIsModalVisible(!isModalVisible)
    onClick?.()
  }
  const onChange = (input) => {
    searchData(input.target.value)
  }
  // const onSwitchChange = () => {
  //   setSwitchState(!switchState)
  // }
  // const onFilterButtonClick = () => {
  //   setSidebarState(!sidebarState)
  // }
  const customRequest = (data) => {
    const { onSuccess } = data
    const ref = storage.ref('images').child(data.file.uid)
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
                title: data.file.name,
                imageUrl: downloadURL
              }
            ])
            onMediaUploaded({
              title: data.file.name,
              imageUrl: downloadURL
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
    // eslint-disable-next-line
  }, [media])

  return (
    <>
      <CustomButton {...btnProps} onClick={modalStateChange}>
        <CustomChangeButtonText>
          {changeButton || 'Change'}
        </CustomChangeButtonText>
      </CustomButton>
      <Modal
        visible={isModalVisible}
        footer={null}
        closable={false}
        width="1024px"
        centered
        bodyStyle={styles.modalBodyStyle}>
        <Row noGutters pt={4}>
          <Col style={{ flexDirection: 'column' }}>
            <Row mb={1} v="center" px={3}>
              <Col>
                <Title level={3}>{mediaLibraryTitle || 'Media Library'}</Title>
              </Col>
              <Col cw="auto" v="center">
                {/* For future improvements.
                <Box
                  bg={theme.color.dark.t.lighten7}
                  p={1}
                  borderRadius={theme.borderRadius.md}
                  display="flex">
                  <CustomBox
                    size="medium"
                    type={!switchState ? 'text' : 'secondary'}
                    switchState={!switchState}
                    onClick={onSwitchChange}>
                    Image
                  </CustomBox>
                  <CustomBox
                    size="medium"
                    type={switchState ? 'secondary' : 'text'}
                    switchState={switchState}
                    onClick={onSwitchChange}>
                    Video
                  </CustomBox>
                </Box> */}
                <Upload
                  showUploadList={false}
                  multiple
                  name="file"
                  customRequest={customRequest}>
                  <Button type="primary">{addButton || '+ Add'}</Button>
                </Upload>
              </Col>
            </Row>
            <Row pb={25} px={3}>
              <Col>
                <CustomText>
                  {amountTitle || 'Amount files: '}
                  {amountFiles}
                </CustomText>
              </Col>
            </Row>
            <Row px={3} pb={3}>
              <Col>
                <CustomInput
                  allowClear
                  ref={searchRef}
                  prefix={<SearchOutlined />}
                  placeholder={
                    searchPlaceholder || 'Search media file by name...'
                  }
                  onSearch={searchData}
                  onChange={onChange}
                />
              </Col>
              {/* <Col cw="auto" noGutters>
                <CustomDivider type="vertical" />
              </Col>
              <Col cw="auto" v="center">
                <Button
                  icon={<FilterOutlined />}
                  type="text"
                  onClick={onFilterButtonClick}>
                  Filter
                </Button>
              </Col> */}
            </Row>

            <MediaListContainer pl={2} pt={2}>
              {/* RENDER MEDIA */}
              <StaticList
                data={imagesList}
                columnWidth={(sidebarState && 3) || 4}
                selectedBackgroundImg={selectedBackgroundImg}
                setSelectedBackgroundImg={setSelectedBackgroundImg}
              />
            </MediaListContainer>
            <Row noGutters h="right" p={3} bg={theme.color.white.default}>
              <Col cw="auto">
                <Button type="text" onClick={onModalCancel}>
                  Cancel
                </Button>
              </Col>
              <Col cw="auto">
                <Button type="primary" onClick={onModalContinue}>
                  Continue
                </Button>
              </Col>
            </Row>
          </Col>
          {!sidebarState && (
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