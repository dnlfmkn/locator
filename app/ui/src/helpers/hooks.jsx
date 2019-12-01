import { useEffect, useState, useRef } from 'react';

export const useForm = (initialState, validate) => {
  const initialMount = useRef(true);
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    } 
    const errors = validate(values)
    const touchedErrors = Object.keys(errors)
      .filter(key => values[key] !== "")
      .reduce((acc, key) => {
        if (!acc[key]) {
          acc[key] = errors[key]
        }
        return acc
      }, {})
    console.log(touchedErrors)
    setErrors(touchedErrors)
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