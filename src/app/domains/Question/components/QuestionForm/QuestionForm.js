import React, { useEffect, useState } from 'react'
import { Card, Tag } from 'antd'
import {
  DateTimeInput,
  InputForm,
  Popover,
  QuestionHeader,
  Rate,
  TextAreaForm
} from 'components'
import { SettingOutlined } from '@ant-design/icons'
import QuestionTypeSelect from 'domains/QuestionType/components/QuestionTypeSelect'
import { Col, Row } from '@qonsoll/react-design'
import { styles } from './QuestionForm.styles.js'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function QuestionForm(props) {
  const { questionType, questionNumber, question, description } = props
  // const { WRITE_PROPS_HERE } = props
  // const { ADDITIONAL_DESTRUCTURING_HERE } = user

  // [ADDITIONAL HOOKS]
  // const { t } = useTranslation('translation')
  // const { currentLanguage } = t

  // [COMPONENT STATE HOOKS]
  // const [state, setState] = useState({})

  // [COMPUTED PROPERTIES]

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
    <>
      <Row noGutters mb={2}>
        <Col>
          <Card style={styles.cardStyle}>
            <Row noGutters h="between">
              <Col cw="auto">
                <Tag color="blue">Question 1</Tag>
              </Col>
              <Col cw="auto">
                <Popover
                  style={styles.popoverStyle}
                  trigger={'click'}
                  placement={'bottomRight'}
                  btnType="primary"
                  btnIcon={<SettingOutlined />}
                  content={<QuestionTypeSelect />}
                />
              </Col>
            </Row>
            <Row noGutters h="between">
              <Col cw="auto">
                <QuestionHeader
                  titlePlaceholder={'Question one'}
                  subtitlePlaceholder={'Question with input answer'}
                />
              </Col>
            </Row>
            <Row noGutters>
              <Col>
                <InputForm btnProps={{ children: 'OK', type: 'primary' }} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row noGutters mb={2}>
        <Col>
          <Card style={styles.cardStyle}>
            <Row noGutters h="between">
              <Col cw="auto">
                <Tag color="blue">Question 2</Tag>
              </Col>
              <Col cw="auto">
                <Popover
                  trigger={'click'}
                  placement={'bottomRight'}
                  btnType="primary"
                  btnIcon={<SettingOutlined />}
                  content={<QuestionTypeSelect />}
                />
              </Col>
            </Row>
            <Row noGutters>
              <Col>
                <QuestionHeader
                  titlePlaceholder={'Question two'}
                  subtitlePlaceholder={'Question with TextArea'}
                />
              </Col>
            </Row>
            <Row noGutters>
              <Col>
                <TextAreaForm
                  noBorder
                  btnProps={{ children: 'Submit', type: 'primary' }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row noGutters mb={2}>
        <Col>
          <Card style={styles.cardStyle}>
            <Row noGutters h="between">
              <Col cw="auto">
                <Tag color="blue">Question 3</Tag>
              </Col>

              <Col cw="auto">
                <Popover
                  trigger={'click'}
                  placement={'bottomRight'}
                  btnType="primary"
                  btnIcon={<SettingOutlined />}
                  content={<QuestionTypeSelect />}
                />
              </Col>
            </Row>
            <Row noGutters>
              <Col>
                <QuestionHeader
                  titlePlaceholder={'Question three'}
                  subtitlePlaceholder={'Question with Rating'}
                />
              </Col>
            </Row>
            <Row noGutters>
              <Col>
                <Rate />
                <DateTimeInput />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  )
}

QuestionForm.propTypes = {}

export default QuestionForm
