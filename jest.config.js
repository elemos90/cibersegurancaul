const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Caminho para o app Next.js para carregar next.config.js e .env
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  // Configuração de setup de testes
  setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.ts'],
  
  // Ambiente de teste (jsdom para componentes React, node para APIs)
  testEnvironment: 'jest-environment-jsdom',
  
  // Usar ambiente node para testes de integração
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  
  // Padrões de arquivos de teste
  testMatch: [
    '<rootDir>/tests/**/*.test.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.test.{js,jsx,ts,tsx}',
  ],
  
  // Ignorar node_modules e .next
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
  ],
  
  // Module name mapping para imports absolutos
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // Mock de arquivos estáticos
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/tests/mocks/fileMock.js',
  },
  
  // Cobertura de código
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/_*.{js,jsx,ts,tsx}',
    '!src/app/layout.tsx',
    '!src/middleware.ts',
  ],
  
  // Thresholds de cobertura
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  
  // Reporters
  coverageReporters: ['text', 'lcov', 'html'],
  
  // Transformações
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react',
      },
    }],
  },
  
  // Transformar node_modules específicos
  transformIgnorePatterns: [
    'node_modules/(?!(@prisma)/)',
  ],
  
  // Verbose output
  verbose: true,
  
  // Timeout
  testTimeout: 10000,
};

// createJestConfig é exportado assim para garantir que next/jest 
// possa carregar a configuração Next.js de forma assíncrona
module.exports = createJestConfig(customJestConfig);
