# Configuração de Autenticação NextAuth

## 1. Instalar Dependências

```bash
npm install next-auth@latest @auth/prisma-adapter
```

## 2. Configurar Base de Dados

Execute a migração Prisma para criar as tabelas de autenticação:

```bash
npx prisma migrate dev --name add_auth_models
```

Ou force a recriação do schema (apenas em dev):

```bash
npx prisma db push
```

## 3. Gerar NEXTAUTH_SECRET

No terminal, gere uma chave secreta:

```bash
openssl rand -base64 32
```

Copie o resultado para `.env.local` como `NEXTAUTH_SECRET`.

## 4. Configurar Microsoft Entra ID (Azure AD)

### Passo a passo:

1. Acesse [Azure Portal](https://portal.azure.com)
2. Vá para **Azure Active Directory** → **App registrations** → **New registration**
3. Configure:
   - **Name**: Portal de Cibersegurança UniLicungo
   - **Supported account types**: Accounts in this organizational directory only
   - **Redirect URI**: Web → `http://localhost:3000/api/auth/callback/azure-ad`
4. Após criação, copie:
   - **Application (client) ID** → `AZURE_AD_CLIENT_ID`
   - **Directory (tenant) ID** → `AZURE_AD_TENANT_ID`
5. Vá para **Certificates & secrets** → **New client secret**
   - Copie o valor → `AZURE_AD_CLIENT_SECRET`
6. Em **API permissions**:
   - Adicione: `User.Read`, `openid`, `profile`, `email`
   - Clique em **Grant admin consent**

### Para produção:
- Adicione redirect URI: `https://portal-ciberseguranca.unilicungo.ac.mz/api/auth/callback/azure-ad`

## 5. Configurar Google OAuth

### Passo a passo:

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um projeto novo ou selecione existente
3. Vá para **APIs & Services** → **Credentials** → **Create Credentials** → **OAuth client ID**
4. Configure OAuth consent screen:
   - **User Type**: Internal (se tiver Google Workspace) ou External
   - **Application name**: Portal de Cibersegurança UniLicungo
   - **Authorized domains**: `unilicungo.ac.mz`
   - **Scopes**: openid, profile, email
5. Crie OAuth 2.0 Client ID:
   - **Application type**: Web application
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
6. Copie:
   - **Client ID** → `GOOGLE_CLIENT_ID`
   - **Client Secret** → `GOOGLE_CLIENT_SECRET`

### Para produção:
- Adicione origins: `https://portal-ciberseguranca.unilicungo.ac.mz`
- Adicione redirect URI: `https://portal-ciberseguranca.unilicungo.ac.mz/api/auth/callback/google`

## 6. Configurar .env.local

Crie ou atualize `.env.local` com todas as variáveis:

> **NOTA WINDOWS**: O Prisma CLI no Windows não lê `.env.local`. Copie também para `.env` ou use `.env` diretamente.

```env
DATABASE_URL="mysql://uni_user:SenhaForte%232025@localhost:3306/security_portal"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sua_chave_gerada_aqui"

AZURE_AD_CLIENT_ID="seu_client_id_microsoft"
AZURE_AD_CLIENT_SECRET="seu_client_secret_microsoft"
AZURE_AD_TENANT_ID="seu_tenant_id"

GOOGLE_CLIENT_ID="seu_client_id_google"
GOOGLE_CLIENT_SECRET="seu_client_secret_google"
```

## 7. Testar

1. Inicie o servidor: `npm run dev`
2. Acesse: http://localhost:3000
3. Você será redirecionado para `/auth/signin`
4. Teste login com Microsoft e Google
5. Verifique se apenas emails `@unilicungo.ac.mz` são permitidos

## 8. Gestão de Papéis

Por padrão, novos usuários recebem papel `ti`. Para alterar:

1. Acesse a base de dados:
   ```sql
   UPDATE User SET papel = 'admin' WHERE email = 'seu.email@unilicungo.ac.mz';
   ```

2. Papéis disponíveis:
   - `admin` - Administrador do sistema
   - `secops` - Operações de segurança
   - `ti` - Tecnologia da Informação
   - `dono_dado` - Responsável por dados
   - `auditoria` - Auditoria interna

## 9. Troubleshooting

### Erro: "AccessDenied"
- Verifique se o email termina com `@unilicungo.ac.mz`
- Confirme configuração em `src/lib/auth.ts`

### Erro: "Configuration"
- Verifique se todas as variáveis de ambiente estão configuradas
- Confirme que `NEXTAUTH_SECRET` está definido

### Erro de conexão com BD
- Execute `npx prisma generate`
- Verifique se o MySQL está rodando (XAMPP)
- Confirme `DATABASE_URL` no `.env.local`

### Sessão não persiste
- Limpe cookies do navegador
- Verifique se `NEXTAUTH_URL` corresponde à URL real
- Em produção, use HTTPS

## 10. Segurança em Produção

- ✅ Use HTTPS obrigatório
- ✅ Configure CORS apropriadamente
- ✅ Rotacione `NEXTAUTH_SECRET` regularmente
- ✅ Habilite 2FA no Azure AD e Google
- ✅ Configure rate limiting nas rotas de auth
- ✅ Monitore tentativas de login suspeitas
- ✅ Use variáveis de ambiente diferentes por ambiente
- ✅ Configure logs de auditoria
