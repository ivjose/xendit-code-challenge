import { useState } from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import InputField from './InputField'

const CustomForm = () => {
  const [value, setValue] = useState('')

  return (
    <InputField
      name="name"
      label="Your Name"
      value={value}
      updateField={(event) => setValue(event.target.value)}
    />
  )
}

test('should render', () => {
  const { getByLabelText } = render(<CustomForm />)

  const searchField = getByLabelText(/your name/i)
  expect(searchField).toBeInTheDocument()

  userEvent.type(searchField, 'John Doe')

  expect(searchField.value).toBe('John Doe')
})

test('should render error message', () => {
  const { getByText } = render(
    <InputField
      name="email"
      type="email"
      label="Your Email"
      error="Required field"
      value=""
      updateField={jest.fn()}
    />
  )

  const errorText = getByText('Required field')

  expect(errorText).toBeInTheDocument()
  expect(errorText).toHaveClass('text-red-600')
})

test('should render toggle password', () => {
  const { getByTestId } = render(
    <InputField
      name="password"
      type="password"
      label="Your Password"
      value=""
      updateField={jest.fn()}
    />
  )

  const toggleButton = getByTestId('toggle-password')
  const toggleOff = getByTestId('eye-close')
  expect(toggleOff).toBeInTheDocument()

  userEvent.click(toggleButton)
  expect(toggleOff).not.toBeInTheDocument()

  const toggleOn = getByTestId('eye-open')
  expect(toggleOn).toBeInTheDocument()
})
