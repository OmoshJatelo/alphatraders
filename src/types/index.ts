export interface DerivAccount {
  loginid: string
  currency: string
  balance: number
  email?: string
  fullname?: string
  account_type?: string
  is_virtual: boolean
  landing_company_name?: string
}

export interface DerivToken {
  token: string
  loginid: string
  scope: string[]
  email?: string
  fullname?: string
}

export interface MarketSymbol {
  symbol: string
  display_name: string
  market: string
  submarket: string
  market_display_name: string
  submarket_display_name: string
}

export interface ContractProposal {
  proposal_id: number
  longcode: string
  display: string
  payout: number
  spot: number
  spot_time: number
  ask_price: number
}

export interface Contract {
  contract_id: number
  buy_price: number
  payout: number
  profit: number
  transaction_ids: { buy: number; sell?: number }
  longcode: string
  status: string
  entry_spot: number
  exit_spot?: number
  entry_tick_time?: number
  exit_tick_time?: number
  contract_type: string
  currency: string
  is_sold: boolean
  symbol: string
}

export type ContractType =
  | 'CALL'
  | 'PUT'
  | 'RISE_FALL'
  | 'HIGHER_LOWER'
  | 'TOUCH'
  | 'NO_TOUCH'
  | 'DIGITS_MATCH'
  | 'DIGITS_DIFF'
  | 'DIGITS_EVEN'
  | 'DIGITS_ODD'
  | 'DIGITS_OVER'
  | 'DIGITS_UNDER'
  | 'ASIAN_UP'
  | 'ASIAN_DOWN'
  | 'ACCUMULATOR'
  | 'MULTIPLIER_UP'
  | 'MULTIPLIER_DOWN'
  | 'VANILLA_CALL'
  | 'VANILLA_PUT'
  | 'SPREAD_CALL'
  | 'SPREAD_PUT'

export type TradeDurationType = 't' | 's' | 'm' | 'h' | 'd'

export interface BotConfig {
  id: string
  name: string
  symbol: string
  contract_type: ContractType
  amount: number
  currency: string
  duration: number
  duration_unit: TradeDurationType
  strategy_xml?: string
  strategy_type?: string
  stop_loss?: number
  profit_threshold?: number
  trade_again: boolean
  restart_on_error: boolean
  max_trades?: number
}

export interface TradeHistory {
  contract_id: number
  transaction_id: number
  symbol: string
  contract_type: string
  entry_price: number
  exit_price?: number
  profit_loss: number
  status: 'won' | 'lost' | 'open'
  entry_time: number
  exit_time?: number
  currency: string
}

export type ThemeMode = 'dark' | 'light'

export interface AppSettings {
  theme: ThemeMode
  language: string
  bot_defaults: Partial<BotConfig>
}
