import styled from 'styled-components'
import { List as AntList, Button } from 'antd'
import type { User } from 'src/types/User'

export const List = styled(AntList<User>)`
  background-color: white;
  padding: 8px 24px;
  border-radius: 8px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
`

export const AddUserButton = styled(Button)`
  margin: 16px 0;
`
