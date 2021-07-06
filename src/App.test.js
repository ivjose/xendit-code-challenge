import { render, screen } from '@testing-library/react'
import App from './App'

test('renders navigation links', () => {
  render(<App />)
  const navLinksElement = screen.getAllByRole('link')

  expect(navLinksElement).toHaveLength(4)

  const linkTexts = navLinksElement.map((element) => element.text)
  expect(linkTexts).toEqual(['Home', 'Login', 'News Letter', 'Universities List'])
})
