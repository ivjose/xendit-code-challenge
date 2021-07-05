import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { pagination } from 'test-utils/data'
import Pagination from './Pagination'

test('should render and', () => {
  const handleChangePage = jest.fn(() => {})
  const handleNextPage = jest.fn(() => {})
  const handlePrevPage = jest.fn(() => {})
  const { getAllByRole, getByRole, getByText } = render(
    <Pagination
      pagination={pagination}
      changePage={handleChangePage}
      prevPage={handleNextPage}
      nextPage={handlePrevPage}
    />
  )

  const paginationButtons = getAllByRole('link')
  expect(paginationButtons).toHaveLength(3)

  const hellipButton = getByText('…')
  expect(hellipButton).toBeInTheDocument()

  const paginationTexts = paginationButtons.map((element) => element.text)
  expect(paginationTexts).toEqual(['1', '2', '4'])

  const nextButton = getByRole('button', { name: /next/i })
  expect(nextButton).toBeInTheDocument()

  const prevButton = getByRole('button', { name: /previous/i })
  expect(prevButton).toBeInTheDocument()
})

test('should select page', () => {
  const handleChangePage = jest.fn(() => {})
  const handleNextPage = jest.fn(() => {})
  const handlePrevPage = jest.fn(() => {})
  const { getByRole } = render(
    <Pagination
      pagination={pagination}
      changePage={handleChangePage}
      prevPage={handleNextPage}
      nextPage={handlePrevPage}
    />
  )

  const secondPageButton = getByRole('link', { name: '2' })
  userEvent.click(secondPageButton)
  expect(handleChangePage).toHaveBeenCalled()
  expect(handleChangePage).toHaveBeenCalledWith(2)
})
