import { derivService } from './deriv'

export class AuthService {
  private static instance: AuthService
  private readonly redirectUri: string

  private constructor() {
    this.redirectUri = `${window.location.origin}/`
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

  handleOAuthCallback(): { token: string } | null {
    const params = new URLSearchParams(window.location.search)
    const hashParams = new URLSearchParams(window.location.hash.replace('#', '?'))

    const token = params.get('token1') ?? params.get('token') ?? hashParams.get('token1') ?? hashParams.get('token')

    if (token) {
      localStorage.setItem('deriv_token', token)
      window.history.replaceState({}, document.title, window.location.origin + window.location.pathname)
      return { token }
    }

    const stored = localStorage.getItem('deriv_token')
    if (stored) {
      return { token: stored }
    }

    return null
  }

  async authenticateWithToken(token: string) {
    await derivService.connect()
    const authResponse = await derivService.authorize(token)
    return authResponse
  }

  logout() {
    localStorage.removeItem('deriv_token')
    derivService.disconnect()
    window.location.href = '/'
  }
}

export const authService = AuthService.getInstance()
