/**
 * Schemas de validação para Upload de Arquivos usando Zod
 */
import { z } from 'zod';

/**
 * Tipos MIME permitidos
 */
export const ALLOWED_MIME_TYPES = [
  // Documentos
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  
  // Imagens
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  
  // Texto
  'text/plain',
  'text/csv',
  'text/markdown',
  
  // Arquivos compactados
  'application/zip',
  'application/x-zip-compressed',
  'application/x-7z-compressed',
  'application/x-rar-compressed',
] as const;

/**
 * Extensões de arquivo permitidas
 */
export const ALLOWED_EXTENSIONS = [
  '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg',
  '.txt', '.csv', '.md',
  '.zip', '.7z', '.rar'
] as const;

/**
 * Tamanho máximo de arquivo (10MB)
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB em bytes

/**
 * Schema para validar arquivo
 */
export const fileSchema = z.object({
  name: z.string()
    .min(1, 'Nome do arquivo é obrigatório')
    .max(255, 'Nome do arquivo muito longo')
    .refine(
      (name) => ALLOWED_EXTENSIONS.some(ext => name.toLowerCase().endsWith(ext)),
      'Tipo de arquivo não permitido'
    ),
  
  size: z.number()
    .positive('Tamanho do arquivo deve ser positivo')
    .max(MAX_FILE_SIZE, `Arquivo muito grande (máximo ${MAX_FILE_SIZE / 1024 / 1024}MB)`),
  
  type: z.string()
    .refine(
      (type) => ALLOWED_MIME_TYPES.includes(type as any),
      'Tipo MIME não permitido'
    ),
});

/**
 * Schema para upload de evidência
 */
export const uploadEvidenceSchema = z.object({
  file: fileSchema,
  
  descricao: z.string()
    .max(1000, 'Descrição muito longa (máximo 1000 caracteres)')
    .trim()
    .optional(),
  
  policyId: z.string()
    .uuid('ID de política inválido')
    .optional(),
  
  riskId: z.string()
    .uuid('ID de risco inválido')
    .optional(),
  
  incidentId: z.string()
    .uuid('ID de incidente inválido')
    .optional(),
}).refine(
  (data) => data.policyId || data.riskId || data.incidentId,
  {
    message: 'Evidência deve estar associada a uma política, risco ou incidente',
    path: ['policyId'],
  }
);

/**
 * Helper para validar nome de arquivo contra lista negra
 */
export const BLOCKED_FILENAMES = [
  '.exe', '.bat', '.cmd', '.com', '.pif', '.scr',
  '.vbs', '.js', '.jar', '.msi', '.dll', '.sys',
  '.sh', '.bash', '.php', '.asp', '.aspx'
];

/**
 * Validar se arquivo tem extensão perigosa
 */
export function hasBlockedExtension(filename: string): boolean {
  const lowerName = filename.toLowerCase();
  return BLOCKED_FILENAMES.some(ext => lowerName.endsWith(ext));
}

/**
 * Validar magic bytes (primeiros bytes do arquivo)
 * Para prevenir bypass de validação por renomeação
 */
export const FILE_SIGNATURES: Record<string, number[]> = {
  'application/pdf': [0x25, 0x50, 0x44, 0x46], // %PDF
  'image/jpeg': [0xFF, 0xD8, 0xFF],
  'image/png': [0x89, 0x50, 0x4E, 0x47],
  'application/zip': [0x50, 0x4B, 0x03, 0x04],
  'image/gif': [0x47, 0x49, 0x46, 0x38],
};

/**
 * Verificar se magic bytes correspondem ao tipo MIME declarado
 */
export function validateFileSignature(
  buffer: Buffer,
  mimeType: string
): boolean {
  const signature = FILE_SIGNATURES[mimeType];
  if (!signature) return true; // Se não temos assinatura, permitir
  
  for (let i = 0; i < signature.length; i++) {
    if (buffer[i] !== signature[i]) {
      return false;
    }
  }
  
  return true;
}

/**
 * Sanitizar nome de arquivo
 * Remove caracteres especiais e espaços
 */
export function sanitizeFilename(filename: string): string {
  // Remover path traversal attempts
  const basename = filename.replace(/^.*[\\\/]/, '');
  
  // Remover caracteres especiais exceto . - _
  const sanitized = basename.replace(/[^a-zA-Z0-9._-]/g, '_');
  
  // Limitar comprimento
  const maxLength = 100;
  if (sanitized.length > maxLength) {
    const ext = sanitized.split('.').pop() || '';
    const name = sanitized.substring(0, maxLength - ext.length - 1);
    return `${name}.${ext}`;
  }
  
  return sanitized;
}

/**
 * Type inference
 */
export type FileInput = z.infer<typeof fileSchema>;
export type UploadEvidenceInput = z.infer<typeof uploadEvidenceSchema>;
