/**
 * Schemas de validação para Risks usando Zod
 */
import { z } from 'zod';

// Enums que correspondem ao Prisma schema
export const RiskCategoryEnum = z.enum([
  'tecnologico',
  'humano',
  'processo',
  'externo',
  'compliance',
  'reputacional'
]);

export const RiskLevelEnum = z.enum([
  'muito_baixo',
  'baixo',
  'medio',
  'alto',
  'muito_alto'
]);

export const RiskStatusEnum = z.enum([
  'identificado',
  'em_analise',
  'em_tratamento',
  'mitigado',
  'aceito',
  'transferido'
]);

export const RiskStrategyEnum = z.enum([
  'mitigar',
  'aceitar',
  'transferir',
  'evitar'
]);

/**
 * Schema para criar novo risco
 */
export const createRiskSchema = z.object({
  titulo: z.string()
    .min(5, 'Título deve ter no mínimo 5 caracteres')
    .max(200, 'Título deve ter no máximo 200 caracteres')
    .trim(),
  
  descricao: z.string()
    .min(10, 'Descrição deve ter no mínimo 10 caracteres')
    .max(5000, 'Descrição muito longa (máximo 5000 caracteres)')
    .trim(),
  
  categoria: RiskCategoryEnum,
  
  probabilidade: RiskLevelEnum,
  
  impacto: RiskLevelEnum,
  
  status: RiskStatusEnum.optional().default('identificado'),
  
  estrategia: RiskStrategyEnum.optional(),
  
  planoAcao: z.string()
    .max(5000, 'Plano de ação muito longo (máximo 5000 caracteres)')
    .trim()
    .optional(),
  
  responsavel: z.string()
    .max(200, 'Nome do responsável muito longo')
    .trim()
    .optional(),
  
  prazo: z.string()
    .datetime('Data inválida - use formato ISO 8601')
    .optional()
    .or(z.date().optional()),
  
  probResidual: RiskLevelEnum.optional(),
  
  impactoResidual: RiskLevelEnum.optional(),
});

/**
 * Schema para atualizar risco existente
 * Todos os campos são opcionais
 */
export const updateRiskSchema = createRiskSchema.partial();

/**
 * Schema para query parameters de listagem
 */
export const listRisksQuerySchema = z.object({
  categoria: RiskCategoryEnum.optional(),
  status: RiskStatusEnum.optional(),
  nivelMin: RiskLevelEnum.optional(),
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
});

/**
 * Type inference
 */
export type CreateRiskInput = z.infer<typeof createRiskSchema>;
export type UpdateRiskInput = z.infer<typeof updateRiskSchema>;
export type ListRisksQuery = z.infer<typeof listRisksQuerySchema>;
