import { Button } from 'antd'
import { useRef } from 'react'
import PropTypes from 'prop-types'
import { Carousel as AntdCarousel } from 'antd'
import { Row, Col, Box } from '@qonsoll/react-design'
import { UpOutlined, DownOutlined } from '@ant-design/icons'

function Carousel(props) {
  const { children, isAnswered, setIsAnswered, setCurrentSlide } = props

  // [ADDITIONAL HOOKS]
  const carouselRef = useRef()

  // [CLEAN FUNCTIONS]
  const handleScroll = (e) => {
    e.deltaY > 0 ? next() : previous()
  }
  const next = () => {
    carouselRef.current?.next()
    setIsAnswered && setIsAnswered(false)
  }
  const previous = () => {
    carouselRef.current?.prev()
  }
  const onCurrentSlideChange = (slideIndex) => {
    setCurrentSlide(slideIndex)
  }
  //For logic jumps
  // const goTo = (slideNumber) => {
  //   carouselRef.current?.goTo(slideNumber)
  // }

  //COMPUTED PROPERTIES
  isAnswered && next()

  return (
    <Box onWheel={handleScroll} width="100%">
      <AntdCarousel
        ref={carouselRef}
        dotPosition="right"
        dots={false}
        afterChange={onCurrentSlideChange}>
        {children}
      </AntdCarousel>

      <Row noGutters h="right" mt={4}>
        <Col cw="auto" mr={2}>
          <Button type="primary" onClick={previous}>
            <UpOutlined />
          </Button>
        </Col>
        <Col cw="auto">
          <Button type="primary" onClick={next}>
            <DownOutlined />
          </Button>
        </Col>
      </Row>
    </Box>
  )
}

Carousel.propTypes = {
  children: PropTypes.node,
  isAnswered: PropTypes.bool,
  setIsAnswered: PropTypes.func,
  setCurrentSlide: PropTypes.func
}

export default Carousel
