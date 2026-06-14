import { useState, useEffect, useCallback } from 'react'
import { derivService } from '@/services/deriv'

export function useDerivWS() {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    return () => {
      derivService.disconnect()
    }
  }, [])

  const connect = useCallback(async (token: string) => {
    try {
      await derivService.connect(token)
      setIsConnected(true)
    } catch {
      setIsConnected(false)
      throw new Error('Failed to connect')
    }
  }, [])

  return { isConnected, connect }
}
