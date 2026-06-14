import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const result = await deferredPrompt.userChoice
    if (result.outcome === 'accepted') setShowPrompt(false)
    setDeferredPrompt(null)
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-[#1e222d] border border-[#2e313d] rounded-lg p-4 shadow-lg max-w-xs">
      <p className="text-sm text-[#e6e9ef] mb-2">Install Alphatraders</p>
      <p className="text-xs text-[#8a8f9a] mb-3">Install our app for a better experience</p>
      <div className="flex gap-2">
        <button
          onClick={handleInstall}
          className="flex-1 py-2 text-xs bg-[#06b2d6] text-white rounded-lg hover:bg-[#0598b8] transition-colors cursor-pointer"
        >
          Install
        </button>
        <button
          onClick={() => setShowPrompt(false)}
          className="py-2 px-3 text-xs bg-[#2a2e39] text-[#8a8f9a] rounded-lg hover:bg-[#3a3e49] transition-colors cursor-pointer"
        >
          Later
        </button>
      </div>
    </div>
  )
}
