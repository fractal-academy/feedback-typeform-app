import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'

const ContentCard = styled(Box)`
  border-radius: 12px;
  background-color: white;
`

ContentCard.propTypes = {
  children: PropTypes.node
}

export default ContentCard
