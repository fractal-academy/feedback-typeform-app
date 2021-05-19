import '../Button.styles.css'
import PropTypes from 'prop-types'
import { useHover } from '@umijs/hooks'
import { Button } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { Row, Col, Box } from '@qonsoll/react-design'

function KeyBox(props) {
  const { onButtonClick, item, isActive, hasImages } = props
  const { letter } = item || {}

  // [ADDITIONAL HOOKS]
  const [isHovering, hoverRef] = useHover()

  // [COMPUTED PROPERTIES]
  const classes = isActive
    ? isHovering
      ? 'selectedHovered'
      : 'selected'
    : isHovering
    ? 'hovered'
    : 'buttonBox'

  return (
    <Box ref={hoverRef} display={hasImages && 'inline-block'} mb={2} mr={1}>
      <Button
        className={hasImages && 'imageButton'}
        onClick={() => onButtonClick(letter)}>
        {hasImages && (
          <Row h="center" display="flex">
            <Col
              mb={1}
              cw="auto"
              display="flex"
              textAlign="center"
              style={{ justifyContent: 'center' }}>
              <img
                alt=""
                className="imageContainer"
                src={item?.choice?.image}></img>
            </Col>
          </Row>
        )}
        <Row display="flex" v="center" noGutters>
          <Col className={classes} mr={2}>
            {isHovering ? `Key ${letter}` : letter}
          </Col>
          <Col>
            <Box className="text" display="flex" justifyContent="space-between">
              {item?.choice?.name}
              {isActive && <CheckOutlined className="icon" />}
            </Box>
          </Col>
        </Row>
      </Button>
    </Box>
  )
}

KeyBox.propTypes = {
  item: PropTypes.object,
  hasImages: PropTypes.bool,
  onButtonClick: PropTypes.func,
  startLetter: PropTypes.string
}

export default KeyBox
