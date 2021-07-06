import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import InputField from './InputField'

test('should render', () => {
  let value = ''
  const onChange = jest.fn((ev) => {
    value = ev.target.value
  })
  const { getByLabelText } = render(
    <InputField
      name="email"
      type="email"
      label="Your Email"
      error=""
      value={value}
      updateField={onChange}
    />
  )

  const searchField = getByLabelText(/your email/i)
  expect(searchField).toBeInTheDocument()

  userEvent.type(searchField, 'johnDoe@gmail.com')

  expect(searchField.value).toBe('johnDoe@gmail.com')
})

test('should render error message', () => {
  let value = ''
  const onChange = jest.fn((ev) => {
    value = ev.target.value
  })
  const { getByText } = render(
    <InputField
      name="email"
      type="email"
      label="Your Email"
      error="Required field"
      value={value}
      updateField={onChange}
    />
  )

  const inputField = getByText('Required field')

  expect(inputField).toBeInTheDocument()
  expect(inputField).toHaveClass('text-red-600')
})
