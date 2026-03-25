/** Cadena lista para ordenar por ISO string; vacío al final en orden DESC. */
export function fechaParaOrden(iso: string | null | undefined): string {
  if (iso == null) return ''
  const s = String(iso).trim()
  return s || ''
}

export function formatearFechaCorta(iso: string | null | undefined): string {
  const key = fechaParaOrden(iso)
  if (!key) return 'Sin fecha'
  const d = new Date(iso as string)
  if (Number.isNaN(d.getTime())) return 'Sin fecha'
  return new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short' }).format(d)
}

export function formatearFechaLarga(iso: string | null | undefined): string {
  const key = fechaParaOrden(iso)
  if (!key) return 'Sin fecha'
  const d = new Date(iso as string)
  if (Number.isNaN(d.getTime())) return 'Sin fecha'
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(d)
}
