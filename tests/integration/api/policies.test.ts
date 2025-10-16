/**
 * Testes de integração para API de Políticas
 * 
 * Nota: Estes testes usam mocks do Prisma.
 * Para testes E2E completos, use Playwright com banco de teste real.
 * 
 * @jest-environment node
 */

// IMPORTANTE: Mocks devem vir ANTES das importações
import { prismaMock } from '../../utils/prisma-mock';

jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  prisma: prismaMock,
}));

// Agora podemos importar as rotas e utilitários
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { createMockSession, createMockAdminSession } from '../../utils/test-helpers';
import { GET, POST } from '@/app/api/policies/route';

describe('API /api/policies', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/policies', () => {
    it('deve retornar 401 se não autenticado', async () => {
      (getServerSession as jest.Mock).mockResolvedValue(null);

      const req = new NextRequest('http://localhost:3000/api/policies');
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Não autorizado');
    });

    it('deve retornar lista de políticas quando autenticado', async () => {
      const mockSession = createMockSession();
      (getServerSession as jest.Mock).mockResolvedValue(mockSession);

      const mockPolicies = [
        {
          id: 'pol-001',
          titulo: 'Política de Acesso',
          descricao: 'Política de controle de acesso',
          categoria: 'acesso',
          status: 'ativo',
          versao: '1.0',
          conteudo: 'Conteúdo da política',
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: {
            name: 'Admin User',
            email: 'admin@unilicungo.ac.mz',
          },
          evidencias: [],
        },
      ];

      prismaMock.policy.findMany.mockResolvedValue(mockPolicies as any);

      const req = new NextRequest('http://localhost:3000/api/policies');
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data).toHaveLength(1);
      expect(data[0].titulo).toBe('Política de Acesso');
    });

    it('deve filtrar por categoria', async () => {
      const mockSession = createMockSession();
      (getServerSession as jest.Mock).mockResolvedValue(mockSession);

      prismaMock.policy.findMany.mockResolvedValue([]);

      const req = new NextRequest('http://localhost:3000/api/policies?categoria=acesso');
      await GET(req);

      expect(prismaMock.policy.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { categoria: 'acesso' },
        })
      );
    });

    it('deve filtrar por status', async () => {
      const mockSession = createMockSession();
      (getServerSession as jest.Mock).mockResolvedValue(mockSession);

      prismaMock.policy.findMany.mockResolvedValue([]);

      const req = new NextRequest('http://localhost:3000/api/policies?status=ativo');
      await GET(req);

      expect(prismaMock.policy.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { status: 'ativo' },
        })
      );
    });
  });

  describe('POST /api/policies', () => {
    it('deve retornar 401 se não autenticado', async () => {
      (getServerSession as jest.Mock).mockResolvedValue(null);

      const req = new NextRequest('http://localhost:3000/api/policies', {
        method: 'POST',
        body: JSON.stringify({
          titulo: 'Nova Política',
          descricao: 'Descrição',
          categoria: 'acesso',
          conteudo: 'Conteúdo',
        }),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Não autorizado');
    });

    it('deve retornar 400 se campos obrigatórios faltam', async () => {
      const mockSession = createMockSession();
      (getServerSession as jest.Mock).mockResolvedValue(mockSession);

      const req = new NextRequest('http://localhost:3000/api/policies', {
        method: 'POST',
        body: JSON.stringify({
          titulo: 'Nova Política',
          // faltando campos obrigatórios
        }),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('obrigatórios');
    });

    it('deve criar política com sucesso', async () => {
      const mockSession = createMockSession();
      (getServerSession as jest.Mock).mockResolvedValue(mockSession);

      const newPolicy = {
        id: 'pol-new',
        titulo: 'Nova Política',
        descricao: 'Descrição completa',
        categoria: 'acesso',
        status: 'rascunho',
        versao: '1.0',
        conteudo: 'Conteúdo da política',
        createdById: mockSession.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: {
          name: mockSession.user.name,
          email: mockSession.user.email,
        },
      };

      prismaMock.policy.create.mockResolvedValue(newPolicy as any);

      const req = new NextRequest('http://localhost:3000/api/policies', {
        method: 'POST',
        body: JSON.stringify({
          titulo: 'Nova Política',
          descricao: 'Descrição completa',
          categoria: 'acesso',
          conteudo: 'Conteúdo da política',
        }),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.titulo).toBe('Nova Política');
      expect(prismaMock.policy.create).toHaveBeenCalledTimes(1);
    });
  });
});
