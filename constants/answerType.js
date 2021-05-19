const ANSWER_TYPES = {
  SUBMIT: 'Submit',
  PLAIN_TEXT_STRING: 'Input',
  PLAIN_TEXT_DATE: 'Input',
  CHOICE: 'Choice',
  FILE: 'File'
}

const ANSWER_TYPE_KEYS = Object.keys(ANSWER_TYPES)
const ANSWER_TYPE_VALUES = Object.values(ANSWER_TYPES)

export default ANSWER_TYPES
export { ANSWER_TYPE_KEYS, ANSWER_TYPE_VALUES }
