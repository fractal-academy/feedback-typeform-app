import { Button } from 'antd'
import '../Button.styles.css'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { useKeyPress } from '@umijs/hooks'
import { Box } from '@qonsoll/react-design'

function RangeButton(props) {
  const { from = 0, to = 0, onClick, currentSlide, order } = props

  // [COMPONENT STATE HOOKS]
  const [buttonKey, setButtonKey] = useState()

  // [ADDITIONAL HOOKS]
  useKeyPress(
    (event) => ![].includes(event.key),
    (event) => {
      if (event.type === 'keyup') {
        onButtonClick(event.key)
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

  // [COMPUTED PROPERTIES]
  const range = Array(to - from + 1)
    .fill(0)
    .map((el, index) => from + index)

  // [CLEAN FUNCTIONS]
  const onButtonClick = (number) => {
    if (range.includes(Number(number)) && currentSlide === order) {
      setButtonKey(number)
      onClick && onClick()
    }
  }

  return (
    <Box display="flex">
      {range.map((item) => (
        <Button
          key={item}
          onClick={() => onButtonClick(item)}
          className={(Number(buttonKey) === item && 'active') || 'range'}>
          {item}
        </Button>
      ))}
    </Box>
  )
}

RangeButton.propTypes = {
  onClick: PropTypes.func,
  to: PropTypes.number.isRequired,
  from: PropTypes.number.isRequired
}

export default RangeButton
