const QUESTION_TYPES = {
  WELCOME_SCREEN: 'Welcome screen',
  SHORT_TEXT: 'Short text',
  LONG_TEXT: 'Long text',
  STATEMENT: 'Statement',
  PICTURE_CHOICE: 'Picture choice',
  CHOICE: 'Choice',
  RATING: 'Rating',
  YES_NO: 'Yes/No',
  OPINION_SCALE: 'Opinion scale',
  DATE: 'Date',
  FILE_UPLOAD: 'File upload',
  ENDING: 'Ending'
}

const QUESTION_TYPE_KEYS = Object.keys(QUESTION_TYPES)
const QUESTION_TYPE_VALUES = Object.values(QUESTION_TYPES)

export default QUESTION_TYPES
export { QUESTION_TYPE_KEYS, QUESTION_TYPE_VALUES }
