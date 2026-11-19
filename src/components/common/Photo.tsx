import { useRef } from 'react'
import { gsap, useGSAP, MQ } from '../../lib/gsap'
import { cn } from '../../lib/cn'

type Props = {
  src: string
  srcSet?: string
  sizes?: string
  alt: string
  width: number
  height: number
  className?: string
  /** Enquadramento dentro do recorte, ex.: '40% 50%' */
  position?: string
  priority?: boolean
  parallax?: boolean
}

/**
 * Foto real (WebP) com revelação por clip-path e parallax leve (≤ 12%).
 * Todas as fotos recebem o mesmo tratamento de cor (.photo-tone).
 */
export default function Photo({ src, srcSet, sizes, alt, width, height, className, position = '50% 50%', priority, parallax = true }: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        gsap.fromTo(ref.current, { clipPath: 'inset(100% 0% 0% 0%)' }, {
          clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.out', delay: priority ? 0.35 : 0,
          scrollTrigger: priority ? undefined : { trigger: ref.current, start: 'top 88%', once: true },
        })
        if (parallax) {
          gsap.fromTo('[data-plx]', { yPercent: -6 }, {
            yPercent: 6, ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
          })
        }
      })
    },
    { scope: ref },
  )

  return (
    <figure ref={ref} className={cn('relative overflow-hidden rounded-[var(--radius-card)] bg-areia', className)}>
      <div data-plx className="absolute -inset-y-[8%] inset-x-0 will-change-transform">
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="photo-tone h-full w-full object-cover"
          style={{ objectPosition: position }}
        />
      </div>
    </figure>
  )
}
