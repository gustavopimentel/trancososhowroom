# Configuração de Viewport 1920x1080

## Como Funciona

A aplicação foi configurada para sempre renderizar em **1920x1080px** e escalar automaticamente para caber em qualquer tela, mantendo a proporção 16:9 sem distorções.

### Estratégia de Escala

1. **Container Fixo**: A aplicação sempre renderiza em um container de exatamente 1920x1080px
2. **Escala Automática**: O container é escalado usando CSS `transform: scale()` para caber na viewport
3. **Proporção Mantida**: A escala é calculada baseada na menor dimensão (largura ou altura) para manter a proporção 16:9

### Exemplo de Funcionamento

- **TV 1920x1080**: Scale = 1.0 (tamanho real, sem escala)
- **Monitor 2560x1440**: Scale = 0.75 (escala baseada na altura: 1440/1080 = 0.75)
- **Monitor 3840x2160 (4K)**: Scale = 0.5 (escala baseada na altura: 2160/1080 = 0.5)
- **Tela menor**: Scale > 1.0 (aplicação será ampliada)

## Características

### ✅ Suporte Touch
- Gestos de pinch desabilitados (previne zoom acidental)
- Touch events funcionam normalmente
- Elementos interativos otimizados para toque

### ✅ Suporte Mouse/Teclado
- Mouse funciona normalmente
- Teclado funciona normalmente
- Zoom com Ctrl+Scroll desabilitado

### ✅ Funciona Localmente e por URL
- Configuração funciona tanto em desenvolvimento local quanto em produção
- Não requer configurações especiais do servidor

## Desenvolvimento

Durante o desenvolvimento, você pode:

1. **Usar o navegador em modo janela**: A aplicação escalará automaticamente
2. **Usar DevTools em modo dispositivo**: Configure para 1920x1080 para ver tamanho real
3. **Testar em diferentes resoluções**: A aplicação sempre manterá a proporção

## Unidades de Medida

Dentro do container `.app-container`:
- Use **px** para medidas fixas baseadas em 1920x1080
- Use **rem/em** para medidas relativas à fonte
- Evite **vw/vh** dentro do container (use apenas no CSS global se necessário)

## Exemplo de Uso

```tsx
// Dentro de qualquer componente
<div className="w-[1920px] h-[1080px]">
  {/* Seu conteúdo aqui */}
  <div className="w-[500px] h-[300px]">
    {/* Elemento de 500x300px na resolução base */}
  </div>
</div>
```

## Troubleshooting

### A aplicação está muito pequena/grande
- Verifique se o hook `useViewportScale` está sendo usado corretamente
- Confirme que o container `.app-container` tem exatamente 1920x1080px

### Touch não funciona
- Verifique se `touch-action` está configurado corretamente
- Confirme que elementos interativos têm `touch-action: manipulation`

### Zoom acidental
- Os event listeners em `main.tsx` previnem zoom
- Se ainda ocorrer, verifique se o viewport meta tag está correto




