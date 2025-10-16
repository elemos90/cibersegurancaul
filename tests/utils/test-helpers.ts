import { Session } from 'next-auth';
import { Papel } from '@prisma/client';

/**
 * Cria uma sessão mock para testes
 */
export function createMockSession(overrides?: Partial<Session>): Session {
  return {
    user: {
      id: 'test-user-id',
      email: 'test@unilicungo.ac.mz',
      name: 'Test User',
      papel: 'ti' as Papel,
      mustChangePassword: false,
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    ...overrides,
  } as Session;
}

/**
 * Cria uma sessão mock de admin
 */
export function createMockAdminSession(): Session {
  return createMockSession({
    user: {
      id: 'admin-id',
      email: 'admin@unilicungo.ac.mz',
      name: 'Admin User',
      papel: 'admin' as Papel,
      mustChangePassword: false,
    } as any,
  });
}

/**
 * Aguarda um tempo determinado (útil para testes assíncronos)
 */
export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Mock de fetch responses
 */
export function createFetchResponse<T>(data: T, options?: ResponseInit) {
  return {
    ok: true,
    status: 200,
    json: async () => data,
    text: async () => JSON.stringify(data),
    ...options,
  } as Response;
}

/**
 * Mock de erro de fetch
 */
export function createFetchErrorResponse(status: number, message: string) {
  return {
    ok: false,
    status,
    json: async () => ({ error: message }),
    text: async () => JSON.stringify({ error: message }),
  } as Response;
}
