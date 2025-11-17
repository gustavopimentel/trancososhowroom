import { createContext, useContext, useState, ReactNode } from 'react'

interface MenuContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  sidebarWidth: number
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

export function MenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const sidebarWidth = 400

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen, sidebarWidth }}>
      {children}
    </MenuContext.Provider>
  )
}

export function useMenu() {
  const context = useContext(MenuContext)
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
}



