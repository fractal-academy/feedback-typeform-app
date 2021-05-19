import PropTypes from 'prop-types'
import { globalStyles } from 'app/styles'
import { Box } from '@qonsoll/react-design'
import { PlusOutlined } from '@ant-design/icons'

function NewListItem(props) {
  const { showModal } = props

  return (
    <Box
      bg="#eceff5"
      mr={3}
      mb={3}
      borderRadius="8px"
      width="245px"
      height="214px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={globalStyles.cursorPointer}
      onClick={showModal}>
      <PlusOutlined />
    </Box>
  )
}

NewListItem.propTypes = {
  showModal: PropTypes.func
}

export default NewListItem
