import { render, screen, waitFor } from 'test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { Router, Route } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { server } from 'mocks/server'
import Login from './Login'

test('render login', () => {
  render(<Login />)

  const titlePage = screen.getByRole('heading', { name: /login/i })
  expect(titlePage).toBeInTheDocument()

  const emailField = screen.getByLabelText(/your email/i)
  expect(emailField).toBeInTheDocument()

  const passwordField = screen.getByLabelText(/your password/i)
  expect(passwordField).toBeInTheDocument()

  const signInButton = screen.getByRole('button', {
    name: /sign in/i,
  })
  expect(signInButton).toBeInTheDocument()
})

test('render login errors', async () => {
  server.resetHandlers(
    rest.get('*http://localhost:3030/users', (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json([
          {
            id: 3,
            name: 'John Doe',
            email: 'johnDoe@email.com',
            password: 'helloworld1234',
          },
          {
            id: 4,
            name: 'James Bond',
            email: 'james@bond.com',
            password: 'helloworld1234',
          },
        ])
      )
    )
  )

  render(<Login />)

  const signInButton = screen.getByRole('button', {
    name: /sign in/i,
  })
  userEvent.click(signInButton)
  // Display all Errors field
  const requiredTexts = screen.getAllByText('This is a Required Field')
  expect(requiredTexts.length).toBe(2)

  const emailField = screen.getByLabelText(/your email/i)
  userEvent.type(emailField, 'Wrong Format')
  const emailErrorText = screen.getByText('Incorrect Email format')
  expect(emailErrorText).toBeInTheDocument()

  userEvent.clear(emailField)
  userEvent.type(emailField, 'gabsantos@gmail.com')
  expect(emailField.value).toBe('gabsantos@gmail.com')

  const passwordField = screen.getByLabelText(/your password/i)
  userEvent.type(passwordField, 'wrongpassword')
  expect(passwordField.value).toBe('wrongpassword')

  const checkErrorText = screen.queryByText('This is a Required Field')
  expect(checkErrorText).not.toBeInTheDocument()

  userEvent.click(signInButton)

  await waitFor(async () => {
    const alerts = await screen.findByRole('alert')

    expect(alerts).toHaveTextContent('Invalid Credentials')
  })
  userEvent.click(signInButton)

  const messageError = screen.queryByText('Failed to save')
  expect(messageError).not.toBeInTheDocument()
})

test('render login success', async () => {
  server.resetHandlers(
    rest.get('*http://localhost:3030/users', (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json([
          {
            id: 3,
            name: 'John Doe',
            email: 'johnDoe@email.com',
            password: 'helloworld1234',
          },
          {
            id: 4,
            name: 'James Bond',
            email: 'james@bond.com',
            password: 'helloworld1234',
          },
        ])
      )
    )
  )

  const history = createMemoryHistory()
  render(
    <Router history={history} initialEntries={['/login']}>
      <Login />
      <Route path="/">
        <h1>Dashboard</h1>
      </Route>
    </Router>
  )

  const emailField = screen.getByLabelText(/your email/i)

  userEvent.type(emailField, 'johnDoe@email.com')
  expect(emailField.value).toBe('johnDoe@email.com')

  const passwordField = screen.getByLabelText(/your password/i)
  userEvent.type(passwordField, 'helloworld1234')
  expect(passwordField.value).toBe('helloworld1234')

  const signInButton = screen.getByRole('button', {
    name: /sign in/i,
  })
  userEvent.click(signInButton)

  const titlePage = await screen.findByRole('heading', { name: /dashboard/i })
  expect(titlePage).toBeInTheDocument()

  expect(history.location.pathname).toBe('/')
})
