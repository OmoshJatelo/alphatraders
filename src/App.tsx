import { useState } from 'react'
import { useAppStore } from '@/store'
import { useAuth } from '@/hooks'
import { Sidebar } from '@/components/Layout/Sidebar'
import { Dashboard } from '@/components/Dashboard'
import { BotBuilder } from '@/components/BotBuilder'
import { QuickStrategy } from '@/components/QuickStrategy'
import { Strategies } from '@/components/Strategies'
import { Markets } from '@/components/Markets'
import { Reports } from '@/components/Reports'
import { Tutorials } from '@/components/Help'
import { Settings } from '@/components/Settings'
import { PwaInstallPrompt } from '@/components/PWA'
import { LoadingScreen, LoginScreen, LiveChat, NotificationContainer } from '@/components/Common'

export default function App() {
  const { isInitialized, isBotRunning } = useAppStore()
  const { isLoading, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')

  if (!isInitialized) return <LoadingScreen />
  if (isLoading) return <LoadingScreen />
  if (!isAuthenticated) return <LoginScreen />

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />
      case 'bot-builder': return <BotBuilder />
      case 'quick-strategy': return <QuickStrategy />
      case 'strategies': return <Strategies />
      case 'markets': return <Markets />
      case 'reports': return <Reports />
      case 'tutorials': return <Tutorials />
      case 'settings': return <Settings />
      default: return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0b0e11]">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-full">
          {renderContent()}
        </div>
      </main>
      <PwaInstallPrompt />
      <LiveChat />
      <NotificationContainer />
      {isBotRunning && (
        <div className="fixed bottom-4 left-64 right-4 z-40 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00c853]/10 border border-[#00c853]/30 rounded-lg max-w-xs">
            <div className="w-2 h-2 bg-[#00c853] rounded-full animate-pulse" />
            <span className="text-xs text-[#00c853]">Bot is running</span>
          </div>
        </div>
      )}
    </div>
  )
}
