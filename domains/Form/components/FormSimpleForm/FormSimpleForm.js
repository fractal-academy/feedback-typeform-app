import { Form, Input } from 'antd'
import { Col, Row } from '@qonsoll/react-design'

function FormSimpleForm(props) {
  const { onFinish, form, formData } = props

  // [COMPUTED PROPERTIES]
  const initialValues = {
    name: formData?.title,
    description: formData?.subtitle
  }

  return (
    <Form onFinish={onFinish} form={form} initialValues={initialValues}>
      <Row h="center" mb={2}>
        <Col>
          <Row mb={2}>
            <Col>
              <Form.Item name="name" rules={[{ required: true }]}>
                <Input allowClear placeholder="Type form name" />
              </Form.Item>
            </Col>
          </Row>
          <Row mb={2}>
            <Col>
              <Form.Item name="description">
                <Input allowClear placeholder="Form short description" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  )
}

FormSimpleForm.propTypes = {}

export default FormSimpleForm
