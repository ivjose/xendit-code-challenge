import { screen, render, act } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import FakeTimers from '@sinonjs/fake-timers'

import Home from './Home'

// jest.useFakeTimers()
// let clock
// beforeEach(() => {
//   clock = FakeTimers.install()
// })
// afterEach(() => {
//   clock.uninstall()
// })

// test('should render', async () => {
//   await act(async () => render(<Home />))
//   //   const { debug } = render(<Home />)

//   const titlePage = screen.getByRole('heading', { name: 'Enter your University name' })
//   expect(titlePage).toBeInTheDocument()

//   //   const searchDisplayText = screen.getByRole('heading', { name: /search your university/i })
//   //   expect(searchDisplayText).toBeInTheDocument()

//   const searchField = screen.getByLabelText(/search/i)
//   expect(searchField).toBeInTheDocument()

//   await act(async () => userEvent.type(searchField, 'asia'))
//   //   await act(async () => jest.advanceTimersByTime(1000))

//   //   expect(await screen.findByRole('heading', 'Loading')).toBeInTheDocument()
//   //   debug()
//   //   await waitFor(async () => {
//   //     expect(await screen.findByRole('heading', { name: /loading/i })).toBeInTheDocument()
//   //   })
//   //   act(() => clock.tick(1000))
//   //   expect(await screen.findByRole('heading', { name: /loading/i })).toBeInTheDocument()
//   //   await waitFor(async () => {
//   //     jest.advanceTimersByTime(1001)
//   //     // const alerts = await screen.findAllByRole('alert');

//   //     // expect(alerts).toHaveLength(2);
//   //     expect(await screen.findByText('loading')).toBeInTheDocument()
//   //   })

//   //   debug()
//   //   await act(async () => {

//   //     debug()
//   //   })

//   //   const loadingText = await screen.findByRole('heading', {
//   //     name: 'loading',
//   //   })

//   //   expect(loadingText).toBeInTheDocument()
// })

test('After loading', async () => {
  await act(async () => {
    /* the actual test */

    render(<Home />)

    const titlePage = screen.getByRole('heading', { name: 'Enter your University name' })
    expect(titlePage).toBeInTheDocument()

    const searchDisplayText = screen.getByRole('heading', { name: /search your university/i })
    expect(searchDisplayText).toBeInTheDocument()

    // const searchField = screen.getByLabelText(/search/i)
    // expect(searchField).toBeInTheDocument()
    // userEvent.type(searchField, 'asia')
    // clock.tick(3000)
    // await screen.findByRole('heading', { name: /search your university/i })
  })
})
