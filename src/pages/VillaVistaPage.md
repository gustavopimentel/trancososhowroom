# Página Villa Vista - Guia de Configuração

## Imagem de Fundo

Coloque a imagem de fundo em:
```
public/images/villavista/background.jpg
```

**Recomendações:**
- Resolução: exatamente 1920x1080px
- Formato: JPG (alta qualidade) ou WebP
- Tamanho: otimizado (< 500KB idealmente)

## Ajuste de Posições dos Marcadores

As posições dos marcadores são definidas em pixels baseados na resolução 1920x1080.

Para ajustar as posições, edite o arquivo `src/pages/VillaVistaPage.tsx`:

```tsx
const markers: Marker[] = [
  {
    id: 'falesias',
    label: 'VILLAVISTA FALÉSIAS',
    route: '/villavista-falesias',
    position: { x: 350, y: 750 }, // Ajuste aqui
  },
  {
    id: 'campo',
    label: 'VILLAVISTA CAMPO',
    route: '/villavista-campo',
    position: { x: 960, y: 350 }, // Ajuste aqui
  },
  {
    id: 'lago',
    label: 'VILLAVISTA LAGO',
    route: '/villavista-lago',
    position: { x: 1570, y: 280 }, // Ajuste aqui
  },
]
```

### Como encontrar as posições corretas:

1. Abra a aplicação no navegador
2. Abra o DevTools (F12)
3. Use a ferramenta de inspeção para ver as coordenadas
4. Ajuste os valores `x` e `y` no código

**Nota:** As coordenadas são em pixels, onde:
- `x: 0` = extremo esquerdo
- `x: 1920` = extremo direito
- `y: 0` = topo
- `y: 1080` = base

## Personalização

### Cores dos Marcadores

Edite as classes Tailwind no componente para mudar cores:
- `bg-white/90` - Cor de fundo do marcador
- `text-blue-600` - Cor do ícone quando hover
- `bg-blue-500/30` - Cor do efeito pulsante

### Tamanho dos Marcadores

Ajuste as classes:
- `w-16 h-16` - Tamanho do círculo do marcador
- `w-8 h-8` - Tamanho do ícone

### Animação

As animações são controladas pelo Framer Motion. Ajuste:
- `duration` - Velocidade da animação
- `delay` - Atraso entre marcadores aparecendo
- `scale` - Tamanho no hover/tap



