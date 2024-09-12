import { List as AntList, Avatar, Button } from 'antd'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import * as styled from './UserList.styled'
import type { User } from 'src/types/User'

type Props = {
  users: User[]
  onEditUser: (user: User) => void
  onAddUser: () => void
}

const UserList = ({ users, onEditUser, onAddUser }: Props) => {
  return (
    <>
      <styled.AddUserButton
        type='primary'
        icon={<PlusOutlined />}
        onClick={onAddUser}
      >
        Add User
      </styled.AddUserButton>
      <styled.List
        itemLayout='horizontal'
        dataSource={users}
        renderItem={(user: User) => (
          <AntList.Item
            actions={[
              <Button icon={<EditOutlined />} onClick={() => onEditUser(user)}>
                Edit
              </Button>,
            ]}
          >
            <AntList.Item.Meta
              avatar={<Avatar>{user.icon}</Avatar>}
              title={user.name}
              description={`${user.about} - ${user.birthday}`}
            />
          </AntList.Item>
        )}
      />
    </>
  )
}

export default UserList
