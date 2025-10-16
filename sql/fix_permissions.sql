-- Fix: Dar permissão para criar databases (necessário para Prisma Migrate)
-- Execute no phpMyAdmin ou mysql CLI como root

-- Opção 1: Dar permissão para criar databases (recomendado para dev)
GRANT CREATE ON *.* TO 'uni_user'@'localhost';
FLUSH PRIVILEGES;

-- Opção 2: Criar manualmente a shadow database
CREATE DATABASE IF NOT EXISTS security_portal_shadow 
  DEFAULT CHARACTER SET utf8mb4 
  DEFAULT COLLATE utf8mb4_unicode_ci;
GRANT ALL PRIVILEGES ON security_portal_shadow.* TO 'uni_user'@'localhost';
FLUSH PRIVILEGES;

-- Verificar permissões
SHOW GRANTS FOR 'uni_user'@'localhost';
