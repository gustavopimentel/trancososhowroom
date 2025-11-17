import { useRef, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { useViewportScale } from '@/hooks/use-viewport-scale'
import { cn } from '@/lib/utils'
import { VillaVistaPage } from '@/pages/VillaVistaPage'
import { VillaVistaFalesiasPage } from '@/pages/VillaVistaFalesiasPage'
import { VillaVistaCampoPage } from '@/pages/VillaVistaCampoPage'
import { VillaVistaLagoPage } from '@/pages/VillaVistaLagoPage'
import { MasterplanPage } from '@/pages/MasterplanPage'
import { NovosAmenitiesPage } from '@/pages/NovosAmenitiesPage'
import { BeachClubPage } from '@/pages/BeachClubPage'
import { AcademiaPage } from '@/pages/AcademiaPage'
import { PortariaPage } from '@/pages/PortariaPage'
import { AppMenu } from '@/components/AppMenu'
import { MenuProvider } from '@/contexts/MenuContext'

function AppContent() {
  const { scale } = useViewportScale()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `scale(${scale})`
    }
  }, [scale])

  return (
    <>
      <div ref={containerRef} className={cn('app-container relative')}>
        <AppMenu />
        <Routes>
          <Route path="/" element={<VillaVistaPage />} />
          <Route path="/villavista" element={<VillaVistaPage />} />
          {/* Rotas para as outras páginas serão adicionadas depois */}
          <Route path="/villavista-falesias" element={<VillaVistaFalesiasPage />} />
          <Route path="/villavista-campo" element={<VillaVistaCampoPage />} />
          <Route path="/villavista-lago" element={<VillaVistaLagoPage />} />
          <Route path="/masterplan" element={<MasterplanPage />} />
          <Route path="/novos-amenities" element={<NovosAmenitiesPage />} />
          <Route path="/beach-club" element={<BeachClubPage />} />
          <Route path="/academia" element={<AcademiaPage />} />
          <Route path="/portaria" element={<PortariaPage />} />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

function App() {
  return (
    <MenuProvider>
      <AppContent />
    </MenuProvider>
  )
}

export default App

