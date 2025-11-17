# 🚀 Como Criar o Executável

## Passo a Passo

### 1. Instalar dependências (se ainda não instalou)
```bash
npm install
```

### 2. Gerar o executável
```bash
npm run build:exe
```

Este comando vai:
- ✅ Fazer o build da aplicação (criar a pasta `dist`)
- ✅ Criar o executável `VillaVistaShowroom.exe` dentro da pasta `dist`

### 3. Copiar para o computador de apresentação

Você precisa copiar **TODA a pasta `dist`** para o computador onde será feita a apresentação.

A estrutura deve ficar assim:
```
dist/
  ├── VillaVistaShowroom.exe  ← O executável principal
  ├── index.html
  ├── assets/
  │   ├── (todos os arquivos CSS, JS, imagens, etc)
  │   └── ...
  └── (outros arquivos)
```

## 📦 Distribuição

### Opção 1: Compactar tudo
1. Compacte a pasta `dist` inteira em um arquivo ZIP
2. Envie para o computador de apresentação
3. Extraia o ZIP
4. Execute o `VillaVistaShowroom.exe`

### Opção 2: Copiar direto
1. Copie a pasta `dist` completa para um pendrive/HD externo
2. Cole no computador de apresentação
3. Execute o `VillaVistaShowroom.exe`

## 🎯 Como Usar (Para a Pessoa Leiga)

1. **Duplo clique** no arquivo `VillaVistaShowroom.exe`
2. Aguarde alguns segundos (o servidor está iniciando)
3. O navegador abrirá automaticamente com a aplicação
4. **Pronto!** A aplicação está funcionando

### Para Fechar:
- Feche a janela do navegador
- Feche a janela preta (terminal) que abriu junto, ou pressione `Ctrl+C` nela

## ⚠️ Importante

- **Não precisa de internet** - tudo funciona offline
- **Não precisa instalar nada** - o executável já contém tudo necessário
- **Não precisa de Node.js** - o executável é independente
- A pasta `dist` deve estar **completa** (não pode faltar nenhum arquivo)
- O executável e a pasta `dist` devem estar **no mesmo lugar**

## 🔧 Troubleshooting

### "Porta já está em uso"
- Feche outras aplicações que possam estar usando a porta 8080
- Ou reinicie o computador

### "Arquivo não encontrado"
- Certifique-se de que copiou TODA a pasta `dist`
- O executável deve estar dentro da pasta `dist`, junto com os outros arquivos

### Navegador não abre automaticamente
- Acesse manualmente: `http://localhost:8080`

## 📝 Notas Técnicas

- O executável funciona apenas no **Windows** (64-bit)
- Para criar executável para Mac ou Linux, altere o script `build:exe` no `package.json`
- O executável é grande (~50-70MB) porque inclui o Node.js embutido


