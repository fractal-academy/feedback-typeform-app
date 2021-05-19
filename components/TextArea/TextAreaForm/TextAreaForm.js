import PropTypes from 'prop-types'
import { Form, Typography } from 'antd'
import { TextArea, SubmitButton } from 'components'
import { Col, Container, Row } from '@qonsoll/react-design'

function TextAreaForm(props) {
  const { textAreaProps, onClick } = props

  // [ADDITIONAL HOOKS]
  const { form } = Form.useForm()

  // [CLEAN FUNCTIONS]
  const onFinish = (values) => {
    console.log('Success:', values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Container>
      <Row noGutters>
        <Col>
          <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
              style={{ marginBottom: '0px' }}
              name="answer"
              rules={[
                {
                  required: true
                }
              ]}>
              <TextArea {...textAreaProps} />
            </Form.Item>
            <Form.Item>
              <Typography>Shift ⇧ + Enter ↵ to make a line break</Typography>
            </Form.Item>
            <SubmitButton onClick={onClick} />
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

TextAreaForm.propTypes = {
  textAreaProps: PropTypes.object,
  onClick: PropTypes.func
}

export default TextAreaForm
