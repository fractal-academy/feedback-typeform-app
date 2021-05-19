import PropTypes from 'prop-types'
import { Box } from '@qonsoll/react-design'

function MiddleContainer(props) {
  const { children } = props

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      alignItems="center"
      justifyContent="center"
      width="100%">
      {children}
    </Box>
  )
}

MiddleContainer.propTypes = {
  children: PropTypes.node
}

export default MiddleContainer
