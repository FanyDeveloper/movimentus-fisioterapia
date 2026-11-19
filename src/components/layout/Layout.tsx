import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import WhatsAppFloat from './WhatsAppFloat'
import CookieBanner, { readConsent } from './CookieBanner'
import PageTransition from './PageTransition'
import { useScrollToTop } from '../../hooks/useScrollToTop'

export default function Layout() {
  useScrollToTop()
  const [banner, setBanner] = useState(() => readConsent() === null)
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <WhatsAppFloat raised={banner} />
      <CookieBanner visible={banner} onDecide={() => setBanner(false)} />
    </>
  )
}
