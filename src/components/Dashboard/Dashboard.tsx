import { useAppStore } from '@/store'

export function Dashboard() {
  const { currentAccount, tradeHistory, isBotRunning } = useAppStore()

  const totalTrades = tradeHistory.length
  const wins = tradeHistory.filter((t) => t.status === 'won').length
  const losses = tradeHistory.filter((t) => t.status === 'lost').length
  const winRate = totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(1) : '0.0'
  const totalPnl = tradeHistory.reduce((sum, t) => sum + (t.profit_loss || 0), 0)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#e6e9ef] mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4">
          <div className="text-xs text-[#8a8f9a] mb-1">Balance</div>
          <div className="text-xl font-bold text-[#e6e9ef]">
            {currentAccount ? `${currentAccount.balance.toFixed(2)} ${currentAccount.currency}` : '—'}
          </div>
        </div>

        <div className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4">
          <div className="text-xs text-[#8a8f9a] mb-1">Profit / Loss</div>
          <div className={`text-xl font-bold ${totalPnl >= 0 ? 'text-[#00c853]' : 'text-[#ff444f]'}`}>
            {totalPnl >= 0 ? '+' : ''}{totalPnl.toFixed(2)}
          </div>
        </div>

        <div className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4">
          <div className="text-xs text-[#8a8f9a] mb-1">Total Trades</div>
          <div className="text-xl font-bold text-[#e6e9ef]">{totalTrades}</div>
        </div>

        <div className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4">
          <div className="text-xs text-[#8a8f9a] mb-1">Win Rate</div>
          <div className="text-xl font-bold text-[#e6e9ef]">{winRate}%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4">
          <h2 className="text-sm font-semibold text-[#e6e9ef] mb-3">Bot Status</h2>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isBotRunning ? 'bg-[#00c853] animate-pulse' : 'bg-[#6f7381]'}`} />
            <span className={`text-sm ${isBotRunning ? 'text-[#00c853]' : 'text-[#8a8f9a]'}`}>
              {isBotRunning ? 'Running' : 'Idle'}
            </span>
          </div>
          {!isBotRunning && (
            <p className="text-xs text-[#6f7381] mt-2">Start a strategy from the Bot Builder or Quick Strategy tab.</p>
          )}
        </div>

        <div className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4">
          <h2 className="text-sm font-semibold text-[#e6e9ef] mb-3">Active Contracts</h2>
          <div className="text-xs text-[#8a8f9a]">No active contracts</div>
        </div>
      </div>

      <div className="mt-6 bg-[#1e222d] border border-[#2e313d] rounded-lg p-4">
        <h2 className="text-sm font-semibold text-[#e6e9ef] mb-3">Recent Trades</h2>
        {tradeHistory.length === 0 ? (
          <div className="text-xs text-[#6f7381] py-4 text-center">No trades yet. Start a bot to see results here.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[#8a8f9a] border-b border-[#2e313d]">
                  <th className="text-left py-2 px-2">Contract</th>
                  <th className="text-left py-2 px-2">Symbol</th>
                  <th className="text-right py-2 px-2">Profit/Loss</th>
                  <th className="text-right py-2 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {tradeHistory.slice(0, 10).map((trade) => (
                  <tr key={trade.contract_id} className="border-b border-[#2e313d]/50">
                    <td className="py-2 px-2 text-[#e6e9ef]">{trade.contract_type}</td>
                    <td className="py-2 px-2 text-[#8a8f9a]">{trade.symbol}</td>
                    <td className={`py-2 px-2 text-right ${trade.profit_loss >= 0 ? 'text-[#00c853]' : 'text-[#ff444f]'}`}>
                      {trade.profit_loss.toFixed(2)}
                    </td>
                    <td className={`py-2 px-2 text-right ${trade.status === 'won' ? 'text-[#00c853]' : trade.status === 'lost' ? 'text-[#ff444f]' : 'text-[#ffa726]'}`}>
                      {trade.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
