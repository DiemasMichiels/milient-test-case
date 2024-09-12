import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { ConfigProvider, theme } from 'antd'

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { token } = theme.useToken()

  const combinedTheme = {
    antd: token,
    color: {
      brand: '#4a25aa',
    },
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: combinedTheme.color.brand,
        },
      }}
    >
      <StyledThemeProvider theme={combinedTheme}>
        {children}
      </StyledThemeProvider>
    </ConfigProvider>
  )
}

export default ThemeProvider
