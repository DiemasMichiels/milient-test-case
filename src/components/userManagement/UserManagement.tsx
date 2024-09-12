import { useState } from 'react'
import { initialUsers } from '../../initialUser'
import * as styled from './UserManagement.styled'
import type { User } from 'src/types/User'
import UserList from '../userList/UserList'
import UserModal from '../userModal/UserModal'

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleAddUser = (newUser: User) => {
    setUsers([
      ...users,
      { ...newUser, id: (users[users.length - 1]?.id ?? 0) + 1 },
    ])
  }

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    )
  }

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  const showModal = (user?: User) => {
    setSelectedUser(user || null)
    setIsModalVisible(true)
  }

  const hideModal = () => {
    setSelectedUser(null)
    setIsModalVisible(false)
  }

  return (
    <styled.Section>
      <styled.Header>
        <styled.Flex align='center'>
          <styled.HeaderTitle level={2}>User Management</styled.HeaderTitle>
        </styled.Flex>
      </styled.Header>
      <styled.Content>
        <UserList
          users={users}
          onEditUser={showModal}
          onAddUser={() => showModal()}
        />
        <UserModal
          visible={isModalVisible}
          user={selectedUser}
          onCancel={hideModal}
          onAddUser={handleAddUser}
          onUpdateUser={handleUpdateUser}
          onDeleteUser={handleDeleteUser}
        />
      </styled.Content>
    </styled.Section>
  )
}

export default UserManagement
