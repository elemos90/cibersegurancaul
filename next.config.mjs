/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Headers de Segurança - Proteção contra ataques comuns
  async headers() {
    return [
      {
        // Aplicar headers em todas as rotas
        source: '/:path*',
        headers: [
          // DNS Prefetch Control - Controle de pré-busca de DNS
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          // Strict-Transport-Security (HSTS) - Força uso de HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // X-Frame-Options - Proteção contra Clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          // X-Content-Type-Options - Previne MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // X-XSS-Protection - Proteção contra XSS (legado mas ainda útil)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Referrer-Policy - Controle de informações de referência
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Permissions-Policy - Controle de recursos do navegador
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          // Content-Security-Policy (CSP) - Proteção robusta contra XSS e injeção de código
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js precisa de unsafe-eval e unsafe-inline
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https: blob:",
              "connect-src 'self'",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ]
      }
    ];
  },
  
  // Configurações adicionais de segurança
  poweredByHeader: false, // Remove header X-Powered-By para não expor tecnologia
};

export default nextConfig;