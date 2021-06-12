import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@qonsoll/react-design'

import { HiddenBox, ContentBox, NumberBox } from './NumberedCard.styles'
function NumberedCard(props) {
  const { number, current, children } = props

  return (
    <Box position="relative">
      <HiddenBox />
      <ContentBox current={current}>{children}</ContentBox>
      <NumberBox>{number}</NumberBox>
    </Box>
  )
}

NumberedCard.propTypes = {
  number: PropTypes.number,
  children: PropTypes.node
}

export default NumberedCard