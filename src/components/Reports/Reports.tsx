import { useAppStore } from '@/store'

export function Reports() {
  const { tradeHistory } = useAppStore()
  const totalPnl = tradeHistory.reduce((sum, t) => sum + (t.profit_loss || 0), 0)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#e6e9ef] mb-6">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4">
          <div className="text-xs text-[#8a8f9a] mb-1">Total P&L</div>
          <div className={`text-lg font-bold ${totalPnl >= 0 ? 'text-[#00c853]' : 'text-[#ff444f]'}`}>
            {totalPnl.toFixed(2)}
          </div>
        </div>
        <div className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4">
          <div className="text-xs text-[#8a8f9a] mb-1">Total Contracts</div>
          <div className="text-lg font-bold text-[#e6e9ef]">{tradeHistory.length}</div>
        </div>
        <div className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4">
          <div className="text-xs text-[#8a8f9a] mb-1">Active Contracts</div>
          <div className="text-lg font-bold text-[#ffa726]">{tradeHistory.filter((t) => t.status === 'open').length}</div>
        </div>
      </div>

      <div className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4">
        <h2 className="text-sm font-semibold text-[#e6e9ef] mb-3">Contract History</h2>
        {tradeHistory.length === 0 ? (
          <div className="text-xs text-[#6f7381] py-4 text-center">No contracts yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[#8a8f9a] border-b border-[#2e313d]">
                  <th className="text-left py-2 px-2">Date</th>
                  <th className="text-left py-2 px-2">Reference</th>
                  <th className="text-left py-2 px-2">Symbol</th>
                  <th className="text-left py-2 px-2">Type</th>
                  <th className="text-right py-2 px-2">Buy Price</th>
                  <th className="text-right py-2 px-2">Sell Price</th>
                  <th className="text-right py-2 px-2">Profit/Loss</th>
                  <th className="text-right py-2 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {tradeHistory.map((t) => (
                  <tr key={t.contract_id} className="border-b border-[#2e313d]/50">
                    <td className="py-2 px-2 text-[#8a8f9a]">{new Date(t.entry_time).toLocaleDateString()}</td>
                    <td className="py-2 px-2 text-[#6f7381] font-mono">{t.contract_id}</td>
                    <td className="py-2 px-2 text-[#e6e9ef]">{t.symbol}</td>
                    <td className="py-2 px-2 text-[#8a8f9a]">{t.contract_type}</td>
                    <td className="py-2 px-2 text-right text-[#e6e9ef]">{t.entry_price.toFixed(2)}</td>
                    <td className="py-2 px-2 text-right text-[#e6e9ef]">{t.exit_price?.toFixed(2) || '—'}</td>
                    <td className={`py-2 px-2 text-right ${t.profit_loss >= 0 ? 'text-[#00c853]' : 'text-[#ff444f]'}`}>
                      {t.profit_loss.toFixed(2)}
                    </td>
                    <td className={`py-2 px-2 text-right ${
                      t.status === 'won' ? 'text-[#00c853]' : t.status === 'lost' ? 'text-[#ff444f]' : 'text-[#ffa726]'
                    }`}>
                      {t.status}
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
