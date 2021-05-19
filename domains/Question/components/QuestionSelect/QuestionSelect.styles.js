import theme from 'app/styles/theme'

export const styles = {
  selectStyle: {
    width: '100%',
    // height: '48px',
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${theme.color.dark.t.lighten5}`,
    borderRadius: theme.borderRadius.md
  },
  //?new styles
  mainContainer: {
    display: 'flex',
    border: 'none'
  }
}
