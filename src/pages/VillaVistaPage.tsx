import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Importar imagens
import backgroundImage from '@/assets/images/villavista/Bg_Villavista_Showroom_Home.jpg'
import logoFalesias from '@/assets/images/villavista/logo falesias.png'
import logoCampo from '@/assets/images/villavista/logo campo.png'
import logoLago from '@/assets/images/villavista/logo lago.png'

interface Marker {
  id: string
  label: string
  route: string
  logo: string
  position: { x: number; y: number } // Posição em pixels (baseado em 1920x1080)
}

const markers: Marker[] = [
  {
    id: 'falesias',
    label: 'FALÉSIAS',
    route: '/villavista-falesias',
    logo: logoFalesias,
    position: { x: 800, y: 300 },
  },
  {
    id: 'campo',
    label: 'CAMPO',
    route: '/villavista-campo',
    logo: logoCampo,
    position: { x: 1100, y: 200 },
  },
  {
    id: 'lago',
    label: 'LAGO',
    route: '/villavista-lago',
    logo: logoLago,
    position: { x: 1400, y: 200 },
  },
]

export function VillaVistaPage() {
  const navigate = useNavigate()

  const handleMarkerClick = (route: string) => {
    navigate(route)
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />

      {/* Overlay sutil para melhorar contraste dos marcadores */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Marcadores interativos */}
      {markers.map((marker) => (
        <motion.button
          key={marker.id}
          className={cn(
            'absolute z-10 flex items-center justify-center group',
            'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent',
            'touch-manipulation' // Otimização para touch
          )}
          style={{
            left: `${marker.position.x}px`,
            top: `${marker.position.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => handleMarkerClick(marker.route)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: markers.indexOf(marker) * 0.1 }}
        >
          {/* Card com logo e linha */}
          <div className="flex flex-col items-center">
            {/* Logo do marcador */}
            <img
              src={marker.logo}
              alt={marker.label}
              className="w-auto h-28 object-contain cursor-pointer"
            />
            
            {/* Linha vertical abaixo do logo */}
            <div
              className="w-0.5 bg-white mt-2"
              style={{ height: '70px' }}
            />
          </div>
        </motion.button>
      ))}
    </div>
  )
}

