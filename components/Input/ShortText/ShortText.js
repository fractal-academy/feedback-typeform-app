import { Form } from 'antd'
import PropTypes from 'prop-types'
import { globalStyles } from 'app/styles'
import { ShortTextInput, styles } from './ShortText.styles'
import { SubmitButton } from 'components'
import { Row, Col, Container } from '@qonsoll/react-design'

function ShortText(props) {
  const { onSubmit, inputProps, isRequired, onClick } = props

  // [ADDITIONAL HOOKS]
  const [form] = Form.useForm()

  // [CLEAN FUNCTIONS]
  const onFinish = (values) => {
    console.log('Success:', values)
    onSubmit && onSubmit(values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Container>
        <Row noGutters>
          <Col>
            <Form.Item
              style={globalStyles.resetMarginB}
              name="input"
              rules={[{ required: isRequired }]}>
              <ShortTextInput
                {...inputProps}
                placeholder="Type your answer here..."
              />
            </Form.Item>
          </Col>
        </Row>

        <Row mt={4} noGutters>
          <Col cw="auto">
            <SubmitButton onClick={onClick} />
          </Col>
        </Row>
      </Container>
    </Form>
  )
}

ShortText.propTypes = {
  onSubmit: PropTypes.func,
  isRequired: PropTypes.bool,
  btnProps: PropTypes.object,
  inputProps: PropTypes.object
}

export default ShortText
