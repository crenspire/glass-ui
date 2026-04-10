/**
 * Liquid Glass customization utilities
 * Runtime overrides for the liquid glass material system
 */

export interface GlassCustomization {
  /**
   * Background color for the glass effect (e.g., "rgba(255, 255, 255, 0.1)" or "#ffffff")
   * Default: uses CSS variable --glass-bg
   */
  color?: string

  /**
   * Transparency/opacity for the background (0-1)
   * If provided, will override the alpha channel in color
   */
  transparency?: number

  /**
   * Blur amount in pixels
   * Default: uses CSS variable --blur (40px)
   */
  blur?: number | string

  /**
   * Border/outline color (e.g., "rgba(255, 255, 255, 0.25)" or "#ffffff")
   * Default: uses CSS variable --glass-border
   */
  outline?: string

  /**
   * Border/outline width in pixels
   * Default: 0.5px
   */
  outlineWidth?: number | string

  /**
   * Shadow for the glass effect
   * Default: uses CSS variable --glass-shadow
   */
  shadow?: string

  /**
   * Inner glow color and intensity (e.g., "rgba(255, 255, 255, 0.2)")
   * Creates an inset shadow for a glowing effect inside the element
   */
  innerGlow?: string

  /**
   * Inner glow blur/spread radius in pixels
   * Default: 20px
   */
  innerGlowBlur?: number | string
}

/**
 * Converts glass customization props to CSS style object
 */
export function getGlassStyles(customization?: GlassCustomization): React.CSSProperties {
  if (!customization) return {}

  const styles: React.CSSProperties = {}

  // Handle background color and transparency
  if (customization.color || customization.transparency !== undefined) {
    let bgColor = customization.color || 'rgba(255, 255, 255, 0.4)'

    // If transparency is provided, adjust the alpha channel
    if (customization.transparency !== undefined) {
      const rgbaMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/)
      if (rgbaMatch) {
        const [, r, g, b] = rgbaMatch
        bgColor = `rgba(${r}, ${g}, ${b}, ${customization.transparency})`
      } else if (bgColor.startsWith('#')) {
        const hex = bgColor.replace('#', '')
        const r = parseInt(hex.substring(0, 2), 16)
        const g = parseInt(hex.substring(2, 4), 16)
        const b = parseInt(hex.substring(4, 6), 16)
        bgColor = `rgba(${r}, ${g}, ${b}, ${customization.transparency})`
      } else {
        bgColor = `${bgColor}${customization.transparency}`
      }
    }

    styles.backgroundColor = bgColor
  }

  // Handle blur — liquid glass uses high blur + saturation + brightness
  if (customization.blur !== undefined) {
    const blurValue = typeof customization.blur === 'number'
      ? `${customization.blur}px`
      : customization.blur
    styles.backdropFilter = `blur(${blurValue}) saturate(180%) brightness(1.05)`
    styles.WebkitBackdropFilter = `blur(${blurValue}) saturate(180%) brightness(1.05)`
  }

  // Handle outline/border
  if (customization.outline !== undefined) {
    const width = customization.outlineWidth || '0.5px'
    styles.borderColor = customization.outline
    styles.borderWidth = typeof width === 'number' ? `${width}px` : width
    styles.borderStyle = 'solid'
  } else if (!customization.outline && (customization.color || customization.transparency !== undefined || customization.blur !== undefined)) {
    styles.borderColor = 'rgba(255, 255, 255, 0.35)'
    styles.borderWidth = '0.5px'
    styles.borderStyle = 'solid'
  }

  // Handle shadow and inner glow — liquid glass uses specular inset highlights
  const shadows: string[] = []

  // Specular top-edge highlight
  shadows.push('0 0.5px 0 0 rgba(255, 255, 255, 0.7) inset')

  // Bottom edge darkening
  shadows.push('0 -0.5px 0 0 rgba(0, 0, 0, 0.04) inset')

  // Add outer shadow
  if (customization.shadow !== undefined) {
    shadows.push(customization.shadow)
  } else if (customization.color || customization.transparency !== undefined || customization.blur !== undefined) {
    shadows.push('0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(0, 0, 0, 0.04)')
  }

  // Add inner glow as inset shadow
  if (customization.innerGlow !== undefined) {
    const glowBlur = customization.innerGlowBlur !== undefined
      ? (typeof customization.innerGlowBlur === 'number' ? `${customization.innerGlowBlur}px` : customization.innerGlowBlur)
      : '20px'
    shadows.push(`inset 0 0 ${glowBlur} ${customization.innerGlow}`)
  }

  if (shadows.length > 0) {
    styles.boxShadow = shadows.join(', ')
  }

  return styles
}

/**
 * Generates CSS custom properties for glass customization
 * Useful for components that need to pass styles to child elements
 */
export function getGlassCSSVars(customization?: GlassCustomization): Record<string, string> {
  if (!customization) return {}

  const vars: Record<string, string> = {}

  if (customization.color || customization.transparency !== undefined) {
    let bgColor = customization.color || 'rgba(255, 255, 255, 0.4)'

    if (customization.transparency !== undefined) {
      const rgbaMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/)
      if (rgbaMatch) {
        const [, r, g, b] = rgbaMatch
        bgColor = `rgba(${r}, ${g}, ${b}, ${customization.transparency})`
      } else if (bgColor.startsWith('#')) {
        const hex = bgColor.replace('#', '')
        const r = parseInt(hex.substring(0, 2), 16)
        const g = parseInt(hex.substring(2, 4), 16)
        const b = parseInt(hex.substring(4, 6), 16)
        bgColor = `rgba(${r}, ${g}, ${b}, ${customization.transparency})`
      }
    }

    vars['--glass-bg-custom'] = bgColor
  }

  if (customization.blur !== undefined) {
    const blurValue = typeof customization.blur === 'number'
      ? `${customization.blur}px`
      : customization.blur
    vars['--blur-custom'] = blurValue
  }

  if (customization.outline !== undefined) {
    vars['--glass-border-custom'] = customization.outline
  }

  if (customization.outlineWidth !== undefined) {
    const width = typeof customization.outlineWidth === 'number'
      ? `${customization.outlineWidth}px`
      : customization.outlineWidth
    vars['--glass-border-width-custom'] = width
  }

  if (customization.shadow !== undefined) {
    vars['--glass-shadow-custom'] = customization.shadow
  }

  if (customization.innerGlow !== undefined) {
    vars['--glass-inner-glow-custom'] = customization.innerGlow
  }

  if (customization.innerGlowBlur !== undefined) {
    const blurValue = typeof customization.innerGlowBlur === 'number'
      ? `${customization.innerGlowBlur}px`
      : customization.innerGlowBlur
    vars['--glass-inner-glow-blur-custom'] = blurValue
  }

  return vars
}
