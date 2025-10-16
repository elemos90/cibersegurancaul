/**
 * Rate Limiting para proteção contra força bruta e abuso de APIs
 * Implementação em memória - para produção considere Redis
 */

import { NextRequest, NextResponse } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// Cache em memória (para produção, usar Redis)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Limpeza automática do cache a cada 1 hora
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 60 * 60 * 1000);

interface RateLimitConfig {
  windowMs: number;      // Janela de tempo em ms
  maxRequests: number;   // Máximo de requisições permitidas
  message?: string;      // Mensagem de erro customizada
  skipSuccessfulRequests?: boolean; // Não contar requisições bem-sucedidas
}

/**
 * Obter identificador único do cliente (IP + User Agent)
 */
function getClientIdentifier(req: NextRequest): string {
  // Tentar obter IP real (considerando proxies)
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';
  
  // Adicionar User Agent para maior granularidade
  const userAgent = req.headers.get('user-agent') || 'unknown';
  const fingerprint = `${ip}:${userAgent.substring(0, 50)}`;
  
  return fingerprint;
}

/**
 * Middleware de Rate Limiting
 */
export async function rateLimit(
  req: NextRequest,
  config: RateLimitConfig
): Promise<NextResponse | null> {
  const identifier = getClientIdentifier(req);
  const key = `${identifier}:${req.nextUrl.pathname}`;
  const now = Date.now();

  // Obter ou criar entrada
  let entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    // Nova janela de tempo
    entry = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    rateLimitStore.set(key, entry);
    return null; // Permitir requisição
  }

  // Incrementar contador
  entry.count++;

  // Verificar se excedeu o limite
  if (entry.count > config.maxRequests) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
    
    return NextResponse.json(
      {
        error: config.message || 'Muitas requisições. Tente novamente mais tarde.',
        retryAfter,
      },
      {
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': config.maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(entry.resetTime).toISOString(),
        },
      }
    );
  }

  // Requisição permitida - adicionar headers informativos
  return null;
}

/**
 * Helper para adicionar headers de rate limit nas respostas bem-sucedidas
 */
export function addRateLimitHeaders(
  response: NextResponse,
  req: NextRequest,
  config: RateLimitConfig
): NextResponse {
  const identifier = getClientIdentifier(req);
  const key = `${identifier}:${req.nextUrl.pathname}`;
  const entry = rateLimitStore.get(key);

  if (entry) {
    const remaining = Math.max(0, config.maxRequests - entry.count);
    response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('X-RateLimit-Reset', new Date(entry.resetTime).toISOString());
  }

  return response;
}

/**
 * Configurações pré-definidas para diferentes tipos de endpoints
 */

// Autenticação - Muito restritivo
export const authRateLimitConfig: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutos
  maxRequests: 5,            // 5 tentativas
  message: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
};

// APIs de escrita - Restritivo
export const writeRateLimitConfig: RateLimitConfig = {
  windowMs: 60 * 1000,  // 1 minuto
  maxRequests: 10,       // 10 requisições por minuto
  message: 'Muitas requisições de escrita. Aguarde um momento.',
};

// APIs de leitura - Moderado
export const readRateLimitConfig: RateLimitConfig = {
  windowMs: 60 * 1000,  // 1 minuto
  maxRequests: 60,       // 60 requisições por minuto
  message: 'Muitas requisições. Aguarde um momento.',
};

// Upload de arquivos - Muito restritivo
export const uploadRateLimitConfig: RateLimitConfig = {
  windowMs: 60 * 60 * 1000, // 1 hora
  maxRequests: 20,           // 20 uploads por hora
  message: 'Limite de uploads atingido. Tente novamente mais tarde.',
};

// Admin operations - Restritivo
export const adminRateLimitConfig: RateLimitConfig = {
  windowMs: 60 * 1000,  // 1 minuto
  maxRequests: 30,       // 30 requisições por minuto
  message: 'Muitas operações administrativas. Aguarde um momento.',
};

/**
 * Helper para limpar rate limit de um usuário específico (útil para testes ou desbloqueio manual)
 */
export function clearRateLimit(identifier: string, pathname?: string): void {
  if (pathname) {
    rateLimitStore.delete(`${identifier}:${pathname}`);
  } else {
    // Limpar todas as entradas do identificador
    for (const key of rateLimitStore.keys()) {
      if (key.startsWith(identifier)) {
        rateLimitStore.delete(key);
      }
    }
  }
}

/**
 * Obter estatísticas de rate limiting (útil para monitoramento)
 */
export function getRateLimitStats() {
  return {
    totalEntries: rateLimitStore.size,
    entries: Array.from(rateLimitStore.entries()).map(([key, value]) => ({
      key,
      count: value.count,
      resetTime: new Date(value.resetTime).toISOString(),
    })),
  };
}
