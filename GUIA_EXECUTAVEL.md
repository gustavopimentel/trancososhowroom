# 🚀 Guia Completo: Como Criar e Usar o Executável

## 📋 Índice
1. [Criar o Executável](#criar-o-executável)
2. [Testar Localmente](#testar-localmente)
3. [Copiar para Outro PC](#copiar-para-outro-pc)
4. [Como Usar (Para Pessoa Leiga)](#como-usar-para-pessoa-leiga)
5. [Solução de Problemas](#solução-de-problemas)

---

## 1️⃣ Criar o Executável

### Passo 1: Abrir o Terminal
- Abra o PowerShell ou CMD na pasta do projeto
- Ou use o terminal integrado do VS Code/Cursor

### Passo 2: Executar o Comando
```bash
npm run build:exe
```

Este comando vai:
- ✅ Fazer o build da aplicação (criar/atualizar a pasta `dist`)
- ✅ Criar o executável `VillaVistaShowroom.exe` dentro da pasta `dist`
- ⏱️ Pode levar alguns minutos na primeira vez (baixa o Node.js para embutir)

### Passo 3: Verificar
Após concluir, você deve ver:
- Um arquivo `VillaVistaShowroom.exe` dentro da pasta `dist`
- O executável terá aproximadamente 50-70MB

---

## 2️⃣ Testar Localmente

### Opção A: Testar o Executável (Recomendado)
1. Vá até a pasta `dist`
2. Dê **duplo clique** no `VillaVistaShowroom.exe`
3. Aguarde alguns segundos
4. O navegador deve abrir automaticamente em `http://localhost:8080`
5. ✅ Se funcionar, está pronto para copiar!

### Opção B: Testar o Servidor (Desenvolvimento)
```bash
npm start
```
Isso testa o servidor sem criar o executável.

---

## 3️⃣ Copiar para Outro PC

### ⚠️ IMPORTANTE: Copiar TUDO
Você precisa copiar **TODA a pasta `dist`** completa, não apenas o `.exe`!

### Estrutura Correta:
```
dist/
  ├── VillaVistaShowroom.exe  ← O executável principal
  ├── index.html
  ├── assets/
  │   ├── (todos os arquivos CSS, JS, imagens, etc)
  │   └── ...
  └── (outros arquivos e pastas)
```

### Métodos de Cópia:

#### Método 1: Pendrive/HD Externo
1. Conecte o pendrive/HD externo
2. Copie a pasta `dist` inteira para o pendrive
3. No outro PC, cole a pasta `dist` em qualquer lugar (ex: Desktop)
4. Pronto!

#### Método 2: Compactar (ZIP)
1. Clique com botão direito na pasta `dist`
2. Selecione "Enviar para" → "Pasta compactada (em zip)"
3. Copie o arquivo ZIP para o outro PC
4. Extraia o ZIP no outro PC
5. Pronto!

#### Método 3: Rede Local
1. Compartilhe a pasta `dist` na rede
2. Acesse do outro PC
3. Copie a pasta completa
4. Pronto!

---

## 4️⃣ Como Usar (Para Pessoa Leiga)

### 🎯 Passo a Passo Simples:

1. **Localize o arquivo**
   - Procure por `VillaVistaShowroom.exe` na pasta `dist`
   - É um ícone de aplicativo Windows

2. **Duplo clique**
   - Dê duplo clique no arquivo `VillaVistaShowroom.exe`
   - Aguarde alguns segundos (o servidor está iniciando)

3. **Aguarde o navegador abrir**
   - Uma janela preta (terminal) vai aparecer - **NÃO FECHE ELA!**
   - O navegador vai abrir automaticamente com a aplicação
   - Se não abrir automaticamente, digite no navegador: `http://localhost:8080`

4. **Pronto!**
   - A aplicação está funcionando!
   - Use normalmente para apresentar aos clientes

### 🛑 Para Fechar:
1. Feche a janela do navegador
2. Volte na janela preta (terminal)
3. Pressione `Ctrl+C` ou simplesmente feche a janela

---

## 5️⃣ Solução de Problemas

### ❌ "Porta 8080 já está em uso"
**Solução:**
- Feche outras aplicações que possam estar usando a porta 8080
- Ou reinicie o computador

### ❌ "Arquivo não encontrado" ou página em branco
**Solução:**
- Certifique-se de que copiou **TODA a pasta `dist`**
- O executável deve estar **dentro** da pasta `dist`, junto com os outros arquivos
- Não mova apenas o `.exe` sozinho!

### ❌ Navegador não abre automaticamente
**Solução:**
- Abra o navegador manualmente (Chrome, Edge, Firefox)
- Digite na barra de endereço: `http://localhost:8080`
- Pressione Enter

### ❌ Aplicação não carrega completamente
**Solução:**
- Verifique se todos os arquivos da pasta `dist` foram copiados
- Verifique se não há arquivos faltando na pasta `assets`
- Tente executar novamente

### ❌ Executável não abre
**Solução:**
- Verifique se o Windows não está bloqueando o arquivo
- Clique com botão direito → Propriedades → Desbloquear (se aparecer)
- Tente executar como Administrador

---

## 📝 Notas Importantes

✅ **Funciona offline** - Não precisa de internet  
✅ **Não precisa instalar nada** - O executável já contém tudo  
✅ **Não precisa de Node.js** - Está embutido no executável  
✅ **Windows 64-bit** - Funciona em Windows 10/11 (64-bit)  

⚠️ **A pasta `dist` deve estar completa** - Não pode faltar nenhum arquivo  
⚠️ **O executável deve estar dentro da pasta `dist`** - Não mova só o `.exe`  
⚠️ **Não feche a janela preta** - Ela mantém o servidor rodando  

---

## 🔄 Atualizar a Aplicação

Se você fizer mudanças no código:

1. Execute novamente: `npm run build:exe`
2. Isso vai atualizar a pasta `dist` e recriar o executável
3. Copie a pasta `dist` atualizada para o outro PC

---

## 💡 Dicas

- **Crie um atalho** no Desktop do outro PC para facilitar o acesso
- **Renomeie a pasta** `dist` para algo mais amigável, como `VillaVista_Aplicacao`
- **Teste sempre** no computador de apresentação antes do evento importante

---

## 🆘 Precisa de Ajuda?

Se algo não funcionar:
1. Verifique se seguiu todos os passos
2. Leia a seção "Solução de Problemas" acima
3. Teste localmente primeiro antes de copiar para outro PC


