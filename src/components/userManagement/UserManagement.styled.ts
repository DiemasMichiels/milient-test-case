import styled from 'styled-components'
import { Layout, Typography, Flex as AntFlex } from 'antd'

const { Header: AntHeader, Content: AntContent } = Layout
const { Title } = Typography

export const Section = styled(Layout)`
  min-height: 100vh;
`

export const Header = styled(AntHeader)`
  background-color: ${({ theme }) => theme.color.brand};
`

export const Flex = styled(AntFlex)`
  height: 100%;
`

export const Content = styled(AntContent)`
  padding: 0 50px;
`

export const HeaderTitle = styled(Title)`
  && {
    color: white;
    margin: 0;
  }
`
