import { Button } from 'antd'
import PropTypes from 'prop-types'
import theme from '../../../../styles/theme'
import styled from 'styled-components'
import React, { useState } from 'react'
import { useKeyPress } from '@umijs/hooks'
import { Row, Col } from '@qonsoll/react-design'
import useMedia from 'use-media'

const StyledRangeButton = styled(Button)`
  width: -webkit-fill-available;
  height: 60px;
  border-color: ${theme.color.primary.default};
  background-color: ${(props) =>
    props.isActive
      ? theme.color.primary.default
      : theme.color.primary.t.lighten5};
  color: ${(props) =>
    props.isActive ? theme.color.white.default : theme.color.primary.default};

  &:hover {
    color: ${(props) => props.isActive && theme.color.white.default};
    border-color: ${(props) => props.isActive && theme.color.primary.default};
    background-color: ${(props) =>
      props.isActive
        ? theme.color.primary.t.lighten1
        : theme.color.primary.t.lighten3};
  }
`

function RangeButton(props) {
  const { questionConfigurations, onClick, currentSlide, order, id } = props

  // [COMPONENT STATE HOOKS]
  const [buttonKey, setButtonKey] = useState()
  const cwMedium = useMedia({ minWidth: '1100px' })
  const cwSmall = useMedia({ minWidth: '500px' })

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
  const from = questionConfigurations?.from || 1
  const to = questionConfigurations?.to || 5

  const range = Array(to - from + 1)
    .fill(0)
    .map((el, index) => from + index)
  const columnWidth = (cwMedium && 2) || (cwSmall && 3) || 12

  // [CLEAN FUNCTIONS]
  const onButtonClick = (number) => {
    if (range.includes(Number(number)) && currentSlide === order) {
      setButtonKey(number)
      const data = { questionId: id, answer: number }
      onClick && onClick(data)
    }
  }

  return (
    <Row display="flex" width="100%" noGutters>
      {range.map((item) => (
        <Col key={item} cw={columnWidth} mr={2} mb={2}>
          <StyledRangeButton
            key={item}
            onClick={() => onButtonClick(item)}
            isActive={Number(buttonKey) === item}>
            {item}
          </StyledRangeButton>
        </Col>
      ))}
    </Row>
  )
}

RangeButton.propTypes = {
  onClick: PropTypes.func,
  to: PropTypes.number.isRequired,
  from: PropTypes.number.isRequired
}
RangeButton.defaultProps = {
  from: 1,
  to: 5
}

export default RangeButton
