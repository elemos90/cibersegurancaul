/**
 * Schemas de validação para Autenticação usando Zod
 */
import { z } from 'zod';

/**
 * Regex para validação de senha forte
 * - Mínimo 8 caracteres
 * - Pelo menos uma letra maiúscula
 * - Pelo menos uma letra minúscula
 * - Pelo menos um número
 * - Pelo menos um caractere especial
 */
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

/**
 * Schema para login
 */
export const loginSchema = z.object({
  email: z.string()
    .email('Email inválido')
    .toLowerCase()
    .trim()
    .refine(
      (email) => email.endsWith('@unilicungo.ac.mz'),
      'Apenas emails institucionais (@unilicungo.ac.mz) são permitidos'
    ),
  
  password: z.string()
    .min(1, 'Senha é obrigatória'),
});

/**
 * Schema para mudança de senha
 */
export const changePasswordSchema = z.object({
  currentPassword: z.string()
    .min(1, 'Senha atual é obrigatória'),
  
  newPassword: z.string()
    .min(8, 'Nova senha deve ter no mínimo 8 caracteres')
    .max(100, 'Nova senha muito longa')
    .regex(
      strongPasswordRegex,
      'Senha deve conter: maiúscula, minúscula, número e caractere especial (@$!%*?&#)'
    ),
  
  confirmPassword: z.string()
    .min(1, 'Confirmação de senha é obrigatória'),
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  }
).refine(
  (data) => data.currentPassword !== data.newPassword,
  {
    message: 'Nova senha deve ser diferente da senha atual',
    path: ['newPassword'],
  }
);

/**
 * Schema para criação de usuário (admin)
 */
export const createUserSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(200, 'Nome muito longo')
    .trim(),
  
  email: z.string()
    .email('Email inválido')
    .toLowerCase()
    .trim()
    .refine(
      (email) => email.endsWith('@unilicungo.ac.mz'),
      'Apenas emails institucionais (@unilicungo.ac.mz) são permitidos'
    ),
  
  papel: z.enum(['admin', 'secops', 'ti', 'dono_dado', 'auditoria']),
  
  password: z.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .max(100, 'Senha muito longa')
    .regex(
      strongPasswordRegex,
      'Senha deve conter: maiúscula, minúscula, número e caractere especial'
    ),
  
  mustChangePassword: z.boolean()
    .optional()
    .default(true),
});

/**
 * Schema para atualizar usuário
 */
export const updateUserSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(200, 'Nome muito longo')
    .trim()
    .optional(),
  
  papel: z.enum(['admin', 'secops', 'ti', 'dono_dado', 'auditoria'])
    .optional(),
  
  mustChangePassword: z.boolean()
    .optional(),
});

/**
 * Schema para reset de senha (admin)
 */
export const resetPasswordSchema = z.object({
  userId: z.string()
    .uuid('ID de usuário inválido'),
  
  newPassword: z.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .max(100, 'Senha muito longa')
    .regex(
      strongPasswordRegex,
      'Senha deve conter: maiúscula, minúscula, número e caractere especial'
    ),
  
  mustChangePassword: z.boolean()
    .optional()
    .default(true),
});

/**
 * Type inference
 */
export type LoginInput = z.infer<typeof loginSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
