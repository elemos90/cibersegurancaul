/**
 * Schemas de validação para Incidents usando Zod
 */
import { z } from 'zod';

// Enums que correspondem ao Prisma schema
export const IncidentCategoryEnum = z.enum([
  'malware',
  'phishing',
  'acesso_nao_autorizado',
  'perda_dados',
  'ddos',
  'vulnerabilidade',
  'violacao_politica',
  'outro'
]);

export const SeverityEnum = z.enum([
  'baixa',
  'media',
  'alta',
  'critica'
]);

export const IncidentStatusEnum = z.enum([
  'aberto',
  'em_investigacao',
  'em_resolucao',
  'resolvido',
  'fechado'
]);

/**
 * Schema para criar novo incidente
 */
export const createIncidentSchema = z.object({
  titulo: z.string()
    .min(5, 'Título deve ter no mínimo 5 caracteres')
    .max(200, 'Título deve ter no máximo 200 caracteres')
    .trim(),
  
  descricao: z.string()
    .min(10, 'Descrição deve ter no mínimo 10 caracteres')
    .max(10000, 'Descrição muito longa (máximo 10000 caracteres)')
    .trim(),
  
  categoria: IncidentCategoryEnum,
  
  severidade: SeverityEnum,
  
  status: IncidentStatusEnum.optional().default('aberto'),
  
  dataDeteccao: z.string()
    .datetime('Data inválida - use formato ISO 8601')
    .optional()
    .or(z.date().optional()),
  
  fonteDeteccao: z.string()
    .max(200, 'Fonte de detecção muito longa')
    .trim()
    .optional(),
  
  dataResposta: z.string()
    .datetime('Data inválida - use formato ISO 8601')
    .optional()
    .or(z.date().optional()),
  
  acaoImediata: z.string()
    .max(5000, 'Ação imediata muito longa (máximo 5000 caracteres)')
    .trim()
    .optional(),
  
  dataResolucao: z.string()
    .datetime('Data inválida - use formato ISO 8601')
    .optional()
    .or(z.date().optional()),
  
  resolucao: z.string()
    .max(5000, 'Resolução muito longa (máximo 5000 caracteres)')
    .trim()
    .optional(),
  
  causaRaiz: z.string()
    .max(5000, 'Causa raiz muito longa (máximo 5000 caracteres)')
    .trim()
    .optional(),
  
  sistemaAfetado: z.string()
    .max(500, 'Sistema afetado muito longo')
    .trim()
    .optional(),
  
  dadosCompromissos: z.boolean()
    .optional()
    .default(false),
  
  tempoIndisponibilidade: z.number()
    .int('Tempo de indisponibilidade deve ser um número inteiro')
    .min(0, 'Tempo de indisponibilidade não pode ser negativo')
    .max(525600, 'Tempo de indisponibilidade muito alto (máximo 1 ano em minutos)')
    .optional(),
  
  responsavel: z.string()
    .max(200, 'Nome do responsável muito longo')
    .trim()
    .optional(),
});

/**
 * Schema para atualizar incidente existente
 */
export const updateIncidentSchema = createIncidentSchema.partial();

/**
 * Schema para query parameters de listagem
 */
export const listIncidentsQuerySchema = z.object({
  categoria: IncidentCategoryEnum.optional(),
  status: IncidentStatusEnum.optional(),
  severidade: SeverityEnum.optional(),
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
});

/**
 * Type inference
 */
export type CreateIncidentInput = z.infer<typeof createIncidentSchema>;
export type UpdateIncidentInput = z.infer<typeof updateIncidentSchema>;
export type ListIncidentsQuery = z.infer<typeof listIncidentsQuerySchema>;
