import { cn } from '../../lib/cn'

/** Recriação do ShinyText (React Bits). Só em detalhes pequenos. */
export default function ShinyText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn('bg-clip-text text-transparent [animation:shine_4.5s_linear_infinite]', className)}
      style={{
        backgroundImage: 'linear-gradient(110deg, currentColor 40%, #E39A73 50%, currentColor 60%)',
        backgroundSize: '250% 100%',
        WebkitTextFillColor: 'transparent',
        color: 'inherit',
      }}
    >
      {children}
    </span>
  )
}
