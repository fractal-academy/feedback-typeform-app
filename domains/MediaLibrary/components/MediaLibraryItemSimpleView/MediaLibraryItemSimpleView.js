import PropTypes from 'prop-types'
import { CheckOutlined } from '@ant-design/icons'
import { Box, Col, Row } from '@qonsoll/react-design'
import { Button, Card, Image, Typography } from 'antd'
import { styles } from './MediaLibraryItemSimpleView.styles'

const { Meta } = Card
const { Text } = Typography

function MediaLibraryItemSimpleView(props) {
  const {
    imageUrl,
    name,
    selectedBackgroundImg,
    setSelectedBackgroundImg
  } = props

  return (
    <Card
      onClick={() => {
        setSelectedBackgroundImg(imageUrl)
      }}
      hoverable
      style={styles.cardStyles}
      bodyStyle={styles.cardBodyStye}
      cover={
        <Box>
          {selectedBackgroundImg === imageUrl && (
            <Button size="small" type="primary" style={styles.iconStyle}>
              <CheckOutlined className="icon" />
            </Button>
          )}
          <Image
            preview={false}
            height="136px"
            width="208px"
            src={imageUrl}
            style={styles.imageStyle}
          />
        </Box>
      }>
      <Meta
        description={
          <Row h="between" mt={2} noGutters>
            <Col>
              <Row noGutters>
                <Col>
                  <Text style={styles.titleStyle} ellipsis>
                    {name.charAt(0).toUpperCase() + name.slice(1).split('.')[0]}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        }
      />
    </Card>
  )
}

MediaLibraryItemSimpleView.propTypes = {
  imageURL: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default MediaLibraryItemSimpleView
