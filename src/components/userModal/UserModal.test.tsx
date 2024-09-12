import type { User } from 'src/types/User'
import UserModal from './UserModal'
import { render, screen } from '@testing-library/react'

describe('UserModal', () => {
  const mockUser: User = {
    id: 1,
    name: 'Test User',
    icon: '🧪',
    birthday: 'January 1, 2000',
    about: 'Test user',
  }

  it('renders add user form when no user is provided', () => {
    render(
      <UserModal
        visible={true}
        user={null}
        onCancel={() => {}}
        onAddUser={() => {}}
        onUpdateUser={() => {}}
        onDeleteUser={() => {}}
      />,
    )

    expect(screen.getByText('Add User')).toBeInTheDocument()
  })

  it('renders edit user form when user is provided', () => {
    render(
      <UserModal
        visible={true}
        user={mockUser}
        onCancel={() => {}}
        onAddUser={() => {}}
        onUpdateUser={() => {}}
        onDeleteUser={() => {}}
      />,
    )

    expect(screen.getByText('Edit User')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument()
  })
})
