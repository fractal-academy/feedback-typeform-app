import React, { useEffect, useState } from 'react'
import { Col, Row } from '@qonsoll/react-design'
import { Divider, Menu, Select } from 'antd'
import { Option } from 'antd/lib/mentions'
import { QUESTION_TYPE, QUESTION_TYPE_VALUE } from 'app/constants/quetstionType'
import {
  CarOutlined,
  GlobalOutlined,
  HeartOutlined,
  HomeOutlined,
  SwapOutlined
} from '@ant-design/icons'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'
import './QuestionTypeSelect.style.css'

/*
  [AUTOGENERATED]
  Please remove this section, if you are going to make changes
  in this file.
*/
const questionTypeMap = [
  {
    type: QUESTION_TYPE.WELCOME_SCREEN,
    description: 'Invite your audience in',
    icon: <HomeOutlined style={{ fontSize: '24px' }} />
  },
  {
    type: QUESTION_TYPE.SHORT_TEXT,
    description: 'For short answers, like names',
    icon: <GlobalOutlined style={{ fontSize: '24px' }} />
  },
  {
    type: QUESTION_TYPE.DATE,
    description: 'Collect answers in date format',

    icon: <SwapOutlined style={{ fontSize: '24px' }} />
  },
  {
    type: QUESTION_TYPE.FILE_UPLOAD,
    description: 'Upload a file up to 10MB',
    icon: <HeartOutlined style={{ fontSize: '24px' }} />
  },
  {
    type: QUESTION_TYPE.LONG_TEXT,
    description: 'Mote space to spill the beans',
    icon: <CarOutlined style={{ fontSize: '24px' }} />
  },
  {
    type: QUESTION_TYPE.OPINION_SCALE,
    description: 'A customizable, numbered scale',
    icon: <HomeOutlined style={{ fontSize: '24px' }} />
  },
  {
    type: QUESTION_TYPE.PICTURE_CHOICE,
    description: 'Multiple choice but prettier',
    icon: <HomeOutlined style={{ fontSize: '24px' }} />
  },
  {
    type: QUESTION_TYPE.RATING,
    description: 'Choose from shapes like ⭐ or 🐶',
    icon: <HomeOutlined style={{ fontSize: '24px' }} />
  },
  {
    type: QUESTION_TYPE.STATEMENT,
    description: 'Take the mic for a moment',
    icon: <HomeOutlined style={{ fontSize: '24px' }} />
  },
  {
    type: QUESTION_TYPE.YES_NO,
    description: 'Just 2 options: Yes or No',
    icon: <HomeOutlined style={{ fontSize: '24px' }} />
  }
]
function QuestionTypeSelect(props) {
  const { Option } = Select
  const { onChange } = props
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
      <Row h="center" v={'center'} noGutters>
        <Col>
          <Menu
            // mode="horizontal"
            className="hideScroll"
            onChange={onChange}
            style={{ height: '300px', overflow: 'auto' }}>
            {questionTypeMap.map((item, index) => (
              <Menu.Item
                style={{
                  display: 'flex',
                  height: '60px',
                  lineHeight: '1',
                  paddingLeft: '0',
                  paddingRight: '0'
                }}
                key={index}
                onClick={() => {}}>
                <Row noGutters v="center">
                  <Col v="center" cw="auto">
                    {item.icon}
                  </Col>
                  <Col>
                    <Row noGutters v="center">
                      <Text style={{ fontSize: '16px', fontWeight: '500' }}>
                        <Col v="center">{item.type}</Col>
                      </Text>
                    </Row>
                    <Row noGutters>
                      <Col>
                        <Text style={{ fontSize: '12px', color: '#737373' }}>
                          {item.description}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Menu.Item>
            ))}
          </Menu>
        </Col>
      </Row>
    </>
  )
}

QuestionTypeSelect.propTypes = {}

export default QuestionTypeSelect
