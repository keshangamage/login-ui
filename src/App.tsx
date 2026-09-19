import { useState, type FormEvent } from 'react'
import {
  Box,
  Button,
  CssBaseline,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material'
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import './App.css'

const theme = createTheme({
  typography: { fontFamily: 'Manrope Variable, Manrope, sans-serif' },
  palette: { primary: { main: '#171a18' } },
  shape: { borderRadius: 18 },
})

function ProductivityIllustration() {
  return (
    <svg
      className="productivity-illustration"
      viewBox="0 0 680 540"
      role="img"
      aria-label="A person calmly organizing their work"
    >
      <path className="orbit-line" d="M204 172c-25-74 59-101 82-49 21-87 132-84 148 3 34-53 115-14 88 54 70-12 88 75 35 102" />
      <circle className="orbit-dot" cx="202" cy="173" r="7" />
      <circle className="orbit-dot" cx="557" cy="282" r="7" />

      <g className="floating-card card-left">
        <rect x="56" y="86" width="117" height="96" rx="30" />
        <circle cx="114" cy="126" r="22" />
        <path d="M88 164c14-21 42-21 55 0" />
        <path d="M102 123c8-10 18-9 24 0M106 138c6 5 12 5 18 0" />
      </g>

      <g className="floating-card card-right">
        <rect x="522" y="314" width="112" height="112" rx="32" />
        <path d="M550 348h56M550 369h42M550 390h51" />
        <circle className="status-dot" cx="609" cy="391" r="8" />
      </g>

      <g className="person">
        <path className="hair" d="M316 209c10-41 70-54 102-20 28 29 10 82-24 95l-73-10c-26-16-24-45-5-65Z" />
        <ellipse className="skin" cx="367" cy="237" rx="38" ry="48" />
        <path d="M347 236h1M385 236h1M355 257c8 7 16 7 24 0" />
        <path className="shirt" d="M293 292c33-31 118-31 151 0l26 115H267l26-115Z" />
        <path className="heart" d="M346 322c0-23 37-24 37 0 0-24 38-23 38 0 0 28-38 49-38 49s-37-21-37-49Z" />
        <path className="arm" d="M294 310c-41 15-55 51-77 76-16 18-40-6-27-27l50-77" />
        <path className="arm" d="M442 310c40 14 58 45 83 69 18 17 40-9 24-29l-55-69" />
        <path className="leg" d="M303 406c-31 31-64 51-104 62 53 27 117 10 169-31" />
        <path className="leg" d="M433 406c31 31 64 51 104 62-53 27-117 10-169-31" />
      </g>

      <g className="task-card">
        <rect x="95" y="353" width="201" height="143" rx="30" />
        <text x="122" y="393">Today</text>
        <text className="task-label" x="122" y="421">4 of 5 tasks</text>
        <rect className="progress-track" x="122" y="443" width="130" height="11" rx="6" />
        <rect className="progress-value" x="122" y="443" width="104" height="11" rx="6" />
        <circle className="progress-ring" cx="255" cy="393" r="23" />
        <text className="progress-number" x="244" y="399">80</text>
      </g>
    </svg>
  )
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.55h3.24c1.9-1.75 2.98-4.33 2.98-7.42Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.98-.9 6.63-2.35l-3.24-2.55c-.9.6-2.05.96-3.39.96-2.6 0-4.81-1.76-5.6-4.13H3.05v2.63A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.4 13.93A6 6 0 0 1 6.08 12c0-.67.12-1.32.32-1.93V7.44H3.05A10 10 0 0 0 2 12c0 1.64.39 3.2 1.05 4.56l3.35-2.63Z" />
      <path fill="#EA4335" d="M12 5.94c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.63 9.63 0 0 0 12 2a10 10 0 0 0-8.95 5.44l3.35 2.63C7.19 7.7 9.4 5.94 12 5.94Z" />
    </svg>
  )
}

function App() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className="login-shell">
        <section className="form-panel" aria-labelledby="login-title">
          <Box className="form-content" component="form" onSubmit={handleSubmit} noValidate>
            <div className="intro-copy">
              <Typography component="h1" id="login-title">Welcome back!</Typography>
              <Typography component="p">Simplify your workflow and bring a little more calm to your day.</Typography>
            </div>

            <div className="fields">
              <TextField
                fullWidth
                type="email"
                name="email"
                placeholder="Email address"
                slotProps={{ htmlInput: { 'aria-label': 'Email address' } }}
              />
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                slotProps={{
                  htmlInput: { 'aria-label': 'Password' },
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          edge="end"
                          onClick={() => setShowPassword((visible) => !visible)}
                        >
                          {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Link className="forgot-link" href="#" underline="hover">Forgot password?</Link>
            </div>

            <Button className="login-button" type="submit" fullWidth variant="contained">Log in</Button>

            <div className="divider" aria-hidden="true">
              <span />
              <Typography component="p">or continue with</Typography>
              <span />
            </div>

            <Button className="google-button" type="button" variant="outlined" startIcon={<GoogleMark />}>Continue with Google</Button>

            <Typography className="register-copy" component="p">
              New here? <Link href="#" underline="hover">Create an account</Link>
            </Typography>
          </Box>
        </section>

        <aside className="visual-panel" aria-label="Productivity illustration">
          <div className="visual-badge"><span />Your calm workspace</div>
          <ProductivityIllustration />
          <div className="visual-copy">
            <div className="carousel-dots" aria-hidden="true"><span /><span /><span className="active" /></div>
            <Typography component="h2">Make your work easier,<br />one task at a time.</Typography>
          </div>
        </aside>
      </main>
    </ThemeProvider>
  )
}

export default App
