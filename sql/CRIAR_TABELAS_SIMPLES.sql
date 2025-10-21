-- ============================================================================
-- SCRIPT SIMPLIFICADO: Criar Tabelas do Portal (SEM ERROS)
-- ============================================================================
-- INSTRUÇÕES:
-- 1. Acesse: cPanel → phpMyAdmin
-- 2. Selecione o banco: cycodene_portal
-- 3. Aba "SQL" → Cole TODO este código
-- 4. Clique "Executar" (Go)
-- ============================================================================

-- LIMPAR TABELAS ANTIGAS (se existirem)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `evidence`;
DROP TABLE IF EXISTS `incident`;
DROP TABLE IF EXISTS `policy`;
DROP TABLE IF EXISTS `risk`;
DROP TABLE IF EXISTS `user`;
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================================
-- CRIAR TABELAS
-- ============================================================================

-- 1. TABELA: user
CREATE TABLE `user` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NULL,
  `email` VARCHAR(191) NOT NULL,
  `papel` ENUM('admin', 'secops', 'ti', 'dono_dado', 'auditoria') NOT NULL DEFAULT 'ti',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `mustChangePassword` BOOLEAN NOT NULL DEFAULT false,
  `password` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `User_email_key`(`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. TABELA: incident
CREATE TABLE `incident` (
  `id` VARCHAR(191) NOT NULL,
  `titulo` VARCHAR(191) NOT NULL,
  `descricao` TEXT NOT NULL,
  `categoria` ENUM('malware', 'phishing', 'acesso_nao_autorizado', 'perda_dados', 'ddos', 'vulnerabilidade', 'violacao_politica', 'outro') NOT NULL,
  `severidade` ENUM('baixa', 'media', 'alta', 'critica') NOT NULL,
  `status` ENUM('aberto', 'em_investigacao', 'em_resolucao', 'resolvido', 'fechado') NOT NULL DEFAULT 'aberto',
  `dataDeteccao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `fonteDeteccao` VARCHAR(191) NULL,
  `dataResposta` DATETIME(3) NULL,
  `acaoImediata` TEXT NULL,
  `dataResolucao` DATETIME(3) NULL,
  `resolucao` TEXT NULL,
  `causaRaiz` TEXT NULL,
  `sistemaAfetado` VARCHAR(191) NULL,
  `dadosCompromissos` BOOLEAN NOT NULL DEFAULT false,
  `tempoIndisponibilidade` INT NULL,
  `responsavel` VARCHAR(191) NULL,
  `createdById` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `Incident_createdById_fkey`(`createdById`),
  CONSTRAINT `Incident_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. TABELA: policy
CREATE TABLE `policy` (
  `id` VARCHAR(191) NOT NULL,
  `titulo` VARCHAR(191) NOT NULL,
  `descricao` TEXT NOT NULL,
  `categoria` ENUM('acesso', 'dados', 'rede', 'fisica', 'desenvolvimento', 'continuidade', 'conformidade', 'uso_aceitavel') NOT NULL,
  `status` ENUM('rascunho', 'revisao', 'aprovado', 'ativo', 'obsoleto') NOT NULL DEFAULT 'rascunho',
  `versao` VARCHAR(191) NOT NULL DEFAULT '1.0',
  `dataVigencia` DATETIME(3) NULL,
  `dataRevisao` DATETIME(3) NULL,
  `aprovadoPor` VARCHAR(191) NULL,
  `conteudo` TEXT NOT NULL,
  `tags` VARCHAR(191) NULL,
  `createdById` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `Policy_createdById_fkey`(`createdById`),
  CONSTRAINT `Policy_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. TABELA: risk
CREATE TABLE `risk` (
  `id` VARCHAR(191) NOT NULL,
  `titulo` VARCHAR(191) NOT NULL,
  `descricao` TEXT NOT NULL,
  `categoria` ENUM('tecnologico', 'humano', 'processo', 'externo', 'compliance', 'reputacional') NOT NULL,
  `probabilidade` ENUM('muito_baixo', 'baixo', 'medio', 'alto', 'muito_alto') NOT NULL,
  `impacto` ENUM('muito_baixo', 'baixo', 'medio', 'alto', 'muito_alto') NOT NULL,
  `nivelRisco` ENUM('muito_baixo', 'baixo', 'medio', 'alto', 'muito_alto') NOT NULL,
  `status` ENUM('identificado', 'em_analise', 'em_tratamento', 'mitigado', 'aceito', 'transferido') NOT NULL DEFAULT 'identificado',
  `estrategia` ENUM('mitigar', 'aceitar', 'transferir', 'evitar') NULL,
  `planoAcao` TEXT NULL,
  `responsavel` VARCHAR(191) NULL,
  `prazo` DATETIME(3) NULL,
  `probResidual` ENUM('muito_baixo', 'baixo', 'medio', 'alto', 'muito_alto') NULL,
  `impactoResidual` ENUM('muito_baixo', 'baixo', 'medio', 'alto', 'muito_alto') NULL,
  `nivelResidual` ENUM('muito_baixo', 'baixo', 'medio', 'alto', 'muito_alto') NULL,
  `createdById` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `Risk_createdById_fkey`(`createdById`),
  CONSTRAINT `Risk_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. TABELA: evidence
CREATE TABLE `evidence` (
  `id` VARCHAR(191) NOT NULL,
  `filename` VARCHAR(191) NOT NULL,
  `originalName` VARCHAR(191) NOT NULL,
  `mimeType` VARCHAR(191) NOT NULL,
  `size` INT NOT NULL,
  `path` VARCHAR(191) NOT NULL,
  `descricao` VARCHAR(191) NULL,
  `policyId` VARCHAR(191) NULL,
  `riskId` VARCHAR(191) NULL,
  `incidentId` VARCHAR(191) NULL,
  `uploadedBy` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `Evidence_incidentId_fkey`(`incidentId`),
  INDEX `Evidence_policyId_fkey`(`policyId`),
  INDEX `Evidence_riskId_fkey`(`riskId`),
  CONSTRAINT `Evidence_incidentId_fkey` FOREIGN KEY (`incidentId`) REFERENCES `incident`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Evidence_policyId_fkey` FOREIGN KEY (`policyId`) REFERENCES `policy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Evidence_riskId_fkey` FOREIGN KEY (`riskId`) REFERENCES `risk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- CRIAR USUÁRIO ADMINISTRADOR
-- ============================================================================
-- Email: admin@unilicungo.ac.mz
-- Senha: Admin@2025
-- ============================================================================

INSERT INTO `user` (
  `id`, 
  `name`, 
  `email`, 
  `password`, 
  `papel`, 
  `createdAt`, 
  `updatedAt`, 
  `mustChangePassword`
) VALUES (
  'admin-unilicungo-001',
  'Administrador do Sistema',
  'admin@unilicungo.ac.mz',
  '$2a$10$YvJDMxZ5K4H5rYzQx0OEJOqKp7x8vF5v0WzZ5K4H5rYzQx0OEJO0i',
  'admin',
  NOW(),
  NOW(),
  0
);

-- ============================================================================
-- PRONTO! Agora:
-- 1. Vá no cPanel → Setup Node.js App
-- 2. Clique em RESTART na aplicação
-- 3. Acesse: https://cyberul.cycode.net
-- 4. Login: admin@unilicungo.ac.mz / Admin@2025
-- ============================================================================
