import { useRef, useState } from 'react'
import { useAppStore } from '@/store'
import { BlocklyWorkspace, type BlocklyWorkspaceHandle } from './BlocklyWorkspace'

export function BotBuilder() {
  const { currentBotConfig, setBotConfig, saveStrategy, isBotRunning, setBotRunning } = useAppStore()
  const workspaceRef = useRef<BlocklyWorkspaceHandle>(null)
  const [currentXml, setCurrentXml] = useState('')
  const [strategyName, setStrategyName] = useState('')
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  const handleImportXml = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.xml'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        const xml = ev.target?.result as string
        workspaceRef.current?.loadXml(xml)
        setCurrentXml(xml)
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const handleExportXml = () => {
    const xml = workspaceRef.current?.getXml()
    if (!xml) return
    const blob = new Blob([xml], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${strategyName || 'strategy'}.xml`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleSave = () => {
    const xml = workspaceRef.current?.getXml()
    if (!xml) return
    const config = {
      id: crypto.randomUUID(),
      name: strategyName || 'Untitled Strategy',
      symbol: '',
      contract_type: 'RISE_FALL' as const,
      amount: 1,
      currency: 'USD',
      duration: 1,
      duration_unit: 'm' as const,
      strategy_xml: xml,
      strategy_type: 'custom',
      trade_again: false,
      restart_on_error: false,
    }
    saveStrategy(config)
    setShowSaveDialog(false)
    setStrategyName('')
  }

  const handleRun = () => {
    setBotRunning(true)
  }

  const handleStop = () => {
    setBotRunning(false)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-[#e6e9ef]">Bot Builder</h1>
        <div className="flex gap-2">
          <button
            onClick={handleImportXml}
            className="px-4 py-2 text-xs bg-[#2a2e39] text-[#e6e9ef] rounded-lg hover:bg-[#3a3e49] transition-colors cursor-pointer border border-[#2e313d]"
          >
            Import XML
          </button>
          <button
            onClick={handleExportXml}
            className="px-4 py-2 text-xs bg-[#2a2e39] text-[#e6e9ef] rounded-lg hover:bg-[#3a3e49] transition-colors cursor-pointer border border-[#2e313d]"
          >
            Export XML
          </button>
          <button
            onClick={() => setShowSaveDialog(true)}
            className="px-4 py-2 text-xs bg-[#2a2e39] text-[#e6e9ef] rounded-lg hover:bg-[#3a3e49] transition-colors cursor-pointer border border-[#2e313d]"
          >
            Save
          </button>
          {!isBotRunning ? (
            <button
              onClick={handleRun}
              className="px-4 py-2 text-xs bg-[#00c853] text-white rounded-lg hover:bg-[#00b34a] transition-colors cursor-pointer"
            >
              Run Bot
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="px-4 py-2 text-xs bg-[#ff444f] text-white rounded-lg hover:bg-[#e03d47] transition-colors cursor-pointer"
            >
              Stop Bot
            </button>
          )}
        </div>
      </div>

      <div className="h-[calc(100vh-14rem)] bg-[#1e222d] border border-[#2e313d] rounded-lg overflow-hidden">
        <BlocklyWorkspace
          ref={workspaceRef}
          initialXml={currentBotConfig?.strategy_xml}
          onWorkspaceChange={setCurrentXml}
        />
      </div>

      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1e222d] border border-[#2e313d] rounded-lg p-6 w-96">
            <h2 className="text-sm font-semibold text-[#e6e9ef] mb-4">Save Strategy</h2>
            <input
              type="text"
              placeholder="Strategy name"
              value={strategyName}
              onChange={(e) => setStrategyName(e.target.value)}
              className="w-full px-3 py-2 bg-[#2a2e39] border border-[#2e313d] rounded text-sm text-[#e6e9ef] placeholder-[#6f7381] focus:outline-none focus:border-[#06b2d6] mb-4"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 text-xs bg-[#2a2e39] text-[#8a8f9a] rounded-lg hover:bg-[#3a3e49] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-xs bg-[#06b2d6] text-white rounded-lg hover:bg-[#0598b8] transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
