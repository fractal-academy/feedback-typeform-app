import { useState } from 'react'
import { InputNumber, Slider } from 'antd'
import { styles } from './RangeSlider.styles'
import { Col, Row } from '@qonsoll/react-design'

function RangeSlider(props) {
  // [COMPONENT STATE HOOKS]
  const [inputValue, setInputValue] = useState(0)

  // [CLEAN FUNCTIONS]
  const onSlide = (value) => {
    setInputValue(value)
  }
  const value = typeof inputValue === 'number' ? inputValue : 0

  return (
    <Row>
      <Col px={3}>
        <Slider min={-50} max={50} onChange={onSlide} value={value} />
      </Col>
      <Col cw="auto">
        <InputNumber
          min={-50}
          max={50}
          style={styles.InputNumber}
          value={inputValue}
          onChange={onSlide}
        />
      </Col>
    </Row>
  )
}

export default RangeSlider
