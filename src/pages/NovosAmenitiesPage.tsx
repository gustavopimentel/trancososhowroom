import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Importar assets
import videoBackground from '@/assets/images/novos-amenities/video amenities background.mp4'
import logoIcon from '@/assets/images/novos-amenities/Icone do logo.png'
import beachClubImage from '@/assets/images/novos-amenities/Capa card  Beach Club.jpg'
import academiaImage from '@/assets/images/novos-amenities/Capa card Academia.jpg'
import portariaImage from '@/assets/images/novos-amenities/Capa card Portaria e Administracao.jpg'
import grafismoBeachClub from '@/assets/images/novos-amenities/Grafismo card Beach Clube.png'
import grafismoAcademia from '@/assets/images/novos-amenities/Grafismo card academia.png'
import grafismoPortaria from '@/assets/images/novos-amenities/Grafismo card portaria e administracao.png'

interface AmenityCard {
  id: string
  title: string
  image: string
  grafismo: string
}

const amenityCards: AmenityCard[] = [
  {
    id: 'beach-club',
    title: 'Beach Club Villavista',
    image: beachClubImage,
    grafismo: grafismoBeachClub,
  },
  {
    id: 'academia',
    title: 'Academia',
    image: academiaImage,
    grafismo: grafismoAcademia,
  },
  {
    id: 'portaria',
    title: 'Portaria e Administração',
    image: portariaImage,
    grafismo: grafismoPortaria,
  },
]

export function NovosAmenitiesPage() {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Garantir que o vídeo está em loop e autoplay
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignorar erro de autoplay se o navegador bloquear
      })
    }
  }, [])

  const handleCardClick = (cardId: string) => {
    if (cardId === 'beach-club') {
      navigate('/beach-club')
    } else if (cardId === 'academia') {
      navigate('/academia')
    } else if (cardId === 'portaria') {
      navigate('/portaria')
    }
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoBackground} type="video/mp4" />
      </video>

      {/* Lente overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: 'rgba(0, 80, 104, 0.85)',
        }}
      />

      {/* Container com duas colunas */}
      <div className="relative z-20 w-full h-full flex">
        {/* Coluna 1 - Logo e Título (25%) */}
        <div className="w-[25%] h-full flex flex-col items-center justify-center px-8">
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
            <h1 className="text-white font-serif text-3xl uppercase text-center leading-tight">
              Novos amenities villavista
            </h1>
          </motion.div>
        </div>

        {/* Coluna 2 - Cards (75%) */}
        <div className="w-[75%] h-full flex items-center justify-center px-8">
          <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
            {amenityCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer border-0 outline-none"
                onClick={() => handleCardClick(card.id)}
              >
                {/* Imagem do card */}
                <div className="relative w-full min-h-[280px] bg-gray-50 overflow-hidden flex items-start p-4">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-auto object-contain object-top block"
                    style={{ display: 'block' }}
                  />
                </div>

                {/* Título */}
                <div className="px-6 pt-4 pb-4">
                  <h2 className="text-gray-900 font-serif text-xl uppercase text-center">
                    {card.title}
                  </h2>
                </div>

                {/* Grafismo no rodapé */}
                <div className="w-full">
                  <img
                    src={card.grafismo}
                    alt="Grafismo"
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

