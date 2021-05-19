import theme from 'app/styles/theme'

export const styles = {
  menuItemStyle: {
    display: 'flex',
    height: '60px',
    lineHeight: '1',
    paddingLeft: '0',
    paddingRight: '0'
  },
  questionName: {
    fontSize: '16px',
    fontWeight: '500'
  },
  questionDescr: {
    fontSize: '12px',
    color: '#737373'
  },
  menuStyle: {
    height: '300px',
    overflow: 'auto'
  },
  iconFontSize: {
    fontSize: '24px',
    backgroundColor: theme.color.dark.t.lighten7,
    padding: '8px',
    borderRadius: '50%'
  }
}
