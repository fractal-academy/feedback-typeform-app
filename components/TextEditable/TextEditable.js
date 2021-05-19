import { Input } from 'antd'
import PropTypes from 'prop-types'
import { styles } from './TextEditable.styles'

const { TextArea } = Input

function TextEditable(props) {
  const { textSecondary, placeholder, isTitle, onChange, onBlur, value } = props

  return (
    <TextArea
      style={{
        ...(isTitle ? styles.title : styles.default),
        ...(textSecondary ? styles.grayColor : styles.blackColor)
      }}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      bordered={false}
      placeholder={placeholder}
      autoSize
      {...props}
    />
  )
}

TextEditable.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  textSecondary: PropTypes.bool,
  isTitle: PropTypes.bool,
  placeholder: PropTypes.string.isRequired
}

export default TextEditable
