# ✅ Como Testar em Outro PC Sem Internet

## 🎯 Resumo Rápido

1. **Criar o executável** (no seu PC de desenvolvimento)
2. **Copiar a pasta `dist` completa** para o outro PC
3. **Duplo clique** no `VillaVistaShowroom.exe`
4. **Pronto!** A aplicação abre automaticamente

---

## 📝 Passo a Passo Detalhado

### PASSO 1: Criar o Executável (No Seu PC)

Abra o terminal na pasta do projeto e execute:

```bash
npm run build:exe
```

⏱️ **Tempo:** 2-5 minutos (primeira vez pode demorar mais)

✅ **Resultado:** Um arquivo `VillaVistaShowroom.exe` será criado dentro da pasta `dist`

---

### PASSO 2: Testar Localmente (Opcional mas Recomendado)

Antes de copiar, teste no seu PC:

1. Vá até a pasta `dist`
2. Dê **duplo clique** no `VillaVistaShowroom.exe`
3. Aguarde alguns segundos
4. O navegador deve abrir automaticamente
5. Se funcionar, está pronto! ✅

---

### PASSO 3: Copiar para o Outro PC

#### ⚠️ IMPORTANTE: Copie a PASTA INTEIRA!

Você precisa copiar **TODA a pasta `dist`**, não apenas o arquivo `.exe`!

**Estrutura que deve ser copiada:**
```
dist/
  ├── VillaVistaShowroom.exe  ← O executável
  ├── index.html
  ├── assets/                  ← TODA esta pasta
  │   ├── (muitos arquivos aqui)
  │   └── ...
  └── (outros arquivos)
```

#### Opções para Copiar:

**Opção A - Pendrive/HD Externo:**
1. Conecte o pendrive
2. Copie a pasta `dist` inteira para o pendrive
3. No outro PC, cole a pasta `dist` em qualquer lugar (ex: Desktop)

**Opção B - Compactar (ZIP):**
1. Clique com botão direito na pasta `dist`
2. "Enviar para" → "Pasta compactada (em zip)"
3. Copie o ZIP para o outro PC
4. Extraia o ZIP no outro PC

**Opção C - Rede Local:**
1. Compartilhe a pasta `dist` na rede
2. Acesse do outro PC e copie

---

### PASSO 4: Usar no Outro PC (Para Pessoa Leiga)

1. **Localize** o arquivo `VillaVistaShowroom.exe` dentro da pasta `dist`
2. **Duplo clique** no arquivo
3. **Aguarde** alguns segundos (uma janela preta vai aparecer - não feche!)
4. **O navegador abre automaticamente** com a aplicação
5. **Pronto!** Use normalmente

#### Para Fechar:
- Feche o navegador
- Feche a janela preta (ou pressione `Ctrl+C` nela)

---

## ❓ Perguntas Frequentes

### Precisa instalar algo no outro PC?
**Não!** O executável já contém tudo necessário, incluindo o Node.js.

### Precisa de internet?
**Não!** Tudo funciona offline.

### Posso mover só o arquivo .exe?
**Não!** Você precisa copiar a pasta `dist` inteira, com todos os arquivos.

### O executável funciona em Mac ou Linux?
**Não.** Este executável é apenas para Windows 64-bit. Para outros sistemas, precisa gerar um executável específico.

### E se não funcionar?
1. Verifique se copiou TODA a pasta `dist`
2. Verifique se o Windows não está bloqueando o arquivo
3. Tente executar como Administrador
4. Se a porta 8080 estiver ocupada, feche outras aplicações

---

## 🔄 Atualizar a Aplicação

Se você fizer mudanças:

1. Execute novamente: `npm run build:exe`
2. Copie a pasta `dist` atualizada novamente para o outro PC

---

## 💡 Dica Pro

Crie um **atalho** no Desktop do outro PC apontando para o `VillaVistaShowroom.exe` para facilitar o acesso!


