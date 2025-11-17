# Pasta de Fontes

Coloque seus arquivos de fonte aqui nesta pasta.

## Como chegar até aqui:

**Caminho completo:**
```
d:\villavistashowroom\public\fonts\
```

**No Windows Explorer:**
1. Abra o Windows Explorer
2. Navegue até: `d:\villavistashowroom\public\fonts\`
3. Ou cole o caminho acima na barra de endereço

**No VS Code/Cursor:**
- A pasta já está visível na estrutura do projeto em: `public/fonts/`
- Clique com o botão direito na pasta e selecione "Reveal in File Explorer" (Revelar no Explorador de Arquivos)

## Arquivos esperados:

### Nexa (sans-serif):
- `Nexa-Thin.woff2` (peso 100)
- `Nexa-ExtraLight.woff2` (peso 200)
- `Nexa-Light.woff2` (peso 300)
- `Nexa-Book.woff2` (peso 350)
- `Nexa-Regular.woff2` (peso 400)
- `Nexa-SemiBold.woff2` (peso 600)
- `Nexa-Bold.woff2` (peso 700)
- `Nexa-ExtraBold.woff2` (peso 800)
- `Nexa-Heavy.woff2` (peso 900)
- `Nexa-Black.woff2` (peso 950)

### Meno Banner (serif):
- `MenoBanner-Thin.woff2` (peso 100)
- `MenoBanner-ExtraLight.woff2` (peso 200)
- `MenoBanner-Light.woff2` (peso 300)
- `MenoBanner-Book.woff2` (peso 350)
- `MenoBanner-Regular.woff2` (peso 400)
- `MenoBanner-SemiBold.woff2` (peso 600)
- `MenoBanner-Bold.woff2` (peso 700)
- `MenoBanner-ExtraBold.woff2` (peso 800)
- `MenoBanner-Heavy.woff2` (peso 900)
- `MenoBanner-Black.woff2` (peso 950)

## Importante:

- Use apenas arquivos `.woff2` (formato recomendado)
- Os nomes dos arquivos devem corresponder exatamente aos nomes acima
- Após adicionar as fontes, reinicie o servidor de desenvolvimento (`npm run dev`)
- As fontes serão carregadas automaticamente pelo CSS já configurado

## Exemplo de uso no código:

```tsx
// Usar Nexa (sans-serif)
<h1 className="font-sans font-bold">Título</h1>

// Usar Meno Banner (serif)
<p className="font-serif font-regular">Texto</p>
```



