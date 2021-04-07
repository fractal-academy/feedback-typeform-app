import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Menu } from 'antd'
import { Col, Container, Row } from '@qonsoll/react-design'
import { DownOutlined } from '@ant-design/icons'
// import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

function CustomDropDown(props) {
  const { type, overlay, children, idMenu } = props
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

  const menu = (
    <Menu style={{ maxHeight: '200px' }} overflowY="auto">
      <Menu.Item key="0" onClick={() => console.log('1st menu item')}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="1" onClick={() => console.log('2st menu item')}>
        2nd menu item
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={overlay} trigger={['click']}>
      <Button>
        <DownOutlined />
      </Button>
    </Dropdown>
  )
}
CustomDropDown.propTypes = {}
export { CustomDropDown }
