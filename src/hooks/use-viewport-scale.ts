import { useEffect, useState } from 'react'

/**
 * Hook para calcular o scale necessário para manter proporção 1920x1080
 * A aplicação sempre será renderizada em 1920x1080px e escalada para caber na tela
 * mantendo a proporção 16:9 sem distorções
 */
export function useViewportScale() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const calculateScale = () => {
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // Proporção alvo: 1920x1080 = 16:9 = 1.777...
      const targetAspectRatio = 1920 / 1080
      const viewportAspectRatio = viewportWidth / viewportHeight

      let newScale: number

      if (viewportAspectRatio > targetAspectRatio) {
        // Viewport é mais largo que 16:9 - escala baseada na altura
        // Isso garante que a altura sempre caiba
        newScale = viewportHeight / 1080
      } else {
        // Viewport é mais estreito ou igual a 16:9 - escala baseada na largura
        // Isso garante que a largura sempre caiba
        newScale = viewportWidth / 1920
      }

      setScale(newScale)
    }

    // Calcular na montagem
    calculateScale()

    // Recalcular em resize com debounce para performance
    let timeoutId: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(calculateScale, 100)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', calculateScale)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', calculateScale)
    }
  }, [])

  return { scale }
}

