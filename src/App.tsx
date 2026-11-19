import { lazy, Suspense } from 'react'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const Sobre = lazy(() => import('./pages/Sobre'))
const Servicos = lazy(() => import('./pages/Servicos'))
const ServicoDetalhe = lazy(() => import('./pages/ServicoDetalhe'))
const Equipe = lazy(() => import('./pages/Equipe'))
const Agendamento = lazy(() => import('./pages/Agendamento'))
const Perguntas = lazy(() => import('./pages/Perguntas'))
const Contato = lazy(() => import('./pages/Contato'))
const Privacidade = lazy(() => import('./pages/Privacidade'))

const s = (el: React.ReactNode) => <Suspense fallback={<div className="min-h-screen" />}>{el}</Suspense>

// Prévia hospedada (sem rewrite de SPA) usa HashRouter: VITE_HASH_ROUTER=1 npm run build -- --base=./
const createRouter = import.meta.env.VITE_HASH_ROUTER === '1' ? createHashRouter : createBrowserRouter

const router = createRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/sobre', element: s(<Sobre />) },
      { path: '/servicos', element: s(<Servicos />) },
      { path: '/servicos/:slug', element: s(<ServicoDetalhe />) },
      { path: '/equipe', element: s(<Equipe />) },
      { path: '/agendamento', element: s(<Agendamento />) },
      { path: '/perguntas-frequentes', element: s(<Perguntas />) },
      { path: '/contato', element: s(<Contato />) },
      { path: '/politica-de-privacidade', element: s(<Privacidade />) },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
