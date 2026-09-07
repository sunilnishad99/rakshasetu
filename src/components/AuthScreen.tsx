import { useState, type FormEvent } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export function AuthScreen() {
  const { login, register } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    const result = mode === 'login' ? login(email, password) : register(name, email, password)
    if (!result.ok) setError(result.error)
  }

  return (
    <div className="auth-screen">
      <button
        type="button"
        className="auth-screen__theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <div className="auth-screen__card">
        <div className="auth-screen__brand">
          <svg viewBox="0 0 24 24" width="30" height="30" fill="none" aria-hidden="true">
            <path
              d="M3 16c2.5 2.5 4-2.5 6.5 0S13.5 13.5 16 16s4-2.5 5-1.5"
              stroke="var(--color-river-500)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M12 3l4 7H8z" fill="var(--color-danger-500)" />
          </svg>
          <div>
            <h1>RakshaSetu</h1>
            <p>Multi-Hazard Early Warning System</p>
          </div>
        </div>

        <div className="auth-screen__tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'login'}
            className={mode === 'login' ? 'is-active' : ''}
            onClick={() => {
              setMode('login')
              setError(null)
            }}
          >
            Log in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'register'}
            className={mode === 'register' ? 'is-active' : ''}
            onClick={() => {
              setMode('register')
              setError(null)
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-screen__form">
          {mode === 'register' && (
            <label className="auth-field">
              <span>Full name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sunita Sharma"
                required
                autoComplete="name"
              />
            </label>
          )}

          <label className="auth-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              minLength={6}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </label>

          {error && <p className="auth-field__error">{error}</p>}

          <button type="submit" className="auth-screen__submit">
            {mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        <p className="auth-screen__switch">
          {mode === 'login' ? (
            <>
              New here?{' '}
              <button type="button" onClick={() => setMode('register')}>
                Create an account
              </button>
            </>
          ) : (
            <>
              Already registered?{' '}
              <button type="button" onClick={() => setMode('login')}>
                Log in
              </button>
            </>
          )}
        </p>

        <p className="auth-screen__note">
          Demo authentication — your account is stored only on this device/browser.
        </p>
      </div>
    </div>
  )
}
