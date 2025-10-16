import { render, screen } from '@testing-library/react';
import { KpiCard } from '@/components/KpiCard';

describe('KpiCard Component', () => {
  it('deve renderizar label e value', () => {
    render(<KpiCard label="MFA Cobertura" value="40%" />);
    
    expect(screen.getByText('MFA Cobertura')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
  });

  it('deve renderizar hint quando fornecido', () => {
    render(<KpiCard label="MFA Cobertura" value="40%" hint="Meta 90% / 180d" />);
    
    expect(screen.getByText('Meta 90% / 180d')).toBeInTheDocument();
  });

  it('não deve renderizar hint quando não fornecido', () => {
    render(<KpiCard label="MFA Cobertura" value="40%" />);
    
    const hints = screen.queryByText(/Meta/);
    expect(hints).not.toBeInTheDocument();
  });

  it('deve aplicar classes CSS corretas', () => {
    const { container } = render(<KpiCard label="Test" value="50%" />);
    
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('rounded-2xl', 'border', 'bg-white', 'p-4');
  });
});
