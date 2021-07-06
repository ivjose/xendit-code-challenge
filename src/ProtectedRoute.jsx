/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import { Redirect, Route } from 'react-router-dom'
import { useLoginAuth } from 'contexts/LoginAuthContexts'

function ProtectedRoute({ children, ...rest }) {
  const { isAuthenticated } = useLoginAuth()

  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute
