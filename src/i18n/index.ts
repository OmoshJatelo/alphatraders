import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      app: {
        name: 'Alphatraders',
        tagline: 'Your Gateway to Automated Deriv Trading',
        loading: 'Initializing',
      },
      nav: {
        dashboard: 'Dashboard',
        botBuilder: 'Bot Builder',
        quickStrategy: 'Quick Strategy',
        strategies: 'Strategies',
        markets: 'Markets',
        reports: 'Reports',
        tutorials: 'Tutorials',
        settings: 'Settings',
      },
      auth: {
        login: 'Connect Deriv Account',
        loginDesc: 'Connect your Deriv account to start trading',
        loggingIn: 'Connecting...',
        logout: 'Disconnect',
        account: 'Account',
        balance: 'Balance',
        demo: 'Demo',
        real: 'Real',
      },
      dashboard: {
        title: 'Dashboard',
        accountSummary: 'Account Summary',
        botStatus: 'Bot Status',
        recentTrades: 'Recent Trades',
        noTrades: 'No trades yet',
        profitLoss: 'Profit / Loss',
        totalTrades: 'Total Trades',
        winRate: 'Win Rate',
      },
      botBuilder: {
        title: 'Bot Builder',
        toolbox: 'Toolbox',
        workspace: 'Workspace',
        import: 'Import XML',
        export: 'Export XML',
        save: 'Save Strategy',
        run: 'Run Bot',
        stop: 'Stop Bot',
        strategyName: 'Strategy Name',
      },
      quickStrategy: {
        title: 'Quick Strategy',
        selectStrategy: 'Select Strategy',
        configure: 'Configure',
        start: 'Start Trading',
      },
      strategies: {
        title: 'Strategies',
        library: 'Strategy Library',
        importXml: 'Import',
        exportXml: 'Export',
        delete: 'Delete',
        noStrategies: 'No saved strategies',
      },
      markets: {
        title: 'Markets',
        forex: 'Forex',
        synthetic: 'Synthetic Indices',
        stock: 'Stock Indices',
        commodity: 'Commodities',
        crypto: 'Cryptocurrencies',
        basket: 'Baskets',
        search: 'Search markets...',
      },
      reports: {
        title: 'Reports',
        contractHistory: 'Contract History',
        profitLoss: 'Profit & Loss',
        statement: 'Statement',
        noContracts: 'No contracts yet',
      },
      tutorials: {
        title: 'Tutorials',
        guides: 'Guides',
        videos: 'Videos',
        faq: 'FAQ',
      },
      settings: {
        title: 'Settings',
        theme: 'Theme',
        dark: 'Dark',
        light: 'Light',
        language: 'Language',
        account: 'Account',
        botPreferences: 'Bot Preferences',
        about: 'About Alphatraders',
      },
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        confirm: 'Confirm',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        close: 'Close',
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
