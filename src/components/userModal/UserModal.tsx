import { useEffect } from 'react'
import { Modal, Form, Input, DatePicker, Button } from 'antd'
import type { User } from 'src/types/User'
import dayjs from 'dayjs'

type Props = {
  visible: boolean
  user: User | null
  onCancel: () => void
  onAddUser: (user: User) => void
  onUpdateUser: (user: User) => void
  onDeleteUser: (userId: number) => void
}

const UserModal = ({
  visible,
  user,
  onCancel,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
}: Props) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user,
        birthday: dayjs(user.birthday),
      })
    } else {
      form.resetFields()
    }
  }, [user, form])

  const handleOk = () => {
    form.validateFields().then((values) => {
      const userData = {
        ...values,
        birthday: values.birthday.format('MMMM D, YYYY'),
        id: user ? user.id : 0,
      }

      if (user) {
        onUpdateUser(userData)
      } else {
        onAddUser(userData)
      }

      onCancel()
    })
  }

  const handleDelete = () => {
    if (user) {
      onDeleteUser(user.id)
      onCancel()
    }
  }

  return (
    <Modal
      forceRender
      title={user ? 'Edit User' : 'Add User'}
      open={visible}
      onCancel={onCancel}
      footer={[
        user && (
          <Button key='delete' danger onClick={handleDelete}>
            Delete
          </Button>
        ),
        <Button key='cancel' onClick={onCancel}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={handleOk}>
          {user ? 'Update' : 'Add'}
        </Button>,
      ]}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please input the name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='icon'
          label='Icon'
          rules={[{ required: true, message: 'Please input the icon' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='birthday'
          label='Birthday'
          rules={[{ required: true, message: 'Please select the birthday' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name='about'
          label='About'
          rules={[{ required: true, message: 'Please input the about info' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UserModal
