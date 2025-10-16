/**
 * Testes de integração para API de Riscos
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
import { createMockSession } from '../../utils/test-helpers';
import { GET, POST } from '@/app/api/risks/route';

describe('API /api/risks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/risks', () => {
    it('deve retornar 401 se não autenticado', async () => {
      (getServerSession as jest.Mock).mockResolvedValue(null);

      const req = new NextRequest('http://localhost:3000/api/risks');
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Não autorizado');
    });

    it('deve retornar lista de riscos', async () => {
      const mockSession = createMockSession();
      (getServerSession as jest.Mock).mockResolvedValue(mockSession);

      const mockRisks = [
        {
          id: 'risk-001',
          titulo: 'Falta de MFA',
          descricao: 'Risco de acesso não autorizado',
          categoria: 'tecnologico',
          probabilidade: 'alta',
          impacto: 'alto',
          nivelRisco: 'alto',
          status: 'identificado',
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: {
            name: 'Test User',
            email: 'test@unilicungo.ac.mz',
          },
          evidencias: [],
        },
      ];

      prismaMock.risk.findMany.mockResolvedValue(mockRisks as any);

      const req = new NextRequest('http://localhost:3000/api/risks');
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data[0].titulo).toBe('Falta de MFA');
    });
  });

  describe('POST /api/risks', () => {
    it('deve calcular nível de risco automaticamente', async () => {
      const mockSession = createMockSession();
      (getServerSession as jest.Mock).mockResolvedValue(mockSession);

      const mockRisk = {
        id: 'risk-new',
        titulo: 'Novo Risco',
        descricao: 'Descrição do risco',
        categoria: 'tecnologico',
        probabilidade: 'alto',
        impacto: 'alto',
        nivelRisco: 'alto', // Calculado automaticamente (4x4=16)
        status: 'identificado',
        createdById: mockSession.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: {
          name: mockSession.user.name,
          email: mockSession.user.email,
        },
      };

      prismaMock.risk.create.mockResolvedValue(mockRisk as any);

      const req = new NextRequest('http://localhost:3000/api/risks', {
        method: 'POST',
        body: JSON.stringify({
          titulo: 'Novo Risco',
          descricao: 'Descrição do risco',
          categoria: 'tecnologico',
          probabilidade: 'alto',
          impacto: 'alto',
        }),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.nivelRisco).toBe('alto');
      expect(prismaMock.risk.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            nivelRisco: 'alto',
          }),
        })
      );
    });

    it('deve validar campos obrigatórios', async () => {
      const mockSession = createMockSession();
      (getServerSession as jest.Mock).mockResolvedValue(mockSession);

      const req = new NextRequest('http://localhost:3000/api/risks', {
        method: 'POST',
        body: JSON.stringify({
          titulo: 'Risco Incompleto',
          // faltando campos obrigatórios
        }),
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('obrigatórios');
    });
  });
});
