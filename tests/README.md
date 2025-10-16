# Estrutura de Testes

Este diretório contém todos os testes do projeto.

## 📁 Estrutura

```
tests/
├── e2e/              # Testes End-to-End (Playwright)
├── integration/      # Testes de Integração (Jest)
├── unit/             # Testes Unitários (Jest)
├── mocks/            # Mocks compartilhados
├── setup/            # Configuração de testes
└── utils/            # Utilitários para testes
```

## 🚀 Quick Start

```bash
# 1. Instalar dependências
npm install

# 2. Executar testes unitários e integração
npm test

# 3. Executar testes E2E (servidor deve estar rodando)
npm run test:e2e
```

## 📚 Documentação Completa

Ver [TESTING.md](../TESTING.md) para documentação completa sobre:
- Como executar testes
- Como escrever novos testes
- Boas práticas
- Configuração CI/CD

## 🔧 Configuração

- **jest.config.js** - Configuração do Jest
- **playwright.config.ts** - Configuração do Playwright
- **tests/setup/jest.setup.ts** - Setup global do Jest
