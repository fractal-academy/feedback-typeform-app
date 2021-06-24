import React, { useState } from 'react'
import { Upload, message } from 'antd'
import { Text } from 'antd-styled'
import { IconLabel, SubmitButton } from '../../../components'
import { Box } from '@qonsoll/react-design'
import { InboxOutlined } from '@ant-design/icons'
import { useTranslation } from '../../../context/Translation'
// import storage from '../../../services/storage'
import COLLECTIONS from '../../../constants/collection'
import useFunctions from '../../../hooks/useFunctions'
import { useKeyPress } from '@umijs/hooks'

const { Dragger } = Upload

const config = {
  name: 'file',
  multiple: true
}

const UploadArea = (props) => {
  const { onContinue, question, currentSlide } = props

  // [ADDITIONAL_HOOKS]
  const {
    answerRequiredMessageError,
    fileUploaderTitle,
    fileUploaderSubtitle
  } = useTranslation()
  const { getCollectionRef, storage } = useFunctions()

  // [COMPONENT STATE HOOKS]
  const [filesList, setFilesList] = useState({})
  // [COMPUTED PROPERTIES]

  const fileId = getCollectionRef(COLLECTIONS.ANSWERS).doc().id

  // [CLEAN FUNCTIONS]
  // const onMediaUploaded = (data) => {
  //   const fileId = getCollectionRef(COLLECTIONS.ANSWERS).doc().id
  //   setData(COLLECTIONS?.ANSWERS, fileId, data).catch((e) =>
  //     message.error(e.message)
  //   )
  // }

  const onChange = (data) => {
    const { file } = data
    const currentFile = {
      name: file?.name,
      status: 'uploading',
      percent: 0,
      uid: file?.uid
    }
    currentFile?.name &&
      setFilesList((files) => ({ ...files, [currentFile.uid]: currentFile }))

    const ref = storage.ref('files').child(file?.uid)
    const uploadFile = ref.put(file)
    uploadFile.on(
      'state_changed',
      (snapshot) => {
        // Calc of upload progress
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ).toFixed(0)
        // Update item while it uploading
        const currentFile = {
          name: uploadFile?.name,
          status: 'uploading',
          percent: progress,
          uid: uploadFile?.uid
        }
        currentFile?.name &&
          setFilesList((files) => ({
            ...files,
            [currentFile?.uid]: currentFile
          }))
      },
      (error) => {
        // Handle error during the upload
        message.error(error.message)
        const failedUploadFile = {
          name: file?.name,
          status: 'error',
          uid: file?.uid
        }
        failedUploadFile?.name &&
          setFilesList((files) => ({
            ...files,
            [failedUploadFile?.uid]: failedUploadFile
          }))
      },
      () => {
        uploadFile.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
          const currentFile = {
            id: fileId,
            name: file?.name,
            fileUrl: downloadURL,
            uid: file?.uid
          }
          currentFile?.name &&
            setFilesList((files) => ({
              ...files,
              [currentFile?.uid]: currentFile
            }))
          // onMediaUploaded(currentFile)
        })
      }
    )
  }
  const onRemove = (file) => {
    const asArray = Object.entries(filesList)
    const filteredFiles = asArray.filter(([key, value]) => key !== file?.uid)
    const filteredFilesToObj = Object.fromEntries(filteredFiles)
    storage
      .ref('files')
      .child(file?.uid)
      .delete()
      .then(() => {
        setFilesList(filteredFilesToObj)
      })
      .catch((error) => {
        console.log('error, ', error)
        message.error("Couldn't delete file")
      })
  }

  const onAply = () => {
    const uploaderData = !!Object.keys(filesList).length ? filesList : ''
    const data = {
      question,
      answer: { value: uploaderData }
    }
    question?.isRequired
      ? uploaderData
        ? onContinue?.(data)
        : message.error(
            answerRequiredMessageError ||
              'It`s required question, please answer'
          )
      : onContinue?.(data)
  }

  useKeyPress(
    (event) => event.keyCode === 13 && currentSlide === question?.order,
    (event) => {
      if (event.type === 'keyup') {
        onAply()
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

  return (
    <Box flexDirection="column">
      <Dragger
        {...config}
        {...props}
        onRemove={onRemove}
        customRequest={onChange}
        fileList={Object.values(filesList)}
        disabled={!onContinue}>
        <Box onMouseDown={(e) => e.preventDefault()}>
          <Box display="flex" justifyContent="center">
            <IconLabel disabled={!onContinue}>
              <InboxOutlined />
            </IconLabel>
          </Box>
          <Box textAlign="center">
            <Text>
              {fileUploaderTitle || 'Click or drag file to this area to upload'}
            </Text>
          </Box>
          <Box textAlign="center">
            <Text type="secondary">
              {fileUploaderSubtitle || 'Upload files'}
            </Text>
          </Box>
        </Box>
      </Dragger>
      <Box mt={3}>
        <SubmitButton onClick={onAply} disablePressEnter />
      </Box>
    </Box>
  )
}

UploadArea.propTypes = {}

export default UploadArea
