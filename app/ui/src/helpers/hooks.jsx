import { useEffect, useState, useRef } from 'react';

export const useForm = (validate) => {
  const initialMount = useRef(true);
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    } 
    const errors = validate(values)
    setErrors(errors)
  }, [values])

  const handleChange = (event) => {
    event.persist()
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }))
  }

  return {
    handleChange,
    values,
    errors
  }
}