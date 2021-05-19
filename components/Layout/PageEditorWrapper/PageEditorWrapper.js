import PropTypes from 'prop-types'
import { Box } from '@qonsoll/react-design'

function PageEditorWrapper(props) {
  const { children } = props

  return <Box>{children}</Box>
}

PageEditorWrapper.propTypes = {
  children: PropTypes.node
}

export default PageEditorWrapper
