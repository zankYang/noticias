import { computed, type ComputedRef, type CSSProperties } from 'vue'

export interface EstiloProps {
  fuente?: 'serif' | 'sans' | 'mono' | 'display'
  tamano?: string
  peso?: string | number
  interlineado?: string
  espaciadoLetras?: string
  color?: string
  fondo?: string
  gradiente?: string
  colorBorde?: string
  alineacion?: 'izquierda' | 'centro' | 'derecha' | 'justificado'
  padding?: string
  radio?: string
  sombra?: 'ninguna' | 'chica' | 'normal' | 'grande' | 'xl'
  borde?: string
  anchoMax?: string
  opacidad?: string | number
  rotacion?: string
}

const fuenteMap: Record<string, string> = {
  serif: 'var(--news-serif)',
  sans: 'var(--news-sans)',
  mono: "'Menlo', 'Consolas', monospace",
  display: "'Georgia', 'Playfair Display', serif"
}

const alineacionMap: Record<string, string> = {
  izquierda: 'left',
  centro: 'center',
  derecha: 'right',
  justificado: 'justify'
}

const sombraMap: Record<string, string> = {
  ninguna: 'none',
  chica: '0 1px 3px rgba(0,0,0,0.08)',
  normal: '0 2px 8px rgba(0,0,0,0.1)',
  grande: '0 4px 16px rgba(0,0,0,0.12)',
  xl: '0 8px 32px rgba(0,0,0,0.15)'
}

export function useEstiloProps(props: EstiloProps): ComputedRef<CSSProperties> {
  return computed(() => {
    const s: CSSProperties = {}

    if (props.fuente && fuenteMap[props.fuente])
      s.fontFamily = fuenteMap[props.fuente]
    if (props.tamano)
      s.fontSize = props.tamano
    if (props.peso)
      s.fontWeight = props.peso as CSSProperties['fontWeight']
    if (props.interlineado)
      s.lineHeight = props.interlineado
    if (props.espaciadoLetras)
      s.letterSpacing = props.espaciadoLetras
    if (props.color)
      s.color = props.color
    if (props.gradiente)
      s.background = props.gradiente
    else if (props.fondo)
      s.background = props.fondo
    if (props.colorBorde)
      s.borderColor = props.colorBorde
    if (props.alineacion && alineacionMap[props.alineacion])
      s.textAlign = alineacionMap[props.alineacion] as CSSProperties['textAlign']
    if (props.padding)
      s.padding = props.padding
    if (props.radio)
      s.borderRadius = props.radio
    if (props.sombra && sombraMap[props.sombra])
      s.boxShadow = sombraMap[props.sombra]
    if (props.borde)
      s.border = props.borde
    if (props.anchoMax)
      s.maxWidth = props.anchoMax
    if (props.opacidad != null)
      s.opacity = Number(props.opacidad)
    if (props.rotacion)
      s.transform = `rotate(${props.rotacion})`

    return s
  })
}
