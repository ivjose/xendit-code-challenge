import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SearchInput from './SearchInput'

test('should render Search', () => {
  const setSearchText = jest.fn(() => {})
  const { getByLabelText } = render(<SearchInput text="" handleChange={setSearchText} />)

  const searchField = getByLabelText(/search/i)
  expect(searchField).toBeInTheDocument()

  userEvent.type(searchField, 'Middle')

  expect(searchField.value).toBe('Middle')
})
