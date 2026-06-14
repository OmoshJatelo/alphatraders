import { useAppStore } from '@/store'

export function Strategies() {
  const { savedStrategies, deleteStrategy } = useAppStore()

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#e6e9ef]">Strategies</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-xs bg-[#2a2e39] text-[#e6e9ef] rounded-lg hover:bg-[#3a3e49] transition-colors cursor-pointer border border-[#2e313d]">
            Import XML
          </button>
        </div>
      </div>

      {savedStrategies.length === 0 ? (
        <div className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-8 text-center">
          <div className="text-3xl mb-2">▤</div>
          <p className="text-[#8a8f9a] text-sm">No saved strategies yet</p>
          <p className="text-[#6f7381] text-xs mt-1">Build and save a strategy in the Bot Builder</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedStrategies.map((s) => (
            <div key={s.id} className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-[#e6e9ef]">{s.name}</h3>
                <button
                  onClick={() => deleteStrategy(s.id)}
                  className="text-[#6f7381] hover:text-[#ff444f] transition-colors text-xs cursor-pointer"
                >
                  Delete
                </button>
              </div>
              <div className="text-xs text-[#8a8f9a] space-y-1">
                <p>Symbol: {s.symbol || '—'}</p>
                <p>Type: {s.contract_type || '—'}</p>
                <p>Amount: {s.amount || '—'}</p>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-1.5 text-xs bg-[#2a2e39] text-[#e6e9ef] rounded hover:bg-[#3a3e49] transition-colors cursor-pointer">
                  Load
                </button>
                <button className="flex-1 py-1.5 text-xs bg-[#2a2e39] text-[#e6e9ef] rounded hover:bg-[#3a3e49] transition-colors cursor-pointer">
                  Export XML
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
