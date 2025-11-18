# Imagens Importadas

Esta pasta contém imagens que são importadas diretamente nos componentes React e otimizadas pelo Vite durante o build.

## Organização por Página

- `villavista/` - Imagens da página Villa Vista
- `masterplan/` - Imagens da página Masterplan
- `villavista-lago/` - Imagens da página Villa Vista Lago
- `teatro-loccitane/` - Imagens da página Teatro L'Occitane
- `villavista-falesias/` - Imagens da página Villa Vista Falesias
- `villavista-campo/` - Imagens da página Villa Vista Campo
- `novos-amenities/` - Imagens da página Novos Amenities
- `beach-club/` - Imagens da página Beach Club
- `aeroporto-terravista/` - Imagens da página Aeroporto Terravista
- `academia/` - Imagens da página Academia
- `complexo-terravista/` - Imagens da página Complexo Terravista
- `portaria-administracao/` - Imagens da página Portaria e Administração
- `terravista-golf/` - Imagens da página Terravista Golf
- `common/` - Imagens compartilhadas (logos, ícones, etc)

## Como Usar

### Importar em componentes:
```tsx
import heroImage from '@/assets/images/villavista/hero.jpg'
import logo from '@/assets/images/common/logo.png'

function MyComponent() {
  return (
    <div>
      <img src={heroImage} alt="Hero" />
      <img src={logo} alt="Logo" />
    </div>
  )
}
```

### Vantagens
- ✅ Otimização automática pelo Vite
- ✅ Hash nos nomes dos arquivos (cache busting)
- ✅ Verificação de tipos (TypeScript)
- ✅ Lazy loading automático

## Quando Usar Cada Pasta

**Use `public/images/` quando:**
- Imagens muito grandes (backgrounds, hero images)
- Imagens que não precisam de otimização
- Imagens referenciadas em CSS

**Use `src/assets/images/` quando:**
- Imagens que serão importadas em componentes
- Precisa de otimização automática
- Quer verificação de tipos




