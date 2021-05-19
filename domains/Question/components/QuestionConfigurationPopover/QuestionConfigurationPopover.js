import { useState } from 'react'
import { Popover, Button } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { QuestionConfigurationPopoverContent } from 'domains/Question/components'

function QuestionConfigurationPopover(props) {
  const { onQuestionTypeChange } = props

  // [COMPONENT STATE HOOKS]
  const [showPopover, setShowPopover] = useState(false)

  // [CLEAN FUNCTIONS]
  const popoverShowChange = () => {
    setShowPopover(!showPopover)
  }

  return (
    <Popover
      visible={showPopover}
      onVisibleChange={popoverShowChange}
      trigger="click"
      placement="bottomRight"
      content={
        <QuestionConfigurationPopoverContent
          setShowPopover={setShowPopover}
          onQuestionTypeChange={onQuestionTypeChange}
        />
      }>
      <Button
        type="primary"
        icon={<SettingOutlined />}
        onClick={popoverShowChange}
      />
    </Popover>
  )
}

QuestionConfigurationPopover.propTypes = {}

export default QuestionConfigurationPopover
