import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Box } from '@qonsoll/react-design'
import typeformTheme from '../../../../styles/theme'
import useMedia from 'use-media'

const ContentRow = styled(Row)`
  display: flex;
  height: ${(props) => props.onEdit && '100%'};
`

const ContentColumn = styled(Col)`
  ${({ theme, image }) => `
  flex: 1;
  position: relative;
  background: ${
    !image &&
    (theme?.color?.white.default || typeformTheme?.color.white.default)
  };
  border-radius: ${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
  `}
`
const ImageBackground = styled(Box)`
  ${({ theme, image, brightnessValue }) => `
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${image});
  filter: brightness(${brightnessValue + 100}%);
  border-radius: ${theme?.borderRadius?.md || typeformTheme?.borderRadius?.md};
  
  `}
`

function ContentCard(props) {
  const {
    image,
    onEdit,
    leftSideMenu,
    brightnessValue,
    children,
    topOffset = '56px',
    wrapperHeight = '100vh'
  } = props

  const paddingSmall = useMedia({ maxWidth: '768px' })
  const devicePadding = (paddingSmall && 3) || 4

  return (
    <ContentRow
      p={devicePadding}
      height={`calc(${wrapperHeight} - ${topOffset}px)`}
      onEdit={onEdit}
      noGutters>
      {leftSideMenu && (
        <Col mr={3} cw="auto">
          {leftSideMenu}
        </Col>
      )}
      <ContentColumn image={image}>
        {image && (
          <ImageBackground image={image} brightnessValue={brightnessValue} />
        )}
        {children}
      </ContentColumn>
    </ContentRow>
  )
}

ContentCard.propTypes = {
  children: PropTypes.node,
  topOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  wrapperHeight: PropTypes.string
}

export default ContentCard
