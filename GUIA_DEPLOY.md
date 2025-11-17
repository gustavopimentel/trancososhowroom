# 🚀 Guia de Deploy na Vercel

## Passo 1: Inicializar Git e conectar ao GitHub

Execute os seguintes comandos no terminal (PowerShell):

```powershell
# Inicializar Git
git init

# Adicionar todos os arquivos
git add .

# Fazer commit inicial
git commit -m "Initial commit - Villa Vista Showroom"

# Adicionar o repositório remoto do GitHub
git remote add origin https://github.com/gustavopimentel/trancososhowroom.git

# Fazer push para o GitHub
git branch -M main
git push -u origin main
```

**Nota:** Se o repositório já tiver conteúdo, você pode precisar fazer:
```powershell
git pull origin main --allow-unrelated-histories
```
antes do push.

## Passo 2: Conectar à Vercel

1. **Acesse a Vercel:**
   - Vá para [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub

2. **Criar novo projeto:**
   - Clique em **"Add New Project"** ou **"New Project"**
   - Selecione o repositório `trancososhowroom`
   - A Vercel detectará automaticamente que é um projeto Vite

3. **Configurações (já estão no vercel.json):**
   - ✅ **Framework Preset:** Vite
   - ✅ **Build Command:** `npm run build`
   - ✅ **Output Directory:** `dist`
   - ✅ **Install Command:** `npm install`

4. **Deploy:**
   - Clique em **"Deploy"**
   - Aguarde o build completar (2-3 minutos)
   - Sua aplicação estará disponível em uma URL como: `https://trancososhowroom.vercel.app`

## Passo 3: Acessar na Smart TV

1. **Anotar a URL:**
   - Após o deploy, copie a URL fornecida pela Vercel
   - Exemplo: `https://trancososhowroom.vercel.app`

2. **Abrir na Smart TV:**
   - Abra o navegador da Smart TV
   - Digite a URL da Vercel
   - A aplicação carregará automaticamente

## 🔄 Atualizações Futuras

Sempre que você fizer alterações:

```powershell
# Fazer commit das mudanças
git add .
git commit -m "Descrição das mudanças"

# Enviar para o GitHub
git push origin main
```

A Vercel detectará automaticamente e fará um novo deploy!

## 📝 Notas Importantes

- ✅ O deploy é automático a cada push no GitHub
- ✅ A URL é permanente e pode ser compartilhada
- ✅ Funciona em qualquer dispositivo com navegador (Smart TV, tablet, celular, etc.)
- ✅ Não precisa de servidor local ou executável

