"use client";

import { useState } from "react";

export default function ReportarPage() {
  const [formData, setFormData] = useState({
    tipo: "",
    descricao: "",
    nome: "",
    email: "",
    telefone: "",
    departamento: "",
    urgencia: "media"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
        <div className="max-w-2xl w-full">
          <div className="card text-center">
            <div className="card-body py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">
                Incidente Reportado com Sucesso!
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Seu reporte foi recebido e será analisado pela nossa equipe de segurança. 
                Você receberá um email de confirmação em breve.
              </p>
              <div className="bg-slate-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-slate-700 mb-1">
                  <strong>Número do Protocolo:</strong>
                </p>
                <p className="text-2xl font-mono font-bold text-primary-700">
                  INC-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      tipo: "", descricao: "", nome: "", email: "",
                      telefone: "", departamento: "", urgencia: "media"
                    });
                  }}
                  className="btn btn-secondary btn-md"
                >
                  Reportar Outro Incidente
                </button>
                <a href="/" className="btn btn-primary btn-md">
                  Voltar ao Início
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header - Cybersecurity Style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-white pt-8 pb-12 md:pt-10 md:pb-14">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Animated Glow Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-40 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 -right-40 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Text */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-400/30 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-red-300">Resposta Imediata</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-white via-red-100 to-rose-200 bg-clip-text text-transparent drop-shadow-lg">
                    Reportar Incidente
                  </span>
                  <br />
                  <span className="text-white drop-shadow-lg">de Segurança</span>
                </h1>

                <p className="text-lg md:text-xl text-red-100 leading-relaxed">
                  Se você identificou ou suspeita de um incidente de segurança, reporte imediatamente.
                  <span className="text-rose-300 font-semibold"> Sua ação rápida pode prevenir danos maiores.</span>
                </p>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-96 h-96 bg-gradient-to-r from-red-500/30 to-rose-500/30 rounded-full blur-3xl animate-pulse"></div>
                </div>

                {/* Central Shield with Exclamation */}
                <div className="relative flex items-center justify-center">
                  <svg className="w-64 h-64 text-red-400 drop-shadow-2xl" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Orbiting Icons */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Speakerphone (Report) */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm border border-red-400/30 rounded-2xl flex items-center justify-center animate-bounce" style={{animationDuration: '3s'}}>
                    <svg className="w-8 h-8 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Clock (Fast Response) */}
                  <div className="absolute bottom-8 right-12 w-14 h-14 bg-gradient-to-br from-rose-500/20 to-rose-600/20 backdrop-blur-sm border border-rose-400/30 rounded-2xl flex items-center justify-center animate-bounce" style={{animationDuration: '2.5s', animationDelay: '0.5s'}}>
                    <svg className="w-7 h-7 text-rose-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Phone (24/7 Support) */}
                  <div className="absolute bottom-16 left-8 w-14 h-14 bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-sm border border-orange-400/30 rounded-2xl flex items-center justify-center animate-bounce" style={{animationDuration: '2.8s', animationDelay: '1s'}}>
                    <svg className="w-7 h-7 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Incidentes */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-6 text-center">
            Tipos Comuns de Incidentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-3xl mb-2">📧</div>
              <h3 className="font-semibold text-slate-900 mb-1">Phishing / Email Suspeito</h3>
              <p className="text-xs text-slate-600">Recebeu email suspeito ou clicou em link malicioso</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="text-3xl mb-2">🦠</div>
              <h3 className="font-semibold text-slate-900 mb-1">Malware / Vírus</h3>
              <p className="text-xs text-slate-600">Computador ou dispositivo infectado</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="text-3xl mb-2">🔓</div>
              <h3 className="font-semibold text-slate-900 mb-1">Conta Comprometida</h3>
              <p className="text-xs text-slate-600">Acesso não autorizado à sua conta</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-3xl mb-2">💾</div>
              <h3 className="font-semibold text-slate-900 mb-1">Perda de Dados</h3>
              <p className="text-xs text-slate-600">Dados perdidos, roubados ou vazados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section className="py-12 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="card">
            <div className="card-header">
              <h2 className="text-2xl font-display font-bold text-slate-900">
                Formulário de Reporte
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Preencha todos os campos obrigatórios (*) com o máximo de detalhes possível
              </p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Tipo de Incidente */}
                <div>
                  <label className="label">Tipo de Incidente *</label>
                  <select 
                    className="input"
                    required
                    value={formData.tipo}
                    onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                  >
                    <option value="">Selecione o tipo...</option>
                    <option value="phishing">📧 Phishing / Email Suspeito</option>
                    <option value="malware">🦠 Malware / Vírus</option>
                    <option value="conta">🔓 Conta Comprometida</option>
                    <option value="dados">💾 Perda de Dados</option>
                    <option value="acesso">🚪 Acesso Não Autorizado</option>
                    <option value="vulnerabilidade">🔍 Vulnerabilidade Identificada</option>
                    <option value="outro">❓ Outro</option>
                  </select>
                </div>

                {/* Urgência */}
                <div>
                  <label className="label">Nível de Urgência *</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, urgencia: "baixa"})}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.urgencia === "baixa"
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-slate-200 hover:border-emerald-300"
                      }`}
                    >
                      <div className="font-semibold text-slate-900">Baixa</div>
                      <div className="text-xs text-slate-600">Pode aguardar</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, urgencia: "media"})}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.urgencia === "media"
                          ? "border-amber-500 bg-amber-50"
                          : "border-slate-200 hover:border-amber-300"
                      }`}
                    >
                      <div className="font-semibold text-slate-900">Média</div>
                      <div className="text-xs text-slate-600">Atenção necessária</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, urgencia: "alta"})}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.urgencia === "alta"
                          ? "border-red-500 bg-red-50"
                          : "border-slate-200 hover:border-red-300"
                      }`}
                    >
                      <div className="font-semibold text-slate-900">Alta</div>
                      <div className="text-xs text-slate-600">Urgente!</div>
                    </button>
                  </div>
                </div>

                {/* Descrição */}
                <div>
                  <label className="label">Descrição Detalhada do Incidente *</label>
                  <textarea
                    className="input"
                    rows={6}
                    required
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    placeholder="Descreva o que aconteceu, quando aconteceu, e qualquer outra informação relevante..."
                  ></textarea>
                  <p className="text-xs text-slate-500 mt-1">
                    Inclua: data/hora aproximada, dispositivo usado, ações tomadas, etc.
                  </p>
                </div>

                {/* Informações de Contato */}
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Suas Informações de Contato
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Nome Completo *</label>
                      <input
                        type="text"
                        className="input"
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="label">Email Institucional *</label>
                      <input
                        type="email"
                        className="input"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="seunome@unilicungo.ac.mz"
                      />
                    </div>
                    <div>
                      <label className="label">Telefone</label>
                      <input
                        type="tel"
                        className="input"
                        value={formData.telefone}
                        onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                        placeholder="+258 XX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label className="label">Departamento</label>
                      <input
                        type="text"
                        className="input"
                        value={formData.departamento}
                        onChange={(e) => setFormData({...formData, departamento: e.target.value})}
                        placeholder="Ex: Departamento de TI"
                      />
                    </div>
                  </div>
                </div>

                {/* Anexos */}
                <div>
                  <label className="label">Anexos (Opcional)</label>
                  <input
                    type="file"
                    className="input"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Screenshots, emails, logs, etc. (Máx. 10MB por arquivo)
                  </p>
                </div>

                {/* Aviso de Privacidade */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="text-xs text-slate-600">
                      <strong className="text-slate-900">Privacidade:</strong> Suas informações serão tratadas de forma confidencial 
                      e usadas apenas para investigação e resposta ao incidente reportado, conforme nossa Política de Privacidade.
                    </div>
                  </div>
                </div>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-lg flex-1 relative"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Enviar Reporte de Incidente
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg"
                    onClick={() => window.history.back()}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contato de Emergência */}
      <section className="py-12 bg-red-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">
            Precisa de Ajuda Urgente?
          </h2>
          <p className="text-slate-600 mb-6">
            Para incidentes críticos ou em andamento, entre em contato imediatamente
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+258123456789" className="btn btn-lg bg-red-600 text-white hover:bg-red-700 inline-flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +258 12 345 6789 (24/7)
            </a>
            <a href="mailto:security@unilicungo.ac.mz" className="btn btn-lg btn-secondary inline-flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              security@unilicungo.ac.mz
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
