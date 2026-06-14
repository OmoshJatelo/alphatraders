import { useState } from 'react'

const faqs = [
  { q: 'How do I connect my Deriv account?', a: 'Click "Connect Deriv Account" on the login screen and authorize via Deriv\'s OAuth.' },
  { q: 'What is a trading bot?', a: 'A trading bot is an automated program that executes trades based on predefined rules and strategies.' },
  { q: 'Are the bots free to use?', a: 'Yes, Alphatraders provides free pre-built trading bots. You only pay Deriv\'s contract costs.' },
  { q: 'Can I create my own strategy?', a: 'Yes, use the Bot Builder with drag-and-drop blocks to create custom strategies.' },
  { q: 'What markets can I trade?', a: 'Forex, Synthetic Indices, Stock Indices, Commodities, and Cryptocurrencies via Deriv.' },
  { q: 'Is there a risk of losing money?', a: 'Yes, trading involves risk. Use risk management tools like stop-loss and profit targets.' },
]

export function Tutorials() {
  const [activeTab, setActiveTab] = useState('faq')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFaqs = faqs.filter(
    (f) => !searchQuery || f.q.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#e6e9ef] mb-6">Tutorials</h1>

      <div className="flex gap-2 mb-6">
        {[
          { id: 'guides', label: 'Guides' },
          { id: 'videos', label: 'Videos' },
          { id: 'faq', label: 'FAQ' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#06b2d6] text-white'
                : 'bg-[#2a2e39] text-[#8a8f9a] hover:bg-[#3a3e49]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'faq' && (
        <div>
          <input
            type="text"
            placeholder="Search FAQ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md mb-4 px-4 py-2 bg-[#1e222d] border border-[#2e313d] rounded-lg text-sm text-[#e6e9ef] placeholder-[#6f7381] focus:outline-none focus:border-[#06b2d6]"
          />
          <div className="space-y-2">
            {filteredFaqs.map((faq, i) => (
              <div key={i} className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4">
                <p className="text-sm font-medium text-[#e6e9ef] mb-1">{faq.q}</p>
                <p className="text-xs text-[#8a8f9a]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'guides' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Getting Started with Alphatraders',
            'How to Build Your First Bot',
            'Understanding Contract Types',
            'Risk Management Strategies',
            'Using Martingale Effectively',
            'Advanced Bot Configurations',
          ].map((guide) => (
            <div key={guide} className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4 cursor-pointer hover:border-[#06b2d6]/30 transition-colors">
              <div className="text-xs text-[#06b2d6] mb-1">📄 GUIDE</div>
              <h3 className="text-sm text-[#e6e9ef]">{guide}</h3>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Platform Overview',
            'Bot Builder Tutorial',
            'Quick Strategy Setup',
          ].map((video) => (
            <div key={video} className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-4 cursor-pointer hover:border-[#06b2d6]/30 transition-colors">
              <div className="w-full h-28 bg-[#2a2e39] rounded flex items-center justify-center mb-2">
                <span className="text-2xl">▶</span>
              </div>
              <h3 className="text-sm text-[#e6e9ef]">{video}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
