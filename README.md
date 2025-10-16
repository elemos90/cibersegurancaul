# Portal de Cibersegurança UniLicungo — Next.js + Tailwind + Prisma (MySQL)

Portal leve para governança de cibersegurança (políticas, riscos, incidentes, exceções, fornecedores, KPIs).
**BD**: MySQL (XAMPP). **ORM**: Prisma. **Branding**: cores aproximadas do site oficial.

> Cores usadas (aprox): blue #0c84c6, teal #00a3a3, gold #c6923a. (Podemos ajustar ao manual oficial.)

## 1) Requisitos
- Node 18+ (LTS) • XAMPP com MySQL (3306) • VS Code

## 2) Base de dados (criar via phpMyAdmin ou mysql CLI)
```sql
CREATE DATABASE security_portal DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_unicode_ci;
CREATE USER 'uni_user'@'localhost' IDENTIFIED BY 'SenhaForte#2025';
GRANT ALL PRIVILEGES ON security_portal.* TO 'uni_user'@'localhost';
FLUSH PRIVILEGES;
-- Se necessário (erro de auth):
-- ALTER USER 'uni_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'SenhaForte#2025';
```

## 3) Configuração do app
1. Copie `.env.example` para `.env.local` e ajuste `DATABASE_URL`.
2. Instale deps: `npm i`.
3. **Configure autenticação**: Veja `AUTENTICACAO.md` para detalhes.
4. Prisma: `npx prisma migrate dev --name init` (cria tabelas).
5. Rodar: `npm run dev` → http://localhost:3000

## 4) Publicação (resumo)
- **Build**: `npm run build` / `npm start` (porta 3000).
- **Apache (XAMPP) como proxy** (httpd-vhosts.conf):  
```
ProxyPreserveHost On
ProxyPass        / http://127.0.0.1:3000/
ProxyPassReverse / http://127.0.0.1:3000/
```
- Ou Nginx/PM2 num servidor Linux, com domínio `portal-segurança.unilicungo.ac.mz` (ajuste conforme DSI).

## 5) Estrutura
```
src/app/        # rotas (App Router)
src/components/ # UI
src/lib/        # prisma client
prisma/         # schema Prisma
sql/            # SQL auxiliar (opcional)
public/         # assets (logo)
```

## 6) Autenticação ✅
- **NextAuth** configurado com Microsoft Entra ID e Google OAuth
- Restrição de domínio: apenas emails `@unilicungo.ac.mz`
- Sistema de papéis: admin, secops, ti, dono_dado, auditoria
- Middleware protegendo todas as rotas (exceto páginas de login)
- Consulte `AUTENTICACAO.md` para instruções completas

## 7) Testes ✅
Sistema completo de testes implementado:
- **Testes Unitários**: Jest + Testing Library para componentes e funções
- **Testes de Integração**: Jest para APIs e rotas
- **Testes E2E**: Playwright para fluxos completos

```bash
npm test              # Executar testes unitários e integração
npm run test:e2e      # Executar testes E2E
npm run test:coverage # Ver cobertura de código
```

Consulte `TESTING.md` para documentação completa.

## 8) Design Profissional e Responsivo ✅
Sistema de design corporativo completo implementado:

### **Visual Profissional**
- ✅ **Paleta de cores séria**: Azul corporativo, teal profissional, tons neutros
- ✅ **Tipografia moderna**: Inter + Plus Jakarta Sans (Google Fonts)
- ✅ **Componentes reutilizáveis**: Botões, cards, inputs, badges
- ✅ **Animações suaves**: Transições e estados de hover profissionais

### **Páginas Redesenhadas**
- ✅ **Login**: Background com gradiente, decorações animadas, glassmorphism
- ✅ **Header**: Logo em badge, navegação com hover states
- ✅ **Footer**: Layout informativo com versão do sistema
- ✅ **KPI Cards**: Design moderno com ícones e estados interativos

### **Sistema de Classes**
```tsx
<button className="btn btn-primary btn-lg">Botão Profissional</button>
<div className="card"><div className="card-body">Conteúdo</div></div>
<input className="input" />
<span className="badge badge-success">Ativo</span>
```

### **Responsividade**
```bash
# Testar em diferentes dispositivos
npm run dev
# DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M)
```

**Documentação:**
- `DESIGN_SYSTEM.md` - Sistema de design completo com paleta, tipografia e componentes
- `DESIGN_PROFISSIONAL.md` - Guia de migração e comparações antes/depois
- `MELHORIAS_UI.md` - Detalhes técnicos de responsividade

## 9) Próximos passos
- CRUD completo (Riscos, Incidentes, Exceções, Fornecedores) e upload de evidências.
- Embeds Grafana + integrações (OpenVAS, DMARC, TheHive/Jira).
- Logs de auditoria e notificações em tempo real.
