export interface AppUser {
  id: string
  name: string
  email: string
  phone?: string
  avatarDataUrl?: string
  createdAt: string
}

export interface StoredAccount extends AppUser {
  /**
   * NOTE: this is a demo-only client-side auth system with no backend.
   * The "password" is stored obfuscated (not real hashing) purely so the
   * demo doesn't keep it in plain text in localStorage. Do NOT use this
   * approach for a real product — wire up a real auth provider / backend
   * (e.g. Firebase Auth, Auth0, or your own API) before handling real users.
   */
  passwordObfuscated: string
}
