import { useEffect, useState } from 'react'
import { useAppStore } from '@/store'

const loadingMessages = [
  '1-Tick Execution',
  'Multi-Market Sync',
  'Layered Risk Management',
  'AI Strategy Optimization',
  'Real-Time Data Pipeline',
  'Secure Connection Established',
]

export function LoadingScreen() {
  const { setInitialized, loadingMessage, setLoadingMessage, setLoadingProgress, loadingProgress } = useAppStore()
  const [dots, setDots] = useState('')

  useEffect(() => {
    const msgInterval = setInterval(() => {
      const currentIdx = loadingMessages.indexOf(loadingMessage)
      const next = (currentIdx + 1) % loadingMessages.length
      setLoadingMessage(loadingMessages[next])
    }, 800)

    const progressInterval = setInterval(() => {
      setLoadingProgress(Math.min(100, loadingProgress + Math.random() * 15))
    }, 600)

    const finish = setTimeout(() => {
      setLoadingProgress(100)
      setTimeout(() => setInitialized(true), 300)
    }, 5000)

    return () => {
      clearInterval(msgInterval)
      clearInterval(progressInterval)
      clearTimeout(finish)
    }
  }, [loadingMessage, loadingProgress, setInitialized, setLoadingMessage, setLoadingProgress])

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'))
    }, 400)
    return () => clearInterval(dotInterval)
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0b0e11] z-50">
      <div className="relative mb-12">
        <div className="w-20 h-20 border-4 border-[#06b2d6]/20 border-t-[#06b2d6] rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-[#06b2d6] rounded-full animate-pulse" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-[#06b2d6] mb-2">ALPHATRADERS</h1>
      <p className="text-[#8a8f9a] text-sm mb-8">Initializing{dots}</p>

      <div className="w-64 mb-4">
        <div className="h-1 bg-[#1e222d] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#06b2d6] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(100, loadingProgress)}%` }}
          />
        </div>
      </div>

      <p className="text-[#8a8f9a] text-xs font-mono">{loadingMessage}</p>
    </div>
  )
}
