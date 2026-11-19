import { useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger, useGSAP, MQ } from '../../lib/gsap'
import { cn } from '../../lib/cn'

/**
 * Motivos animados do site: movimento e equilíbrio.
 * Substituem as fotos. Cada loop só roda enquanto está visível na tela
 * e fica parado com prefers-reduced-motion.
 */

const C = { musgo: '#24392C', argila: '#A94E27', argilaClara: '#E39A73', linho: '#F3EEE6', areia: '#E7DFD2' }
type Tone = 'musgo' | 'linho'

/** Cria a timeline em loop só com motion permitido e pausa fora da tela. */
function useLoop(scope: React.RefObject<Element | null>, build: (tl: gsap.core.Timeline) => void, enabled = true) {
  useGSAP(
    () => {
      if (!enabled) return
      gsap.matchMedia().add(MQ.motion, () => {
        const tl = gsap.timeline({ repeat: -1, paused: true })
        build(tl)
        ScrollTrigger.create({ trigger: scope.current, start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? tl.play() : tl.pause()) })
      })
    },
    { scope },
  )
}

/* ------------------------------------------------------------------ */
/* Equilíbrio: barra sobre um ponto de apoio, que oscila e se ajusta,  */
/* com uma linha de movimento contínuo acima. Motivo principal.        */
/* ------------------------------------------------------------------ */
export function Equilibrio({ className, tone = 'musgo', animate = true, amplitude = 6, tilt = 0 }: { className?: string; tone?: Tone; animate?: boolean; amplitude?: number; tilt?: number }) {
  const ref = useRef<SVGSVGElement>(null)
  const ink = tone === 'linho' ? C.linho : C.musgo
  const accent = tone === 'linho' ? C.argilaClara : C.argila

  useLoop(ref, (tl) => {
    tl.fromTo('[data-beam]', { rotation: -amplitude, svgOrigin: '120 96' }, { rotation: amplitude, svgOrigin: '120 96', duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0)
      .fromTo('[data-roll]', { x: -4 }, { x: 4, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0)
      .fromTo('[data-wave]', { strokeDashoffset: 0 }, { strokeDashoffset: -120, duration: 5.2, ease: 'none' }, 0)
  }, animate)

  return (
    <svg ref={ref} viewBox="0 0 240 140" fill="none" aria-hidden="true" className={cn('overflow-visible', className)}>
      <path data-wave d="M14 34c22-18 44-18 66 0s44 18 66 0 44-18 66 0" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeDasharray="6 9" />
      <line x1="10" y1="121" x2="230" y2="121" stroke={ink} strokeWidth="1" opacity="0.35" />
      <path d="M106 121a14 14 0 0 1 28 0z" fill={accent} />
      <g data-beam transform={`rotate(${tilt} 120 96)`}>
        <line x1="26" y1="104" x2="214" y2="104" stroke={ink} strokeWidth="2" strokeLinecap="round" />
        <g data-roll>
          <circle cx="50" cy="88" r="15" fill={ink} />
          <circle cx="192" cy="93" r="10" stroke={ink} strokeWidth="1.6" />
          <circle cx="192" cy="93" r="3" fill={accent} />
        </g>
      </g>
    </svg>
  )
}

/* Articulação: três segmentos que flexionam como dedos/punho. */
function Articulacao({ ink, accent }: { ink: string; accent: string }) {
  const ref = useRef<SVGSVGElement>(null)
  useLoop(ref, (tl) => {
    tl.to('[data-s1]', { rotation: -14, svgOrigin: '90 230', duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0)
      .to('[data-s2]', { rotation: -26, svgOrigin: '200 230', duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0.15)
      .to('[data-s3]', { rotation: -34, svgOrigin: '290 230', duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0.3)
      .to('[data-arc]', { strokeDashoffset: -80, duration: 3.9, ease: 'none' }, 0)
  })
  return (
    <svg ref={ref} viewBox="0 0 400 320" className="h-full w-full" aria-hidden="true">
      <path data-arc d="M90 230 A200 200 0 0 1 330 92" fill="none" stroke={accent} strokeWidth="1.2" strokeDasharray="4 10" opacity="0.8" />
      <line x1="40" y1="262" x2="360" y2="262" stroke={ink} strokeWidth="1" opacity="0.3" />
      <g data-s1>
        <line x1="90" y1="230" x2="200" y2="230" stroke={ink} strokeWidth="20" strokeLinecap="round" />
        <g data-s2>
          <line x1="200" y1="230" x2="290" y2="230" stroke={ink} strokeWidth="16" strokeLinecap="round" />
          <g data-s3>
            <line x1="290" y1="230" x2="350" y2="230" stroke={ink} strokeWidth="13" strokeLinecap="round" />
          </g>
          <circle cx="290" cy="230" r="6" fill={accent} />
        </g>
        <circle cx="200" cy="230" r="7" fill={accent} />
      </g>
      <circle cx="90" cy="230" r="9" fill={accent} />
    </svg>
  )
}

/* Coluna: vértebras que ondulam em sequência, como uma coluna que se mexe. */
function Coluna({ ink, accent }: { ink: string; accent: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const n = 9
  useLoop(ref, (tl) => {
    tl.to('[data-v]', { x: 16, rotation: 4, transformOrigin: '50% 50%', duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: 1, stagger: { each: 0.12 } }, 0)
  })
  return (
    <svg ref={ref} viewBox="0 0 300 400" className="h-full w-full" aria-hidden="true">
      <line x1="210" y1="40" x2="210" y2="360" stroke={accent} strokeWidth="1.2" strokeDasharray="4 8" opacity="0.7" />
      {Array.from({ length: n }, (_, i) => {
        const w = 64 + Math.sin((i / (n - 1)) * Math.PI) * 18
        return <rect key={i} data-v x={130 - w / 2} y={48 + i * 34} width={w} height="24" rx="12" fill={i === 4 ? accent : ink} opacity={i === 4 ? 1 : 0.9 - Math.abs(i - 4) * 0.06} />
      })}
    </svg>
  )
}

/* Ondas: círculos concêntricos que respiram, como a musculatura relaxando. */
function Ondas({ ink, accent }: { ink: string; accent: string }) {
  const ref = useRef<SVGSVGElement>(null)
  useLoop(ref, (tl) => {
    tl.fromTo('[data-o]', { scale: 0.86, opacity: 0.25, transformOrigin: '50% 50%' }, { scale: 1.06, opacity: 0.9, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: 1, stagger: { each: 0.22, from: 'start' } }, 0)
  })
  return (
    <svg ref={ref} viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
      {[150, 120, 92, 66, 42].map((r, i) => (
        <circle key={r} data-o cx="200" cy="200" r={r} fill="none" stroke={i === 4 ? accent : ink} strokeWidth={i === 4 ? 2 : 1.2} />
      ))}
      <circle cx="200" cy="200" r="10" fill={accent} />
    </svg>
  )
}

/* Caminhos: linhas que vêm de lugares diferentes e seguem juntas (particular e SUS, mesmo cuidado). */
function Caminhos({ ink, accent }: { ink: string; accent: string }) {
  const ref = useRef<SVGSVGElement>(null)
  useLoop(ref, (tl) => {
    tl.fromTo('[data-p]', { strokeDashoffset: 0 }, { strokeDashoffset: -96, duration: 3, ease: 'none' }, 0)
      .fromTo('[data-dot]', { scale: 0.7, transformOrigin: '50% 50%' }, { scale: 1.25, duration: 1.5, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0)
  })
  return (
    <svg ref={ref} viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      {['M30 60 C120 60 150 150 230 150', 'M30 150 C110 150 150 150 230 150', 'M30 240 C120 240 150 150 230 150'].map((d, i) => (
        <path key={d} data-p d={d} fill="none" stroke={ink} strokeWidth="2" strokeDasharray="8 8" opacity={0.55 + i * 0.15} />
      ))}
      <line x1="230" y1="150" x2="370" y2="150" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <circle data-dot cx="230" cy="150" r="10" fill={accent} />
      {[60, 150, 240].map((y) => <circle key={y} cx="30" cy={y} r="5" fill={ink} />)}
    </svg>
  )
}

/* Pedras: pilha em equilíbrio que se acomoda devagar. */
function Pedras({ ink, accent }: { ink: string; accent: string }) {
  const ref = useRef<SVGSVGElement>(null)
  useLoop(ref, (tl) => {
    tl.to('[data-stack]', { rotation: 2.5, svgOrigin: '150 340', duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0)
      .to('[data-st]', { rotation: (i: number) => (i % 2 ? -3 : 3), transformOrigin: '50% 100%', duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: 1, stagger: 0.1 }, 0)
  })
  const pedras = [
    { cx: 150, cy: 312, rx: 78, ry: 28 },
    { cx: 156, cy: 258, rx: 60, ry: 24 },
    { cx: 146, cy: 212, rx: 44, ry: 20 },
    { cx: 152, cy: 176, rx: 30, ry: 15 },
  ]
  return (
    <svg ref={ref} viewBox="0 0 300 400" className="h-full w-full" aria-hidden="true">
      <line x1="40" y1="341" x2="260" y2="341" stroke={ink} strokeWidth="1" opacity="0.35" />
      <g data-stack>
        {pedras.map((p, i) => <ellipse key={i} data-st {...p} fill={i === 3 ? accent : ink} opacity={i === 3 ? 1 : 0.92 - i * 0.12} />)}
        <circle cx="152" cy="146" r="7" fill="none" stroke={accent} strokeWidth="1.6" />
      </g>
    </svg>
  )
}

export type MotivoNome = 'articulacao' | 'coluna' | 'ondas' | 'caminhos' | 'pedras' | 'equilibrio'

/** Painel com um motivo animado, no lugar das fotos. Revela com clip-path ao entrar na tela. */
export function Cena({ motivo, tone = 'areia', className, children }: { motivo: MotivoNome; tone?: 'areia' | 'musgo' | 'papel'; className?: string; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const dark = tone === 'musgo'
  const ink = dark ? C.linho : C.musgo
  const accent = dark ? C.argilaClara : C.argila

  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        gsap.fromTo(ref.current, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } })
      })
    },
    { scope: ref },
  )

  const body = {
    articulacao: <Articulacao ink={ink} accent={accent} />,
    coluna: <Coluna ink={ink} accent={accent} />,
    ondas: <Ondas ink={ink} accent={accent} />,
    caminhos: <Caminhos ink={ink} accent={accent} />,
    pedras: <Pedras ink={ink} accent={accent} />,
    equilibrio: <Equilibrio tone={dark ? 'linho' : 'musgo'} className="h-full w-full" />,
  }[motivo]

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('relative overflow-hidden rounded-[var(--radius-card)]', dark ? 'bg-musgo' : tone === 'papel' ? 'bg-papel' : 'bg-areia', className)}
    >
      <div className="absolute inset-0 flex items-center justify-center p-[10%]">{body}</div>
      {children}
    </div>
  )
}
