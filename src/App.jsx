import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { LoginAuthProvider } from 'contexts/LoginAuthContexts'

import NavBar from 'components/NavBar'

import Home from 'pages/Home'
import Login from 'pages/Login'
import Register from 'pages/Register'
import NewsLetter from 'pages/NewsLetter/NewsLetter'

import ProtectedRoute from './ProtectedRoute'

function App() {
  return (
    <Router>
      <LoginAuthProvider>
        <NavBar />

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <ProtectedRoute exact path="/">
            <Home />
          </ProtectedRoute>

          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <ProtectedRoute path="/news-letter">
            <NewsLetter />
          </ProtectedRoute>
        </Switch>
      </LoginAuthProvider>
    </Router>
  )
}

export default App
