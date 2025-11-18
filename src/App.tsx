import { useRef, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { useViewportScale } from '@/hooks/use-viewport-scale'
import { useAllImages } from '@/hooks/useAllImages'
import { ImagePreloader } from '@/components/ImagePreloader'
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
    // Recalcular scale após montagem para garantir que está correto
    const recalculateScale = () => {
      if (containerRef.current) {
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const targetAspectRatio = 1920 / 1080
        const viewportAspectRatio = viewportWidth / viewportHeight

        let newScale: number
        if (viewportAspectRatio > targetAspectRatio) {
          newScale = viewportHeight / 1080
        } else {
          newScale = viewportWidth / 1920
        }

        containerRef.current.style.transform = `scale(${newScale})`
      }
    }

    // Aplicar scale imediatamente
    if (containerRef.current) {
      containerRef.current.style.transform = `scale(${scale})`
    }

    // Recalcular após um pequeno delay para garantir que o DOM está pronto
    const timeoutId = setTimeout(() => {
      recalculateScale()
      // Forçar um resize event para garantir que o hook também recalcule
      window.dispatchEvent(new Event('resize'))
    }, 100)

    return () => clearTimeout(timeoutId)
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
  const [isLoading, setIsLoading] = useState(true)
  const allImages = useAllImages()

  const handleLoadingComplete = () => {
    // Pequeno delay para garantir que o DOM está pronto antes de renderizar
    setTimeout(() => {
      setIsLoading(false)
      // Forçar recálculo do viewport após renderizar
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 50)
    }, 100)
  }

  return (
    <>
      <ImagePreloader 
        imageUrls={allImages} 
        onComplete={handleLoadingComplete} 
      />
      
      {!isLoading && (
        <MenuProvider>
          <AppContent />
        </MenuProvider>
      )}
    </>
  )
}

export default App

