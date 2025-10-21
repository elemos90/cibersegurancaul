-- ============================================
-- Script: Criar Usuário Admin
-- Banco: Portal de Cibersegurança UniLicungo
-- ============================================

-- IMPORTANTE: 
-- 1. Execute este script no phpMyAdmin do cPanel
-- 2. Substitua o hash da senha pelo gerado em https://bcrypt-generator.com/
-- 3. Use a senha: Admin@2025 (ou escolha outra)
-- 4. Rounds do bcrypt: 10

-- ============================================
-- PASSO 1: Limpar usuário admin existente (se houver)
-- ============================================
DELETE FROM `User` WHERE email = 'admin@unilicungo.ac.mz';

-- ============================================
-- PASSO 2: Criar novo usuário admin
-- ============================================

-- Hash bcrypt da senha "Admin@2025" (rounds: 10)
-- Gerado em: https://bcrypt-generator.com/
-- SUBSTITUA o valor abaixo pelo hash real que você gerar!

INSERT INTO `User` (
  `id`, 
  `name`, 
  `email`, 
  `password`, 
  `role`, 
  `emailVerified`, 
  `createdAt`, 
  `updatedAt`,
  `requirePasswordChange`
) VALUES (
  'admin-unilicungo-001',
  'Administrador do Sistema',
  'admin@unilicungo.ac.mz',
  '$2a$10$N9qo8uLOickgx2ZoVZVUme5hh0l.0EgKo0l9P3L3UqNxGHvO2Qzv2',  -- Hash de "Admin@2025"
  'ADMIN',
  NOW(),
  NOW(),
  NOW(),
  false
);

-- ============================================
-- PASSO 3: Verificar se foi criado
-- ============================================
SELECT 
  id, 
  name, 
  email, 
  role, 
  createdAt
FROM `User` 
WHERE email = 'admin@unilicungo.ac.mz';

-- ============================================
-- NOTAS IMPORTANTES:
-- ============================================
-- Senha padrão: Admin@2025
-- Email: admin@unilicungo.ac.mz
-- Role: ADMIN (acesso total ao sistema)
--
-- APÓS PRIMEIRO LOGIN:
-- - Vá para Perfil → Alterar Senha
-- - Crie uma senha forte e única
--
-- ============================================
-- COMO GERAR NOVO HASH DE SENHA:
-- ============================================
-- 1. Acesse: https://bcrypt-generator.com/
-- 2. Digite sua senha desejada
-- 3. Selecione "Rounds: 10"
-- 4. Clique em "Generate"
-- 5. Copie o hash gerado (começa com $2a$10$...)
-- 6. Substitua na linha 36 acima
--
-- ============================================

-- EXEMPLO: Criar outros usuários
-- ============================================

-- Gestor de Segurança
INSERT INTO `User` (
  `id`, 
  `name`, 
  `email`, 
  `password`, 
  `role`, 
  `emailVerified`, 
  `createdAt`, 
  `updatedAt`,
  `requirePasswordChange`
) VALUES (
  'gestor-001',
  'Gestor de Segurança',
  'gestor@unilicungo.ac.mz',
  '$2a$10$N9qo8uLOickgx2ZoVZVUme5hh0l.0EgKo0l9P3L3UqNxGHvO2Qzv2',  -- Mesma senha: Admin@2025
  'SECURITY_OFFICER',
  NOW(),
  NOW(),
  NOW(),
  true  -- Forçar mudança de senha no primeiro login
);

-- Auditor
INSERT INTO `User` (
  `id`, 
  `name`, 
  `email`, 
  `password`, 
  `role`, 
  `emailVerified`, 
  `createdAt`, 
  `updatedAt`,
  `requirePasswordChange`
) VALUES (
  'auditor-001',
  'Auditor do Sistema',
  'auditor@unilicungo.ac.mz',
  '$2a$10$N9qo8uLOickgx2ZoVZVUme5hh0l.0EgKo0l9P3L3UqNxGHvO2Qzv2',  -- Mesma senha: Admin@2025
  'AUDITOR',
  NOW(),
  NOW(),
  NOW(),
  true  -- Forçar mudança de senha no primeiro login
);

-- ============================================
-- FIM DO SCRIPT
-- ============================================
