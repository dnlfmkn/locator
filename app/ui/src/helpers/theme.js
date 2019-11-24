const white = '#FFFFFF'
const black = '#161617'

const lightTheme = {
  background: white,
  body: black
}

const darkTheme = {
  background: black,
  body: white,
}

const theme = mode => (mode === 'dark' ? darkTheme : lightTheme)
export default theme;