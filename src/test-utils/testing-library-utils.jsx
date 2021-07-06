import { render } from '@testing-library/react'
import { LoginAuthProvider } from 'contexts/LoginAuthContexts'

const renderWithContext = (ui, options) => render(ui, { wrapper: LoginAuthProvider, ...options })

export * from '@testing-library/react'
export { renderWithContext as render }
