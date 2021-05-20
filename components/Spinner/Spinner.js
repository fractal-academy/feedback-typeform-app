import React from 'react'
import { Spin } from 'antd'
import { Box, Col, Row } from '@qonsoll/react-design'

function Spinner() {
  return (
    <Row height="100%" weight="100%">
      <Col>
        <Box position="absolute" top="50%" left="50%">
          <Spin size="large" />
        </Box>
      </Col>
    </Row>
  )
}

export default Spinner
