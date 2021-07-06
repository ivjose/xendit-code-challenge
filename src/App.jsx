import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import NavBar from 'components/NavBar'

import Home from 'pages/Home'
import Login from 'pages/Login'
import Register from 'pages/Register'
import NewsLetter from 'pages/NewsLetter/NewsLetter'
import UniversitiesList from 'pages/UniversitiesList'

function App() {
  return (
    <Router>
      <div>
        <NavBar />

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route path="/news-letter">
            <NewsLetter />
          </Route>
          <Route path="/universities-list">
            <UniversitiesList />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
