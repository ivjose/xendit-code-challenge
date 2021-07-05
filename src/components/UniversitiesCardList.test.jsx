import { render } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'

import { country } from 'test-utils/data'
import UniversitiesCardList from './UniversitiesCardList'

test('should render with data', () => {
  const { getAllByRole } = render(<UniversitiesCardList data={country} />)
  //   debug()

  const listData = getAllByRole('heading', { level: 4 })

  expect(listData.length).toBe(10)
})

test('should render no display', () => {
  const { getByRole } = render(<UniversitiesCardList data={[]} />)

  const noDisplay = getByRole('heading', { name: /no result found/i })

  expect(noDisplay).toBeInTheDocument()
})
