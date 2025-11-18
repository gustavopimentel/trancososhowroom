# Estrutura de Imagens

Esta pasta contém imagens estáticas que são servidas diretamente pelo servidor.

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
- `common/` - Imagens compartilhadas (logos, backgrounds, etc)

## Como Usar

### Em componentes React:
```tsx
// Acesse diretamente via URL
<img src="/images/villavista/hero.jpg" alt="Hero" />

// Ou como background
<div style={{ backgroundImage: 'url(/images/villavista/hero.jpg)' }} />
```

### Formatos Recomendados
- **JPG** - Para fotografias e imagens com muitas cores
- **PNG** - Para imagens com transparência
- **WebP** - Para melhor compressão (se suportado)
- **SVG** - Para logos e ícones vetoriais




