import { useState, type FormEvent } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { GoogleMark } from '../components/GoogleMark'
import tasksIllustration from '../assets/undraw-tasks.svg'
import { getFirebaseAuth, isFirebaseConfigured } from '../lib/firebase'

function getAuthMessage(error: unknown) {
  const code = typeof error === 'object' && error && 'code' in error
    ? String(error.code)
    : ''

  if (code === 'auth/popup-closed-by-user') return 'The Google sign-in window was closed before completion.'
  if (code === 'auth/popup-blocked') return 'Your browser blocked the Google sign-in window. Allow popups and try again.'
  if (code === 'auth/unauthorized-domain') return 'This domain is not authorized in Firebase Authentication.'

  return 'Google sign-in failed. Please try again.'
}

export function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [formMessage, setFormMessage] = useState('')
  const [authError, setAuthError] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)

  const validateField = (name: 'email' | 'password', value: string) => {
    if (!value.trim()) return name === 'email' ? 'Enter your email address.' : 'Enter your password.'
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.'
    if (name === 'password' && value.length < 8) return 'Password must be at least 8 characters.'
    return ''
  }

  const updateField = (name: 'email' | 'password', value: string) => {
    setValues((current) => ({ ...current, [name]: value }))
    setFormMessage('')
    if (errors[name]) setErrors((current) => ({ ...current, [name]: validateField(name, value) }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = {
      email: validateField('email', values.email),
      password: validateField('password', values.password),
    }

    setErrors(nextErrors)

    if (nextErrors.email || nextErrors.password) {
      setFormMessage('Check the highlighted fields and try again.')
      return
    }

    setFormMessage('Your details are valid. No password login is connected for this assessment.')
  }

  const handleGoogleSignIn = async () => {
    setAuthError('')

    if (!isFirebaseConfigured) {
      setAuthError('Add your Firebase configuration to a local .env file before using Google sign-in.')
      return
    }

    setIsSigningIn(true)

    try {
      const [{ GoogleAuthProvider, signInWithPopup }, auth] = await Promise.all([
        import('firebase/auth'),
        getFirebaseAuth(),
      ])

      if (!auth) throw new Error('Firebase is not configured.')

      const result = await signInWithPopup(auth, new GoogleAuthProvider())
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const accessToken = credential?.accessToken ?? await result.user.getIdToken()

      navigate('/token', {
        replace: true,
        state: {
          accessToken,
          displayName: result.user.displayName,
          email: result.user.email,
        },
      })
    } catch (error) {
      setAuthError(getAuthMessage(error))
    } finally {
      setIsSigningIn(false)
    }
  }

  return (
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
              value={values.email}
              error={Boolean(errors.email)}
              helperText={errors.email}
              onChange={(event) => updateField('email', event.target.value)}
              onBlur={(event) => setErrors((current) => ({ ...current, email: validateField('email', event.target.value) }))}
              slotProps={{ htmlInput: { 'aria-label': 'Email address' } }}
            />
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={values.password}
              error={Boolean(errors.password)}
              helperText={errors.password}
              onChange={(event) => updateField('password', event.target.value)}
              onBlur={(event) => setErrors((current) => ({ ...current, password: validateField('password', event.target.value) }))}
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
          <Typography
            className={`form-message ${errors.email || errors.password ? 'error' : ''}`}
            component="p"
            aria-live="polite"
          >
            {formMessage}
          </Typography>

          <div className="divider" aria-hidden="true">
            <span />
            <Typography component="p">or continue with</Typography>
            <span />
          </div>

          <Button
            className="google-button"
            type="button"
            variant="outlined"
            startIcon={isSigningIn ? <CircularProgress size={20} /> : <GoogleMark />}
            onClick={handleGoogleSignIn}
            disabled={isSigningIn}
          >
            {isSigningIn ? 'Connecting…' : 'Continue with Google'}
          </Button>
          <Typography className="auth-error" component="p" aria-live="polite">{authError}</Typography>

          <Typography className="register-copy" component="p">
            New here? <Link href="#" underline="hover">Create an account</Link>
          </Typography>
        </Box>
      </section>

      <aside className="visual-panel" aria-label="Productivity illustration">
        <div className="visual-badge"><span />Your calm workspace</div>
        <img
          className="productivity-illustration"
          src={tasksIllustration}
          alt="A person organizing a list of tasks"
        />
        <div className="visual-copy">
          <div className="carousel-dots" aria-hidden="true"><span /><span /><span className="active" /></div>
          <Typography component="h2">Make your work easier,<br />one task at a time.</Typography>
        </div>
      </aside>
    </main>
  )
}
