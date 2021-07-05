import { render } from '@testing-library/react'

import DisplayText from './DisplayText'

test('should render DisplayText', () => {
  const { getByRole } = render(<DisplayText text="Sample Text" />)

  const textDisplay = getByRole('heading', {
    name: /sample text/i,
  })
  expect(textDisplay).toBeInTheDocument()
})
