import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AppUser, StoredAccount } from '../types/auth'

const ACCOUNTS_KEY = 'rakshasetu_accounts'
const SESSION_KEY = 'rakshasetu_session_user_id'

function obfuscate(value: string): string {
  // Demo-only reversible obfuscation, NOT cryptographic hashing.
  return typeof window === 'undefined' ? value : window.btoa(unescape(encodeURIComponent(value)))
}

function readAccounts(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY)
    return raw ? (JSON.parse(raw) as StoredAccount[]) : []
  } catch {
    return []
  }
}

function writeAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

function toPublicUser(account: StoredAccount): AppUser {
  const { passwordObfuscated: _passwordObfuscated, ...publicUser } = account
  return publicUser
}

interface AuthContextValue {
  user: AppUser | null
  isReady: boolean
  register: (name: string, email: string, password: string) => { ok: true } | { ok: false; error: string }
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string }
  logout: () => void
  updateProfile: (patch: Partial<Pick<AppUser, 'name' | 'phone' | 'avatarDataUrl'>>) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const sessionId = localStorage.getItem(SESSION_KEY)
    if (sessionId) {
      const account = readAccounts().find((a) => a.id === sessionId)
      if (account) setUser(toPublicUser(account))
    }
    setIsReady(true)
  }, [])

  const register = useCallback((name: string, email: string, password: string) => {
    const trimmedEmail = email.trim().toLowerCase()
    if (!name.trim()) return { ok: false as const, error: 'Please enter your name.' }
    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) return { ok: false as const, error: 'Please enter a valid email.' }
    if (password.length < 6) return { ok: false as const, error: 'Password must be at least 6 characters.' }

    const accounts = readAccounts()
    if (accounts.some((a) => a.email.toLowerCase() === trimmedEmail)) {
      return { ok: false as const, error: 'An account with this email already exists.' }
    }

    const newAccount: StoredAccount = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: trimmedEmail,
      passwordObfuscated: obfuscate(password),
      createdAt: new Date().toISOString(),
    }
    writeAccounts([...accounts, newAccount])
    localStorage.setItem(SESSION_KEY, newAccount.id)
    setUser(toPublicUser(newAccount))
    return { ok: true as const }
  }, [])

  const login = useCallback((email: string, password: string) => {
    const trimmedEmail = email.trim().toLowerCase()
    const accounts = readAccounts()
    const account = accounts.find((a) => a.email.toLowerCase() === trimmedEmail)
    if (!account || account.passwordObfuscated !== obfuscate(password)) {
      return { ok: false as const, error: 'Incorrect email or password.' }
    }
    localStorage.setItem(SESSION_KEY, account.id)
    setUser(toPublicUser(account))
    return { ok: true as const }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }, [])

  const updateProfile = useCallback(
    (patch: Partial<Pick<AppUser, 'name' | 'phone' | 'avatarDataUrl'>>) => {
      setUser((current) => {
        if (!current) return current
        const accounts = readAccounts()
        const updatedAccounts = accounts.map((a) =>
          a.id === current.id ? { ...a, ...patch } : a,
        )
        writeAccounts(updatedAccounts)
        return { ...current, ...patch }
      })
    },
    [],
  )

  const value = useMemo(
    () => ({ user, isReady, register, login, logout, updateProfile }),
    [user, isReady, register, login, logout, updateProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
