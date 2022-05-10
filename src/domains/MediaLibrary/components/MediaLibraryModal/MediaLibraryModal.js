import { Box, Button, Col, Input, Row, Title } from '@qonsoll/react-design'
import {
  CustomButton,
  CustomText,
  MediaListContainer
} from './MediaLibraryModal.styles'
import { EditOutlined, SearchOutlined } from '@ant-design/icons'
import { Modal, Upload, message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import { COLLECTIONS } from '../../../../constants'
import Fuse from 'fuse.js'
import PropTypes from 'prop-types'
import { StaticList } from '../../../../components'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import useFunctions from '../../../../hooks/useFunctions'
import { useTranslations } from '@qonsoll/translation'

function MediaLibraryModal(props) {
  const { btnProps, onClick, onContinue, isHovering } = props

  // [CUSTOM_HOOKS]
  const { getCollectionRef, setData, storage } = useFunctions()

  // [ADDITIONAL HOOKS]
  const [media = []] = useCollectionData(getCollectionRef(COLLECTIONS.MEDIA))
  const { t } = useTranslations()

  const searchRef = useRef()

  // [COMPONENT STATE HOOKS]
  const [selectedBackgroundImg, setSelectedBackgroundImg] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [imagesList, setImagesList] = useState(media)

  // [COMPUTED PROPERTIES]
  const amountFiles = imagesList.length
  const fuse = new Fuse(media, { keys: ['title'] })

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
  const modalStateChange = () => {
    setIsModalVisible(!isModalVisible)
    onClick?.()
  }
  const onChange = (input) => {
    searchData(input.target.value)
  }
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
      setImagesList(searchRes?.map((item) => item.item))
    } else setImagesList(media)
  }

  const beforeUpload = (file) => {
    if (!file?.type?.includes('image')) {
      message.error(`${file.name} ${'is not a picture'}`)
    }
    return file?.type?.includes('image') ? true : Upload.LIST_IGNORE
  }

  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true
    isComponentMounted && imagesList && setImagesList(media)

    return () => (isComponentMounted = false)
    // eslint-disable-next-line
  }, [media])

  return (
    <>
      {isHovering && (
        <CustomButton {...btnProps} onClick={modalStateChange}>
          <Box display="flex">
            <Box mr={2}>
              <EditOutlined />
            </Box>
            {t('Change')}
          </Box>
        </CustomButton>
      )}
      <Modal
        visible={isModalVisible}
        footer={null}
        closable={false}
        width="1024px"
        centered
        bodyStyle={{
          padding: 0,
          zIndex: 10000
        }}>
        <Row v="center" py={3} px={3}>
          <Col>
            <Title
              color="var(--qf-typography-title-color)"
              fontFamily="var(--ql-font-family-main)"
              level={3}>
              {t('Media library')}
            </Title>
            <CustomText>
              {`${t('Amount of shown files')}: `}
              {amountFiles}
            </CustomText>
          </Col>
        </Row>
        <Row px={3} pb={3}>
          <Col>
            <Input
              allowClear
              ref={searchRef}
              prefix={<SearchOutlined />}
              placeholder={`${t('Search media file by name')}...`}
              onSearch={searchData}
              onChange={onChange}
            />
          </Col>
        </Row>

        <MediaListContainer px={4} pt={2}>
          {/* RENDER MEDIA */}
          <Box width="100%" mr="-10px">
            <StaticList
              hasMedia
              data={imagesList}
              beforeUpload={beforeUpload}
              customRequest={customRequest}
              selectedBackgroundImg={selectedBackgroundImg}
              setSelectedBackgroundImg={setSelectedBackgroundImg}
            />
          </Box>
        </MediaListContainer>
        <Row
          p={3}
          h="right"
          noGutters
          borderBottomLeftRadius="var(--qf-border-radius-md)"
          borderBottomRightRadius="var(--qf-border-radius-md)">
          <Col cw="auto" mr={2}>
            <Button type="text" onClick={onModalCancel}>
              {t('Cancel')}
            </Button>
          </Col>
          <Col cw="auto">
            <Button type="primary" onClick={onModalContinue}>
              {t('Continue')}
            </Button>
          </Col>
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
