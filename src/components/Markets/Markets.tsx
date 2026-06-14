const marketCategories = [
  {
    name: 'Forex',
    symbols: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD', 'USD/CHF', 'NZD/USD'],
  },
  {
    name: 'Synthetic Indices',
    symbols: ['Volatility 10 Index', 'Volatility 25 Index', 'Volatility 50 Index', 'Volatility 75 Index', 'Volatility 100 Index', 'Boom 300 Index', 'Crash 300 Index'],
  },
  {
    name: 'Stock Indices',
    symbols: ['US 500', 'Wall Street 30', 'US Tech 100', 'UK 100', 'Japan 225', 'Australia 200'],
  },
  {
    name: 'Commodities',
    symbols: ['Gold', 'Silver', 'Oil', 'Natural Gas'],
  },
  {
    name: 'Cryptocurrencies',
    symbols: ['BTC/USD', 'ETH/USD', 'LTC/USD', 'XRP/USD'],
  },
]

export function Markets() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#e6e9ef] mb-6">Markets</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search markets..."
          className="w-full max-w-md px-4 py-2 bg-[#1e222d] border border-[#2e313d] rounded-lg text-sm text-[#e6e9ef] placeholder-[#6f7381] focus:outline-none focus:border-[#06b2d6]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {marketCategories.map((cat) => (
          <div key={cat.name} className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4">
            <h3 className="text-sm font-semibold text-[#e6e9ef] mb-3">{cat.name}</h3>
            <div className="space-y-1">
              {cat.symbols.map((sym) => (
                <div
                  key={sym}
                  className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-[#2a2e39] cursor-pointer transition-colors"
                >
                  <span className="text-xs text-[#8a8f9a]">{sym}</span>
                  <span className="text-[10px] text-[#6f7381]">Select</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
