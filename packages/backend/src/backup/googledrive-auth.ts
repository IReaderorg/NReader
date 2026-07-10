import type { SqliteSettingsRepository } from '@ireader/storage'

const GOOGLE_OAUTH_URL = 'https://oauth2.googleapis.com'
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file'
const USERINFO_SCOPE = 'https://www.googleapis.com/auth/userinfo.email'

export interface GoogleDriveTokens {
  accessToken: string
  refreshToken: string
  expiryDate: number // epoch ms
  email?: string
}

export class GoogleDriveAuth {
  constructor(
    private settingsRepo: SqliteSettingsRepository,
    private clientId: string,
    private clientSecret: string,
    private redirectUri: string,
  ) {}

  getAuthUrl(): string {
    const url = new URL(`${GOOGLE_OAUTH_URL}/auth`)
    url.searchParams.set('client_id', this.clientId)
    url.searchParams.set('redirect_uri', this.redirectUri)
    url.searchParams.set('response_type', 'code')
    url.searchParams.set('scope', `${DRIVE_SCOPE} ${USERINFO_SCOPE}`)
    url.searchParams.set('access_type', 'offline')
    url.searchParams.set('prompt', 'consent')
    return url.toString()
  }

  async handleCallback(code: string): Promise<GoogleDriveTokens> {
    const res = await fetch(`${GOOGLE_OAUTH_URL}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUri,
        grant_type: 'authorization_code',
      }),
    })
    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Google OAuth token exchange failed: ${res.status} ${body}`)
    }
    const data = await res.json() as {
      access_token: string
      refresh_token?: string
      expires_in: number
    }

    const tokens: GoogleDriveTokens = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token ?? '',
      expiryDate: Date.now() + data.expires_in * 1000,
    }

    // Fetch user email
    try {
      const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      })
      if (userRes.ok) {
        const userData = await userRes.json() as { email: string }
        tokens.email = userData.email
      }
    } catch { /* email is optional */ }

    await this.saveTokens(tokens)
    return tokens
  }

  async refreshToken(): Promise<string> {
    const tokens = await this.loadTokens()
    if (!tokens?.refreshToken) throw new Error('No refresh token available')

    const res = await fetch(`${GOOGLE_OAUTH_URL}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        refresh_token: tokens.refreshToken,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'refresh_token',
      }),
    })
    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Token refresh failed: ${res.status} ${body}`)
    }
    const data = await res.json() as { access_token: string; expires_in: number }

    tokens.accessToken = data.access_token
    tokens.expiryDate = Date.now() + data.expires_in * 1000
    await this.saveTokens(tokens)
    return tokens.accessToken
  }

  async getValidToken(): Promise<string> {
    const tokens = await this.loadTokens()
    if (!tokens?.accessToken) throw new Error('Not authenticated')

    // Refresh if expired or within 5 min of expiry
    if (Date.now() > tokens.expiryDate - 300_000) {
      return this.refreshToken()
    }
    return tokens.accessToken
  }

  async revokeToken(): Promise<void> {
    const tokens = await this.loadTokens()
    if (!tokens) return

    const token = tokens.accessToken
    await this.settingsRepo.delete('google_drive_tokens')

    try {
      await fetch(`${GOOGLE_OAUTH_URL}/revoke?token=${encodeURIComponent(token)}`, { method: 'POST' })
    } catch { /* best-effort */ }
  }

  async getStatus(): Promise<{ connected: boolean; email?: string }> {
    const tokens = await this.loadTokens()
    if (!tokens) return { connected: false }
    return { connected: true, email: tokens.email }
  }

  private async loadTokens(): Promise<GoogleDriveTokens | null> {
    const row = await this.settingsRepo.get('google_drive_tokens')
    if (!row) return null
    return row.value as GoogleDriveTokens
  }

  private async saveTokens(tokens: GoogleDriveTokens): Promise<void> {
    await this.settingsRepo.set('google_drive_tokens', tokens)
  }
}
