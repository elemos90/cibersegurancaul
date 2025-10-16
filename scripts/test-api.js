// Teste da API de riscos
const http = require('http');

function testAPI() {
  console.log('🧪 Testando API de Riscos...\n');
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/risks',
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  };

  const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers:`, JSON.stringify(res.headers, null, 2));
    
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('\nResposta:');
      try {
        const json = JSON.parse(data);
        if (Array.isArray(json)) {
          console.log(`✅ API retornou ${json.length} riscos`);
          if (json.length > 0) {
            console.log('\nPrimeiro risco:', JSON.stringify(json[0], null, 2));
          }
        } else {
          console.log('❌ Resposta não é um array:', json);
        }
      } catch (e) {
        console.log('❌ Erro ao parsear JSON:', data.substring(0, 500));
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Erro na requisição:', error.message);
    console.log('\n💡 Certifique-se de que o servidor está rodando: npm run dev');
  });

  req.end();
}

testAPI();
