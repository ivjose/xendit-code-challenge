import { useState } from 'react'
import axios from 'axios'
// import AsyncSelect from 'react-select'

import InputField from 'components/InputField'
import AlertDisplay from 'components/AlertDisplay'

const DEFAULT_VALUE = {
  name: '',
  email: '',
  password: '',
}

const Register = () => {
  const [userCredentials, setUserCredentials] = useState(DEFAULT_VALUE)
  const [errorFields, setErrorFields] = useState(DEFAULT_VALUE)
  const [status, setStatus] = useState({
    state: '',
    message: '',
  })

  const checkError = (name, value) => {
    let errorMessage = ''

    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (name === 'email') {
      if (!emailFormat.test(value)) {
        errorMessage = 'Incorrect Email format'
      }
    }

    if (!value) {
      errorMessage = 'This is a Required Field'
    }

    return errorMessage
  }

  const updateErrors = async (name, value) => {
    const error = checkError(name, value)

    setErrorFields((prevState) => ({ ...prevState, [name]: error }))
    if (status.state) {
      setStatus({ state: '', message: '' })
    }
  }

  const updateField = async (event) => {
    const { name, value } = event.target

    setUserCredentials((prevState) => ({ ...prevState, [name]: value }))

    updateErrors(name, value)
  }

  // eslint-disable-next-line consistent-return
  const handleSubmit = async (e) => {
    e.preventDefault()

    const propertyNames = Object.entries(userCredentials)
    const errorCheck = []

    propertyNames.forEach(([name, value]) => {
      updateErrors(name, value)
      const error = checkError(name, value)
      if (error) errorCheck.push({ name, error })
    })

    if (errorCheck.length > 1) {
      return null
    }
    setStatus({ state: 'loading', message: '' })
    try {
      const usersList = await axios.get('http://localhost:3030/users')

      const { data } = usersList
      await axios.post('http://localhost:3030/users', {
        id: data.length + 1,
        ...userCredentials,
      })

      setStatus({ state: 'success', message: 'Successfully Register and you can Login' })
      setUserCredentials(DEFAULT_VALUE)
    } catch (error) {
      setStatus({ state: 'error', message: 'Failed to register' })
    }
  }

  return (
    <div className="max-w-2xl mx-auto overflow-hidden bg-white border shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-lg font-medium leading-6 text-gray-900">Registration</h1>
      </div>
      {status.state && <AlertDisplay status={status.state} message={status.message} />}

      <div className="px-4 py-5 text-gray-400 sm:p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <InputField
            name="name"
            label="Your Full Name"
            value={userCredentials.name}
            error={errorFields.name}
            updateField={updateField}
          />
          <InputField
            name="email"
            type="email"
            label="Your Email"
            value={userCredentials.email}
            error={errorFields.email}
            updateField={updateField}
          />

          <InputField
            name="password"
            label="Your Password"
            type="password"
            value={userCredentials.password}
            error={errorFields.password}
            updateField={updateField}
          />

          <div>
            <button
              disabled={status.state === 'loading'}
              type="submit"
              className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
