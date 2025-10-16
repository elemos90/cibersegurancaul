# 👥 Perfis de Utilizadores - Portal de Cibersegurança UniLicungo

## 📋 Visão Geral

O Portal implementa **5 perfis de utilizador** baseados em RBAC (Role-Based Access Control), alinhados com ISO 27001, NIST CSF e COBIT.

---

## 1️⃣ **ADMINISTRADOR** (`admin`)

### 🎯 **Quem é:**
- CISO (Chief Information Security Officer)
- Diretor de Segurança da Informação
- Gestor do Programa de Cibersegurança

### 📌 **Responsabilidades:**
- ✅ Definir estratégia de cibersegurança da universidade
- ✅ Aprovar e publicar políticas de segurança
- ✅ Gerir todos os utilizadores do portal (criar, editar, atribuir papéis)
- ✅ Aceitar riscos residuais e aprovar mitigações críticas
- ✅ Aprovar exceções de segurança
- ✅ Ser notificado de incidentes críticos
- ✅ Alocar orçamento e recursos de segurança
- ✅ Reportar ao Reitor sobre estado da segurança

### 🔐 **Permissões:**
- ✅ **Acesso total** a todas as funcionalidades
- ✅ Criar, editar, aprovar e excluir: políticas, riscos, incidentes, exceções
- ✅ Gerir usuários e atribuir papéis
- ✅ Configurar sistema e integrações
- ✅ Gerar relatórios executivos

---

## 2️⃣ **SECOPS** (`secops`) - Operações de Segurança

### 🎯 **Quem é:**
- Analistas de Segurança
- Engenheiros de Segurança
- Membros do SOC (Security Operations Center)

### 📌 **Responsabilidades:**
- ✅ Monitorizar alertas de segurança em tempo real
- ✅ Receber, triar e investigar incidentes de segurança
- ✅ Classificar severidade (baixa, média, alta, crítica)
- ✅ Coordenar resposta a incidentes com TI
- ✅ Escalar incidentes críticos ao Administrador
- ✅ Realizar varreduras de vulnerabilidades (OpenVAS, Nessus)
- ✅ Identificar e registar novos riscos operacionais
- ✅ Produzir relatórios post-mortem de incidentes
- ✅ Operar ferramentas: SIEM, IDS/IPS, EDR
- ✅ Conduzir testes de phishing simulados

### 🔐 **Permissões:**
- ✅ Criar e editar riscos (não pode aceitar riscos)
- ✅ Criar, investigar e resolver incidentes (não pode fechar críticos)
- ✅ Visualizar políticas e sugerir alterações
- ✅ Comentar em exceções (não pode aprovar)
- ✅ Gerar relatórios técnicos
- ⛔ **NÃO** pode gerir utilizadores
- ⛔ **NÃO** pode aprovar políticas ou exceções

---

## 3️⃣ **TI** (`ti`) - Tecnologia da Informação

### 🎯 **Quem é:**
- Administradores de Sistemas
- Administradores de Redes
- Engenheiros de Infraestrutura
- Helpdesk / Suporte Técnico

### 📌 **Responsabilidades:**
- ✅ Aplicar patches de segurança em sistemas
- ✅ Configurar firewalls e controles de rede
- ✅ Implementar MFA (autenticação multifactor)
- ✅ Configurar backups e recuperação
- ✅ Instalar e manter antivírus/EDR
- ✅ Remediar vulnerabilidades identificadas
- ✅ Isolar sistemas comprometidos (quando solicitado)
- ✅ Provisionar e desprovisionar contas de usuários
- ✅ Implementar exceções aprovadas
- ✅ Gerir permissões de ficheiros e sistemas

### 🔐 **Permissões:**
- ✅ Visualizar KPIs técnicos (patches, MFA, EDR)
- ✅ Visualizar políticas técnicas
- ✅ Visualizar incidentes atribuídos e atualizar status
- ✅ Comentar em riscos e mitigações
- ✅ Implementar controles de exceções aprovadas
- ✅ Gerar relatórios de conformidade técnica
- ⛔ **NÃO** pode criar riscos ou políticas
- ⛔ **NÃO** pode aprovar exceções
- ⛔ **NÃO** pode gerir utilizadores no portal

---

## 4️⃣ **DONO DE DADOS** (`dono_dado`)

### 🎯 **Quem é:**
- Diretores de Departamento
- Coordenadores de Curso
- Gestores de Áreas Funcionais
- Responsáveis por processos de negócio

### 📌 **Responsabilidades:**
- ✅ Classificar dados da sua área (público, interno, confidencial, restrito)
- ✅ Autorizar acessos a dados sensíveis
- ✅ Revisar permissões periodicamente
- ✅ Garantir conformidade com LGPD na sua área
- ✅ Identificar dados pessoais e documentar base legal
- ✅ Solicitar exceções de segurança quando necessário
- ✅ Aceitar riscos da sua área (após análise)
- ✅ Avaliar fornecedores que processam seus dados
- ✅ Notificar incidentes com dados pessoais
- ✅ Implementar direitos dos titulares (LGPD)

### 🔐 **Permissões:**
- ✅ Criar riscos de privacidade da sua área
- ✅ Aceitar riscos da sua área específica
- ✅ Solicitar exceções de segurança
- ✅ Avaliar fornecedores que processam seus dados
- ✅ Visualizar incidentes com dados da sua área
- ✅ Gerar relatórios de conformidade de dados
- ⛔ **NÃO** pode aprovar exceções
- ⛔ **NÃO** pode gerir utilizadores
- ⛔ **NÃO** pode criar políticas

---

## 5️⃣ **AUDITORIA** (`auditoria`)

### 🎯 **Quem é:**
- Auditores Internos
- Compliance Officers
- Consultores de Segurança Externos
- Avaliadores de Conformidade

### 📌 **Responsabilidades:**
- ✅ Planejar e executar auditorias de segurança
- ✅ Avaliar conformidade com políticas e normas
- ✅ Verificar implementação e eficácia de controles
- ✅ Revisar investigações de incidentes
- ✅ Avaliar adequação de políticas
- ✅ Auditar fornecedores críticos
- ✅ Produzir relatórios de auditoria
- ✅ Acompanhar planos de ação corretiva
- ✅ Recomendar melhorias de controles
- ✅ Verificar remediação de achados

### 🔐 **Permissões:**
- ✅ Visualização **completa** de todo o sistema (modo leitura)
- ✅ Acessar logs de auditoria completos
- ✅ Comentar e recomendar em políticas, riscos, incidentes
- ✅ Auditar fornecedores
- ✅ Gerar relatórios de auditoria e conformidade
- ⛔ **NÃO pode criar, editar ou excluir nada** (independência)
- ⛔ **NÃO participa de operações** (apenas observa e avalia)

**IMPORTANTE:** Auditoria tem acesso amplo para leitura, mas sem poder operacional, garantindo independência.

---

## 📊 Matriz de Permissões Resumida

| Ação | Admin | SecOps | TI | Dono Dado | Auditoria |
|------|-------|--------|----|-----------+-----------|
| Aprovar Políticas | ✅ | ⛔ | ⛔ | ⛔ | ⛔ |
| Criar Riscos | ✅ | ✅ | ⛔ | ✅ | ⛔ |
| Aceitar Riscos | ✅ | ⛔ | ⛔ | 🟡 Área | ⛔ |
| Investigar Incidentes | ✅ | ✅ | ⛔ | ⛔ | 👁️ |
| Aprovar Exceções | ✅ | ⛔ | ⛔ | ⛔ | ⛔ |
| Gerir Usuários | ✅ | ⛔ | ⛔ | ⛔ | ⛔ |
| Visualizar Tudo | ✅ | 🟡 | 🟡 | 🟡 | ✅ |

---

## 🎓 Conhecimentos Necessários

**Admin:** Governança, ISO 27001, NIST, LGPD, gestão de riscos, orçamento  
**SecOps:** SIEM, IDS/IPS, EDR, resposta a incidentes, threat intelligence  
**TI:** Hardening, patches, firewalls, backup, Active Directory  
**Dono Dado:** LGPD, classificação de dados, DPIA, contratos DPA  
**Auditoria:** ISO 27001, metodologias de auditoria, avaliação de controles

---

## 📝 Como Atribuir Papéis

### Via Interface:
1. Login como **Admin**
2. Menu **Usuários** → **Novo Utilizador**
3. Preencha: Nome, Email (@unilicungo.ac.mz), **Papel**
4. Sistema envia convite por email

### Via SQL (emergência):
```sql
UPDATE User SET papel = 'admin' WHERE email = 'usuario@unilicungo.ac.mz';
-- Papéis: admin, secops, ti, dono_dado, auditoria
```

---

**✨ Sistema RBAC robusto garantindo segregação de funções e princípio do menor privilégio!**
