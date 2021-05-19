const DATE_CONDITION_RULES = {
  IS_ON: 'is on',
  IS_NOT_ON: 'is not on',
  IS_BEFORE: 'is before',
  IS_AFTER: 'is after',
  IS_BEFORE_OR_ON: 'is before or on',
  IS_AFTER_OR_ON: 'is after or on'
}

const DATE_CONDITION_RULES_KEYS = Object.keys(DATE_CONDITION_RULES)
const DATE_CONDITION_RULES_VALUES = Object.values(DATE_CONDITION_RULES)

export default DATE_CONDITION_RULES
export { DATE_CONDITION_RULES_KEYS, DATE_CONDITION_RULES_VALUES }
