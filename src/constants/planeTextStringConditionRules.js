const TEXT_CONDITION_RULES = {
  IS_EQUAL_TO: 'is equal to',
  IS_NOT_EQUAL_TO: 'is not equal to',
  BEGINS_WITH: 'begins with',
  ENDS_WITH: 'ends with',
  CONTAINS: 'contains',
  DOES_NOT_CONTAIN: 'does not contain'
}

const TEXT_CONDITION_RULES_KEYS = Object.keys(TEXT_CONDITION_RULES)
const TEXT_CONDITION_RULES_VALUES = Object.values(TEXT_CONDITION_RULES)

export default TEXT_CONDITION_RULES
export { TEXT_CONDITION_RULES_KEYS, TEXT_CONDITION_RULES_VALUES }
