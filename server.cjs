const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8080;
// Quando executado como .exe via pkg, precisamos usar process.execPath para encontrar onde o .exe está
// O __dirname aponta para o snapshot interno, mas os arquivos estão no mesmo diretório do .exe
const isExecutable = typeof process.pkg !== 'undefined';
let DIST_PATH;

if (isExecutable) {
  // Quando executado como .exe, o executável está na pasta dist/
  // Então os arquivos HTML/CSS/JS também estão na mesma pasta (dist/)
  const exeDir = path.dirname(process.execPath);
  DIST_PATH = exeDir;
} else {
  // Quando executado via node server.cjs, __dirname é a raiz do projeto
  DIST_PATH = path.join(__dirname, 'dist');
}

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

function openBrowser(url) {
  const platform = process.platform;
  let command;

  if (platform === 'win32') {
    command = `start "" "${url}"`;
  } else if (platform === 'darwin') {
    command = `open "${url}"`;
  } else {
    command = `xdg-open "${url}"`;
  }

  exec(command, (error) => {
    if (error) {
      console.log(`Não foi possível abrir o navegador automaticamente. Acesse: ${url}`);
    }
  });
}

const server = http.createServer((req, res) => {
  // Handle OPTIONS requests for CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  try {
    // Decodificar URL para lidar com caracteres especiais (com tratamento de erro)
    let urlPath;
    try {
      urlPath = decodeURIComponent(req.url);
    } catch (e) {
      // Se já estiver decodificado, usa direto
      urlPath = req.url;
    }
    
    // Remove query string e hash
    urlPath = urlPath.split('?')[0].split('#')[0];
    
    // Determinar o arquivo a servir
    let filePath;
    if (urlPath === '/' || urlPath === '') {
      filePath = path.join(DIST_PATH, 'index.html');
    } else {
      // Remove a barra inicial se existir e normaliza
      urlPath = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath;
      // Normalizar apenas após remover a barra inicial
      urlPath = urlPath.replace(/\\/g, '/'); // Substituir barras invertidas
      filePath = path.join(DIST_PATH, ...urlPath.split('/'));
    }

    // Security: prevent directory traversal
    const resolvedPath = path.resolve(filePath);
    const resolvedDist = path.resolve(DIST_PATH);
    
    if (!resolvedPath.startsWith(resolvedDist)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        // Ignorar logs de 404 para arquivos não críticos (favicons, vite.svg, etc)
        const isNonCritical = /\.(ico|svg|png)$/i.test(urlPath) && 
                              (urlPath.includes('favicon') || urlPath.includes('vite.svg') || urlPath.includes('icon'));
        
        // Log para debug (apenas em desenvolvimento e apenas para arquivos críticos)
        if (process.env.NODE_ENV !== 'production' && !isNonCritical) {
          console.log(`[404] Arquivo não encontrado: ${urlPath} -> ${filePath}`);
        }
        // Try index.html for SPA routing (para rotas do React Router)
        const indexPath = path.join(DIST_PATH, 'index.html');
        fs.readFile(indexPath, (err, data) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found: ' + urlPath);
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        });
        return;
      }

      fs.readFile(filePath, (err, data) => {
        if (err) {
          // Log para debug
          if (process.env.NODE_ENV !== 'production') {
            console.log(`[500] Erro ao ler arquivo: ${filePath} - ${err.message}`);
          }
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error: ' + err.message);
          return;
        }

        const mimeType = getMimeType(filePath);
        // Adicionar headers de cache e CORS para assets estáticos
        const headers = {
          'Content-Type': mimeType,
          'Cache-Control': 'public, max-age=31536000', // 1 ano
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        };
        
        // Log para debug (apenas para assets)
        if (process.env.NODE_ENV !== 'production' && urlPath.startsWith('assets/')) {
          console.log(`[200] Servindo: ${urlPath} (${mimeType})`);
        }
        
        res.writeHead(200, headers);
        res.end(data);
      });
    });
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server Error: ' + error.message);
  }
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n🚀 Servidor iniciado em ${url}`);
  console.log(`📁 Servindo arquivos de: ${DIST_PATH}`);
  console.log(`🔧 Modo: ${isExecutable ? 'Executável (.exe)' : 'Node.js'}`);
  
  // Verificar se a pasta dist existe e tem arquivos
  fs.stat(DIST_PATH, (err, stats) => {
    if (err || !stats.isDirectory()) {
      console.error(`\n❌ ERRO: A pasta 'dist' não foi encontrada!`);
      console.log(`   Caminho esperado: ${DIST_PATH}`);
      console.log(`   Execute 'npm run build' primeiro para criar a pasta dist.\n`);
      console.log('Pressione qualquer tecla para sair...');
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.on('data', () => process.exit(1));
      return;
    }
    
    // Verificar se index.html existe
    const indexPath = path.join(DIST_PATH, 'index.html');
    fs.stat(indexPath, (err) => {
      if (err) {
        console.error(`\n❌ ERRO: Arquivo index.html não encontrado em ${DIST_PATH}`);
        console.log(`   Execute 'npm run build' primeiro.\n`);
        console.log('Pressione qualquer tecla para sair...');
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', () => process.exit(1));
        return;
      }
      
      console.log(`\n✨ Abrindo navegador...\n`);
      
      // Aguarda 1 segundo antes de abrir o navegador
      setTimeout(() => {
        openBrowser(url);
      }, 1000);
      
      console.log('Pressione Ctrl+C para encerrar o servidor\n');
    });
  });
});

// Tratamento de erros
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Erro: Porta ${PORT} já está em uso!`);
    console.log(`   Feche outras aplicações que possam estar usando esta porta.\n`);
  } else {
    console.error('Erro no servidor:', err);
  }
  console.log('\nPressione qualquer tecla para sair...');
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', () => process.exit(1));
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Encerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor encerrado com sucesso!\n');
    process.exit(0);
  });
});

