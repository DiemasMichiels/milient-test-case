import { render, screen, fireEvent } from '@testing-library/react'
import UserList from './UserList'
import type { User } from 'src/types/User'

describe('UserList', () => {
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'Test User',
      icon: '🧪',
      birthday: 'January 1, 2000',
      about: 'Test user',
    },
  ]

  it('renders user list correctly', () => {
    render(
      <UserList users={mockUsers} onEditUser={() => {}} onAddUser={() => {}} />,
    )

    expect(screen.getByText('Test User')).toBeInTheDocument()
  })

  it('calls onAddUser when Add User button is clicked', () => {
    const mockOnAddUser = vi.fn()

    render(
      <UserList
        users={mockUsers}
        onEditUser={() => {}}
        onAddUser={mockOnAddUser}
      />,
    )

    fireEvent.click(screen.getByText('Add User'))

    expect(mockOnAddUser).toHaveBeenCalled()
  })
})
