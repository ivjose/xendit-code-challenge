import { render, act } from '@testing-library/react'
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

test.only('After loading', async () => {
  await act(async () => {
    /* the actual test */

    const { getByRole } = render(<Home />)

    const titlePage = getByRole('heading', { name: 'Enter your University name' })
    expect(titlePage).toBeInTheDocument()

    const searchDisplayText = getByRole('heading', { name: /search your university/i })
    expect(searchDisplayText).toBeInTheDocument()
  })
})
