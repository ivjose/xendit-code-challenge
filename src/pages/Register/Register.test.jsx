import { render, screen, waitFor } from 'test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'

import { server } from 'mocks/server'
import Register from './Register'

test('render register', () => {
  render(<Register />)

  const titlePage = screen.getByRole('heading', { name: /registration/i })
  expect(titlePage).toBeInTheDocument()

  const fullNameField = screen.getByLabelText(/your full name/i)
  expect(fullNameField).toBeInTheDocument()

  const emailField = screen.getByLabelText(/your email/i)
  expect(emailField).toBeInTheDocument()

  const passwordField = screen.getByLabelText(/your password/i)
  expect(passwordField).toBeInTheDocument()

  const signInButton = screen.getByRole('button', {
    name: /register/i,
  })
  expect(signInButton).toBeInTheDocument()
})

test('render display error', async () => {
  server.resetHandlers(
    rest.post('http://localhost:3030/users', (req, res, ctx) => res(ctx.status(500))),
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
  render(<Register />)

  const registerButton = screen.getByRole('button', {
    name: /register/i,
  })
  userEvent.click(registerButton)
  // Display all Errors field
  const requiredTexts = screen.getAllByText('This is a Required Field')
  expect(requiredTexts.length).toBe(3)

  const fullNameField = screen.getByLabelText(/your full name/i)
  userEvent.type(fullNameField, 'Gab Santos')
  expect(fullNameField.value).toBe('Gab Santos')

  // Display email error text
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
  userEvent.click(registerButton)

  await waitFor(async () => {
    const alerts = await screen.findByRole('alert')

    expect(alerts).toHaveTextContent('Failed to register')
  })
  userEvent.click(registerButton)

  const messageError = screen.queryByText('Failed to register')
  expect(messageError).not.toBeInTheDocument()
})

test('should render register success', async () => {
  render(<Register />)

  const fullNameField = screen.getByLabelText(/your full name/i)
  userEvent.type(fullNameField, 'Gab Santos')
  expect(fullNameField.value).toBe('Gab Santos')

  const emailField = screen.getByLabelText(/your email/i)
  userEvent.type(emailField, 'gabsantos@gmail.com')
  expect(emailField.value).toBe('gabsantos@gmail.com')

  const passwordField = screen.getByLabelText(/your password/i)
  userEvent.type(passwordField, 'samplePassword')
  expect(passwordField.value).toBe('samplePassword')

  const registerButton = screen.getByRole('button', {
    name: /register/i,
  })
  userEvent.click(registerButton)

  await waitFor(async () => {
    const alerts = await screen.findByRole('alert')
    expect(alerts).toHaveTextContent('Successfully Register and you can Login')
  })
})
