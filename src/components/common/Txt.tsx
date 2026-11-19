import { Fragment } from 'react'

/** Renderiza texto destacando marcadores [CONFIRMAR: …] para não passarem despercebidos. */
export default function Txt({ children }: { children: string }) {
  const parts = children.split(/(\[CONFIRMAR[^\]]*\])/g)
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('[CONFIRMAR') ? <span key={i} className="confirmar">{p}</span> : <Fragment key={i}>{p}</Fragment>,
      )}
    </>
  )
}
