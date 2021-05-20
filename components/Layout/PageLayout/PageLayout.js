import React from 'react'
import PropTypes from 'prop-types'
import { PageHeader } from '../../../components'
import { Box } from '@qonsoll/react-design'

function PageLayout(props) {
  const { title = 'New Form', children } = props

  return (
    <Box display="flex" flex={1} flexDirection="column">
      <PageHeader title={title} />
      {children}
    </Box>
  )
}

PageLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

export default PageLayout
