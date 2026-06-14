import { useAppStore } from '@/store'

export function Settings() {
  const { theme, setTheme, currentAccount, logout } = useAppStore()

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-[#e6e9ef] mb-6">Settings</h1>

      <div className="space-y-4">
        <div className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4">
          <h2 className="text-sm font-semibold text-[#e6e9ef] mb-3">Appearance</h2>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8a8f9a]">Theme</span>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme('dark')}
                className={`px-4 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-[#06b2d6] text-white'
                    : 'bg-[#2a2e39] text-[#8a8f9a] hover:bg-[#3a3e49]'
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`px-4 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                  theme === 'light'
                    ? 'bg-[#06b2d6] text-white'
                    : 'bg-[#2a2e39] text-[#8a8f9a] hover:bg-[#3a3e49]'
                }`}
              >
                Light
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4">
          <h2 className="text-sm font-semibold text-[#e6e9ef] mb-3">Account</h2>
          {currentAccount && (
            <div className="text-xs text-[#8a8f9a] space-y-1">
              <p>Login ID: <span className="text-[#e6e9ef]">{currentAccount.loginid}</span></p>
              <p>Currency: <span className="text-[#e6e9ef]">{currentAccount.currency}</span></p>
              <p>Type: <span className="text-[#e6e9ef]">{currentAccount.is_virtual ? 'Demo' : 'Real'}</span></p>
              {currentAccount.email && <p>Email: <span className="text-[#e6e9ef]">{currentAccount.email}</span></p>}
            </div>
          )}
          <button
            onClick={logout}
            className="mt-3 px-4 py-2 text-xs bg-[#ff444f]/10 text-[#ff444f] rounded-lg hover:bg-[#ff444f]/20 transition-colors cursor-pointer"
          >
            Disconnect Account
          </button>
        </div>

        <div className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4">
          <h2 className="text-sm font-semibold text-[#e6e9ef] mb-3">Bot Preferences</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8a8f9a]">Default Stake Amount</span>
              <input
                type="number"
                defaultValue={1}
                className="w-24 px-3 py-1.5 bg-[#2a2e39] border border-[#2e313d] rounded text-xs text-[#e6e9ef] text-right focus:outline-none focus:border-[#06b2d6]"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8a8f9a]">Default Contract Duration</span>
              <input
                type="number"
                defaultValue={1}
                className="w-24 px-3 py-1.5 bg-[#2a2e39] border border-[#2e313d] rounded text-xs text-[#e6e9ef] text-right focus:outline-none focus:border-[#06b2d6]"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4">
          <h2 className="text-sm font-semibold text-[#e6e9ef] mb-1">About Alphatraders</h2>
          <p className="text-xs text-[#8a8f9a]">Version 1.0.0</p>
          <p className="text-xs text-[#6f7381] mt-2">
            Alphatraders is an automated trading platform for Deriv. Build, test, and run trading bots with ease.
          </p>
        </div>
      </div>
    </div>
  )
}
