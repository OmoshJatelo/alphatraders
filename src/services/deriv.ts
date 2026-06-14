const DERIV_APP_ID = '33yizEiBjX3lPpZpjUn3r'
const DERIV_AUTH_URL = 'https://oauth.deriv.com/oauth2/authorize'
const DERIV_WS_URL = 'wss://ws.derivws.com/websockets/v3'

export class DerivService {
  private ws: WebSocket | null = null
  private requestId = 0
  private pendingRequests: Map<number, { resolve: Function; reject: Function }> = new Map()
  private messageHandler: ((msg: any) => void) | null = null

  connect(token?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(DERIV_WS_URL)

      this.ws.onopen = () => {
        if (token) {
          this.send({ authorize: token }).then(() => resolve()).catch(reject)
        } else {
          resolve()
        }
      }

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.msg_type === 'authorize' && data.authorize) {
          this.messageHandler?.(data)
        }
        if (data.req_id && this.pendingRequests.has(data.req_id)) {
          const { resolve: res, reject: rej } = this.pendingRequests.get(data.req_id)!
          this.pendingRequests.delete(data.req_id)
          if (data.error) rej(data.error)
          else res(data)
        }
        this.messageHandler?.(data)
      }

      this.ws.onerror = () => reject(new Error('WebSocket connection failed'))
      this.ws.onclose = () => {
        this.ws = null
      }
    })
  }

  disconnect() {
    this.ws?.close()
    this.ws = null
  }

  send(request: Record<string, unknown>): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        reject(new Error('WebSocket not connected'))
        return
      }
      const reqId = ++this.requestId
      this.pendingRequests.set(reqId, { resolve, reject })
      this.ws.send(JSON.stringify({ ...request, req_id: reqId }))
    })
  }

  setMessageHandler(handler: (msg: any) => void) {
    this.messageHandler = handler
  }

  getAuthUrl(redirectUri: string): string {
    const params = new URLSearchParams({
      app_id: DERIV_APP_ID,
      redirect_uri: redirectUri,
      scope: 'read trade',
    })
    return `${DERIV_AUTH_URL}?${params}`
  }

  async authorize(token: string) {
    return this.send({ authorize: token })
  }

  async getBalance() {
    return this.send({ balance: 1 })
  }

  async getActiveSymbols() {
    return this.send({ active_symbols: 'brief' })
  }

  async getContractsForSymbol(symbol: string) {
    return this.send({ contracts_for: symbol, currency: 'USD' })
  }

  async buyContract(proposalId: number, price: number) {
    return this.send({ buy: proposalId, price })
  }

  async sellContract(contractId: number, price: number) {
    return this.send({ sell: contractId, price })
  }

  async getProposal(contractType: string, symbol: string, amount: number, duration: number, durationUnit: string) {
    return this.send({
      proposal: 1,
      amount,
      basis: 'stake',
      contract_type: contractType,
      currency: 'USD',
      duration,
      duration_unit: durationUnit,
      symbol,
    })
  }

  async getProfitTable(limit = 50, offset = 0) {
    return this.send({ profit_table: 1, limit, offset })
  }

  async getStatement(limit = 50, offset = 0) {
    return this.send({ statement: 1, limit, offset })
  }

  async subscribeTicks(symbol: string) {
    return this.send({ ticks: symbol, subscribe: 1 })
  }

  async unsubscribeTicks(symbol: string) {
    return this.send({ forget_all: 'ticks' })
  }
}

export const derivService = new DerivService()
