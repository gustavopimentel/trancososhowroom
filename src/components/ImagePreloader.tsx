import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImagePreloaderProps {
  imageUrls: string[]
  onComplete: () => void
}

export function ImagePreloader({ imageUrls, onComplete }: ImagePreloaderProps) {
  const [loadedCount, setLoadedCount] = useState(0)
  const [failedCount, setFailedCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let loaded = 0
    let failed = 0
    const total = imageUrls.length

    if (total === 0) {
      // Se não há imagens, completa imediatamente
      setTimeout(() => {
        setIsComplete(true)
        setTimeout(() => onComplete(), 300)
      }, 500)
      return
    }

    const loadImage = (url: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          loaded++
          setLoadedCount(loaded)
          resolve()
        }
        img.onerror = () => {
          failed++
          setFailedCount(failed)
          resolve() // Continua mesmo se falhar
        }
        // Forçar carregamento completo
        img.src = url
      })
    }

    // Carregar todas as imagens em paralelo
    // O navegador gerencia automaticamente o número de conexões simultâneas
    Promise.all(imageUrls.map(loadImage)).then(() => {
      setIsComplete(true)
      // Aguarda um pouco para mostrar 100% antes de fechar
      setTimeout(() => {
        onComplete()
      }, 500)
    })
  }, [imageUrls, onComplete])

  const progress = imageUrls.length > 0 
    ? Math.round(((loadedCount + failedCount) / imageUrls.length) * 100) 
    : 0

  const totalLoaded = loadedCount + failedCount

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-[#8B6F47] flex items-center justify-center"
        >
          <div className="text-center text-white px-8">
            {/* Logo ou título */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h1 className="text-5xl font-serif mb-4 font-bold">Villavista</h1>
              <p className="text-xl text-white/80">Showroom</p>
            </motion.div>

            {/* Barra de progresso */}
            <div className="w-96 h-3 bg-white/20 rounded-full overflow-hidden mb-6">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>

            {/* Porcentagem */}
            <motion.p
              key={progress}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold mb-2"
            >
              {progress}%
            </motion.p>

            {/* Contador */}
            <p className="text-sm text-white/70">
              Carregando {totalLoaded} de {imageUrls.length} imagens...
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

