import { derivService } from './deriv'

export class AuthService {
  private static instance: AuthService
  private readonly redirectUri: string

  private constructor() {
    this.redirectUri = `${window.location.origin}/oauth/callback`
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  getLoginUrl(): string {
    return derivService.getAuthUrl(this.redirectUri)
  }

  async handleOAuthCallback(): Promise<{ token: string } | null> {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token1')
    const acct1 = params.get('acct1')

    if (token) {
      return { token }
    }

    return null
  }

  async authenticateWithToken(token: string) {
    await derivService.connect(token)
    const authResponse = await derivService.authorize(token)
    return authResponse
  }

  logout() {
    derivService.disconnect()
    window.location.href = '/'
  }
}

export const authService = AuthService.getInstance()
