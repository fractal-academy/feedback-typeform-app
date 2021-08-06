import React from 'react'
import { Select } from 'antd'
import { Col, Row } from '@qonsoll/react-design'
import { DATE_CONDITION_RULES_VALUES } from '../../../../constants/dateConditionRules'
import { TEXT_CONDITION_RULES_VALUES } from '../../../../constants/planeTextStringConditionRules'
import PropTypes from 'prop-types'

const Option = Select

const ConditionRuleSelect = (props) => {
  const { onChange, conditionType } = props

  let menu =
    conditionType === 'date'
      ? DATE_CONDITION_RULES_VALUES
      : TEXT_CONDITION_RULES_VALUES

  return (
    <Row h="center" noGutters>
      <Col>
        <Select
          style={{ width: '200px' }}
          onChange={onChange}
          defaultValue={Object.values(menu)}>
          {Object.values(menu)?.map((item, index) => (
            <Option key={index} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}

ConditionRuleSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  conditionType: PropTypes.string.isRequired
}

export default ConditionRuleSelect
