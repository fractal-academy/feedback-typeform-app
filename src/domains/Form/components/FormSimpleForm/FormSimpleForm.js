import { Form, Switch } from 'antd'
import React, { useMemo } from 'react'
import { TextArea, Input } from '@qonsoll/react-design'
import { useTranslation } from '../../../../context/Translation'

// const { TextArea } = Input
function FormSimpleForm(props) {
  const { formData, children, ...rest } = props

  // [ADDITIONAL_HOOKS]
  const { formNamePlaceholder, formDescriptionPlaceholder, enableQuizLabel } =
    useTranslation()

  // [COMPUTED PROPERTIES]
  const initialValues = useMemo(() => {
    const { title, subtitle = '', isQuiz = false } = formData || {}
    return {
      title,
      subtitle,
      isQuiz
    }
  }, [formData])

  return (
    <Form {...rest} initialValues={initialValues}>
      <Form.Item
        name="title"
        rules={[{ required: true, message: 'Please, enter form name.' }]}>
        <Input
          allowClear
          placeholder={formNamePlaceholder || 'Type form name'}
        />
      </Form.Item>
      <Form.Item name="subtitle">
        <TextArea
          showCount
          autoSize={{ minRows: 3, maxRows: 5 }}
          maxLength={1000}
          allowClear
          placeholder={formDescriptionPlaceholder || 'Form short description'}
        />
      </Form.Item>
      <Form.Item name="isQuiz" label={enableQuizLabel || 'Enable quiz system'}>
        <Switch defaultChecked={!!formData?.isQuiz} />
      </Form.Item>
      {children}
    </Form>
  )
}

FormSimpleForm.propTypes = {}

export default FormSimpleForm
