import { useEffect, useState } from 'react'
import { authService } from '@/services/auth'
import { useAppStore } from '@/store'
import type { DerivAccount } from '@/types'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true)
  const { setAuth, isAuthenticated } = useAppStore()

  useEffect(() => {
    const handleCallback = async () => {
      const result = await authService.handleOAuthCallback()
      if (result) {
        try {
          const authData = await authService.authenticateWithToken(result.token)
          const accounts: DerivAccount[] = authData.authorize.account_list.map(
            (acc: any) => ({
              loginid: acc.loginid,
              currency: acc.currency,
              balance: 0,
              is_virtual: acc.is_virtual,
              account_type: acc.account_type,
              landing_company_name: acc.landing_company_name,
            })
          )
          const current: DerivAccount = {
            loginid: authData.authorize.loginid,
            currency: authData.authorize.currency,
            balance: authData.authorize.balance,
            email: authData.authorize.email,
            fullname: authData.authorize.fullname,
            is_virtual: authData.authorize.is_virtual,
            account_type: authData.authorize.account_type,
            landing_company_name: authData.authorize.landing_company_name,
          }
          setAuth(result.token, accounts, current)
        } catch (err) {
          console.error('Auth failed:', err)
        }
      }
      setIsLoading(false)
    }

    handleCallback()
  }, [setAuth])

  const login = () => {
    window.location.href = authService.getLoginUrl()
  }

  return { isLoading, isAuthenticated, login }
}
