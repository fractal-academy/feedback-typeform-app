import { Box, Col, Row } from '@qonsoll/react-design'
import { Typography } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { styles } from './MediaLibrarySimpleView.styles'
import { MediaLibraryModal } from 'domains/MediaLibrary/components'
import { Input } from 'antd'
import RangeSlider from 'components/RangeSlider'
import {
  useCurrentQuestionContextDispatch,
  DISPATCH_EVENTS
} from 'app/context/CurrentQuestion'
import PropTypes from 'prop-types'

const { Text } = Typography
function MediaLibrarySimpleView(props) {
  const { setIsImageEditVisible, bgImage } = props

  // [CUSTOM HOOKS]
  const currentQuestionDispatch = useCurrentQuestionContextDispatch()

  // [CLEAN FUNCTIONS]
  const onMediaModalContinue = (selectedImage) => {
    currentQuestionDispatch({
      type: DISPATCH_EVENTS.UPDATE_CURRENT_QUESTION,
      payload: { image: selectedImage }
    })
  }

  return (
    <Row noGutters>
      <Col>
        <Row noGutters mb={4}>
          <Col>
            <Box
              padding={4}
              height="150px"
              borderRadius="8px"
              position="relative"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={bgImage}>
              <MediaLibraryModal
                bgImage={bgImage}
                onClick={() => {
                  setIsImageEditVisible(false)
                }}
                onContinue={onMediaModalContinue}
                btnProps={{
                  type: 'primary',
                  icon: <EditOutlined style={styles.btnStyle} />
                }}
              />
            </Box>
          </Col>
        </Row>
        <Row noGutters mb={4}>
          <Col>
            <Text style={styles.fontStyle}>Alt text</Text>
            <Input style={styles.inputStyle} placeholder="Enter alt here..." />
          </Col>
        </Row>
        <Row noGutters>
          <Col>
            <Row noGutters>
              <Col>
                <Text style={styles.fontStyle}>Brightness</Text>
              </Col>
            </Row>
            <Row noGutters>
              <Col>
                <RangeSlider />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

MediaLibrarySimpleView.propTypes = {
  setIsImageEditVisible: PropTypes.bool,
  bgImage: PropTypes.string
}

export default MediaLibrarySimpleView
