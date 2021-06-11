import styled from 'styled-components'
import { Button, Input, Select, Typography } from 'antd'
import theme from '../../../../../../styles/theme'

const { Text } = Typography

export const CustomText = styled(Text)`
  color: ${theme.color.primary.default};
`

export const CustomButton = styled(Button)`
  background-color: ${theme.color.primary.t.lighten7};
`

export const CustomInput = styled(Input)`
  margin-right: 32px;
  background-color: ${theme.color.dark.t.lighten9};
  border: 1px solid ${theme.color.dark.t.lighten5};
`
export const StyledSelect = styled(Select)`
  margin-right: ${theme.space[2]};
  width: 100%;
  display: flex;
  align-items: center;
  .ant-select-clear {
    border-radius: 50%;
    font-size: 14px;
  }
  .ant-select-selector {
    background-color: ${theme.color.dark.t.lighten9} !important;
    border-color: ${theme.color.dark.t.lighten5} !important;
  }
`