import React from 'react'
import DragHandle from './DragHandle'
import styled from 'styled-components'
import { Col, Row } from '@qonsoll/react-design'
import { sortableElement } from 'react-sortable-hoc'

const StyledColumn = styled(Col)`
  cursor: pointer;
  pointer-ivents: none;
  position: relative;
`

const SortableItem = sortableElement(({ children }) => (
  <Row noGutters v="center" mb={3}>
    <Col cw="auto" mx={1}>
      <DragHandle />
    </Col>
    <StyledColumn>{children}</StyledColumn>
  </Row>
))

export default SortableItem
