import { Box, Col } from '@qonsoll/react-design'
import { Input } from 'antd'
import styled from 'styled-components'

const { TextArea } = Input

export const MediaBox = styled(Box)(({ theme }) => ({
  mx: 2,
  mt: 2,
  height: '100px',
  width: '150px',
  borderRadius: theme.borderRadius.md,
  position: 'relative',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}))

export const MediaBoxWrapper = styled(Box)(({ theme, withImage }) => ({
  width: withImage ? 'auto' : '100%',
  position: 'relative',
  borderRadius: theme.borderRadius.md,
  backgroundColor: theme.color.primary.t.lighten6
}))

export const LetterBox = styled(Box)`
  width: 20px;
  border: 1px solid ${({ theme }) => theme.color.primary.t.lighten2};
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.body2};
  line-height: ${({ theme }) => theme.typography.lineHeight.body2};
  color: ${({ theme }) => theme.color.primary.default};
  background-color: ${({ theme }) => theme.color.white.default};
`
export const DeleteButton = styled(Box)`
  position: absolute;
  right: -6px;
  top: -6px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.color.primary.t.lighten3};
  font-size: ${({ theme }) => theme.typography.fontSize.caption2};
  height: 16px;
  width: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`
export const ChoiceInput = styled(TextArea)`
  cursor: pointer;
  color: ${({ theme }) => theme.color.primary.default};
`
export const CustomCol = styled(Col)`
  position: absolute;
  bottom: 8px;
`
export const ChoiceOptionCol = styled(Col)`
  padding-left: 15px;
  //bottom: 0;
`
