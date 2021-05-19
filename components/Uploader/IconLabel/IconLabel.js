import PropTypes from 'prop-types'
import styled from 'styled-components'

const IconLabel = (props) => {
  const { children } = props
  const AvatarWrapper = styled.label`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    justify-content: center;
    display: flex;
    align-items: center;
    position: relative;
    color: white;
    //change on prime color in theme
    border: 3px solid #eff5fd;
    background-color: #282c34;
    //change on prime color in theme
    &:hover {
      border-color: #eff5fd;
      background-color: #282c34;
    }
  `
  return <AvatarWrapper>{children}</AvatarWrapper>
}

export default IconLabel

IconLabel.propTypes = {
  children: PropTypes.node.isRequired
}
