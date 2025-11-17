import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { ChevronLeft, ChevronRight, X, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

// Importar estilos do Swiper
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Importar imagens usando import.meta.glob
const imageModules = import.meta.glob('@/assets/images/novos-amenities/Beach clube/*.webp', { 
  eager: true, 
  import: 'default' 
}) as Record<string, string>

// Ordenar imagens pelo número no nome do arquivo
const beachClubImages = Object.entries(imageModules)
  .map(([path, image]) => {
    // Extrair número do nome do arquivo (ex: "Beach Club 01" -> 1)
    const match = path.match(/Beach Club (\d+)/)
    const number = match ? parseInt(match[1]) : 999
    return { path, image, number }
  })
  .sort((a, b) => a.number - b.number)
  .map(item => item.image)

// Importar legenda e logo
import legendaBeachClub from '@/assets/images/novos-amenities/Beach clube/Legenda Beach Club.svg'
import logoIcon from '@/assets/images/novos-amenities/Icone do logo.png'

interface SlideProps {
  images: string[]
  currentIndex: number
  onNext: () => void
  onPrevious: () => void
  onGoToSlide: (index: number) => void
  onSlideChange: (index: number) => void
  onClose: () => void
}

function Slide({ images, currentIndex, onNext, onPrevious, onGoToSlide, onSlideChange, onClose }: SlideProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)

  // Sincronizar Swiper com currentIndex externo
  useEffect(() => {
    if (swiper && swiper.activeIndex !== currentIndex) {
      swiper.slideTo(currentIndex)
    }
  }, [currentIndex, swiper])

  if (images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-400 font-sans">Nenhuma imagem disponível</p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full bg-black">
      <Swiper
        onSwiper={setSwiper}
        slidesPerView={1}
        spaceBetween={0}
        initialSlide={currentIndex}
        onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}
        modules={[Navigation, Pagination]}
        className="h-full w-full"
        touchEventsTarget="container"
        resistance={true}
        resistanceRatio={0.85}
        speed={400}
        allowTouchMove={true}
        grabCursor={true}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="!flex items-center justify-center">
            <img
              src={image}
              alt={`Beach Club ${index + 1}`}
              className="w-full h-full object-contain"
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botão fechar */}
      <button
        onClick={onClose}
        className={cn(
          'absolute top-4 right-4 z-30',
          'w-12 h-12 rounded-full',
          'bg-white/20 backdrop-blur-sm hover:bg-white/30',
          'flex items-center justify-center',
          'text-white transition-all duration-200',
          'touch-manipulation',
          'focus:outline-none focus:ring-2 focus:ring-white/50'
        )}
        aria-label="Fechar"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Botões de navegação customizados */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => {
              swiper?.slidePrev()
              onPrevious()
            }}
            className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 z-20',
              'w-12 h-12 rounded-full',
              'bg-white/20 backdrop-blur-sm hover:bg-white/30',
              'flex items-center justify-center',
              'text-white transition-all duration-200',
              'touch-manipulation',
              'focus:outline-none focus:ring-2 focus:ring-white/50'
            )}
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => {
              swiper?.slideNext()
              onNext()
            }}
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2 z-20',
              'w-12 h-12 rounded-full',
              'bg-white/20 backdrop-blur-sm hover:bg-white/30',
              'flex items-center justify-center',
              'text-white transition-all duration-200',
              'touch-manipulation',
              'focus:outline-none focus:ring-2 focus:ring-white/50'
            )}
            aria-label="Próxima imagem"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Indicadores de slide - centralizados */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                swiper?.slideTo(index)
                onGoToSlide(index)
              }}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-200',
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/40 hover:bg-white/60'
              )}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function BeachClubPage() {
  const navigate = useNavigate()
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
    setCurrentSlideIndex(index)
  }

  const handleCloseSlide = () => {
    setSelectedImageIndex(null)
  }

  const handleNextSlide = () => {
    if (beachClubImages.length > 0 && selectedImageIndex !== null) {
      const newIndex = (selectedImageIndex + 1) % beachClubImages.length
      setSelectedImageIndex(newIndex)
      setCurrentSlideIndex(newIndex)
    }
  }

  const handlePreviousSlide = () => {
    if (beachClubImages.length > 0 && selectedImageIndex !== null) {
      const newIndex = (selectedImageIndex - 1 + beachClubImages.length) % beachClubImages.length
      setSelectedImageIndex(newIndex)
      setCurrentSlideIndex(newIndex)
    }
  }

  const handleGoToSlide = (index: number) => {
    if (beachClubImages.length > 0 && index >= 0 && index < beachClubImages.length) {
      setSelectedImageIndex(index)
      setCurrentSlideIndex(index)
    }
  }

  const handleSlideChange = (index: number) => {
    setCurrentSlideIndex(index)
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(index)
    }
  }

  return (
    <div className="relative w-full h-full bg-white overflow-hidden flex">
      {/* Coluna 1 - Logo e Título (20%) */}
      <div className="w-[20%] h-full flex flex-col items-center justify-center px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Logo */}
          <img
            src={logoIcon}
            alt="Logo Villavista"
            className="w-auto h-24 mb-6 object-contain"
          />

          {/* Título */}
          <h1 className="text-gray-900 font-serif text-3xl uppercase text-center leading-tight mb-12">
            Amenities Beach Club
          </h1>

          {/* Botão Voltar */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => navigate('/novos-amenities')}
            className={cn(
              'w-10 h-10 rounded-full',
              'bg-white/60 hover:bg-white/80',
              'border border-gray-300/50',
              'flex items-center justify-center',
              'text-gray-600 hover:text-gray-800 transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-gray-300/50',
              'backdrop-blur-sm'
            )}
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Coluna 2 - Galeria de thumbnails (80%) */}
      <div className="w-[80%] h-full p-8 overflow-y-auto relative">
        <div className="grid grid-cols-4 gap-4 max-w-7xl mx-auto">
          {beachClubImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image}
                alt={`Beach Club ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal/Slide fullscreen */}
      {selectedImageIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black"
        >
          <Slide
            images={beachClubImages}
            currentIndex={currentSlideIndex}
            onNext={handleNextSlide}
            onPrevious={handlePreviousSlide}
            onGoToSlide={handleGoToSlide}
            onSlideChange={handleSlideChange}
            onClose={handleCloseSlide}
          />
          
          {/* Legenda fixa no canto esquerdo inferior - acima do slide */}
          <div className="absolute bottom-0 left-0 z-30 pb-6 pt-6 pr-6 pointer-events-none">
            <img
              src={legendaBeachClub}
              alt="Beach Club"
              className="h-96 w-auto"
            />
          </div>
        </motion.div>
      )}
    </div>
  )
}

