import styled from 'styled-components'
import { Box } from '@qonsoll/react-design'
import typeformTheme from '../../../../../../styles/theme'

export const CustomChoiceBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  backgroundColor:
    theme?.color?.dark?.t?.lighten9 || typeformTheme?.color?.dark?.t?.lighten9,
  border: '1px solid',
  borderColor:
    theme?.color?.dark?.t?.lighten5 || typeformTheme?.color?.dark?.t?.lighten5,
  borderRadius: theme?.borderRadius?.md || typeformTheme?.borderRadius?.md,
  height: '100%'
}))
export const CustomTextBox = styled(Box)(({ theme }) => ({
  maxWidth: '100%',
  minWidth: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid',
  borderColor:
    theme?.color?.dark?.t?.lighten4 || typeformTheme?.color?.dark?.t?.lighten4,
  borderRadius: theme?.borderRadius?.sm || typeformTheme?.borderRadius?.sm
}))
