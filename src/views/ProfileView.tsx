import { useRef, useState, type ChangeEvent } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export function ProfileView() {
  const { user, updateProfile, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState(user?.name ?? '')
  const [phone, setPhone] = useState(user?.phone ?? '')
  const [saved, setSaved] = useState(false)

  if (!user) return null

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateProfile({ avatarDataUrl: reader.result })
      }
    }
    reader.readAsDataURL(file)
  }

  function handleSave() {
    updateProfile({ name: name.trim() || user!.name, phone: phone.trim() })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="profile-view">
      <div className="profile-view__header">
        <button
          type="button"
          className="profile-view__avatar"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Change profile photo"
        >
          {user.avatarDataUrl ? (
            <img src={user.avatarDataUrl} alt="" />
          ) : (
            <span>{initials}</span>
          )}
          <span className="profile-view__avatar-edit">Edit</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleAvatarChange}
        />
        <div>
          <h2>{user.name}</h2>
          <p className="profile-view__email">{user.email}</p>
        </div>
      </div>

      <div className="profile-view__form">
        <label className="auth-field">
          <span>Full name</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="auth-field">
          <span>Phone (for emergency contact)</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. +91 98765 43210"
          />
        </label>
        <button type="button" className="profile-view__save" onClick={handleSave}>
          {saved ? 'Saved ✓' : 'Save changes'}
        </button>
      </div>

      <div className="profile-view__row">
        <span>Appearance</span>
        <button type="button" className="profile-view__theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '🌙 Dark mode' : '☀️ Light mode'} · Tap to switch
        </button>
      </div>

      <button type="button" className="profile-view__logout" onClick={logout}>
        Log out
      </button>
    </div>
  )
}
