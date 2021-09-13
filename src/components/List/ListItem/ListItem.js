import React, { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { StyledItem } from '../../../components'
import { COLLECTIONS } from '../../../constants'
import { Row, Col, Box, Text } from '@qonsoll/react-design'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Popconfirm, Dropdown, Menu, message } from 'antd'
import { useTranslation } from '../../../context/Translation'
import { FormSimpleFormWithModal } from '../../../domains/Form/components'
import { MoreOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons'
import useFunctions from '../../../hooks/useFunctions'
import { useActionsFunctionsContext } from '../../../context/ActionsFunctions/useActionsFunctionsContext'
import {
  ItemPreview,
  StyledIcon,
  StyledImage,
  StyledBadge,
  StyledMenu
} from './ListItem.styles'

const { Item } = Menu

const ListItem = forwardRef((props, ref) => {
  const { data, setEdit, selectedBackgroundImg, setSelectedBackgroundImg } =
    props
  const { updateData, deleteData, getCollectionRef } = useFunctions()

  // [ADDITIONAL HOOKS]
  const [questions] = useCollectionData(
    data?.id &&
      getCollectionRef(COLLECTIONS.QUESTIONS).where('formId', '==', data?.id)
  )
  const [userAnswersGroup] = useCollectionData(
    data?.id &&
      getCollectionRef(COLLECTIONS.USER_ANSWERS_GROUP).where(
        'formId',
        '==',
        data?.id
      )
  )

  const [answers] = useCollectionData(
    data?.id &&
      getCollectionRef(COLLECTIONS.ANSWERS).where('formId', '==', data?.id)
  )
  const { onFormItemClick, onFormDelete } = useActionsFunctionsContext()
  const {
    listItemNoDescription,
    edit,
    popconfirmDeleteFormTitle,
    popconfirmDeleteButtonText,
    popconfirmDeleteImageTitle
  } = useTranslation()

  // [COMPONENT STATE HOOKS]
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [isPopconfirmVisible, setIsPopconfirmVisible] = useState(false)

  // [COMPUTED PROPERTIES]
  const description =
    data?.subtitle || listItemNoDescription || 'No description'
  const collection = data?.imageUrl ? COLLECTIONS.MEDIA : COLLECTIONS.FORMS

  // [CLEAN FUNCTIONS]
  const onFormItemClicked = (e) => {
    e.stopPropagation()
    onFormItemClick?.(data?.id)
  }
  const showPopconfirm = ({ domEvent }) => {
    domEvent.stopPropagation()
    setIsPopconfirmVisible(!isPopconfirmVisible)
  }
  const showModal = ({ domEvent }) => {
    domEvent.stopPropagation()
    setIsModalVisible(true)
  }
  const handleDelete = async () => {
    setConfirmLoading(true)
    await deleteData(collection, data?.id)
      .then(deleteQuestions)
      .then(deleteAnswers)
      .then(deleteUserAnswersGroup)
      .then(() => {
        onFormDelete?.(data?.buyingTypeId)
      })
      .catch((e) => message.error(e.message))

    setIsPopconfirmVisible(false)
    setConfirmLoading(false)
  }
  const deleteQuestions = () => {
    questions.forEach((item) => {
      deleteData(COLLECTIONS.QUESTIONS, item?.id).catch((e) =>
        message.error(e.message)
      )
    })
  }
  const deleteUserAnswersGroup = () => {
    userAnswersGroup.forEach((item) => {
      deleteData(COLLECTIONS.USER_ANSWERS_GROUP, item?.id).catch((e) =>
        message.error(e.message)
      )
    })
  }
  const deleteAnswers = () => {
    answers.forEach((item) => {
      deleteData(COLLECTIONS.ANSWERS, item?.id).catch((e) =>
        message.error(e.message)
      )
    })
  }
  const onModalSubmit = (updatedFormData) => {
    updateData(COLLECTIONS.FORMS, data?.id, updatedFormData).catch((e) =>
      message.error(e.message)
    )
  }

  // [MENU TEMPLATE]
  const menu = (
    <StyledMenu>
      <Item onClick={(e) => showModal(e)} key={'showModal'}>
        <Text color="var(--qf-font-color-caption1)">{edit || 'Edit'}</Text>
        <FormSimpleFormWithModal
          isEdit
          formData={data}
          setEdit={setEdit}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onModalSubmit={onModalSubmit}
        />
      </Item>

      <Item onClick={(e) => showPopconfirm(e)} key={'showPopconfirm'} danger>
        <Popconfirm
          visible={isPopconfirmVisible}
          onConfirm={handleDelete}
          title={popconfirmDeleteFormTitle || 'Delete this form?'}
          okButtonProps={{ loading: confirmLoading }}
          okType="danger"
          okText="Delete">
          <Text color="var(--qf-font-color-caption1)">
            {popconfirmDeleteButtonText || 'Delete'}
          </Text>
        </Popconfirm>
      </Item>
    </StyledMenu>
  )

  return (
    <StyledItem
      isCard
      ref={ref}
      onClick={
        !data?.imageUrl
          ? onFormItemClicked
          : () => setSelectedBackgroundImg(data?.imageUrl)
      }>
      <Box display="block" width="inherit">
        <ItemPreview>
          {data?.imageUrl ? (
            <>
              {selectedBackgroundImg === data?.imageUrl && (
                <StyledBadge size="small" type="primary">
                  <CheckOutlined />
                </StyledBadge>
              )}
              <StyledImage
                preview={false}
                height="inherit"
                src={data.imageUrl}
              />
            </>
          ) : (
            <StyledIcon />
          )}
        </ItemPreview>

        <Row noGutters h="between" mt={2}>
          <Col display="grid">
            <Text color="var(--qf-font-color-caption1)" ellipsis>
              {data?.title}
            </Text>
            {!data?.imageUrl && (
              <Text
                color="var(--qf-font-color-caption1)"
                ellipsis
                type="secondary">
                {description}
              </Text>
            )}
          </Col>
          <Col cw="auto" display="flex" v="center">
            {data?.imageUrl ? (
              <Popconfirm
                title={popconfirmDeleteImageTitle || 'Delete this image?'}
                onConfirm={handleDelete}
                okButtonProps={{ loading: confirmLoading }}
                okType="danger"
                okText="Delete">
                <CloseOutlined />
              </Popconfirm>
            ) : (
              <Dropdown overlay={menu} placement="bottomRight">
                <MoreOutlined
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                />
              </Dropdown>
            )}
          </Col>
        </Row>
      </Box>
    </StyledItem>
  )
})

ListItem.propTypes = {
  data: PropTypes.object,
  selectedBackgroundImg: PropTypes.bool,
  setSelectedBackgroundImg: PropTypes.func
}

export default ListItem
