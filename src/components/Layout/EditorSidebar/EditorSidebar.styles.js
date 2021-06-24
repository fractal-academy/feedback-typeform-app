import { Box } from '@qonsoll/react-design'
import styled from 'styled-components'
import { Divider } from 'antd'

export const styles = {
  endingsList: {
    pb: 3,
    pr: 3,
    maxHeight: '350px',
    overflow: 'auto'
  }
}

export const SidebarStateSwitcher = styled(Box)`
  ${({ theme }) => `
  left: -20px;
  cursor: pointer;
  position: absolute;
  padding-right: 5px;
  background-color: ${theme.color.white.default};
  border-radius: 0 0 0 ${theme.borderRadius.md};
`}
`

export const SidebarBoxWrapper = styled(Box)`
  background-color: ${({ transparent, theme }) =>
    transparent ? 'transparent' : theme.color.white.default};
  width: fit-content;
  min-width: 300px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  position: relative;
`

export const DragbleCeiling = styled(Box)`
  ${({ theme }) => `
  background-color: ${theme.color.dark.t.lighten1};
  height: 3px;
  width: 50px;
  border-radius: ${theme.borderRadius.md};
`}
`

export const CustomDivider = styled(Divider)`
  margin: 0;
`
export const EndingsList = styled(Box)`
  margin: 0;
`