const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { log } = require('./debug-log')

log('🚀 Iniciando servidor...')
log('NODE_ENV: ' + process.env.NODE_ENV)
log('DATABASE_URL: ' + (process.env.DATABASE_URL ? 'Configurado ✅' : 'NÃO CONFIGURADO ❌'))
log('NEXTAUTH_URL: ' + process.env.NEXTAUTH_URL)

console.log('🚀 Iniciando servidor...')
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Configurado ✅' : 'NÃO CONFIGURADO ❌')
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

log('Modo: ' + (dev ? 'Desenvolvimento' : 'Produção'))
log('Porta: ' + port)

console.log('Modo:', dev ? 'Desenvolvimento' : 'Produção')
console.log('Porta:', port)

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

log('Preparando aplicação Next.js...')
console.log('Preparando aplicação Next.js...')
app.prepare().then(() => {
  log('✅ Aplicação Next.js preparada!')
  console.log('✅ Aplicação Next.js preparada!');
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      log('❌ Error handling request: ' + req.url + ' - ' + err.message)
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      log('❌ ERRO FATAL: ' + err.message)
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      log(`✅ Servidor rodando em http://${hostname}:${port}`)
      console.log(`> Ready on http://${hostname}:${port}`)
    })
}).catch((err) => {
  log('❌ ERRO ao preparar aplicação: ' + err.message)
  console.error('Erro ao preparar aplicação:', err)
  process.exit(1)
})
