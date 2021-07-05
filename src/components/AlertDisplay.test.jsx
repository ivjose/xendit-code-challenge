import { render } from '@testing-library/react'

import AlertDisplay from './AlertDisplay'

test('should render default AlertDisplay', () => {
  const { getByText } = render(<AlertDisplay />)

  const textDisplay = getByText('default message')
  expect(textDisplay).toBeInTheDocument()

  expect(textDisplay).toHaveClass('text-gray-800')
})

test('should render success AlertDisplay', () => {
  const { getByText } = render(<AlertDisplay status="success" message="Success message" />)

  const textDisplay = getByText('Success message')
  expect(textDisplay).toBeInTheDocument()

  expect(textDisplay).toHaveClass('text-green-700')
})

test('should render error AlertDisplay', () => {
  const { getByText } = render(<AlertDisplay status="error" message="Error message" />)

  const textDisplay = getByText('Error message')
  expect(textDisplay).toBeInTheDocument()

  expect(textDisplay).toHaveClass('text-red-800')
})
