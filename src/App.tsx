import ThemeProvider from './styles/ThemeProvider'
import GlobalStyles from './styles/GlobalStyles'
import UserManagement from './components/userManagement/UserManagement'

const App = () => (
  <ThemeProvider>
    <GlobalStyles />
    <UserManagement />
  </ThemeProvider>
)

export default App
