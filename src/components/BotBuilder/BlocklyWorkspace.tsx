import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import * as Blockly from 'blockly'
import { defineDerivBlocks, DERIV_TOOLBOX_XML, workspaceToStrategy, strategyToWorkspace } from './blocklyBlocks'

export interface BlocklyWorkspaceHandle {
  getXml: () => string
  loadXml: (xml: string) => void
  clear: () => void
}

interface BlocklyWorkspaceProps {
  initialXml?: string
  onWorkspaceChange?: (xml: string) => void
}

Blockly.Theme.defineTheme('alphatraders', {
  name: 'alphatraders',
  base: Blockly.Themes.Classic,
  blockStyles: {
    colour_blocks: { colourPrimary: '#06b2d6', colourSecondary: '#0598b8', colourTertiary: '#0486a3' },
  },
  categoryStyles: {
    colour_category: { colour: '#06b2d6' },
  },
  componentStyles: {
    toolboxBackgroundColour: '#1e222d',
    toolboxForegroundColour: '#8a8f9a',
    flyoutBackgroundColour: '#1e222d',
    flyoutForegroundColour: '#8a8f9a',
    flyoutOpacity: 1,
    scrollbarColour: '#2e313d',
    insertionMarkerColour: '#06b2d6',
    insertionMarkerOpacity: 0.3,
  },
})

export const BlocklyWorkspace = forwardRef<BlocklyWorkspaceHandle, BlocklyWorkspaceProps>(
  ({ initialXml, onWorkspaceChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)

    useEffect(() => {
      defineDerivBlocks()

      if (!containerRef.current || workspaceRef.current) return

      const workspace = Blockly.inject(containerRef.current, {
        toolbox: DERIV_TOOLBOX_XML,
        grid: { spacing: 20, length: 3, colour: '#1e222d', snap: true },
        zoom: { controls: true, wheel: true, startScale: 0.9 },
        trashcan: true,
        move: { scrollbars: true, drag: true, wheel: true },
        theme: 'alphatraders',
      })

      workspaceRef.current = workspace

      if (initialXml) {
        try {
          strategyToWorkspace(workspace, initialXml)
        } catch {
          // ignore invalid XML
        }
      }

      const onChange = () => {
        if (onWorkspaceChange) {
          const xml = workspaceToStrategy(workspace)
          onWorkspaceChange(xml)
        }
      }

      workspace.addChangeListener(onChange)

      return () => {
        workspace.dispose()
        workspaceRef.current = null
      }
    }, [initialXml, onWorkspaceChange])

    useImperativeHandle(ref, () => ({
      getXml: () => {
        if (!workspaceRef.current) return ''
        return workspaceToStrategy(workspaceRef.current)
      },
      loadXml: (xml: string) => {
        if (!workspaceRef.current) return
        try {
          strategyToWorkspace(workspaceRef.current, xml)
        } catch {
          // ignore
        }
      },
      clear: () => {
        if (!workspaceRef.current) return
        workspaceRef.current.clear()
      },
    }))

    return (
      <div ref={containerRef} className="w-full h-full" />
    )
  }
)

BlocklyWorkspace.displayName = 'BlocklyWorkspace'
