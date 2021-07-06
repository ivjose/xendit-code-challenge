/* eslint-disable react/jsx-props-no-spreading */
import { createContext, useContext, useState, useMemo } from 'react'

import axios from 'axios'

const LoginAuth = createContext(null)

const defaultValue = {
  email: '',
  password: '',
  isAuthenticated: false,
}

const useLoginAuth = () => {
  const context = useContext(LoginAuth)

  if (!context) {
    throw new Error('useLoginAuth must be use within Login Auth Provider')
  }

  return context
}

const LoginAuthProvider = (props) => {
  const [userLogin, setUserLogin] = useState(defaultValue)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const value = useMemo(() => {
    const authLogin = async (credentials) => {
      setIsLoading(true)

      const usersList = await axios.get('http://localhost:3030/users')

      const authCheck = usersList.data.find(
        (user) => user.email === credentials.email && user.password === credentials.password
      )

      if (authCheck) {
        setUserLogin({ ...authCheck, isAuthenticated: true })
        setError('')

        setIsLoading(false)
      } else {
        setIsLoading(false)
        setError('Invalid Credentials')
      }
    }
    const logout = () => {
      setUserLogin(defaultValue)
    }

    return {
      ...userLogin,
      error,
      authLogin,
      logout,
      isLoading,
    }
  }, [userLogin, isLoading, error])
  return <LoginAuth.Provider value={value} {...props} />
}

export { LoginAuthProvider, useLoginAuth }
