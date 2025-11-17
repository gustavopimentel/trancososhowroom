import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { ChevronLeft, ChevronRight, Image } from 'lucide-react'
import { cn } from '@/lib/utils'

// Importar estilos do Swiper
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Importar imagens do slider - Normal
import sliderNormal1 from '@/assets/images/villavista-lago/Slider Lago.jpg'

// Importar imagens do slider - Tracejado
import sliderTracejado1 from '@/assets/images/villavista-lago/Slider Lago Tracejado.jpg'

// Importar imagens do slider - Lente
import sliderLente1 from '@/assets/images/villavista-lago/Slider Lago Lente.jpg'

// Importar logo e grafismo
import logo from '@/assets/images/villavista-lago/logo Villavista Lago Full dourado.png'
import grafismo from '@/assets/images/villavista-lago/Grafismo.png'

type SlideType = 'normal' | 'tracejado' | 'lente'

const slideImages: Record<SlideType, string[]> = {
  normal: [sliderNormal1],
  tracejado: [sliderTracejado1],
  lente: [sliderLente1],
}

interface SlideProps {
  images: string[]
  currentIndex: number
  onNext: () => void
  onPrevious: () => void
  onGoToSlide: (index: number) => void
  onSlideChange: (index: number) => void
}

function Slide({ images, currentIndex, onNext, onPrevious, onGoToSlide, onSlideChange }: SlideProps) {
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
        <p className="text-gray-400 font-sans">Adicione as imagens na pasta villavista-lago</p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full bg-white">
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
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Botões de navegação customizados - só aparecem se tiver mais de uma imagem */}
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

      {/* Indicadores de slide - só aparecem se tiver mais de uma imagem */}
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

export function VillaVistaLagoPage() {
  const [currentSlideType, setCurrentSlideType] = useState<SlideType>('normal')
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const currentImages = slideImages[currentSlideType]

  const handleNextSlide = () => {
    if (currentImages.length > 0) {
      setCurrentSlideIndex((prev) => (prev + 1) % currentImages.length)
    }
  }

  const handlePreviousSlide = () => {
    if (currentImages.length > 0) {
      setCurrentSlideIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)
    }
  }

  const handleGoToSlide = (index: number) => {
    if (currentImages.length > 0 && index >= 0 && index < currentImages.length) {
      setCurrentSlideIndex(index)
    }
  }

  const handleSlideChange = (index: number) => {
    setCurrentSlideIndex(index)
  }

  const handleSlideTypeChange = (type: SlideType) => {
    const newImages = slideImages[type]
    // Manter o índice atual, mas ajustar se o novo tipo tiver menos imagens
    const newIndex = Math.min(currentSlideIndex, newImages.length - 1)
    setCurrentSlideType(type)
    setCurrentSlideIndex(newIndex)
  }

  return (
    <div className="relative w-full h-full flex bg-white">
      {/* Coluna 1 - Informações do produto (30%) */}
      <div className="w-[30%] h-full flex flex-col bg-white overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col h-full px-12 pt-16 pb-8">
          {/* 1. Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-10"
          >
            <img
              src={logo}
              alt="Villavista Lago Logo"
              className="h-48 w-auto object-contain"
            />
          </motion.div>

          {/* 2. Título */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-6"
          >
            <h1 className="text-[2.5rem] font-serif text-[#1a4d5c] uppercase leading-tight">
              UM CONVITE À<br />
              EXCLUSIVIDADE<br />
              EM UMA ÁREA RESERVADA
            </h1>
          </motion.div>

          {/* 3. Comando de produto */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-6"
          >
            <p className="text-xl font-sans font-semibold text-[#1a4d5c] uppercase mb-2 tracking-wide">
              LOTES DE 2.100M² A 3.300M²
            </p>
            <p className="text-base font-sans text-[#8B6F47]">
              Masterplan por David Bastos
            </p>
          </motion.div>

          {/* 4. Grafismo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-[calc(100%+6rem)] -mx-12 mb-6 overflow-hidden"
          >
            <img
              src={grafismo}
              alt="Grafismo decorativo"
              className="w-full h-auto object-cover scale-105"
            />
          </motion.div>

          {/* 5. Descrição */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-1 mb-6"
          >
            <p className="text-[0.9375rem] font-sans text-gray-800 leading-relaxed text-justify">
              Ideal para quem busca privacidade e proximidade com as áreas do golfe, o Villavista Lago oferece o equilíbrio perfeito entre tranquilidade e acesso às comodidades do Complexo. Com espaços amplos, cercados por lagos e vegetação nativa, este é o destino ideal para viver o lifestyle distinto que define Trancoso.
            </p>
          </motion.div>

          {/* Footer - Seletor de tipo de slide */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center gap-3 mt-auto"
          >
            {/* Botão Normal */}
            <motion.button
              onClick={() => handleSlideTypeChange('normal')}
              className={cn(
                'rounded-lg',
                'flex items-center justify-center',
                'transition-all duration-200',
                'touch-manipulation',
                'focus:outline-none',
                currentSlideType === 'normal'
                  ? 'bg-[#8B6F47] w-11 h-11'
                  : 'bg-[#8B6F47] hover:bg-[#8B6F47]/90 w-10 h-10'
              )}
              aria-label="Visualização normal"
              whileTap={{ scale: 0.95 }}
              animate={{ scale: currentSlideType === 'normal' ? 1.1 : 1 }}
              transition={{ duration: 0.1 }}
            >
              <Image 
                className={cn(
                  currentSlideType === 'normal' ? 'w-5 h-5' : 'w-4 h-4',
                  'text-white'
                )}
              />
            </motion.button>

            {/* Botão Tracejado */}
            <motion.button
              onClick={() => handleSlideTypeChange('tracejado')}
              className={cn(
                'rounded-lg',
                'flex items-center justify-center',
                'bg-white border-2 border-dashed',
                'transition-all duration-200',
                'touch-manipulation',
                'focus:outline-none',
                currentSlideType === 'tracejado'
                  ? 'border-[#8B6F47] w-11 h-11'
                  : 'border-[#8B6F47] hover:border-[#8B6F47]/80 w-10 h-10'
              )}
              aria-label="Visualização tracejada"
              whileTap={{ scale: 0.95 }}
              animate={{ scale: currentSlideType === 'tracejado' ? 1.1 : 1 }}
              transition={{ duration: 0.1 }}
            >
              <Image 
                className={cn(
                  currentSlideType === 'tracejado' ? 'w-5 h-5' : 'w-4 h-4',
                  'text-[#8B6F47]'
                )}
              />
            </motion.button>

            {/* Botão Lente */}
            <motion.button
              onClick={() => handleSlideTypeChange('lente')}
              className={cn(
                'rounded-lg',
                'flex items-center justify-center',
                'transition-all duration-200',
                'touch-manipulation',
                'focus:outline-none',
                currentSlideType === 'lente'
                  ? 'bg-[#8B6F47]/60 w-11 h-11'
                  : 'bg-[#8B6F47]/40 hover:bg-[#8B6F47]/50 w-10 h-10'
              )}
              aria-label="Visualização com lente"
              whileTap={{ scale: 0.95 }}
              animate={{ scale: currentSlideType === 'lente' ? 1.1 : 1 }}
              transition={{ duration: 0.1 }}
            >
              <Image 
                className={cn(
                  currentSlideType === 'lente' ? 'w-5 h-5' : 'w-4 h-4',
                  'text-[#8B6F47]'
                )}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Coluna 2 - Slide (70%) */}
      <div className="w-[70%] h-full">
        <Slide
          images={currentImages}
          currentIndex={currentSlideIndex}
          onNext={handleNextSlide}
          onPrevious={handlePreviousSlide}
          onGoToSlide={handleGoToSlide}
          onSlideChange={handleSlideChange}
        />
      </div>
    </div>
  )
}

