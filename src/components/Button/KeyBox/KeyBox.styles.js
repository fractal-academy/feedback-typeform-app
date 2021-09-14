import styled, { css } from 'styled-components'
import { Box, Text } from '@qonsoll/react-design'
import { blinkBackground } from '../../../animation'

export const StyledKeybox = styled(Box)`
  position: absolute;
  top: ${({ hasImages }) => (hasImages ? '15px' : '8px')};
  border-width: 1px;
  text-align: center;
  border-style: solid;
  border-color: var(--qf-button-color);
  color: ${({ isActive }) =>
    isActive ? 'var(--qf-active-button-color)' : 'var(--qf-button-color)'};
  margin-left: ${({ isHovering, phoneSmall }) =>
    isHovering && phoneSmall ? '' : isHovering && '-40px'};
  background-color: ${({ isActive }) =>
    isActive ? 'var(--qf-active-keybox-bg)' : 'var(--qf-keybox-bg)'};
  width: ${({ isHovering, phoneSmall }) =>
    isHovering && !phoneSmall ? '66px !important' : '26px !important'};
`
export const ImageContainer = styled(Box)`
  width: 100%;
  height: ${({ phoneSmall }) => (phoneSmall ? '200px' : '100px')};
  border-radius: var(--qf-border-radius-md);
  margin-bottom: var(--qf-border-radius-md);
  background-size: cover;
  background-image: url(${({ image }) => image});
`
export const StyledButton = styled(Box)`
  width: 100%;
  height: 100%;
  padding: 8px;
  position: relative;
  border-radius: var(--qf-border-radius-md);
  color: var(--qf-button-color);
  background-color: ${({ isActive }) =>
    isActive ? 'var(--qf-active-button-bg)' : 'var(--qf-button-bg)'};
  &:hover {
    background-color: var(--qf-active-button-bg);
  }
  ${blinkBackground}
  ${({ isActive }) =>
    isActive &&
    css`
      animation: blinkBackground 0.5s ease;
    `}
`
export const StyledText = styled(Text)`
  width: ${({ hasImages, phoneSmall }) =>
    hasImages ? (phoneSmall ? '100%' : '15ch') : '100%'};
  padding-left: ${({ hasImages }) => (hasImages ? '0' : '30px')};
  word-break: break-word;
  color: var(--qf-font-color-caption1);
`
