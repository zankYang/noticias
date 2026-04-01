import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import type { CloudinaryImageGravity } from '~/utils/cloudinaryDeliveryUrl'
import { cloudinaryDeliveryUrl } from '~/utils/cloudinaryDeliveryUrl'

export function useCloudinaryArticleImage(
  source: MaybeRefOrGetter<string | undefined | null>,
  size: MaybeRefOrGetter<{ width: number; height: number }>,
  imageOptions?: MaybeRefOrGetter<{ gravity?: CloudinaryImageGravity } | undefined>
) {
  const config = useRuntimeConfig()

  return computed(() => {
    const opts = imageOptions ? toValue(imageOptions) : undefined
    const gravity: CloudinaryImageGravity =
      opts?.gravity === 'face' ? 'face' : 'auto'
    return cloudinaryDeliveryUrl(toValue(source), {
      cloudName: config.public.cloudinaryCloudName as string,
      width: toValue(size).width,
      height: toValue(size).height,
      gravity,
      analytics: (config.public.cloudinaryAnalytics as string) || undefined
    })
  })
}
