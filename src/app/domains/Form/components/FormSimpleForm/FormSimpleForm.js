import React, { useEffect, useState } from 'react'
import { Form, Input } from 'antd'
import { Col, Row } from '@qonsoll/react-design'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function FormSimpleForm(props) {
  const { onFinish, form, formData } = props
  // const { WRITE_PROPS_HERE } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]
  const initialValues = {
    name: formData?.title,
    description: formData?.subtitle
  }
  // [CLEAN FUNCTIONS]
  // [USE_EFFECTS]
  useEffect(() => {
    let isComponentMounted = true

    // [EFFECT LOGIC]
    // write code here...
    // code sample: isComponentMounted && setState(<your data for state updation>)

    // [CLEAN UP FUNCTION]
    return () => {
      // [OTHER CLEAN UP-S (UNSUBSCRIPTIONS)]
      // write code here...

      // [FINAL CLEAN UP]
      isComponentMounted = false
    }
  }, [])

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