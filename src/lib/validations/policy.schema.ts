/**
 * Schemas de validação para Policies usando Zod
 */
import { z } from 'zod';

// Enums que correspondem ao Prisma schema
export const PolicyCategoryEnum = z.enum([
  'acesso',
  'dados',
  'rede',
  'fisica',
  'desenvolvimento',
  'continuidade',
  'conformidade',
  'uso_aceitavel'
]);

export const PolicyStatusEnum = z.enum([
  'rascunho',
  'revisao',
  'aprovado',
  'ativo',
  'obsoleto'
]);

/**
 * Schema para criar nova política
 */
export const createPolicySchema = z.object({
  titulo: z.string()
    .min(5, 'Título deve ter no mínimo 5 caracteres')
    .max(200, 'Título deve ter no máximo 200 caracteres')
    .trim(),
  
  descricao: z.string()
    .min(10, 'Descrição deve ter no mínimo 10 caracteres')
    .max(5000, 'Descrição muito longa (máximo 5000 caracteres)')
    .trim(),
  
  categoria: PolicyCategoryEnum,
  
  status: PolicyStatusEnum.optional().default('rascunho'),
  
  versao: z.string()
    .regex(/^\d+\.\d+(\.\d+)?$/, 'Versão deve estar no formato X.Y ou X.Y.Z')
    .optional()
    .default('1.0'),
  
  dataVigencia: z.string()
    .datetime('Data inválida - use formato ISO 8601')
    .optional()
    .or(z.date().optional()),
  
  dataRevisao: z.string()
    .datetime('Data inválida - use formato ISO 8601')
    .optional()
    .or(z.date().optional()),
  
  aprovadoPor: z.string()
    .max(200, 'Nome do aprovador muito longo')
    .trim()
    .optional(),
  
  conteudo: z.string()
    .min(50, 'Conteúdo da política deve ter no mínimo 50 caracteres')
    .max(50000, 'Conteúdo muito longo (máximo 50000 caracteres)'),
  
  tags: z.string()
    .max(500, 'Tags muito longas')
    .optional(),
});

/**
 * Schema para atualizar política existente
 */
export const updatePolicySchema = createPolicySchema.partial();

/**
 * Schema para query parameters de listagem
 */
export const listPoliciesQuerySchema = z.object({
  categoria: PolicyCategoryEnum.optional(),
  status: PolicyStatusEnum.optional(),
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
});

/**
 * Type inference
 */
export type CreatePolicyInput = z.infer<typeof createPolicySchema>;
export type UpdatePolicyInput = z.infer<typeof updatePolicySchema>;
export type ListPoliciesQuery = z.infer<typeof listPoliciesQuerySchema>;
