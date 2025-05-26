import { Game } from './pages'
import { Header, Modals } from './components'
import { useTheme } from './hooks'
import './styles/app.scss'

function App() {
  useTheme()

  return (
    <>
      <Header />
      <Game />
      <Modals />
    </>
  )
}

export default App
