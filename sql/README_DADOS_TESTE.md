# Dados Ficticios para Teste - Portal de Ciberseguranca

## Como Executar

### Opcao 1 - Via phpMyAdmin
1. Abra phpMyAdmin
2. Selecione o banco `security_portal`
3. Va em SQL
4. Copie todo o conteudo de `dados_ficticios.sql`
5. Clique em Executar

### Opcao 2 - Via Linha de Comando
```bash
mysql -u uni_user -p security_portal < dados_ficticios.sql
```

## Dados Incluidos

### Usuarios (5 novos)
- Carlos Silva (SecOps)
- Maria Santos (TI)
- Joao Costa (TI)
- Ana Pereira (Auditoria)
- Pedro Lopes (Dono de Dados)

Senha padrao: UniLicungo@2025

### Politicas (6)
- 3 Ativas
- 1 Em Revisao
- 1 Aprovada
- 1 Rascunho

### Riscos (8)
- 2 Criticos
- 3 Altos
- 2 Medios
- 1 Mitigado

### Incidentes (8)
- 2 Criticos
- 2 Altos
- 3 Medios
- 1 Em Investigacao

### Evidencias (11 anexos)
- Ligadas a politicas, riscos e incidentes

## Proximo Passo
Apos executar, acesse o portal e navegue pelas secoes!
