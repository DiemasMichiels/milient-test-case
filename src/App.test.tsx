import { render, screen } from '@testing-library/react'
import App from './Component'

describe('App tests', () => {
  it('should render the title', () => {
    render(<App />)

    expect(screen.getByText('🚀 Elon Musk')).toBeInTheDocument()
  })
})
