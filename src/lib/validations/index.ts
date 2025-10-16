/**
 * Central export para todos os schemas de validação
 */

// Risk schemas
export * from './risk.schema';

// Policy schemas
export * from './policy.schema';

// Incident schemas
export * from './incident.schema';

// Auth schemas
export * from './auth.schema';

// Upload schemas
export * from './upload.schema';

/**
 * Helper para formatar erros de validação Zod
 */
import { ZodError } from 'zod';

export interface ValidationError {
  campo: string;
  mensagem: string;
}

export function formatZodError(error: ZodError): ValidationError[] {
  return error.errors.map((err) => ({
    campo: err.path.join('.') || 'geral',
    mensagem: err.message,
  }));
}

/**
 * Helper para validar dados com schema Zod
 * Retorna dados validados ou lança erro
 */
export async function validateData<T>(
  schema: any,
  data: unknown
): Promise<T> {
  try {
    return await schema.parseAsync(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError(formatZodError(error));
    }
    throw error;
  }
}

/**
 * Classe de erro customizada para validação
 */
export class ValidationError extends Error {
  public errors: ValidationError[];
  
  constructor(errors: ValidationError[]) {
    super('Erro de validação');
    this.name = 'ValidationError';
    this.errors = errors;
  }
}
