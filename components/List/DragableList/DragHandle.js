import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'
import { MoreOutlined } from '@ant-design/icons'
import { sortableHandle } from 'react-sortable-hoc'

const StyledIcon = styled(MoreOutlined)`
  margin-right: -10px;
`

const DragHandler = sortableHandle(() => (
  <Box>
    <StyledIcon />
    <MoreOutlined />
  </Box>
))

export default DragHandler
