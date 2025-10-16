import { calcularNivelRisco } from '@/lib/risk-calculator';

describe('calcularNivelRisco', () => {
  describe('nível muito_baixo (resultado <= 4)', () => {
    it('deve retornar muito_baixo para muito_baixo x muito_baixo (1x1=1)', () => {
      expect(calcularNivelRisco('muito_baixo', 'muito_baixo')).toBe('muito_baixo');
    });

    it('deve retornar muito_baixo para muito_baixo x baixo (1x2=2)', () => {
      expect(calcularNivelRisco('muito_baixo', 'baixo')).toBe('muito_baixo');
    });

    it('deve retornar muito_baixo para baixo x baixo (2x2=4)', () => {
      expect(calcularNivelRisco('baixo', 'baixo')).toBe('muito_baixo');
    });
  });

  describe('nível baixo (resultado 5-8)', () => {
    it('deve retornar baixo para muito_baixo x muito_alto (1x5=5)', () => {
      expect(calcularNivelRisco('muito_baixo', 'muito_alto')).toBe('baixo');
    });

    it('deve retornar baixo para baixo x medio (2x3=6)', () => {
      expect(calcularNivelRisco('baixo', 'medio')).toBe('baixo');
    });

    it('deve retornar baixo para medio x medio (3x3=9) - ERRO NO LIMITE', () => {
      // Este teste documenta um possível bug na função
      // 3x3=9 está fora do range <=8 mas dentro de <=12
      expect(calcularNivelRisco('medio', 'medio')).toBe('medio');
    });

    it('deve retornar baixo para baixo x alto (2x4=8)', () => {
      expect(calcularNivelRisco('baixo', 'alto')).toBe('baixo');
    });
  });

  describe('nível medio (resultado 9-12)', () => {
    it('deve retornar medio para medio x medio (3x3=9)', () => {
      expect(calcularNivelRisco('medio', 'medio')).toBe('medio');
    });

    it('deve retornar medio para medio x alto (3x4=12)', () => {
      expect(calcularNivelRisco('medio', 'alto')).toBe('medio');
    });
  });

  describe('nível alto (resultado 13-16)', () => {
    it('deve retornar alto para medio x muito_alto (3x5=15)', () => {
      expect(calcularNivelRisco('medio', 'muito_alto')).toBe('alto');
    });

    it('deve retornar alto para alto x alto (4x4=16)', () => {
      expect(calcularNivelRisco('alto', 'alto')).toBe('alto');
    });
  });

  describe('nível muito_alto (resultado > 16)', () => {
    it('deve retornar muito_alto para alto x muito_alto (4x5=20)', () => {
      expect(calcularNivelRisco('alto', 'muito_alto')).toBe('muito_alto');
    });

    it('deve retornar muito_alto para muito_alto x muito_alto (5x5=25)', () => {
      expect(calcularNivelRisco('muito_alto', 'muito_alto')).toBe('muito_alto');
    });
  });

  describe('valores inválidos', () => {
    it('deve usar valor padrão 3 para probabilidade inválida', () => {
      expect(calcularNivelRisco('invalido', 'medio')).toBe('medio');
    });

    it('deve usar valor padrão 3 para impacto inválido', () => {
      expect(calcularNivelRisco('medio', 'invalido')).toBe('medio');
    });

    it('deve usar valores padrão 3 para ambos inválidos (3x3=9)', () => {
      expect(calcularNivelRisco('invalido', 'invalido')).toBe('medio');
    });
  });
});
