# Villa Vista Showroom

Aplicação de apresentação interativa para Villa Vista Showroom.

## 🚀 Deploy na Vercel

Este projeto está configurado para deploy automático na Vercel.

### Passos para fazer deploy:

1. **Conectar repositório GitHub à Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub
   - Clique em "Add New Project"
   - Selecione o repositório `trancososhowroom`
   - A Vercel detectará automaticamente as configurações do Vite

2. **Configurações automáticas:**
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

3. **Deploy:**
   - Clique em "Deploy"
   - Aguarde o build completar
   - Sua aplicação estará disponível em uma URL da Vercel

## 📦 Executável para Windows

Para criar o executável standalone:

```bash
npm run build:exe
```

O executável será criado em `dist/VillaVistaShowroom.exe`

## 🛠️ Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📱 Uso em Smart TV

Após fazer o deploy na Vercel, acesse a URL fornecida pelo navegador da Smart TV.
