import { Upload } from 'antd'
import { Text } from 'antd-styled'
import { IconLabel } from 'components'
import { globalStyles } from 'app/styles'
import { Col, Row } from '@qonsoll/react-design'
import { InboxOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const config = {
  name: 'file',
  multiple: true
}

const UploadArea = (props) => {
  const { ...rest } = props

  // [CLEAN FUNCTIONS]
  const onChange = () => {}

  return (
    <Row>
      <Col>
        <Dragger {...rest} {...config} onChange={onChange}>
          <Row h="center" v="center">
            <Col cw="auto">
              <IconLabel size="medium">
                <InboxOutlined
                  style={globalStyles.iconSize}
                  className="animate__animated  animate__zoomIn"
                />
              </IconLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text>Click or drag file to this area to upload</Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text type="secondary">Upload files</Text>
            </Col>
          </Row>
        </Dragger>
      </Col>
    </Row>
  )
}

UploadArea.propTypes = {}

export default UploadArea
