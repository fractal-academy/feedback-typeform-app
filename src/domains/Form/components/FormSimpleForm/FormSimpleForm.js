import React from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from '../../../../context/Translation'
import { Col } from '@qonsoll/react-design'
import TextArea from 'antd/es/input/TextArea'

function FormSimpleForm(props) {
  const { formData, children, ...rest } = props

  // [ADDITIONAL_HOOKS]
  const { formNamePlaceholder, formDescriptionPlaceholder } = useTranslation()

  // [COMPUTED PROPERTIES]
  const initialValues = {
    name: formData?.title,
    description: formData?.subtitle
  }
  return (
    <Form {...rest} initialValues={initialValues}>
      <Form.Item name="name" rules={[{ required: true }]}>
        <Input
          allowClear
          placeholder={formNamePlaceholder || 'Type form name'}
        />
      </Form.Item>
      <Form.Item name="description">
        <TextArea
          showCount
          autoSize={{ minRows: 3, maxRows: 5 }}
          maxLength={1000}
          allowClear
          placeholder={formDescriptionPlaceholder || 'Form short description'}
        />
      </Form.Item>
      {children && <Col cw={12}>{children}</Col>}
    </Form>
  )
}

FormSimpleForm.propTypes = {}

export default FormSimpleForm