-- ============================================
-- DADOS FICTÍCIOS PARA TESTE
-- Portal de Cibersegurança UniLicungo
-- ============================================

USE security_portal;

-- ============================================
-- 1. USUÁRIOS ADICIONAIS
-- ============================================
-- Senha padrão para todos: UniLicungo@2025
-- Hash bcrypt de "UniLicungo@2025"
SET @senha_padrao = '$2a$10$TcKtTiyXiapTSFe./eAGEezi00QYlMSFTBuoBV/FACcjwwK11.CfC';

INSERT INTO User (id, email, name, papel, password, mustChangePassword, createdAt, updatedAt) VALUES
('user-secops-001', 'carlos.silva@unilicungo.ac.mz', 'Carlos Silva', 'secops', @senha_padrao, FALSE, NOW(), NOW()),
('user-ti-001', 'maria.santos@unilicungo.ac.mz', 'Maria Santos', 'ti', @senha_padrao, FALSE, NOW(), NOW()),
('user-ti-002', 'joao.costa@unilicungo.ac.mz', 'João Costa', 'ti', @senha_padrao, FALSE, NOW(), NOW()),
('user-audit-001', 'ana.pereira@unilicungo.ac.mz', 'Ana Pereira', 'auditoria', @senha_padrao, FALSE, NOW(), NOW()),
('user-dono-001', 'pedro.lopes@unilicungo.ac.mz', 'Pedro Lopes', 'dono_dado', @senha_padrao, FALSE, NOW(), NOW());

-- ============================================
-- 2. POLÍTICAS DE SEGURANÇA
-- ============================================
INSERT INTO Policy (id, titulo, descricao, categoria, status, versao, conteudo, dataVigencia, tags, createdById, createdAt, updatedAt) VALUES
-- Políticas Ativas
('pol-001', 
 'Política de Controle de Acesso', 
 'Define regras para autenticação, autorização e gestão de acessos aos sistemas da UniLicungo',
 'acesso',
 'ativo',
 '2.1',
 'Esta política estabelece diretrizes para: 1) Autenticação multifator obrigatória para sistemas críticos; 2) Revisão trimestral de privilégios de acesso; 3) Desabilitação imediata de contas de colaboradores desligados; 4) Senha com mínimo de 12 caracteres; 5) Bloqueio após 5 tentativas falhas.',
 DATE_ADD(NOW(), INTERVAL -30 DAY),
 '["ISO27001","LGPD","Crítico"]',
 'user-secops-001',
 DATE_ADD(NOW(), INTERVAL -90 DAY),
 DATE_ADD(NOW(), INTERVAL -30 DAY)),

('pol-002',
 'Política de Proteção de Dados Pessoais (LGPD)',
 'Diretrizes para tratamento de dados pessoais em conformidade com a Lei Geral de Proteção de Dados',
 'dados',
 'ativo',
 '1.3',
 'Define: 1) Princípios de minimização e necessidade; 2) Bases legais para tratamento; 3) Direitos dos titulares; 4) Procedimentos para incidentes de vazamento; 5) Transferência internacional de dados; 6) Retenção e descarte seguro.',
 DATE_ADD(NOW(), INTERVAL -60 DAY),
 '["LGPD","Privacidade","Compliance"]',
 'user-secops-001',
 DATE_ADD(NOW(), INTERVAL -120 DAY),
 DATE_ADD(NOW(), INTERVAL -60 DAY)),

('pol-003',
 'Política de Segurança de Rede',
 'Controles de segurança para infraestrutura de rede e perímetro',
 'rede',
 'ativo',
 '1.5',
 'Estabelece: 1) Segmentação de rede por criticidade; 2) Firewall e IDS/IPS obrigatórios; 3) VPN para acesso remoto; 4) Monitoramento de tráfego 24/7; 5) Bloqueio de portas não autorizadas; 6) Auditoria de configurações de rede.',
 DATE_ADD(NOW(), INTERVAL -15 DAY),
 '["Rede","Firewall","Perímetro"]',
 'user-secops-001',
 DATE_ADD(NOW(), INTERVAL -45 DAY),
 DATE_ADD(NOW(), INTERVAL -15 DAY)),

-- Políticas em Revisão
('pol-004',
 'Política de Backup e Recuperação',
 'Procedimentos para backup, retenção e recuperação de dados críticos',
 'continuidade',
 'revisao',
 '2.0',
 'Em revisão para incluir novos RTOs e RPOs. Versão anterior cobria: 1) Backup diário incremental; 2) Backup semanal completo; 3) Retenção de 90 dias; 4) Testes trimestrais de restauração.',
 NULL,
 '["Backup","BCM","Continuidade"]',
 'user-secops-001',
 DATE_ADD(NOW(), INTERVAL -10 DAY),
 DATE_ADD(NOW(), INTERVAL -2 DAY)),

('pol-005',
 'Política de Uso Aceitável de Recursos de TI',
 'Regras para uso apropriado de computadores, email e internet corporativa',
 'uso_aceitavel',
 'aprovado',
 '1.2',
 'Define uso apropriado de: 1) Email corporativo; 2) Navegação na internet; 3) Dispositivos móveis; 4) Armazenamento em nuvem; 5) Proibições (downloads ilegais, conteúdo ofensivo, etc.)',
 DATE_ADD(NOW(), INTERVAL 15 DAY),
 '["Compliance","RH"]',
 'user-secops-001',
 DATE_ADD(NOW(), INTERVAL -25 DAY),
 DATE_ADD(NOW(), INTERVAL -5 DAY)),

-- Política em Rascunho
('pol-006',
 'Política de Desenvolvimento Seguro',
 'Diretrizes de segurança para ciclo de vida de desenvolvimento de software',
 'desenvolvimento',
 'rascunho',
 '0.8',
 'Rascunho incluindo: 1) Secure coding guidelines; 2) Code review obrigatório; 3) Análise estática de código; 4) Testes de segurança; 5) DevSecOps pipeline.',
 NULL,
 '["DevSecOps","SDLC"]',
 'user-ti-001',
 DATE_ADD(NOW(), INTERVAL -5 DAY),
 NOW());

-- ============================================
-- 3. RISCOS DE SEGURANÇA
-- ============================================
INSERT INTO Risk (id, titulo, descricao, categoria, probabilidade, impacto, nivelRisco, status, estrategia, planoAcao, responsavel, prazo, createdById, createdAt, updatedAt) VALUES
-- Riscos Críticos
('risk-001',
 'Ausência de MFA em Sistemas Críticos',
 'Portal Acadêmico e Sistema Financeiro não possuem autenticação multifator, aumentando risco de acesso não autorizado',
 'tecnologico',
 'alto',
 'muito_alto',
 'muito_alto',
 'em_tratamento',
 'mitigar',
 'Implementar Microsoft Authenticator para todos os usuários administrativos até Q2/2025. Fase 1: Administradores (Jan). Fase 2: Docentes (Fev). Fase 3: Estudantes (Mar).',
 'Carlos Silva (SecOps)',
 DATE_ADD(NOW(), INTERVAL 60 DAY),
 'user-secops-001',
 DATE_ADD(NOW(), INTERVAL -45 DAY),
 DATE_ADD(NOW(), INTERVAL -5 DAY)),

('risk-002',
 'Falta de Backup Offsite',
 'Backups armazenados apenas localmente sem cópia geográfica redundante',
 'tecnologico',
 'medio',
 'muito_alto',
 'muito_alto',
 'em_analise',
 'mitigar',
 'Contratar serviço de backup em nuvem (Azure Backup) com replicação geográfica. Orçamento aprovado. Aguardando licitação.',
 'João Costa (TI)',
 DATE_ADD(NOW(), INTERVAL 90 DAY),
 'user-ti-001',
 DATE_ADD(NOW(), INTERVAL -30 DAY),
 DATE_ADD(NOW(), INTERVAL -10 DAY)),

-- Riscos Altos
('risk-003',
 'Colaboradores Sem Treinamento em Phishing',
 'Taxa de cliques em simulações de phishing está em 28%, acima do aceitável',
 'humano',
 'alto',
 'alto',
 'alto',
 'em_tratamento',
 'mitigar',
 'Campanha de conscientização trimestral + simulações mensais. Meta: reduzir para <10% até Dez/2025.',
 'Ana Pereira (Auditoria)',
 DATE_ADD(NOW(), INTERVAL 180 DAY),
 'user-audit-001',
 DATE_ADD(NOW(), INTERVAL -60 DAY),
 DATE_ADD(NOW(), INTERVAL -15 DAY)),

('risk-004',
 'Servidores Windows Server 2012 Sem Suporte',
 '5 servidores críticos rodando Windows Server 2012 que não recebem mais patches de segurança',
 'tecnologico',
 'alto',
 'alto',
 'alto',
 'identificado',
 'mitigar',
 'Migração planejada para Windows Server 2022. Cronograma: 2 servidores/mês. Orçamento: 15.000 USD.',
 'João Costa (TI)',
 DATE_ADD(NOW(), INTERVAL 120 DAY),
 'user-ti-002',
 DATE_ADD(NOW(), INTERVAL -20 DAY),
 NOW()),

-- Riscos Médios
('risk-005',
 'Ausência de DLP (Data Loss Prevention)',
 'Não há controles técnicos para prevenir vazamento acidental de dados sensíveis via email/USB',
 'tecnologico',
 'medio',
 'medio',
 'medio',
 'em_analise',
 'mitigar',
 'Avaliar soluções DLP (Microsoft Purview, Symantec). Análise de custo-benefício em andamento.',
 'Carlos Silva (SecOps)',
 DATE_ADD(NOW(), INTERVAL 240 DAY),
 'user-secops-001',
 DATE_ADD(NOW(), INTERVAL -15 DAY),
 DATE_ADD(NOW(), INTERVAL -3 DAY)),

('risk-006',
 'Terceiros com Acesso Sem Due Diligence',
 'Fornecedores de TI têm acesso a sistemas sem avaliação formal de segurança',
 'externo',
 'medio',
 'alto',
 'alto',
 'identificado',
 'mitigar',
 'Implementar processo de avaliação de fornecedores (questionário + auditoria). Criação de cláusulas de segurança em contratos.',
 'Pedro Lopes (Dono de Dados)',
 DATE_ADD(NOW(), INTERVAL 150 DAY),
 'user-dono-001',
 DATE_ADD(NOW(), INTERVAL -10 DAY),
 NOW()),

-- Riscos Aceitos
('risk-007',
 'Wi-Fi Público Sem Segregação de Rede',
 'Rede Wi-Fi para visitantes compartilha mesmo segmento que rede administrativa',
 'tecnologico',
 'baixo',
 'medio',
 'medio',
 'aceito',
 'aceitar',
 'Risco aceito até próxima expansão de infraestrutura (2026). Monitoramento de tráfego implementado como compensação.',
 'Maria Santos (TI)',
 NULL,
 'user-ti-001',
 DATE_ADD(NOW(), INTERVAL -90 DAY),
 DATE_ADD(NOW(), INTERVAL -60 DAY)),

-- Riscos Mitigados
('risk-008',
 'Falta de Criptografia em Bancos de Dados',
 'Dados sensíveis armazenados em texto claro no banco de dados legado',
 'tecnologico',
 'alto',
 'muito_alto',
 'muito_alto',
 'mitigado',
 'mitigar',
 'Migração concluída para SQL Server com TDE (Transparent Data Encryption) habilitado. Auditoria confirmou sucesso.',
 'João Costa (TI)',
 DATE_ADD(NOW(), INTERVAL -30 DAY),
 'user-ti-002',
 DATE_ADD(NOW(), INTERVAL -180 DAY),
 DATE_ADD(NOW(), INTERVAL -30 DAY));

-- ============================================
-- 4. INCIDENTES DE SEGURANÇA
-- ============================================
INSERT INTO Incident (id, titulo, descricao, categoria, severidade, status, dataDeteccao, dataResolucao, fonteDeteccao, acaoImediata, sistemaAfetado, responsavel, createdById, createdAt, updatedAt) VALUES
-- Incidentes Críticos Recentes
('inc-001',
 'Tentativa de Ransomware Bloqueada',
 'EDR detectou e bloqueou tentativa de execução de ransomware (LockBit 3.0) em estação de trabalho do departamento financeiro. Vetor: email de phishing com anexo malicioso.',
 'malware',
 'critica',
 'resolvido',
 DATE_ADD(NOW(), INTERVAL -7 DAY),
 DATE_ADD(NOW(), INTERVAL -6 DAY),
 'Microsoft Defender for Endpoint',
 'Isolamento imediato da estação. Análise forense realizada. Credenciais do usuário resetadas. Email malicioso removido de todas as caixas.',
 'Workstation FIN-005',
 'Carlos Silva (SecOps)',
 'user-secops-001',
 DATE_ADD(NOW(), INTERVAL -7 DAY),
 DATE_ADD(NOW(), INTERVAL -6 DAY)),

('inc-002',
 'Vazamento de Base de Dados de Teste',
 'Descoberto repositório GitHub público contendo cópia de base de dados de homologação com dados reais de estudantes (CPF, emails, notas). Exposição estimada: 3 dias.',
 'perda_dados',
 'critica',
 'fechado',
 DATE_ADD(NOW(), INTERVAL -15 DAY),
 DATE_ADD(NOW(), INTERVAL -14 DAY),
 'Alerta de GitHub Secret Scanning',
 'Repositório tornado privado imediatamente. Base de dados apagada. Notificação à ANPD preparada. Comunicado aos afetados enviado. Processo disciplinar iniciado.',
 'GitHub - Repositório unilicungo-dev-temp',
 'Ana Pereira (Auditoria)',
 'user-audit-001',
 DATE_ADD(NOW(), INTERVAL -15 DAY),
 DATE_ADD(NOW(), INTERVAL -14 DAY)),

-- Incidentes Altos
('inc-003',
 'Ataque de Força Bruta em VPN',
 'Detectadas 2.547 tentativas de login na VPN em 2 horas de endereços IPs russos. Nenhum acesso bem-sucedido.',
 'acesso_nao_autorizado',
 'alta',
 'resolvido',
 DATE_ADD(NOW(), INTERVAL -3 DAY),
 DATE_ADD(NOW(), INTERVAL -3 DAY),
 'Fortinet FortiGate Logs',
 'IPs bloqueados no firewall. Rate limiting ajustado. Implementado captcha após 3 tentativas falhas. Alerta configurado para atividade similar.',
 'VPN Gateway',
 'Maria Santos (TI)',
 'user-ti-001',
 DATE_ADD(NOW(), INTERVAL -3 DAY),
 DATE_ADD(NOW(), INTERVAL -3 DAY)),

('inc-004',
 'Phishing Direcionado a Departamento de RH',
 'Campanha de spear phishing visando coordenadores de RH. Email falsificado do reitor solicitando envio de planilha de salários. 2 usuários clicaram no link.',
 'phishing',
 'alta',
 'em_resolucao',
 DATE_ADD(NOW(), INTERVAL -1 DAY),
 NULL,
 'Usuário (reporte manual)',
 'Email malicioso em análise. Domínio fraudulento reportado. Usuários que clicaram passarão por treinamento obrigatório. Comunicado interno enviado.',
 'Email Corporativo',
 'Carlos Silva (SecOps)',
 'user-secops-001',
 DATE_ADD(NOW(), INTERVAL -1 DAY),
 NOW()),

-- Incidentes Médios
('inc-005',
 'Configuração Incorreta de Permissões em SharePoint',
 'Pasta com documentos internos (atas de reuniões) estava acessível a "Todos os Usuários" por 10 dias. 47 acessos identificados.',
 'violacao_politica',
 'media',
 'resolvido',
 DATE_ADD(NOW(), INTERVAL -20 DAY),
 DATE_ADD(NOW(), INTERVAL -19 DAY),
 'Auditoria de Rotina',
 'Permissões corrigidas. Logs de acesso revisados. Nenhum conteúdo crítico identificado. Usuário responsável orientado sobre políticas.',
 'SharePoint Online - Setor Administrativo',
 'Pedro Lopes (Dono de Dados)',
 'user-dono-001',
 DATE_ADD(NOW(), INTERVAL -20 DAY),
 DATE_ADD(NOW(), INTERVAL -19 DAY)),

('inc-006',
 'USB Infectado Detectado em Laboratório',
 'Pen drive conectado em computador do laboratório de informática continha vírus Trojan.Generic. Sistema bloqueou execução.',
 'malware',
 'media',
 'fechado',
 DATE_ADD(NOW(), INTERVAL -30 DAY),
 DATE_ADD(NOW(), INTERVAL -30 DAY),
 'Antivírus Kaspersky',
 'USB removido e descartado. Sistema escaneado. Nenhuma infecção confirmada. Campanha de conscientização sobre mídias removíveis agendada.',
 'LAB-INFO-03',
 'João Costa (TI)',
 'user-ti-002',
 DATE_ADD(NOW(), INTERVAL -30 DAY),
 DATE_ADD(NOW(), INTERVAL -30 DAY)),

-- Incidentes Baixos
('inc-007',
 'Vulnerabilidade em Plugin WordPress',
 'Scanner identificou plugin desatualizado com CVE-2024-XXXX (XSS) no site institucional. Não há evidência de exploração.',
 'vulnerabilidade',
 'baixa',
 'resolvido',
 DATE_ADD(NOW(), INTERVAL -5 DAY),
 DATE_ADD(NOW(), INTERVAL -4 DAY),
 'WPScan Automation',
 'Plugin atualizado para versão corrigida. WAF configurado para bloquear tentativas de XSS. Scanner automático configurado.',
 'WordPress - Site Institucional',
 'Maria Santos (TI)',
 'user-ti-001',
 DATE_ADD(NOW(), INTERVAL -5 DAY),
 DATE_ADD(NOW(), INTERVAL -4 DAY)),

-- Incidente em Investigação
('inc-008',
 'Aumento Anormal de Tráfego de Rede',
 'Detectado pico de tráfego de 300% no servidor de arquivos durante madrugada. Origem: workstation ADM-012.',
 'outro',
 'media',
 'em_investigacao',
 NOW(),
 NULL,
 'SIEM - Análise de Tráfego',
 'Workstation isolada preventivamente. Análise forense em andamento. Usuário notificado. Aguardando resultado de scan completo.',
 'File Server FS-01',
 'Carlos Silva (SecOps)',
 'user-secops-001',
 NOW(),
 NOW());

-- ============================================
-- 5. EVIDÊNCIAS (Anexos)
-- ============================================
-- Nota: Caminhos fictícios - ajuste conforme estrutura real
INSERT INTO Evidence (id, filename, originalName, path, mimeType, size, uploadedBy, createdAt, policyId, riskId, incidentId) VALUES
-- Evidências de Políticas
('evi-001', 'pol-001-controle-acesso.pdf', 'politica_controle_acesso_v2.1.pdf', '/uploads/evidence/pol-001-controle-acesso.pdf', 'application/pdf', 524288, 'user-secops-001', DATE_ADD(NOW(), INTERVAL -90 DAY), 'pol-001', NULL, NULL),
('evi-002', 'pol-002-ata.pdf', 'ata_aprovacao_lgpd.pdf', '/uploads/evidence/pol-002-ata.pdf', 'application/pdf', 256000, 'user-secops-001', DATE_ADD(NOW(), INTERVAL -120 DAY), 'pol-002', NULL, NULL),
('evi-003', 'pol-003-diagrama.png', 'diagrama_segmentacao_rede.png', '/uploads/evidence/pol-003-diagrama.png', 'image/png', 1048576, 'user-secops-001', DATE_ADD(NOW(), INTERVAL -45 DAY), 'pol-003', NULL, NULL),

-- Evidências de Riscos
('evi-004', 'risk-001-audit.xlsx', 'relatorio_auditoria_mfa.xlsx', '/uploads/evidence/risk-001-audit.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 102400, 'user-secops-001', DATE_ADD(NOW(), INTERVAL -45 DAY), NULL, 'risk-001', NULL),
('evi-005', 'risk-002-budget.pdf', 'orcamento_backup_azure.pdf', '/uploads/evidence/risk-002-budget.pdf', 'application/pdf', 204800, 'user-ti-001', DATE_ADD(NOW(), INTERVAL -30 DAY), NULL, 'risk-002', NULL),
('evi-006', 'risk-003-phishing.pdf', 'resultados_simulacao_phishing_q1.pdf', '/uploads/evidence/risk-003-phishing.pdf', 'application/pdf', 358400, 'user-audit-001', DATE_ADD(NOW(), INTERVAL -60 DAY), NULL, 'risk-003', NULL),

-- Evidências de Incidentes
('evi-007', 'inc-001-edr-log.txt', 'log_edr_ransomware_bloqueado.txt', '/uploads/evidence/inc-001-edr-log.txt', 'text/plain', 51200, 'user-secops-001', DATE_ADD(NOW(), INTERVAL -7 DAY), NULL, NULL, 'inc-001'),
('evi-008', 'inc-002-screenshot.png', 'captura_tela_github_vazamento.png', '/uploads/evidence/inc-002-screenshot.png', 'image/png', 819200, 'user-audit-001', DATE_ADD(NOW(), INTERVAL -15 DAY), NULL, NULL, 'inc-002'),
('evi-009', 'inc-002-anpd.pdf', 'notificacao_anpd_vazamento.pdf', '/uploads/evidence/inc-002-anpd.pdf', 'application/pdf', 153600, 'user-audit-001', DATE_ADD(NOW(), INTERVAL -14 DAY), NULL, NULL, 'inc-002'),
('evi-010', 'inc-003-firewall.csv', 'log_fortigate_brute_force.csv', '/uploads/evidence/inc-003-firewall.csv', 'text/csv', 409600, 'user-ti-001', DATE_ADD(NOW(), INTERVAL -3 DAY), NULL, NULL, 'inc-003'),
('evi-011', 'inc-004-email.eml', 'email_phishing_original.eml', '/uploads/evidence/inc-004-email.eml', 'message/rfc822', 76800, 'user-secops-001', DATE_ADD(NOW(), INTERVAL -1 DAY), NULL, NULL, 'inc-004');

-- ============================================
-- FIM DO SCRIPT
-- ============================================

-- Resumo dos dados inseridos:
SELECT 
    'Usuários' AS Tabela, COUNT(*) AS Total FROM User
UNION ALL
SELECT 'Políticas', COUNT(*) FROM Policy
UNION ALL
SELECT 'Riscos', COUNT(*) FROM Risk
UNION ALL
SELECT 'Incidentes', COUNT(*) FROM Incident
UNION ALL
SELECT 'Evidências', COUNT(*) FROM Evidence;

SELECT '✅ Dados fictícios inseridos com sucesso!' AS Status;
