/**
 * Construye URL de entrega de Cloudinary desde un public_id, o devuelve URLs absolutas sin tocar.
 */
export type CloudinaryImageGravity = 'auto' | 'face'
export type CloudinaryCrop = 'auto' | 'fill'

export function cloudinaryDeliveryUrl(
  source: string | undefined | null,
  options: {
    cloudName: string
    width: number
    height: number
    /** `fill` recorta al rectángulo w×h; `auto` deja que Cloudinary elija el recorte. */
    crop?: CloudinaryCrop
    gravity?: CloudinaryImageGravity
    analytics?: string
  }
): string {
  if (!source?.trim()) return ''
  const s = source.trim()
  if (/^https?:\/\//i.test(s)) return s

  const cloud = options.cloudName?.trim()
  if (!cloud) return ''

  const c = options.crop === 'fill' ? 'c_fill' : 'c_auto'
  const g = options.gravity === 'face' ? 'g_face' : 'g_auto'
  const transforms = `${c},f_auto,${g},h_${options.height},q_auto,w_${options.width}`
  const publicId = s.replace(/^\/+/, '')
  let url = `https://res.cloudinary.com/${cloud}/image/upload/${transforms}/${publicId}`

  const a = options.analytics?.trim()
  if (a) {
    const q = a.replace(/^\?/, '')
    url = `${url}?${q}`
  }

  return url
}

/**
 * URL sin transformaciones ni query: `.../image/upload/{public_id}`.
 * El tamaño se controla en el contenedor (CSS).
 */
export function cloudinaryRawUploadUrl(
  source: string | undefined | null,
  cloudName: string
): string {
  if (!source?.trim()) return ''
  const s = source.trim()
  if (/^https?:\/\//i.test(s)) return s

  const cloud = cloudName?.trim()
  if (!cloud) return ''

  const publicId = s.replace(/^\/+/, '')
  return `https://res.cloudinary.com/${cloud}/image/upload/${publicId}`
}

/**
 * Escala en origen con `c_scale` y dimensiones exactas (`w_`, `h_`).
 * Incluye `f_auto` y `q_auto` para formato óptimo (p. ej. WebP/AVIF) y menor peso.
 */
export function cloudinaryScaleUrl(
  source: string | undefined | null,
  options: {
    cloudName: string
    width: number
    height: number
    analytics?: string
  }
): string {
  if (!source?.trim()) return ''
  const s = source.trim()
  if (/^https?:\/\//i.test(s)) return s

  const cloud = options.cloudName?.trim()
  if (!cloud) return ''

  const publicId = s.replace(/^\/+/, '')
  const w = Math.max(1, Math.round(options.width))
  const h = Math.max(1, Math.round(options.height))
  let url = `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,c_scale,w_${w},h_${h}/${publicId}`

  const a = options.analytics?.trim()
  if (a) {
    const q = a.replace(/^\?/, '')
    url = `${url}?${q}`
  }

  return url
}
