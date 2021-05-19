import { Box } from '@qonsoll/react-design'
import { Input } from 'antd'
import theme from '../../../styles/theme'
import styled from 'styled-components'

const { TextArea } = Input

export const styles = {
  MediaBox: {
    mx: 2,
    mt: 2,
    height: '100px',
    width: '150px',
    borderRadius: theme.borderRadius.md,
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }
}

export const LetterBox = styled(Box)`
  width: 20px;
  border: 1px solid ${theme.color.primary.t.lighten2};
  text-align: center;
  font-size: ${theme.typography.fontSize.body2};
  line-height: ${theme.typography.lineHeight.body2};
  color: ${theme.color.primary.default};
  background-color: ${theme.color.white.default};
`
export const DeleteButton = styled(Box)`
  position: absolute;
  right: -6px;
  top: -6px;
  cursor: pointer;
  background-color: ${theme.color.primary.t.lighten3};
  font-size: ${theme.typography.fontSize.caption2};
  height: 16px;
  width: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`
export const ChoiceInput = styled(TextArea)`
  cursor: pointer;
  color: ${theme.color.primary.default};
`
