import { useState, useEffect } from 'react'
import { User, Settings, LogOut } from 'lucide-react'
import { apiFetch } from '../api/client'

interface UserProfile {
  id: string; username: string; email: string
  display_name?: string; avatar_url?: string; bio?: string; created_at: string
}

export function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [token, setToken] = useState(() => localStorage.getItem('auth_token'))

  useEffect(() => {
    if (!token) return
    apiFetch<UserProfile>('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(setProfile).catch(() => setToken(null))
  }, [token])

  if (!token) {
    return <LoginForm onLogin={(t) => { localStorage.setItem('auth_token', t); setToken(t) }} />
  }

  if (!profile) return <div className="p-4">Loading...</div>

  return (
    <div className="p-4">
      <h1 className="text-base font-bold text-text mb-4">Profile</h1>
      <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-surface border border-border-light">
        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
          {profile.avatar_url
            ? <img src={profile.avatar_url} className="w-14 h-14 rounded-full" alt="" />
            : <User className="w-6 h-6 text-accent" />}
        </div>
        <div>
          <p className="text-base font-semibold text-text">{profile.display_name || profile.username}</p>
          <p className="text-sm text-text-secondary">@{profile.username}</p>
          {profile.bio && <p className="text-xs text-text-muted mt-1">{profile.bio}</p>}
        </div>
      </div>
      <button
        onClick={() => { localStorage.removeItem('auth_token'); setToken(null) }}
        className="flex items-center gap-2 text-sm text-red-500 p-2"
      >
        <LogOut className="w-4 h-4" /> Sign Out
      </button>
    </div>
  )
}

function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login'
      const body = isRegister ? { username, email, password } : { username, password }
      const res = await apiFetch<{ token: string }>(endpoint, {
        method: 'POST', body: JSON.stringify(body)
      })
      onLogin(res.token)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="p-4 max-w-sm mx-auto mt-12">
      <h1 className="text-lg font-bold text-text mb-6 text-center">
        {isRegister ? 'Create Account' : 'Sign In'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}
          className="w-full p-2 rounded-lg bg-surface border border-border-light text-text text-sm"
        />
        {isRegister && (
          <input
            placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full p-2 rounded-lg bg-surface border border-border-light text-text text-sm"
          />
        )}
        <input
          placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}
          className="w-full p-2 rounded-lg bg-surface border border-border-light text-text text-sm"
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button type="submit" className="w-full p-2 rounded-lg bg-accent text-white text-sm font-medium">
          {isRegister ? 'Register' : 'Sign In'}
        </button>
        <button type="button" onClick={() => setIsRegister(!isRegister)}
          className="w-full text-xs text-accent text-center">
          {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
        </button>
      </form>
    </div>
  )
}
