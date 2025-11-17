# 🔍 Como Testar e Diagnosticar Problemas com Imagens

## Passos para Diagnosticar

### 1. Abrir o Console do Navegador
- Pressione **F12** no navegador
- Vá para a aba **Console**
- Vá para a aba **Network** (Rede)

### 2. Recarregar a Página
- Pressione **Ctrl+F5** (limpa o cache e recarrega)
- Ou **Ctrl+Shift+R**

### 3. Verificar Erros no Console
Procure por erros como:
- `404 Not Found` - Arquivo não encontrado
- `Failed to load resource` - Falha ao carregar recurso
- `CORS policy` - Problema de CORS

### 4. Verificar Requisições na Aba Network
- Filtre por **Img** ou **All**
- Veja quais arquivos estão retornando **404** ou **500**
- Clique em um arquivo que falhou para ver detalhes

### 5. Informações para Enviar
Quando reportar o problema, envie:
- Screenshot do Console com os erros
- Lista dos arquivos que estão falhando (da aba Network)
- Qual página você está acessando quando o problema acontece

## Teste Rápido

1. Acesse: `http://localhost:8080`
2. Abra o Console (F12)
3. Veja se há erros
4. Vá para a aba Network
5. Recarregue a página (Ctrl+F5)
6. Veja quais arquivos estão falhando

## Soluções Comuns

### Se aparecer 404:
- O arquivo não está na pasta `dist`
- O caminho está errado
- O servidor não está servindo o arquivo corretamente

### Se aparecer CORS:
- O servidor precisa de headers CORS (já adicionado)

### Se aparecer erro de cache:
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Ou use modo anônimo/privado


