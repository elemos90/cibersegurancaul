# 🎨 Instruções para Configurar o Logo Oficial

## 📋 Passos para configurar o logo:

### 1. Salvar o Logo Principal

Salve a imagem do logo oficial como:
```
public/logo_unilicungo.png
```

**Substituir o arquivo existente** com a nova imagem oficial da UniLicungo.

### 2. Criar o Favicon

Para criar o favicon (ícone da aba do navegador):

#### Opção A: Converter online (Recomendado)
1. Acesse: https://favicon.io/favicon-converter/
2. Faça upload da imagem do logo
3. Baixe o pacote gerado
4. Extraia e copie `favicon.ico` para a pasta `public/`

#### Opção B: Renomear (Temporário)
```powershell
# Na pasta public/
copy logo_unilicungo.png favicon.ico
```

### 3. Estrutura Final

Após configurar, a pasta `public/` deve ter:
```
public/
├── logo_unilicungo.png  ← Logo oficial (usado no site)
└── favicon.ico          ← Ícone da aba do navegador
```

### 4. Verificar

Reinicie o servidor de desenvolvimento:
```powershell
npm run dev
```

O logo deve aparecer:
- ✅ No cabeçalho do site
- ✅ Na página de login
- ✅ Na aba do navegador (favicon)

---

## 🎯 Já Configurado no Código:

O código já está preparado para usar o logo:

- `src/app/layout.tsx` - Configuração do favicon
- `src/app/auth/signin/page.tsx` - Logo na página de login
- Header - Logo no cabeçalho

**Basta salvar os arquivos na pasta `public/`!**
