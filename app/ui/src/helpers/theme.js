const white = '#FFFFFF'
const black = '#161617'

const lightTheme = {
  background: white,
  body: black,
  cardshadow: 'rgba(0,0,0,0.25)',
}

const darkTheme = {
  background: black,
  body: white,
  cardshadow: white,
}

const theme = mode => (mode === 'dark' ? darkTheme : lightTheme)
export default theme;