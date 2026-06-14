import * as Blockly from 'blockly'

export const DERIV_BLOCKS = {
  TRADE_ACTION: 'deriv_trade_action',
  CONTRACT_TYPE: 'deriv_contract_type',
  MARKET_SYMBOL: 'deriv_market_symbol',
  AMOUNT: 'deriv_amount',
  DURATION: 'deriv_duration',
  DURATION_UNIT: 'deriv_duration_unit',
  STOP_LOSS: 'deriv_stop_loss',
  PROFIT_TARGET: 'deriv_profit_target',
  TRADE_AGAIN: 'deriv_trade_again',
  RESTART_ON_ERROR: 'deriv_restart_on_error',
  MARTINGALE: 'deriv_martingale',
  DALEMBERT: 'deriv_dalembert',
  OSCAR_GRIND: 'deriv_oscar_grind',
  TRADE_AGAIN_CONDITION: 'deriv_trade_again_condition',
  RISK_MANAGEMENT: 'deriv_risk_management',
}

export function defineDerivBlocks() {
  Blockly.Blocks[DERIV_BLOCKS.TRADE_ACTION] = {
    init: function () {
      this.appendDummyInput().appendField('Trade Action')
      this.appendValueInput('CONTRACT_TYPE').setCheck('ContractType').appendField('Type')
      this.appendValueInput('SYMBOL').setCheck('Symbol').appendField('Symbol')
      this.appendValueInput('AMOUNT').setCheck('Number').appendField('Amount')
      this.appendValueInput('DURATION').setCheck('Number').appendField('Duration')
      this.setColour(100)
      this.setTooltip('Execute a trade action')
      this.setPreviousStatement(true, 'TradeAction')
      this.setNextStatement(true, 'TradeAction')
    },
  }

  Blockly.Blocks[DERIV_BLOCKS.CONTRACT_TYPE] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Contract Type')
        .appendField(
          new Blockly.FieldDropdown([
            ['Rise/Fall', 'RISE_FALL'],
            ['Higher/Lower', 'HIGHER_LOWER'],
            ['Touch/No Touch', 'TOUCH'],
            ['Digits Match', 'DIGITS_MATCH'],
            ['Digits Diff', 'DIGITS_DIFF'],
            ['Digits Even', 'DIGITS_EVEN'],
            ['Digits Odd', 'DIGITS_ODD'],
            ['Digits Over', 'DIGITS_OVER'],
            ['Digits Under', 'DIGITS_UNDER'],
            ['Asian Up', 'ASIAN_UP'],
            ['Asian Down', 'ASIAN_DOWN'],
            ['Multiplier Up', 'MULTIPLIER_UP'],
            ['Multiplier Down', 'MULTIPLIER_DOWN'],
            ['Accumulator', 'ACCUMULATOR'],
          ]),
          'CONTRACT_TYPE'
        )
      this.setOutput(true, 'ContractType')
      this.setColour(230)
    },
  }

  Blockly.Blocks[DERIV_BLOCKS.MARKET_SYMBOL] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Symbol')
        .appendField(
          new Blockly.FieldDropdown([
            ['EUR/USD', 'EURUSD'],
            ['GBP/USD', 'GBPUSD'],
            ['USD/JPY', 'USDJPY'],
            ['Volatility 10 Index', 'R_10'],
            ['Volatility 25 Index', 'R_25'],
            ['Volatility 50 Index', 'R_50'],
            ['Volatility 75 Index', 'R_75'],
            ['Volatility 100 Index', 'R_100'],
            ['Boom 300 Index', 'BOOM300'],
            ['Crash 300 Index', 'CRASH300'],
            ['Gold', 'GOLD'],
            ['Silver', 'SILVER'],
            ['Oil', 'OIL'],
            ['BTC/USD', 'BTCUSD'],
            ['ETH/USD', 'ETHUSD'],
          ]),
          'SYMBOL'
        )
      this.setOutput(true, 'Symbol')
      this.setColour(160)
    },
  }

  Blockly.Blocks[DERIV_BLOCKS.AMOUNT] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Amount $')
        .appendField(new Blockly.FieldNumber(1, 0.01, 10000, 0.01), 'AMOUNT')
      this.setOutput(true, 'Number')
      this.setColour(60)
    },
  }

  Blockly.Blocks[DERIV_BLOCKS.DURATION] = {
    init: function () {
      this.appendValueInput('DURATION').setCheck('Number').appendField('Duration')
      this.appendValueInput('UNIT').setCheck('DurationUnit').appendField('Unit')
      this.setOutput(true, 'Duration')
      this.setColour(60)
    },
  }

  Blockly.Blocks[DERIV_BLOCKS.DURATION_UNIT] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Unit')
        .appendField(
          new Blockly.FieldDropdown([
            ['Ticks', 't'],
            ['Seconds', 's'],
            ['Minutes', 'm'],
            ['Hours', 'h'],
            ['Days', 'd'],
          ]),
          'UNIT'
        )
      this.setOutput(true, 'DurationUnit')
      this.setColour(60)
    },
  }

  Blockly.Blocks[DERIV_BLOCKS.STOP_LOSS] = {
    init: function () {
      this.appendValueInput('LIMIT').setCheck('Number').appendField('Stop Loss $')
      this.setPreviousStatement(true, 'RiskRule')
      this.setNextStatement(true, 'RiskRule')
      this.setColour(300)
      this.setTooltip('Stop trading if loss exceeds this amount')
    },
  }

  Blockly.Blocks[DERIV_BLOCKS.PROFIT_TARGET] = {
    init: function () {
      this.appendValueInput('TARGET').setCheck('Number').appendField('Profit Target $')
      this.setPreviousStatement(true, 'RiskRule')
      this.setNextStatement(true, 'RiskRule')
      this.setColour(300)
      this.setTooltip('Stop trading if profit reaches this amount')
    },
  }

  Blockly.Blocks[DERIV_BLOCKS.MARTINGALE] = {
    init: function () {
      this.appendDummyInput().appendField('Martingale Strategy')
      this.appendValueInput('STAKE').setCheck('Number').appendField('Initial Stake')
      this.appendValueInput('STEPS').setCheck('Number').appendField('Max Steps')
      this.setPreviousStatement(true, 'Strategy')
      this.setNextStatement(true, 'Strategy')
      this.setColour(195)
      this.setTooltip('Double stake after each loss')
    },
  }

  Blockly.Blocks[DERIV_BLOCKS.DALEMBERT] = {
    init: function () {
      this.appendDummyInput().appendField("D'Alembert Strategy")
      this.appendValueInput('BASE_STAKE').setCheck('Number').appendField('Base Stake')
      this.appendValueInput('MAX_STAKE').setCheck('Number').appendField('Max Stake')
      this.setPreviousStatement(true, 'Strategy')
      this.setNextStatement(true, 'Strategy')
      this.setColour(195)
      this.setTooltip('Increase stake by 1 unit after loss, decrease by 1 after win')
    },
  }

  Blockly.Blocks[DERIV_BLOCKS.OSCAR_GRIND] = {
    init: function () {
      this.appendDummyInput().appendField("Oscar's Grind Strategy")
      this.appendValueInput('UNIT_SIZE').setCheck('Number').appendField('Unit Size')
      this.appendValueInput('MAX_UNITS').setCheck('Number').appendField('Max Units')
      this.setPreviousStatement(true, 'Strategy')
      this.setNextStatement(true, 'Strategy')
      this.setColour(195)
      this.setTooltip('Increase stake after win, keep same after loss until in profit')
    },
  }

  Blockly.Blocks[DERIV_BLOCKS.TRADE_AGAIN] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Trade Again')
        .appendField(
          new Blockly.FieldCheckbox(true),
          'ENABLED'
        )
      this.appendValueInput('MAX_TRADES').setCheck('Number').appendField('Max Trades')
      this.setPreviousStatement(true, 'TradeAction')
      this.setNextStatement(true, 'TradeAction')
      this.setColour(100)
    },
  }

  Blockly.Blocks[DERIV_BLOCKS.RISK_MANAGEMENT] = {
    init: function () {
      this.appendDummyInput().appendField('Risk Management')
      this.appendStatementInput('RULES').setCheck('RiskRule').appendField('Rules')
      this.setPreviousStatement(true, 'TradeAction')
      this.setNextStatement(true, 'TradeAction')
      this.setColour(300)
    },
  }
}

export const DERIV_TOOLBOX_XML = `
<xml>
  <category name="Trade Actions" colour="100">
    <block type="deriv_trade_action"></block>
    <block type="deriv_trade_again"></block>
  </category>
  <category name="Contract Types" colour="230">
    <block type="deriv_contract_type"></block>
  </category>
  <category name="Market Selection" colour="160">
    <block type="deriv_market_symbol"></block>
  </category>
  <category name="Amount &amp; Duration" colour="60">
    <block type="deriv_amount"></block>
    <block type="deriv_duration"></block>
    <block type="deriv_duration_unit"></block>
  </category>
  <category name="Strategies" colour="195">
    <block type="deriv_martingale"></block>
    <block type="deriv_dalembert"></block>
    <block type="deriv_oscar_grind"></block>
  </category>
  <category name="Risk Management" colour="300">
    <block type="deriv_risk_management"></block>
    <block type="deriv_stop_loss"></block>
    <block type="deriv_profit_target"></block>
  </category>
  <category name="Logic" colour="210">
    <block type="controls_if"></block>
    <block type="logic_compare"></block>
    <block type="logic_operation"></block>
    <block type="logic_boolean"></block>
  </category>
  <category name="Math" colour="60">
    <block type="math_number"></block>
    <block type="math_arithmetic"></block>
    <block type="math_random_int"></block>
  </category>
  <category name="Variables" colour="330" custom="VARIABLE"></category>
</xml>
`

export function workspaceToStrategy(workspace: Blockly.WorkspaceSvg): string {
  const xml = Blockly.Xml.workspaceToDom(workspace)
  return Blockly.Xml.domToText(xml)
}

export function strategyToWorkspace(workspace: Blockly.WorkspaceSvg, xmlText: string): void {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlText, 'text/xml')
  const root = doc.documentElement
  Blockly.Xml.clearWorkspaceAndLoadFromXml(root, workspace)
}
