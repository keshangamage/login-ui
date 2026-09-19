import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { TokenPage } from './pages/TokenPage'
import './App.css'

const theme = createTheme({
  typography: { fontFamily: 'Manrope Variable, Manrope, sans-serif' },
  palette: { primary: { main: '#171a18' } },
  shape: { borderRadius: 18 },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/token" element={<TokenPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
