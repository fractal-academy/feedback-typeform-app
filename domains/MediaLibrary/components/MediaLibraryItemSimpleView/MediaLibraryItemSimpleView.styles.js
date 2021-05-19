import theme from 'app/styles/theme'

export const styles = {
  cardStyles: {
    height: '206px',
    weight: '216px',
    padding: '4px',
    backgroundColor: theme.color.dark.t.lighten9,
    borderRadius: theme.borderRadius.md,
    position: 'relative'
  },
  titleStyle: {
    color: 'black',
    fontSize: '14px',
    fontWeight: 'bold',
    maxWidth: '190px'
  },

  iconStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 100,
    borderRadius: '50%',
    padding: '3px'
  },
  cardBodyStye: { padding: '0 8px 8px 8px' },
  imageStyle: { borderRadius: '8px' }
}
