import { useMemo } from 'react'

// Coletar todas as imagens usando import.meta.glob
// Isso pega todas as imagens de src/assets/images
const allImageModules = import.meta.glob('@/assets/images/**/*.{jpg,jpeg,png,webp,svg}', {
  eager: true,
  import: 'default'
}) as Record<string, string>

export function useAllImages(): string[] {
  return useMemo(() => {
    // Converter o objeto em array de URLs
    const images = Object.values(allImageModules)
    
    // Remover duplicatas (caso existam)
    return Array.from(new Set(images))
  }, [])
}

