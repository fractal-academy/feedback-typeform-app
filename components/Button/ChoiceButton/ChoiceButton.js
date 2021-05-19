import PropTypes from 'prop-types'
import { KeyBox } from 'app/components'
import { useMemo, useState } from 'react'
import { useKeyPress } from '@umijs/hooks'
import { Box } from '@qonsoll/react-design'

let startLetter = 65

function ChoiceButton(props) {
  const { choices, onClick, hasImages, currentSlide, order } = props

  // [COMPONENT STATE HOOKS]
  const [buttonKey, setButtonKey] = useState()

  // [ADDITIONAL HOOKS]
  const mappedChoices = useMemo(
    () =>
      choices?.map((el, index) => ({
        letter: String.fromCharCode(startLetter + index),
        choice: el
      })),
    [choices]
  )
  const letters = useMemo(
    () => (mappedChoices ? mappedChoices.map(({ letter }) => letter) : []),
    [mappedChoices]
  )
  useKeyPress(
    (event) => ![].includes(event.key),
    (event) => {
      if (event.type === 'keyup') {
        const key = `${event.key}`.toUpperCase()
        onButtonClick(key)
      }
    },
    {
      events: ['keydown', 'keyup']
    }
  )

  // [CLEAN FUNCTIONS]
  const onButtonClick = (letter) => {
    if (letters.includes(letter) && currentSlide === order) {
      setButtonKey(letter)
      onClick && onClick()
    }
  }

  return (
    <Box display="block">
      {mappedChoices.map((item, index) => (
        <KeyBox
          key={index}
          item={item}
          hasImages={hasImages}
          buttonKey={buttonKey}
          onButtonClick={onButtonClick}
          isActive={buttonKey === item.letter}
        />
      ))}
    </Box>
  )
}

ChoiceButton.propTypes = {
  choices: PropTypes.array,
  onClick: PropTypes.func,
  hasImages: PropTypes.bool
}

export default ChoiceButton
