-- sql/00_create_db_user.sql (opcional)
-- Use apenas se ainda não criou BD/usuário.
CREATE DATABASE security_portal DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;
CREATE USER 'uni_user'@'localhost' IDENTIFIED BY 'SenhaForte#2025';
GRANT ALL PRIVILEGES ON security_portal.* TO 'uni_user'@'localhost';
FLUSH PRIVILEGES;
