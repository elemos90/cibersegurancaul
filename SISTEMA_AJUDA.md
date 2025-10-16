# 💡 Sistema de Ajuda Contextual - Portal de Cibersegurança

## 🎯 Visão Geral

Implementamos um **sistema de ajuda contextual inteligente** que exibe informações personalizadas para cada perfil de usuário logado no sistema.

---

## ✨ Funcionalidades

### **Botão Flutuante de Ajuda**
- 🎈 **Posição:** Canto inferior direito (fixo)
- 🎨 **Design:** Botão redondo azul com ícone de ajuda (?)
- ✨ **Animação:** Pulso animado para chamar atenção
- 📱 **Responsivo:** Visível em desktop e mobile
- 🔒 **Disponível em:** Todas as páginas protegidas (dashboard, políticas, riscos, etc)

### **Modal Informativo**
Ao clicar no botão, abre um **modal completo** com:

#### **1. Cabeçalho Personalizado**
- Título do perfil do usuário
- Descrição do papel
- Cor personalizada por perfil

#### **2. Suas Responsabilidades**
Lista das principais responsabilidades do perfil

#### **3. O Que Você Pode Fazer** ✅
Lista verde com todas as permissões e ações permitidas

#### **4. Limitações do Seu Perfil** ⛔
Lista vermelha com o que o usuário NÃO pode fazer (evita frustrações)

#### **5. Ações Rápidas**
Botões de acesso rápido às páginas mais relevantes para aquele perfil

#### **6. Dica Importante**
Orientação sobre como obter mais informações ou solicitar permissões

---

## 📋 Conteúdo por Perfil

### **1. Admin** (`admin`)
**Descrição:** "Você é o responsável máximo pela governança de cibersegurança da instituição."

**Pode fazer:**
- ✅ Criar, editar e aprovar políticas
- ✅ Criar e aceitar riscos
- ✅ Fechar incidentes críticos
- ✅ Aprovar exceções de segurança
- ✅ Gerir todos os usuários do sistema
- ✅ Configurar integrações e alertas
- ✅ Gerar relatórios executivos

**Não pode fazer:** (sem limitações)

**Ações Rápidas:**
- Dashboard
- Gerir Usuários
- Políticas
- Riscos
- KPIs

---

### **2. SecOps** (`secops`)
**Descrição:** "Você é responsável pelas operações diárias de segurança e resposta a incidentes."

**Pode fazer:**
- ✅ Criar e editar riscos operacionais
- ✅ Criar, investigar e resolver incidentes
- ✅ Visualizar e comentar políticas
- ✅ Operar ferramentas de segurança
- ✅ Gerar relatórios técnicos
- ✅ Conduzir testes de segurança

**Não pode fazer:**
- ⛔ Aprovar políticas (apenas sugerir)
- ⛔ Aceitar riscos (apenas identificar)
- ⛔ Fechar incidentes críticos (escalar para Admin)
- ⛔ Aprovar exceções (apenas comentar)
- ⛔ Gerir utilizadores do portal

**Ações Rápidas:**
- Dashboard
- Incidentes
- Riscos
- Políticas

---

### **3. TI** (`ti`)
**Descrição:** "Você é responsável pela implementação técnica dos controles de segurança."

**Pode fazer:**
- ✅ Visualizar incidentes atribuídos a você
- ✅ Atualizar status de remediação técnica
- ✅ Comentar em riscos e mitigações
- ✅ Implementar controles de exceções
- ✅ Visualizar KPIs técnicos
- ✅ Gerar relatórios de conformidade técnica

**Não pode fazer:**
- ⛔ Criar riscos ou políticas
- ⛔ Aprovar exceções (apenas implementar)
- ⛔ Investigar incidentes (suporte ao SecOps)
- ⛔ Gerir utilizadores no portal

**Ações Rápidas:**
- Dashboard
- Incidentes
- Exceções
- KPIs Técnicos

---

### **4. Dono de Dados** (`dono_dado`)
**Descrição:** "Você é responsável pela governança e proteção dos dados da sua área funcional."

**Pode fazer:**
- ✅ Criar riscos de privacidade da sua área
- ✅ Aceitar riscos da sua área específica
- ✅ Solicitar exceções de segurança
- ✅ Avaliar fornecedores de dados
- ✅ Visualizar incidentes com dados da sua área
- ✅ Gerar relatórios de conformidade

**Não pode fazer:**
- ⛔ Aprovar exceções (apenas solicitar)
- ⛔ Gerir utilizadores do portal
- ⛔ Criar políticas institucionais
- ⛔ Aceitar riscos de outras áreas

**Ações Rápidas:**
- Dashboard
- Riscos da Minha Área
- Exceções
- Fornecedores

---

### **5. Auditoria** (`auditoria`)
**Descrição:** "Você é responsável pela verificação independente da eficácia dos controles de segurança."

**Pode fazer:**
- ✅ Visualizar TODO o sistema (leitura)
- ✅ Acessar logs de auditoria completos
- ✅ Comentar e recomendar melhorias
- ✅ Auditar fornecedores
- ✅ Gerar relatórios de auditoria
- ✅ Avaliar adequação de controles

**Não pode fazer:**
- ⛔ Criar, editar ou excluir QUALQUER item
- ⛔ Aprovar políticas ou exceções
- ⛔ Participar de operações (independência)
- ⛔ Gerir utilizadores

**Ações Rápidas:**
- Dashboard
- Políticas
- Riscos
- Incidentes
- Fornecedores

---

## 🎨 Design e UX

### **Cores por Perfil**
- **Admin:** Gradiente azul primário (autoridade máxima)
- **SecOps:** Gradiente azul primário (operacional)
- **TI:** Gradiente azul primário (técnico)
- **Dono de Dados:** Gradiente azul primário (governança)
- **Auditoria:** Gradiente azul primário (independente)

### **Ícones**
- 🆘 Botão de ajuda: Ícone de interrogação
- ✅ Permissões: Ícone de check verde
- ⛔ Limitações: Ícone de bloqueio vermelho
- 📋 Responsabilidades: Ícone de clipboard
- ⚡ Ações rápidas: Ícone de raio

### **Animações**
- Pulso no botão de ajuda (chama atenção)
- Fade in/out do modal
- Hover nos botões de ação rápida
- Transições suaves

---

## 📁 Arquivos do Sistema

### **Componente Principal**
```
src/components/HelpModal.tsx
```

**Responsabilidades:**
- Detectar perfil do usuário logado
- Exibir botão flutuante
- Renderizar modal com conteúdo contextual
- Gerenciar estado de abertura/fechamento

### **Integração**
```
src/components/AdminLayout.tsx
```

**Onde está:**
- Adicionado ao final do AdminLayout
- Disponível em todas as páginas protegidas

---

## 🔧 Como Funciona

### **1. Detecção Automática do Perfil**
```typescript
const { data: session } = useSession();
const papel = (session.user as any).papel || "ti";
const content = helpContentByRole[papel];
```

### **2. Conteúdo Dinâmico**
```typescript
const helpContentByRole: Record<string, HelpContent> = {
  admin: { ... },
  secops: { ... },
  ti: { ... },
  dono_dado: { ... },
  auditoria: { ... }
}
```

### **3. Renderização Condicional**
- Botão só aparece para usuários logados
- Conteúdo muda automaticamente baseado no papel
- Ações rápidas são links funcionais

---

## 🎯 Benefícios

### **Para Usuários**
✅ **Clareza:** Entende exatamente o que pode fazer  
✅ **Eficiência:** Acesso rápido às páginas relevantes  
✅ **Autonomia:** Menos necessidade de suporte  
✅ **Aprendizado:** Conhece suas responsabilidades  

### **Para Administradores**
✅ **Menos Suporte:** Usuários auto-suficientes  
✅ **Onboarding:** Novos usuários se adaptam rápido  
✅ **Transparência:** Todos entendem suas limitações  
✅ **Conformidade:** Documentação das responsabilidades  

### **Para a Organização**
✅ **Produtividade:** Menos tempo perdido  
✅ **Satisfação:** Usuários confiantes  
✅ **Governança:** Papéis bem definidos  
✅ **Auditoria:** Rastreabilidade de responsabilidades  

---

## 📱 Responsividade

### **Desktop**
- Botão flutuante no canto inferior direito
- Modal centralizado com largura máxima
- Scroll interno se conteúdo for grande

### **Mobile**
- Botão flutuante menor
- Modal ocupa toda a tela (com margem)
- Scroll otimizado para toque
- Botões maiores para toque

---

## ♿ Acessibilidade

✅ **Keyboard Navigation:** Modal pode ser fechado com ESC  
✅ **Focus Management:** Foco adequado ao abrir/fechar  
✅ **Contraste:** Cores WCAG AA compliant  
✅ **Screen Readers:** Textos semânticos e alternativos  
✅ **Touch Targets:** Botões com tamanho mínimo 44x44px  

---

## 🧪 Como Testar

### **1. Teste Básico**
```
1. Faça login no sistema
2. Vá para qualquer página protegida (ex: /dashboard)
3. Procure o botão azul no canto inferior direito
4. Clique no botão
5. Verifique se o modal abre com suas informações
```

### **2. Teste por Perfil**
```
1. Login como Admin
   ✓ Deve ver "Administrador" no título
   ✓ Sem seção de "Limitações"
   ✓ Ação rápida "Gerir Usuários"

2. Login como SecOps
   ✓ Deve ver "SecOps - Operações de Segurança"
   ✓ Ver limitação "Não pode aprovar políticas"
   ✓ Ação rápida "Incidentes"

3. Login como TI
   ✓ Deve ver "TI - Tecnologia da Informação"
   ✓ Ver limitação "Não pode criar riscos"
   ✓ Ação rápida "KPIs Técnicos"
```

### **3. Teste de Interação**
```
✓ Clique fora do modal → Deve fechar
✓ Clique no X → Deve fechar
✓ Clique em "Entendi" → Deve fechar
✓ Clique em ação rápida → Deve ir para página e fechar modal
✓ Feche e abra novamente → Deve funcionar
```

---

## 🔄 Atualizações Futuras

### **Melhorias Planejadas**
- [ ] Adicionar vídeos tutoriais por perfil
- [ ] Tour guiado para novos usuários
- [ ] Tooltips contextuais nas páginas
- [ ] FAQ interativo
- [ ] Chat de suporte integrado
- [ ] Histórico de ações do usuário
- [ ] Sugestões personalizadas de ações

### **Métricas a Acompanhar**
- 📊 Quantas vezes o botão de ajuda é clicado
- ⏱️ Tempo médio de visualização do modal
- 🔗 Quais ações rápidas são mais usadas
- 👥 Perfil que mais usa o sistema de ajuda

---

## 📚 Documentação Relacionada

- **PERFIS_USUARIOS.md** - Detalhes completos de cada perfil
- **FLUXO_AUTENTICACAO.md** - Como funciona o login e sessões
- **ESTRUTURA_LAYOUTS.md** - Onde o componente está integrado

---

**✨ Sistema de ajuda contextual implementado com sucesso! Usuários agora têm orientação clara e acessível sobre suas responsabilidades e permissões!**
