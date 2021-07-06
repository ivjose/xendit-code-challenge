import { screen, render, waitFor, act } from '@testing-library/react'
import { unmountComponentAtNode } from 'react-dom'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'

import { server } from 'mocks/server'
import NewsLetter from './NewsLetter'

let container = null
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

test('should render news letter', async () => {
  // const { getByRole, getByLabelText } = render(<NewsLetter />)

  await act(async () => render(<NewsLetter />))

  const titlePage = screen.getByRole('heading', { name: /news letter/i })
  expect(titlePage).toBeInTheDocument()

  const fullNameField = screen.getByLabelText(/your full name/i)
  expect(fullNameField).toBeInTheDocument()

  const emailField = screen.getByLabelText(/your email/i)
  expect(emailField).toBeInTheDocument()

  const submitButton = screen.getByRole('button', {
    name: /submit/i,
  })
  expect(submitButton).toBeInTheDocument()
})

test('should render news letter display errors', async () => {
  server.resetHandlers(
    rest.post('http://localhost:3030/news-letter', (req, res, ctx) => res(ctx.status(500))),
    rest.get('*http://localhost:3030/news-letter', (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            name: 'John Doe',
            email: 'john_doe@email.com',
          },
          {
            id: 2,
            name: 'John  Smith',
            email: 'john_smith@email.com',
          },
        ])
      )
    )
  )

  await act(async () => render(<NewsLetter />))

  // Display field error
  const submitButton = screen.getByRole('button', {
    name: /submit/i,
  })
  userEvent.click(submitButton)
  // Display all Errors field
  const requiredTexts = screen.getAllByText('This is a Required Field')
  expect(requiredTexts.length).toBe(2)

  // Display email error text
  const emailField = screen.getByLabelText(/your email/i)
  userEvent.type(emailField, 'Wrong Format')
  const emailErrorText = screen.getByText('Incorrect Email format')
  expect(emailErrorText).toBeInTheDocument()

  userEvent.clear(emailField)
  userEvent.type(emailField, 'gabsantos@gmail.com')
  expect(emailField.value).toBe('gabsantos@gmail.com')

  const fullNameField = screen.getByLabelText(/your full name/i)
  userEvent.type(fullNameField, 'Gab Santos')
  expect(fullNameField.value).toBe('Gab Santos')

  const checkErrorText = screen.queryByText('This is a Required Field')
  expect(checkErrorText).not.toBeInTheDocument()
  userEvent.click(submitButton)

  await waitFor(async () => {
    const alerts = await screen.findByRole('alert')

    expect(alerts).toHaveTextContent('Failed to save')
  })
  userEvent.click(submitButton)

  const messageError = screen.queryByText('Failed to save')
  expect(messageError).not.toBeInTheDocument()
})

test('should render news letter success', async () => {
  await act(async () => render(<NewsLetter />))

  const fullNameField = screen.getByLabelText(/your full name/i)
  userEvent.type(fullNameField, 'Gab Santos')
  expect(fullNameField.value).toBe('Gab Santos')

  const emailField = screen.getByLabelText(/your email/i)
  userEvent.type(emailField, 'gabsantos@gmail.com')
  expect(emailField.value).toBe('gabsantos@gmail.com')

  const submitButton = screen.getByRole('button', {
    name: /submit/i,
  })
  userEvent.click(submitButton)

  await waitFor(async () => {
    const alerts = await screen.findByRole('alert')
    expect(alerts).toHaveTextContent('Successfully save')
  })
})
