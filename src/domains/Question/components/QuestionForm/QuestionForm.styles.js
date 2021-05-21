export const styles = {
  //! remove from this const and replace on styled components
  cardStyle: {
    width: '400px',
    borderRadius: '8px',
    borderColor: '#1d6fdc',
    backgroundColor: 'transparent'
  },
  columnStyle: { justifyContent: 'center', alignItems: 'center' },
  modalButtonStyle: { padding: 0, overflow: 'hidden' },
  welcomeBtn: {
    borderRadius: '4px',
    marginRight: '4px',
    fontWeight: 'bold'
  },
  //? leave everything below
  mainRowStyle: {
    noGutters: true,
    mb: 2,
    height: '100%',
    width: '100%',
    display: 'flex',
    flex: 1,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  questionCardColumnStyle: {
    v: 'center',
    order: 2,
    mx: 4,
    display: 'flex'
  },
  imageBetweenStyle: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    zIndex: '1',
    mb: 3
  },
  sideImageColumnStyle: {
    v: 'center',
    display: 'flex',
    height: '100%'
  },
  sideImageBoxStyle: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center left',
    m: 2,
    position: 'relative',
    p: -42
  }
}
