import { create } from 'zustand'
import type { DerivAccount, BotConfig, TradeHistory, ThemeMode, AppSettings } from '@/types'

interface AppState {
  // Auth
  isAuthenticated: boolean
  token: string | null
  accounts: DerivAccount[]
  currentAccount: DerivAccount | null
  isConnecting: boolean

  // App
  theme: ThemeMode
  language: string
  isInitialized: boolean

  // Bot
  isBotRunning: boolean
  currentBotConfig: BotConfig | null
  savedStrategies: BotConfig[]

  // Trading
  tradeHistory: TradeHistory[]
  activeContracts: TradeHistory[]

  // Loading
  loadingMessage: string
  loadingProgress: number

  // Actions
  setTheme: (theme: ThemeMode) => void
  setLanguage: (lang: string) => void
  setInitialized: (val: boolean) => void
  setConnecting: (val: boolean) => void
  setAuth: (token: string, accounts: DerivAccount[], current: DerivAccount) => void
  logout: () => void
  setCurrentAccount: (account: DerivAccount) => void
  setBotRunning: (val: boolean) => void
  setBotConfig: (config: BotConfig | null) => void
  saveStrategy: (config: BotConfig) => void
  deleteStrategy: (id: string) => void
  addTrade: (trade: TradeHistory) => void
  updateTrade: (contractId: number, updates: Partial<TradeHistory>) => void
  setLoadingMessage: (msg: string) => void
  setLoadingProgress: (progress: number) => void
}

const savedTheme = (localStorage.getItem('alphatraders-theme') as ThemeMode) || 'dark'
const savedLang = localStorage.getItem('alphatraders-lang') || 'en'

export const useAppStore = create<AppState>((set, get) => ({
  isAuthenticated: false,
  token: null,
  accounts: [],
  currentAccount: null,
  isConnecting: false,

  theme: savedTheme,
  language: savedLang,
  isInitialized: false,

  isBotRunning: false,
  currentBotConfig: null,
  savedStrategies: JSON.parse(localStorage.getItem('alphatraders-strategies') || '[]'),

  tradeHistory: [],
  activeContracts: [],

  loadingMessage: '1-Tick Execution',
  loadingProgress: 0,

  setTheme: (theme) => {
    localStorage.setItem('alphatraders-theme', theme)
    document.documentElement.className = theme
    document.body.className = `body theme theme--${theme}`
    set({ theme })
  },

  setLanguage: (language) => {
    localStorage.setItem('alphatraders-lang', language)
    set({ language })
  },

  setInitialized: (val) => set({ isInitialized: val }),
  setConnecting: (val) => set({ isConnecting: val }),

  setAuth: (token, accounts, current) =>
    set({
      isAuthenticated: true,
      token,
      accounts,
      currentAccount: current,
      isConnecting: false,
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      token: null,
      accounts: [],
      currentAccount: null,
      isBotRunning: false,
      currentBotConfig: null,
      tradeHistory: [],
      activeContracts: [],
    }),

  setCurrentAccount: (account) => set({ currentAccount: account }),

  setBotRunning: (val) => set({ isBotRunning: val }),

  setBotConfig: (config) => set({ currentBotConfig: config }),

  saveStrategy: (config) => {
    const strategies = get().savedStrategies
    const existing = strategies.findIndex((s) => s.id === config.id)
    let updated
    if (existing >= 0) {
      updated = [...strategies]
      updated[existing] = config
    } else {
      updated = [...strategies, config]
    }
    localStorage.setItem('alphatraders-strategies', JSON.stringify(updated))
    set({ savedStrategies: updated })
  },

  deleteStrategy: (id) => {
    const updated = get().savedStrategies.filter((s) => s.id !== id)
    localStorage.setItem('alphatraders-strategies', JSON.stringify(updated))
    set({ savedStrategies: updated })
  },

  addTrade: (trade) => {
    const history = [trade, ...get().tradeHistory].slice(0, 500)
    set({ tradeHistory: history })
    if (trade.status === 'open') {
      set({ activeContracts: [...get().activeContracts, trade] })
    }
  },

  updateTrade: (contractId, updates) => {
    const history = get().tradeHistory.map((t) =>
      t.contract_id === contractId ? { ...t, ...updates } : t
    )
    const active = get().activeContracts.filter((t) => t.contract_id !== contractId)
    set({ tradeHistory: history, activeContracts: active })
  },

  setLoadingMessage: (msg) => set({ loadingMessage: msg }),
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),
}))
