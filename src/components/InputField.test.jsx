import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import InputField from './InputField'

test('should render', () => {
  const { getByLabelText } = render(
    <InputField
      name="email"
      type="email"
      label="Your Email"
      value=""
      error=""
      updateField={jest.fn()}
    />
  )

  const searchField = getByLabelText(/your email/i)
  expect(searchField).toBeInTheDocument()

  userEvent.type(searchField, 'johnDoe@gmail.com')

  expect(searchField.value).toBe('johnDoe@gmail.com')
})

test('should render error message', () => {
  const { getByText } = render(
    <InputField
      name="email"
      type="email"
      label="Your Email"
      value=""
      error="Required field"
      updateField={jest.fn()}
    />
  )

  const inputField = getByText('Required field')

  expect(inputField).toBeInTheDocument()
  expect(inputField).toHaveClass('text-red-600')
})
