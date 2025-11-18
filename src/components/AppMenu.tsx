import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMenu } from '@/contexts/MenuContext'
import logoVVT from '@/assets/images/villavista/Logo-VVT-RGB-Vertical-Gradiente-TexturizadoMedia-Res-10x.png'

interface MenuItem {
  id: string
  label: string
  route: string
}

const menuItems: MenuItem[] = [
  {
    id: 'villavista',
    label: 'VILLAVISTA',
    route: '/villavista',
  },
  {
    id: 'falesias',
    label: 'FALÉSIAS',
    route: '/villavista-falesias',
  },
  {
    id: 'campo',
    label: 'CAMPO',
    route: '/villavista-campo',
  },
  {
    id: 'lago',
    label: 'LAGO',
    route: '/villavista-lago',
  },
  {
    id: 'masterplan',
    label: 'MASTERPLAN',
    route: '/masterplan',
  },
  {
    id: 'amenities',
    label: 'AMENITIES',
    route: '/novos-amenities',
  },
]

export function AppMenu() {
  const { isOpen, setIsOpen, sidebarWidth } = useMenu()
  const navigate = useNavigate()
  const location = useLocation()

  const handleMenuItemClick = (route: string) => {
    navigate(route)
    setIsOpen(false)
  }

  return (
    <>
      {/* Botão do menu - apenas quando fechado */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className={cn(
              'absolute top-8 left-8 z-[60]',
              'w-16 h-16 rounded-lg',
              'bg-white/95 backdrop-blur-sm',
              'shadow-xl border-2 border-white',
              'flex items-center justify-center',
              'text-gray-800',
              'transition-all duration-200',
              'touch-manipulation',
              'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2'
            )}
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Abrir menu"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Menu className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Overlay com desfoque quando menu está aberto */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute inset-0 z-40 backdrop-blur-md bg-black/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar profissional */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className={cn(
              'absolute top-0 left-0 h-full z-50',
              'bg-[#8B6F47]',
              'shadow-2xl',
              'overflow-hidden',
              'flex flex-col',
              '[&::-webkit-scrollbar]:hidden',
              '[-ms-overflow-style:none]',
              '[scrollbar-width:none]'
            )}
            initial={{ x: -sidebarWidth - 10 }}
            animate={{ x: 0 }}
            exit={{ x: -sidebarWidth - 10 }}
            transition={{ 
              type: 'spring', 
              damping: 30, 
              stiffness: 300,
              mass: 0.8
            }}
            style={{ 
              width: `${sidebarWidth}px`
            }}
            aria-label="Menu de navegação"
          >
            {/* Botão de fechar no canto superior direito */}
            <motion.button
              className={cn(
                'absolute top-8 right-8 z-10',
                'w-10 h-10',
                'flex items-center justify-center',
                'text-white/70 hover:text-white',
                'transition-colors duration-200',
                'touch-manipulation',
                'focus:outline-none'
              )}
              onClick={() => setIsOpen(false)}
              whileTap={{ scale: 0.95 }}
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Header da sidebar com logo */}
            <div className="flex-shrink-0 flex items-center justify-center px-8 pt-8 pb-8 border-b border-white/5">
              <img
                src={logoVVT}
                alt="Villa Vista Logo"
                className="h-72 w-auto object-contain"
              />
            </div>

            {/* Lista de itens do menu - alinhamento profissional */}
            <nav className="flex-1 overflow-hidden py-6">
              <ul className="space-y-0 overflow-hidden">
                {menuItems.map((item, index) => {
                  const isActive = location.pathname === item.route || 
                    (item.route === '/villavista' && location.pathname === '/')
                  return (
                    <li key={item.id} className="w-full">
                      <motion.button
                        className={cn(
                          'w-full text-left',
                          'px-8 py-7',
                          'font-sans uppercase',
                          'text-xl leading-tight',
                          'transition-all duration-300 ease-out',
                          'touch-manipulation',
                          'focus:outline-none',
                          'relative',
                          isActive
                            ? 'bg-[#6B5435] text-white'
                            : 'text-white/70 hover:bg-[#6B5435] hover:text-white'
                        )}
                        onClick={() => handleMenuItemClick(item.route)}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.03,
                          duration: 0.25,
                          ease: 'easeOut',
                        }}
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="block">
                          {item.label}
                        </span>
                      </motion.button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
