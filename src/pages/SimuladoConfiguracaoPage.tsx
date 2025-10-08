import React, { useState, useEffect } from 'react';
import { ArrowLeft, Settings, Play, Search, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { ConfiguracaoSimulado, QuestaoPratica } from '../types';
import { mapeamentoTemas } from '../utils/temas';

const SimuladoConfiguracaoPage: React.FC = () => {
  const navigate = useNavigate();
  const [configuracao, setConfiguracao] = useState<ConfiguracaoSimulado>({
    temasSelecionados: [],
    numeroQuestoes: 10,
    tempoPorQuestao: 60
  });
  const [temasDisponiveis, setTemasDisponiveis] = useState<string[]>([]);
  const [buscaTema, setBuscaTema] = useState('');
  const [questoesDisponiveis, setQuestoesDisponiveis] = useState<QuestaoPratica[]>([]);
  const [loading, setLoading] = useState(true);

  // Mapeamento reverso (nome de exibição -> arquivo)
  const mapeamentoReverso = Object.fromEntries(
    Object.entries(mapeamentoTemas).map(([key, value]) => [value, key])
  );

  useEffect(() => {
    carregarQuestoes();
  }, []);

  useEffect(() => {
    filtrarTemas();
  }, [buscaTema]);

  const carregarQuestoes = async () => {
    setLoading(true);
    try {
      const todasQuestoes: QuestaoPratica[] = [];
      const temasComQuestoes: string[] = [];
      
      const temasArquivos = Object.keys(mapeamentoTemas);
      
      // Carregar questões de todos os temas
      for (const temaArquivo of temasArquivos) {
        const temaFormatado = mapeamentoTemas[temaArquivo];
        
        try {
          const questoesModule = await import(`../data/temas/${temaArquivo}/questoes-praticas.json`);
          const questoesTema = questoesModule.default;
          
          if (questoesTema && questoesTema.length > 0) {
            // Adicionar nome formatado às questões para facilitar o filtro
            const questoesComTemaFormatado = questoesTema.map((questao: QuestaoPratica) => ({
              ...questao,
              temaFormatado: temaFormatado
            }));
            
            todasQuestoes.push(...questoesComTemaFormatado);
            temasComQuestoes.push(temaFormatado);
          }
        } catch (error) {
          console.warn(`Não foi possível carregar questões do tema: ${temaArquivo}`, error);
        }
      }
      
      setQuestoesDisponiveis(todasQuestoes);
      setTemasDisponiveis(temasComQuestoes);
    } catch (error) {
      console.error('❌ Erro ao carregar questões:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtrarTemas = () => {
    // Implementar filtro de busca se necessário
  };

  const toggleTema = (tema: string) => {
    setConfiguracao(prev => ({
      ...prev,
      temasSelecionados: prev.temasSelecionados.includes(tema)
        ? prev.temasSelecionados.filter(t => t !== tema)
        : [...prev.temasSelecionados, tema]
    }));
  };

  const selecionarTodosTemas = () => {
    setConfiguracao(prev => ({
      ...prev,
      temasSelecionados: temasDisponiveis
    }));
  };

  const limparSelecao = () => {
    setConfiguracao(prev => ({
      ...prev,
      temasSelecionados: []
    }));
  };

  const getQuestoesDosTemas = () => {
    return questoesDisponiveis.filter(q => 
      configuracao.temasSelecionados.includes((q as any).temaFormatado || q.tema)
    );
  };

  const questoesFiltradas = getQuestoesDosTemas();
  const maxQuestoes = questoesFiltradas.length;

  const iniciarSimulado = () => {
    if (configuracao.temasSelecionados.length === 0) {
      alert('Selecione pelo menos um tema!');
      return;
    }

    if (configuracao.numeroQuestoes > maxQuestoes) {
      alert(`Número máximo de questões disponíveis: ${maxQuestoes}`);
      return;
    }

    // Salvar configuração no localStorage
    localStorage.setItem('configuracaoSimulado', JSON.stringify(configuracao));
    
    // Navegar para a página de execução
    navigate('/simulado/iniciar');
  };

  const temasFiltrados = temasDisponiveis.filter(tema =>
    tema.toLowerCase().includes(buscaTema.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lavender-50 to-purple-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Carregando configurações...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
            <div className="flex items-center space-x-3 mb-2 sm:mb-0">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Configurar Simulado</h1>
            </div>
          </div>
          <p className="text-slate-600">Configure os parâmetros do seu simulado prático</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Seleção de Temas */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
              <h3 className="text-lg font-semibold text-slate-800">Selecionar Temas</h3>
              <div className="flex space-x-2">
                <button
                  onClick={selecionarTodosTemas}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 transition-colors duration-200"
                >
                  Todos
                </button>
                <button
                  onClick={limparSelecao}
                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200 transition-colors duration-200"
                >
                  Limpar
                </button>
              </div>
            </div>
            
            {/* Busca de Temas */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={buscaTema}
                onChange={(e) => setBuscaTema(e.target.value)}
                placeholder="Buscar temas..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200"
              />
            </div>

            {/* Lista de Temas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {temasFiltrados.map(tema => (
                <label
                  key={tema}
                  className={`flex items-center p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    configuracao.temasSelecionados.includes(tema)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-slate-200 bg-slate-50 hover:border-purple-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={configuracao.temasSelecionados.includes(tema)}
                    onChange={() => toggleTema(tema)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                    configuracao.temasSelecionados.includes(tema)
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-slate-300'
                  }`}>
                    {configuracao.temasSelecionados.includes(tema) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-slate-800 font-medium flex-1 mr-2">{tema}</span>
                  <span className="text-xs sm:text-sm text-slate-500 whitespace-nowrap">
                    {questoesDisponiveis.filter(q => (q as any).temaFormatado === tema).length} questões
                  </span>
                </label>
              ))}
            </div>

            {configuracao.temasSelecionados.length > 0 && (
              <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-purple-700 text-sm">
                  <strong>{configuracao.temasSelecionados.length}</strong> tema(s) selecionado(s) • 
                  <strong> {questoesFiltradas.length}</strong> questões disponíveis
                </p>
              </div>
            )}
          </div>

          {/* Configurações Numéricas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Número de Questões */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Número de Questões</h3>
              <div className="space-y-4">
                <input
                  type="number"
                  min="1"
                  max={maxQuestoes}
                  value={configuracao.numeroQuestoes}
                  onChange={(e) => setConfiguracao(prev => ({
                    ...prev,
                    numeroQuestoes: Math.min(parseInt(e.target.value) || 1, maxQuestoes)
                  }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 text-center text-2xl font-bold"
                />
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Mínimo: 1</span>
                  <span>Máximo: {maxQuestoes}</span>
                </div>
                
                {/* Botões de Atalho */}
                <div className="flex flex-wrap gap-2">
                  {[5, 10, 15, 20].filter(n => n <= maxQuestoes).map(num => (
                    <button
                      key={num}
                      onClick={() => setConfiguracao(prev => ({ ...prev, numeroQuestoes: num }))}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors duration-200 flex-1 min-w-0 ${
                        configuracao.numeroQuestoes === num
                          ? 'bg-purple-500 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tempo por Questão */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Tempo por Questão</h3>
              <div className="space-y-4">
                <input
                  type="number"
                  min="10"
                  max="300"
                  step="5"
                  value={configuracao.tempoPorQuestao}
                  onChange={(e) => setConfiguracao(prev => ({
                    ...prev,
                    tempoPorQuestao: Math.max(10, Math.min(300, parseInt(e.target.value) || 60))
                  }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 text-center text-2xl font-bold"
                />
                <div className="text-center text-slate-600">
                  {Math.floor(configuracao.tempoPorQuestao / 60)}:{(configuracao.tempoPorQuestao % 60).toString().padStart(2, '0')} minutos
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Mínimo: 10s</span>
                  <span>Máximo: 5min</span>
                </div>
                
                {/* Botões de Atalho */}
                <div className="flex flex-wrap gap-2">
                  {[30, 60, 90, 120].map(segundos => (
                    <button
                      key={segundos}
                      onClick={() => setConfiguracao(prev => ({ ...prev, tempoPorQuestao: segundos }))}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors duration-200 flex-1 min-w-0 ${
                        configuracao.tempoPorQuestao === segundos
                          ? 'bg-purple-500 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {segundos}s
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resumo e Iniciar */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Resumo do Simulado</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">{configuracao.temasSelecionados.length}</div>
                <div className="text-sm text-slate-600">Tema(s) Selecionado(s)</div>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-xl">
                <div className="text-2xl font-bold text-emerald-600">{configuracao.numeroQuestoes}</div>
                <div className="text-sm text-slate-600">Questões</div>
              </div>
              <div className="text-center p-4 bg-violet-50 rounded-xl">
                <div className="text-2xl font-bold text-violet-600">
                  {Math.ceil((configuracao.numeroQuestoes * configuracao.tempoPorQuestao) / 60)}min
                </div>
                <div className="text-sm text-slate-600">Duração Estimada</div>
              </div>
            </div>

            <button
              onClick={iniciarSimulado}
              disabled={configuracao.temasSelecionados.length === 0}
              className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 flex items-center justify-center space-x-3 ${
                configuracao.temasSelecionados.length === 0
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-600 hover:to-violet-700 shadow-lg hover:shadow-xl'
              }`}
            >
              <Play className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Iniciar Simulado</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SimuladoConfiguracaoPage;
