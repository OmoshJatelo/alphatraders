export function QuickStrategy() {
  const strategies = [
    { id: 'martingale', name: 'Martingale', desc: 'Double stake after each loss, reset on win' },
    { id: 'rev-martingale', name: 'Reverse Martingale', desc: 'Increase stake after wins, reset on loss' },
    { id: 'dalembert', name: "D'Alembert", desc: 'Increase stake by 1 unit after loss, decrease by 1 after win' },
    { id: 'oscar', name: "Oscar's Grind", desc: 'Increase stake after win, keep same after loss until in profit' },
    { id: '1326', name: '1-3-2-6 System', desc: 'Betting progression: 1, 3, 2, 6 units' },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#e6e9ef] mb-6">Quick Strategy</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {strategies.map((s) => (
          <div
            key={s.id}
            className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4 hover:border-[#06b2d6]/30 transition-colors cursor-pointer group"
          >
            <h3 className="text-sm font-semibold text-[#e6e9ef] group-hover:text-[#06b2d6] transition-colors">
              {s.name}
            </h3>
            <p className="text-xs text-[#8a8f9a] mt-1">{s.desc}</p>
            <button className="mt-3 w-full py-2 text-xs bg-[#06b2d6]/10 text-[#06b2d6] rounded-lg hover:bg-[#06b2d6]/20 transition-colors cursor-pointer">
              Select & Configure
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-[#1e222d] border border-[#2e313d] rounded-lg p-4">
        <h2 className="text-sm font-semibold text-[#e6e9ef] mb-3">Configuration</h2>
        <p className="text-xs text-[#6f7381]">Select a strategy above to configure and start trading.</p>
      </div>
    </div>
  )
}
