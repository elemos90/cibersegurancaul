-- SQL para criar todas as tabelas do Portal de Cibersegurança
-- Execute este script no phpMyAdmin do cPanel

-- 1. Criar tabela de usuários
CREATE TABLE IF NOT EXISTS `user` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NULL,
  `email` VARCHAR(191) NOT NULL,
  `papel` ENUM('admin', 'secops', 'ti', 'dono_dado', 'auditoria') NOT NULL DEFAULT 'ti',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  `mustChangePassword` BOOLEAN NOT NULL DEFAULT false,
  `password` VARCHAR(191) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `User_email_key`(`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Criar tabela de incidentes
CREATE TABLE IF NOT EXISTS `incident` (
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
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `Incident_createdById_fkey`(`createdById`),
  CONSTRAINT `Incident_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Criar tabela de políticas
CREATE TABLE IF NOT EXISTS `policy` (
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
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `Policy_createdById_fkey`(`createdById`),
  CONSTRAINT `Policy_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Criar tabela de riscos
CREATE TABLE IF NOT EXISTS `risk` (
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
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `Risk_createdById_fkey`(`createdById`),
  CONSTRAINT `Risk_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Criar tabela de evidências
CREATE TABLE IF NOT EXISTS `evidence` (
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

-- 6. Criar usuário administrador inicial
-- ATENÇÃO: Senha é "Admin@2025" (hash bcrypt com 10 rounds)
INSERT INTO `user` (`id`, `name`, `email`, `password`, `papel`, `createdAt`, `updatedAt`, `mustChangePassword`) 
VALUES (
  'admin-001',
  'Administrador',
  'admin@unilicungo.ac.mz',
  '$2a$10$YourHashedPasswordHere',  -- SUBSTITUIR pelo hash real da senha
  'admin',
  NOW(),
  NOW(),
  0
)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- Verificar se as tabelas foram criadas
SELECT 'Tabelas criadas com sucesso!' AS resultado;
SHOW TABLES;
