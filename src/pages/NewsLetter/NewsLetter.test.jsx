import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'

import { server } from 'mocks/server'
import NewsLetter from './NewsLetter'

test('should render news letter', async () => {
  const { getByRole, getByLabelText } = render(<NewsLetter />)
  const titlePage = getByRole('heading', { name: /news letter/i })
  expect(titlePage).toBeInTheDocument()

  const fullNameField = getByLabelText(/your full name/i)
  expect(fullNameField).toBeInTheDocument()

  const emailField = getByLabelText(/your email/i)
  expect(emailField).toBeInTheDocument()
  // userEvent.type(searchField, 'Middle')

  const submitButton = getByRole('button', {
    name: /submit/i,
  })
  expect(submitButton).toBeInTheDocument()
})

test('should render news letter field error', async () => {
  server.resetHandlers(
    rest.post('http://localhost:3030/users', (req, res, ctx) => res(ctx.status(500))),
    rest.get('*http://localhost:3030/users', (req, res, ctx) =>
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
  const { getByRole, getByLabelText, getByText, findByRole, queryByText } = render(<NewsLetter />)

  const submitButton = getByRole('button', {
    name: /submit/i,
  })
  expect(submitButton).toBeInTheDocument()
  userEvent.click(submitButton)

  expect(getByText('This is a Required Field')).toBeInTheDocument()
  expect(getByText('Incorrect Email format')).toBeInTheDocument()

  const fullNameField = getByLabelText(/your full name/i)
  userEvent.type(fullNameField, 'Gab Santos')

  expect(fullNameField.value).toBe('Gab Santos')

  const emailField = getByLabelText(/your email/i)
  userEvent.type(emailField, 'gabsantos@gmail.com')

  expect(emailField.value).toBe('gabsantos@gmail.com')
  userEvent.click(submitButton)

  await waitFor(async () => {
    const alerts = await findByRole('alert')

    expect(alerts).toHaveTextContent('Failed to save')
  })
  userEvent.click(submitButton)

  const messageError = queryByText('Failed to save')
  expect(messageError).not.toBeInTheDocument()
})

test('should render news letter success', async () => {
  const { getByRole, getByLabelText, findByRole } = render(<NewsLetter />)

  const submitButton = getByRole('button', {
    name: /submit/i,
  })

  const fullNameField = getByLabelText(/your full name/i)
  userEvent.type(fullNameField, 'Gab Santos')

  expect(fullNameField.value).toBe('Gab Santos')

  const emailField = getByLabelText(/your email/i)
  userEvent.type(emailField, 'gabsantos@gmail.com')

  expect(emailField.value).toBe('gabsantos@gmail.com')
  userEvent.click(submitButton)

  await waitFor(async () => {
    const alerts = await findByRole('alert')
    expect(alerts).toHaveTextContent('Successfully save')
  })
})
