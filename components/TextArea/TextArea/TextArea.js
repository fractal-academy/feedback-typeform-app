import { Input } from 'antd'
import PropTypes from 'prop-types'
import { styles } from './TextArea.styles'

const { TextArea } = Input

const CustomTextArea = (props) => {
  const { textAreaProps, btnProps, noBorder, btnIcon } = props

  return (
    <TextArea
      style={styles.textAreaStyle}
      placeholder="Type your answer here..."
      autoSize={{ minRows: 1, maxRows: 6 }}
      bordered={!noBorder}
      btnIcon={btnIcon}
      {...textAreaProps}
      {...btnProps}
    />
  )
}

CustomTextArea.propTypes = {
  textAreaProps: PropTypes.object,
  btnProps: PropTypes.object,
  noBorder: PropTypes.bool,
  btnIcon: PropTypes.node
}

export { CustomTextArea }
