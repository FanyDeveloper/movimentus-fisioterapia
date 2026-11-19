import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from './useLenis'
import { ScrollTrigger } from '../lib/gsap'

/** Volta ao topo a cada troca de página (ou rola até a âncora, se houver hash). */
export function useScrollToTop() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()

  useLayoutEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -100 })
        else el.scrollIntoView()
        return
      }
    }
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname, hash, lenis])
}
