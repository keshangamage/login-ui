import { useState } from 'react'
import { ArrowBackRounded, CheckRounded, ContentCopyRounded } from '@mui/icons-material'
import { Button, IconButton, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

type TokenState = {
  accessToken?: string
  displayName?: string | null
  email?: string | null
}

export function TokenPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { accessToken, displayName, email } = (state ?? {}) as TokenState
  const [copied, setCopied] = useState(false)

  const copyToken = async () => {
    if (!accessToken) return
    await navigator.clipboard.writeText(accessToken)
    setCopied(true)
  }

  if (!accessToken) {
    return (
      <main className="token-shell">
        <section className="token-card token-empty">
          <div className="token-icon">!</div>
          <Typography component="h1">No access token found</Typography>
          <Typography component="p">Sign in with Google first to view your token.</Typography>
          <Button variant="contained" onClick={() => navigate('/')}>Return to login</Button>
        </section>
      </main>
    )
  }

  return (
    <main className="token-shell">
      <section className="token-card" aria-labelledby="token-title">
        <Button className="back-button" startIcon={<ArrowBackRounded />} onClick={() => navigate('/')}>Back to login</Button>
        <div className="success-mark"><CheckRounded /></div>
        <Typography component="p" className="token-eyebrow">Google authentication complete</Typography>
        <Typography component="h1" id="token-title">Welcome{displayName ? `, ${displayName}` : ''}.</Typography>
        {email && <Typography component="p" className="token-email">{email}</Typography>}

        <div className="token-output">
          <div className="token-output-header">
            <Typography component="h2">Access token</Typography>
            <IconButton aria-label="Copy access token" onClick={copyToken}>
              {copied ? <CheckRounded /> : <ContentCopyRounded />}
            </IconButton>
          </div>
          <code>{accessToken}</code>
        </div>
      </section>
    </main>
  )
}
