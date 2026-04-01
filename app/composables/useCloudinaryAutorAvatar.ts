import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import { cloudinaryDeliveryUrl } from '~/utils/cloudinaryDeliveryUrl'

/** Tamaño de entrega Cloudinary (px); la UI muestra el círculo más pequeño vía CSS. */
const AVATAR_CLOUDINARY_SIZE = 128

/**
 * Avatar del autor: public_id o URL absoluta; en Cloudinary usa recorte facial por defecto.
 */
export function useCloudinaryAutorAvatar(source: MaybeRefOrGetter<string | undefined | null>) {
  const config = useRuntimeConfig()

  return computed(() =>
    cloudinaryDeliveryUrl(toValue(source), {
      cloudName: config.public.cloudinaryCloudName as string,
      width: AVATAR_CLOUDINARY_SIZE,
      height: AVATAR_CLOUDINARY_SIZE,
      gravity: 'face',
      analytics: (config.public.cloudinaryAnalytics as string) || undefined
    })
  )
}
