import { useCallback, useRef, useEffect } from 'react'
import { derivService } from '@/services/deriv'
import { useAppStore } from '@/store'
import type { BotConfig, TradeHistory } from '@/types'

export function useTradingEngine() {
  const { currentAccount, setBotRunning, addTrade, updateTrade, isBotRunning, currentBotConfig } = useAppStore()
  const activeTimers = useRef<Set<number>>(new Set())

  useEffect(() => {
    if (!isBotRunning) {
      activeTimers.current.forEach(clearTimeout)
      activeTimers.current.clear()
    }
  }, [isBotRunning])

  useEffect(() => {
    return () => {
      activeTimers.current.forEach(clearTimeout)
      activeTimers.current.clear()
    }
  }, [])

  const executeTrade = useCallback(async (config: BotConfig) => {
    try {
      const proposal = await derivService.getProposal(
        config.contract_type,
        config.symbol,
        config.amount,
        config.duration,
        config.duration_unit
      )

      if (!proposal?.proposal?.id) {
        console.error('Failed to get proposal')
        return
      }

      const buyResult = await derivService.buyContract(
        proposal.proposal.id,
        proposal.proposal.ask_price
      )

      if (buyResult?.buy?.contract_id) {
        const trade: TradeHistory = {
          contract_id: buyResult.buy.contract_id,
          transaction_id: buyResult.buy.transaction_id,
          symbol: config.symbol,
          contract_type: config.contract_type,
          entry_price: buyResult.buy.buy_price,
          status: 'open',
          entry_time: Date.now(),
          profit_loss: 0,
          currency: currentAccount?.currency || 'USD',
        }
        addTrade(trade)
      }

      return buyResult
    } catch (error) {
      console.error('Trade execution error:', error)
    }
  }, [currentAccount, addTrade])

  const startBot = useCallback(async (config: BotConfig) => {
    setBotRunning(true)

    const executeWithRetry = async () => {
      if (!useAppStore.getState().isBotRunning) return

      const result = await executeTrade(config)

      if (config.trade_again) {
        const timer = window.setTimeout(executeWithRetry, 1000)
        activeTimers.current.add(timer)
      }
    }

    await executeWithRetry()
  }, [executeTrade, setBotRunning])

  const stopBot = useCallback(() => {
    activeTimers.current.forEach(clearTimeout)
    activeTimers.current.clear()
    setBotRunning(false)
  }, [setBotRunning])

  return { startBot, stopBot, executeTrade }
}
