import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import UserManagement from './UserManagement'
import { initialUsers } from '../../initialUser'
import ThemeProvider from '../../styles/ThemeProvider'

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: ThemeProvider, ...options })

describe('UserManagement', () => {
  it('renders the component with initial users', () => {
    customRender(<UserManagement />)

    expect(screen.getByText('User Management')).toBeInTheDocument()

    initialUsers.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument()
    })
  })

  it('opens modal to add a new user', async () => {
    customRender(<UserManagement />)

    fireEvent.click(screen.getAllByText('Add User')[0])

    await waitFor(() => {
      expect(screen.getAllByText('Add User')[1]).toBeInTheDocument()
      expect(screen.getByLabelText('Name')).toBeInTheDocument()
      expect(screen.getByLabelText('Icon')).toBeInTheDocument()
      expect(screen.getByLabelText('Birthday')).toBeInTheDocument()
      expect(screen.getByLabelText('About')).toBeInTheDocument()
    })
  })

  it('adds a new user', async () => {
    customRender(<UserManagement />)

    fireEvent.click(screen.getAllByText('Add User')[0])

    await waitFor(async () => {
      fireEvent.change(screen.getByLabelText('Name'), {
        target: { value: 'New User' },
      })
      fireEvent.change(screen.getByLabelText('Icon'), {
        target: { value: '👤' },
      })

      const dateInput = screen.getByPlaceholderText('Select date')
      fireEvent.click(dateInput)

      await waitFor(() => {
        const selectedDateCell = document.querySelector(
          '.ant-picker-cell-today',
        )
        if (selectedDateCell) {
          fireEvent.click(selectedDateCell)
        }
      })

      fireEvent.change(screen.getByLabelText('About'), {
        target: { value: 'New user bio' },
      })
    })

    fireEvent.click(screen.getByText('Add'))

    await waitFor(() => {
      expect(screen.getByText('New User')).toBeInTheDocument()
      expect(screen.getByText('👤')).toBeInTheDocument()
    })
  })

  it('opens modal to edit an existing user', async () => {
    customRender(<UserManagement />)

    const editButtons = screen.getAllByText('Edit')
    fireEvent.click(editButtons[0])

    await waitFor(() => {
      expect(screen.getByText('Edit User')).toBeInTheDocument()
      expect(screen.getByDisplayValue(initialUsers[0].name)).toBeInTheDocument()
    })
  })

  it('updates an existing user', async () => {
    customRender(<UserManagement />)

    const editButtons = screen.getAllByText('Edit')
    fireEvent.click(editButtons[0])

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('Name'), {
        target: { value: 'Updated User' },
      })
      fireEvent.change(screen.getByLabelText('About'), {
        target: { value: 'Updated bio' },
      })
    })

    fireEvent.click(screen.getByText('Update'))

    await waitFor(() => {
      expect(screen.getByText('Updated User')).toBeInTheDocument()
      expect(
        screen.getByText('Updated bio - June 28, 1971'),
      ).toBeInTheDocument()
    })
  })

  it('deletes an existing user', async () => {
    customRender(<UserManagement />)

    const initialUserCount = screen.getAllByText('Edit').length
    const editButtons = screen.getAllByText('Edit')

    fireEvent.click(editButtons[0])

    await waitFor(() => {
      fireEvent.click(screen.getByText('Delete'))
    })

    await waitFor(() => {
      const newUserCount = screen.getAllByText('Edit').length
      expect(newUserCount).toBe(initialUserCount - 1)
    })
  })
})
