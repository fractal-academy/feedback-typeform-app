import { Box } from '@qonsoll/react-design'
import { sortableContainer } from 'react-sortable-hoc'

const SortableContainer = sortableContainer(({ children }) => (
  <Box>{children}</Box>
))

export default SortableContainer
