import { renderHook, act } from '@testing-library/react-hooks'
import { country } from 'test-utils/data'
import usePagination from './usePagination'

test('should render item per page', () => {
  // slicedData, pagination, prevPage, nextPage, changePage
  const { result } = renderHook(() =>
    usePagination({
      itemsPerPage: 10,
      data: [...country],
      startFrom: 1,
    })
  )

  expect(result.current.pagination[0].ellipsis).toBeFalsy()
  expect(result.current.pagination[0].current).toBeTruthy()
  expect(result.current.pagination[2].ellipsis).toBeTruthy()
  expect(result.current.pagination[2].current).toBeFalsy()

  expect(result.current.pagination.length).toBe(4)
  expect(result.current.slicedData.length).toBe(10)
})

test('should pagination handler work', () => {
  // slicedData, pagination, prevPage, nextPage, changePage
  const { result } = renderHook(() =>
    usePagination({
      itemsPerPage: 10,
      data: [...country],
      startFrom: 1,
    })
  )

  act(() => {
    result.current.nextPage()
  })
  expect(result.current.slicedData.length).toBe(10)

  act(() => {
    result.current.prevPage()
  })
  expect(result.current.slicedData.length).toBe(10)

  act(() => {
    result.current.changePage(4)
  })
  expect(result.current.slicedData.length).toBe(6)
})
