export default function validate(values) {
    let errors = {}
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!re.test(email)) {
        errors.email = 'Please enter a valid email address'
      }
    }
  
    const validatePassword = (password) => {
      if (password.length < 8) {
        errors.password = 'Password must be 8 or more characters'
      }
    }

    const validateUsername = (username) => {
      if (username.length < 6) {
        errors.username = 'Username cannot be less than 6 characters'
      }
    }
    
    if (values.password) validatePassword(values.password)
    if (values.email) validateEmail(values.email)
    if (values.username) validateUsername(values.username)
    return errors
  }