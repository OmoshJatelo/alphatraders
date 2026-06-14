import { useAppStore } from '@/store'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '▦' },
  { id: 'bot-builder', label: 'Bot Builder', icon: '⚙' },
  { id: 'quick-strategy', label: 'Quick Strategy', icon: '⚡' },
  { id: 'strategies', label: 'Strategies', icon: '▤' },
  { id: 'markets', label: 'Markets', icon: '📊' },
  { id: 'reports', label: 'Reports', icon: '📋' },
  { id: 'tutorials', label: 'Tutorials', icon: '?' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
]

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { currentAccount, logout } = useAppStore()

  return (
    <aside className="w-56 bg-[#1e222d] border-r border-[#2e313d] flex flex-col h-full">
      <div className="p-4 border-b border-[#2e313d]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#06b2d6]/10 flex items-center justify-center">
            <span className="text-lg font-bold text-[#06b2d6]">α</span>
          </div>
          <span className="text-[#e6e9ef] font-bold text-sm">ALPHATRADERS</span>
        </div>
      </div>

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
              activeTab === item.id
                ? 'bg-[#06b2d6]/10 text-[#06b2d6]'
                : 'text-[#8a8f9a] hover:bg-[#2a2e39] hover:text-[#e6e9ef]'
            }`}
          >
            <span className="w-5 text-center">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-[#2e313d]">
        {currentAccount && (
          <div className="mb-2 px-3 py-2 bg-[#2a2e39] rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8a8f9a]">
                {currentAccount.is_virtual ? 'Demo' : 'Real'}
              </span>
              <span className="text-[10px] text-[#6f7381]">{currentAccount.loginid}</span>
            </div>
            <div className="text-sm font-semibold text-[#e6e9ef]">
              {currentAccount.balance.toFixed(2)} {currentAccount.currency}
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full py-2 text-xs text-[#8a8f9a] hover:text-[#ff444f] transition-colors cursor-pointer"
        >
          Disconnect
        </button>
      </div>
    </aside>
  )
}
