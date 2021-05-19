import theme from 'app/styles/theme'
import { globalStyles } from 'app/styles'

export const styles = {
  mainBox: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  addNewChoiceBox: {
    bg: theme.color.primary.lighten6,
    m: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.md,
    style: globalStyles.cursorPointer
  }
}
