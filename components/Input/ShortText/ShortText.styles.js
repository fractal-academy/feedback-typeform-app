import { Input } from 'antd'
import styled from 'styled-components'
import theme from 'app/styles/theme'

export const styles = {}

export const ShortTextInput = styled(Input)`
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.h3};
  background-color: ${theme.color.dark.t.lighten9};
`
