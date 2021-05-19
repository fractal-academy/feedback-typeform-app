import { useState } from 'react'
import { Popover, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { Box } from '@qonsoll/react-design'
import { MediaLibrarySimpleView } from 'domains/MediaLibrary/components'

function QuestionMediaPopover(props) {
  const { MediaModalButtonBackground } = props

  // [COMPONENT STATE HOOKS]
  const [isImageEditVisible, setIsImageEditVisible] = useState(false)

  // [CLEAN FUNCTIONS]
  const changeImageEditVisibleState = () => {
    setIsImageEditVisible(!isImageEditVisible)
  }

  return (
    <Popover
      visible={isImageEditVisible}
      onVisibleChange={changeImageEditVisibleState}
      trigger={'click'}
      placement="rightTop"
      content={
        <Box width="192px" height="366px" overflow="hidden">
          <MediaLibrarySimpleView
            setIsImageEditVisible={setIsImageEditVisible}
            bgImage={MediaModalButtonBackground}
          />
        </Box>
      }>
      <Button
        type="primary"
        icon={<EditOutlined />}
        onClick={changeImageEditVisibleState}
      />
    </Popover>
  )
}

QuestionMediaPopover.propTypes = {}

export default QuestionMediaPopover
