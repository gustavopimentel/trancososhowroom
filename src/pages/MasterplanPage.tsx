import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'

// Importar imagem de fundo
import masterplanImage from '@/assets/images/masterplan/Masterplan.jpg'
// Importar logo TVT
import tvtLogo from '@/assets/images/masterplan/Logo-TVT-RGB-Vertical-Branco@2x.png'
// Importar grafismo
import grafismoModal from '@/assets/images/masterplan/grafismo modal.svg'

// Importar imagens dos modais usando import.meta.glob para evitar problemas com caracteres especiais
const imageModules = import.meta.glob('@/assets/images/masterplan/*.jpg', { eager: true, import: 'default' }) as Record<string, string>

// Função helper para encontrar a imagem pelo número
const getImageByNumber = (num: number): string => {
  const fileName = Object.keys(imageModules).find(key => 
    key.includes(`${num.toString().padStart(2, '0')}.`)
  )
  return fileName ? imageModules[fileName] : ''
}

// Mapeamento de imagens por ID
const modalImages: Record<string, string> = {
  'beach-club-taipe': getImageByNumber(1),
  'hotel-nomade': getImageByNumber(2),
  'portaria-administracao': getImageByNumber(3),
  'villavista-lago': getImageByNumber(4),
  'teatro-loccitane': getImageByNumber(5),
  'aeroporto-terravista': getImageByNumber(6),
  'villavista-campo': getImageByNumber(7),
  'restaurante-favoritto': getImageByNumber(8),
  'beach-club-villavista': getImageByNumber(9),
  'elevador-exclusivo': getImageByNumber(10),
  'academia': getImageByNumber(11),
  'villavista-falesias': getImageByNumber(12),
  'beach-club-tartarugas': getImageByNumber(13),
  'restaurante-tartarugas': getImageByNumber(14),
  'villavista-golf': getImageByNumber(15),
}

// Função para converter coordenadas tipo "J-23" para pixels
// Formato: coluna (A-Z) e linha (número)
// 
// COMO USAR:
// 1. Visualize a grade na tela (pressione 'G' para mostrar/esconder)
// 2. Identifique a coordenada (ex: "J-23" significa coluna J, linha 23)
// 3. Use a função helper grid() que calcula automaticamente:
//    position: grid("J", 23)
//
// Exemplo prático no código:
// position: grid("J", 23) // Coloca a bolinha no centro da célula J-23
function gridToPixels(column: string, row: number, containerWidth: number, containerHeight: number, gridCols: number = 26, gridRows: number = 50) {
  // Converter letra para número (A=0, B=1, ..., Z=25)
  const colIndex = column.toUpperCase().charCodeAt(0) - 65
  
  // Validar entrada
  if (colIndex < 0 || colIndex >= gridCols) {
    console.warn(`Coluna ${column} fora do range A-${String.fromCharCode(64 + gridCols)}`)
    return { x: 0, y: 0 }
  }
  
  if (row < 1 || row > gridRows) {
    console.warn(`Linha ${row} fora do range 1-${gridRows}`)
    return { x: 0, y: 0 }
  }
  
  // Calcular posição em pixels (centro da célula)
  const cellWidth = containerWidth / gridCols
  const cellHeight = containerHeight / gridRows
  
  const x = (colIndex + 0.5) * cellWidth
  const y = (row - 0.5) * cellHeight
  
  return { x, y }
}

// Helper function para facilitar o uso
// Assume container de 80% da largura (coluna do mapa)
// Ajuste estes valores se necessário baseado no tamanho real do seu viewport
const GRID_CONTAINER_WIDTH = 1536 // 80% de 1920px (ajuste conforme necessário)
const GRID_CONTAINER_HEIGHT = 1080 // altura padrão (ajuste conforme necessário)

// Função helper simples: grid("J", 23) retorna { x: ..., y: ... }
function grid(column: string, row: number) {
  return gridToPixels(column, row, GRID_CONTAINER_WIDTH, GRID_CONTAINER_HEIGHT)
}

// Função helper para ajustes finos: gridOffset("T", 30, -20, 0) move 20px para a esquerda
function gridOffset(column: string, row: number, offsetX: number = 0, offsetY: number = 0) {
  const pos = grid(column, row)
  return { x: pos.x + offsetX, y: pos.y + offsetY }
}

interface MasterplanPoint {
  id: string
  number: number
  label: string
  route?: string
  position: { x: number; y: number } // Posição em pixels (baseado em 80% de 1920px = 1536px)
}

// INSTRUÇÕES PARA POSICIONAR AS BOLINHAS:
// 1. Pressione 'G' para mostrar/esconder a grade
// 2. Identifique a coordenada na grade (ex: "J-23")
// 3. Substitua position: { x: 0, y: 0 } por position: grid("J", 23)
// 
// Exemplo:
// position: grid("J", 23) // Coloca no centro da célula J-23
const masterplanPoints: MasterplanPoint[] = [
  {
    id: 'beach-club-taipe',
    number: 1,
    label: 'Beach Club Barraca do Taipe',
    route: '/beach-club',
    position: grid("X", 8),
  },
  {
    id: 'hotel-nomade',
    number: 2,
    label: 'Futuro Hotel Nômade',
    route: '/novos-amenities',
    position: grid("S", 9),
  },
  {
    id: 'portaria-administracao',
    number: 3,
    label: 'Portaria e Administração',
    route: '/portaria-administracao',
    position: grid("Q", 13),
  },
  {
    id: 'villavista-lago',
    number: 4,
    label: 'Villavista Lago',
    route: '/villavista-lago',
    position: grid("M", 8),
  },
  {
    id: 'teatro-loccitane',
    number: 5,
    label: "Teatro L'Occitane",
    route: '/teatro-loccitane',
    position: grid("I", 8),
  },
  {
    id: 'aeroporto-terravista',
    number: 6,
    label: 'Aeroporto Terravista',
    route: '/aeroporto-terravista',
    position: grid("H", 18),
  },
  {
    id: 'villavista-campo',
    number: 7,
    label: 'Villavista Campo',
    route: '/villavista-campo',
    position: grid("O", 17),
  },
  {
    id: 'restaurante-favoritto',
    number: 8,
    label: 'Restaurante Favoritto',
    route: '/novos-amenities',
    position: grid("O", 28),
  },
  {
    id: 'beach-club-villavista',
    number: 9,
    label: 'Beach Club Villavista',
    route: '/beach-club',
    position: grid("W", 23),
  },
  {
    id: 'elevador-exclusivo',
    number: 10,
    label: 'Elevador exclusivo',
    route: '/novos-amenities',
    position: grid("W", 19),
  },
  {
    id: 'academia',
    number: 11,
    label: 'Academia',
    route: '/academia',
    position: grid("U", 30),
  },
  {
    id: 'villavista-falesias',
    number: 12,
    label: 'Villavista Falésias',
    route: '/villavista-falesias',
    position: gridOffset("T", 30, -15, 0), // T-30 com ajuste de -15px para a esquerda
  },
  {
    id: 'beach-club-tartarugas',
    number: 13,
    label: 'Beach Club Tartarugas',
    route: '/beach-club',
    position: grid("U", 48),
  },
  {
    id: 'restaurante-tartarugas',
    number: 14,
    label: 'Restaurante Tartarugas',
    route: '/novos-amenities',
    position: grid("T", 48),
  },
  {
    id: 'villavista-golf',
    number: 15,
    label: 'Villavista Golf',
    route: '/terravista-golf',
    position: grid("T", 22),
  },
]

export function MasterplanPage() {
  const navigate = useNavigate()
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null)
  const [showGrid, setShowGrid] = useState(true) // Grade visível por padrão (pressione 'G' para mostrar/esconder)
  const [selectedPoint, setSelectedPoint] = useState<MasterplanPoint | null>(null)

  // Atalho de teclado para mostrar/esconder grade (tecla 'G')
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'g' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Só ativa se não estiver digitando em um input
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
          return
        }
        setShowGrid((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const handlePointClick = useCallback((point: MasterplanPoint) => {
    setSelectedPoint(point)
  }, [])

  const handleModalClose = useCallback((open: boolean) => {
    if (!open) {
      setSelectedPoint(null)
    }
  }, [])


  // Configuração da grade
  const GRID_COLS = 26 // A-Z
  const GRID_ROWS = 50 // 1-50

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${masterplanImage})`,
        }}
      />

      {/* Container com duas colunas */}
      <div className="relative w-full h-full flex">
        {/* Coluna 1 - Mapa com marcadores (80%) */}
        <div className="w-[80%] h-full relative">
          {/* Grade tipo batalha naval */}
          {showGrid && (
            <div className="absolute inset-0 z-[5] pointer-events-none">
              {/* Linhas horizontais */}
              {Array.from({ length: GRID_ROWS + 1 }).map((_, i) => (
                <div
                  key={`row-${i}`}
                  className="absolute left-0 right-0 border-t border-white/20"
                  style={{
                    top: `${(i / GRID_ROWS) * 100}%`,
                  }}
                />
              ))}
              
              {/* Linhas verticais */}
              {Array.from({ length: GRID_COLS + 1 }).map((_, i) => (
                <div
                  key={`col-${i}`}
                  className="absolute top-0 bottom-0 border-l border-white/20"
                  style={{
                    left: `${(i / GRID_COLS) * 100}%`,
                  }}
                />
              ))}

              {/* Labels das colunas (A-Z) - Topo */}
              {Array.from({ length: GRID_COLS }).map((_, i) => {
                const letter = String.fromCharCode(65 + i) // A=65, B=66, etc.
                return (
                  <div
                    key={`col-label-top-${letter}`}
                    className="absolute top-0 text-white text-sm font-mono font-bold pointer-events-none drop-shadow-lg"
                    style={{
                      left: `${((i + 0.5) / GRID_COLS) * 100}%`,
                      transform: 'translateX(-50%)',
                      paddingTop: '4px',
                      textShadow: '0 0 4px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)',
                    }}
                  >
                    {letter}
                  </div>
                )
              })}

              {/* Labels das colunas (A-Z) - Rodapé */}
              {Array.from({ length: GRID_COLS }).map((_, i) => {
                const letter = String.fromCharCode(65 + i)
                return (
                  <div
                    key={`col-label-bottom-${letter}`}
                    className="absolute bottom-0 text-white text-sm font-mono font-bold pointer-events-none drop-shadow-lg"
                    style={{
                      left: `${((i + 0.5) / GRID_COLS) * 100}%`,
                      transform: 'translateX(-50%)',
                      paddingBottom: '4px',
                      textShadow: '0 0 4px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)',
                    }}
                  >
                    {letter}
                  </div>
                )
              })}

              {/* Labels das linhas (1-50) - Esquerda */}
              {Array.from({ length: GRID_ROWS }).map((_, i) => {
                const rowNumber = i + 1
                return (
                  <div
                    key={`row-label-left-${rowNumber}`}
                    className="absolute left-0 text-white text-sm font-mono font-bold pointer-events-none drop-shadow-lg"
                    style={{
                      top: `${((i + 0.5) / GRID_ROWS) * 100}%`,
                      transform: 'translateY(-50%)',
                      paddingLeft: '6px',
                      textShadow: '0 0 4px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)',
                    }}
                  >
                    {rowNumber}
                  </div>
                )
              })}

              {/* Labels das linhas (1-50) - Direita */}
              {Array.from({ length: GRID_ROWS }).map((_, i) => {
                const rowNumber = i + 1
                return (
                  <div
                    key={`row-label-right-${rowNumber}`}
                    className="absolute right-0 text-white text-sm font-mono font-bold pointer-events-none drop-shadow-lg"
                    style={{
                      top: `${((i + 0.5) / GRID_ROWS) * 100}%`,
                      transform: 'translateY(-50%)',
                      paddingRight: '6px',
                      textShadow: '0 0 4px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)',
                    }}
                  >
                    {rowNumber}
                  </div>
                )
              })}
            </div>
          )}

          {/* Bolinhas (z-index maior que a grade) */}
          {masterplanPoints.map((point) => {
            const isSelected = selectedPoint?.id === point.id
            const shouldShow = !selectedPoint || isSelected
            
            return (
              <motion.button
                key={point.id}
                className={cn(
                  'absolute z-20',
                  'w-9 h-9 rounded-full',
                  'flex items-center justify-center',
                  'font-semibold text-sm',
                  'transition-all duration-200',
                  'touch-manipulation',
                  'focus:outline-none',
                  'shadow-lg',
                  hoveredPoint === point.id 
                    ? 'bg-white text-[#8B6F47] scale-110 shadow-xl'
                    : 'bg-[#8B6F47] text-white'
                )}
                style={{
                  left: `${point.position.x}px`,
                  top: `${point.position.y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => handlePointClick(point)}
                onMouseEnter={() => setHoveredPoint(point.id)}
                onMouseLeave={() => setHoveredPoint(null)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: shouldShow ? 1 : 0,
                  scale: shouldShow ? 1 : 0.8
                }}
                transition={{ 
                  duration: 0.15,
                  delay: point.number * 0.02
                }}
              >
                {point.number.toString().padStart(2, '0')}
              </motion.button>
            )
          })}
        </div>

        {/* Coluna 2 - Lista (20%) */}
        <div className="w-[20%] h-full flex flex-col items-center justify-center">
          <div className="flex flex-col px-6">
            {/* Lista de pontos */}
            <div className="flex-1 overflow-y-auto pr-2">
              <ul className="space-y-3.5">
                {masterplanPoints.map((point, index) => (
                  <motion.li
                    key={point.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="flex items-center gap-3.5 cursor-pointer group"
                    onClick={() => handlePointClick(point)}
                    onMouseEnter={() => setHoveredPoint(point.id)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    {/* Círculo com número */}
                    <div className={cn(
                      'w-9 h-9 rounded-full',
                      'flex items-center justify-center',
                      'flex-shrink-0',
                      'transition-all duration-200',
                      hoveredPoint === point.id 
                        ? 'bg-white shadow-lg'
                        : 'bg-transparent border-2 border-white'
                    )}>
                      <span className={cn(
                        'font-semibold text-[0.875rem]',
                        hoveredPoint === point.id ? 'text-[#8B6F47]' : 'text-white'
                      )}>
                        {point.number.toString().padStart(2, '0')}
                      </span>
                    </div>

                    {/* Texto */}
                    <span className={cn(
                      'text-white font-sans text-[0.8125rem] leading-tight drop-shadow-md',
                      'transition-all duration-200',
                      hoveredPoint === point.id && 'text-white/80'
                    )}>
                      {point.label}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Logo TVT no canto inferior esquerdo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute bottom-0 left-0 z-30 p-8"
      >
        <img
          src={tvtLogo}
          alt="Terravista Logo"
          className="h-72 w-auto object-contain drop-shadow-lg"
        />
      </motion.div>

      {/* Modal informativo */}
      <Dialog open={!!selectedPoint} onOpenChange={handleModalClose}>
        <DialogContent className="max-w-lg p-0 bg-white border border-gray-200 shadow-xl [&>button]:text-gray-600 [&>button]:hover:text-gray-900 [&>button]:z-20">
          {selectedPoint && (
            <div className="relative w-full bg-white">
              {/* Título com número e nome - espaço maior acima */}
              <div className="px-6 pt-8 pb-4">
                <h2 className="text-gray-900 font-serif text-2xl uppercase">
                  <span className="text-[#8B6F47] font-bold">
                    {selectedPoint.number.toString().padStart(2, '0')}.
                  </span>{' '}
                  {selectedPoint.label}
                </h2>
              </div>

              {/* Imagem do local */}
              <div className="px-4">
                <img
                  src={modalImages[selectedPoint.id]}
                  alt={selectedPoint.label}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Grafismo abaixo da imagem - espaço abaixo */}
              <div className="mt-4 pb-8">
                <img
                  src={grafismoModal}
                  alt="Grafismo"
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

