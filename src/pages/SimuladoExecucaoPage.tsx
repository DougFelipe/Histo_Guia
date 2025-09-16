import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ZoomIn, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { ConfiguracaoSimulado, QuestaoSimulado, QuestaoPratica } from '../types';

const SimuladoExecucaoPage: React.FC = () => {
  const navigate = useNavigate();
  const [configuracao, setConfiguracao] = useState<ConfiguracaoSimulado | null>(null);
  const [questoes, setQuestoes] = useState<QuestaoSimulado[]>([]);
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [imagemCarregada, setImagemCarregada] = useState(false);
  const [erroImagem, setErroImagem] = useState(false);
  const [imagemZoom, setImagemZoom] = useState<string | null>(null);
  const [inicioTempo, setInicioTempo] = useState<number>(Date.now());
  const [loading, setLoading] = useState(true);
  const [tempoEsgotado, setTempoEsgotado] = useState(false);

  useEffect(() => {
    carregarConfiguracaoEQuestoes();
  }, []);

  useEffect(() => {
    // Reset image states when question changes
    setImagemCarregada(false);
    setErroImagem(false);
    setInicioTempo(Date.now());
    setTempoEsgotado(false);
  }, [questaoAtual]);

  const carregarConfiguracaoEQuestoes = async () => {
    try {
      // Carregar configuração do localStorage
      const configSalva = localStorage.getItem('configuracaoSimulado');
      if (!configSalva) {
        navigate('/simulado/configuracao');
        return;
      }

      const config: ConfiguracaoSimulado = JSON.parse(configSalva);
      setConfiguracao(config);

      // Carregar questões dos temas selecionados
      const todasQuestoes: QuestaoPratica[] = [];
      
      const temasArquivos = [
        { nome: 'Tecido Conjuntivo', arquivo: 'tecido-conjuntivo' },
        { nome: 'Tecido Epitelial', arquivo: 'tecido-epitelial' },
        { nome: 'Tecido Muscular', arquivo: 'tecido-muscular' },
        { nome: 'Tecido Nervoso', arquivo: 'tecido-nervoso' },
        { nome: 'Tecido Ósseo', arquivo: 'tecido-osseo' },
        { nome: 'Sistema Circulatório', arquivo: 'sistema-circulatorio' },
        { nome: 'Cartilagem', arquivo: 'cartilagem' }
      ];

      for (const tema of temasArquivos) {
        if (config.temasSelecionados.includes(tema.nome)) {
          try {
            const questoesModule = await import(`../data/temas/${tema.arquivo}/questoes-praticas.json`);
            const questoesTema = questoesModule.default;
            todasQuestoes.push(...questoesTema);
          } catch (error) {
            console.warn(`Erro ao carregar questões do tema ${tema.nome}:`, error);
          }
        }
      }

      // Embaralhar e selecionar o número de questões configurado
      const questoesEmbaralhadas = todasQuestoes.sort(() => Math.random() - 0.5);
      const questoesSelecionadas = questoesEmbaralhadas.slice(0, config.numeroQuestoes);

      // Converter para QuestaoSimulado
      const questoesSimulado: QuestaoSimulado[] = questoesSelecionadas.map(q => ({
        ...q,
        respondida: false
      }));

      setQuestoes(questoesSimulado);
    } catch (error) {
      console.error('Erro ao carregar configuração e questões:', error);
      navigate('/simulado/configuracao');
    } finally {
      setLoading(false);
    }
  };

  const selecionarAlternativa = (alternativaIndex: number) => {
    // Só permite selecionar se não esgotou o tempo e não foi respondida ainda
    if (tempoEsgotado || questoes[questaoAtual].respondida) return;

    const tempoGasto = Math.floor((Date.now() - inicioTempo) / 1000);
    
    setQuestoes(prev => prev.map((q, index) => 
      index === questaoAtual 
        ? { 
            ...q, 
            respostaSelecionada: alternativaIndex, 
            tempoGasto,
            respondida: true 
          }
        : q
    ));

    // Avançar automaticamente após 1 segundo (sem mostrar feedback)
    setTimeout(() => {
      proximaQuestao();
    }, 1000);
  };

  const proximaQuestao = () => {
    if (questaoAtual < questoes.length - 1) {
      setQuestaoAtual(questaoAtual + 1);
    } else {
      finalizarSimulado();
    }
  };

  const onTempoEsgotado = () => {
    // Só marca como tempo esgotado se ainda não foi respondida
    if (questoes[questaoAtual].respondida) return;

    setTempoEsgotado(true);
    const tempoGasto = configuracao?.tempoPorQuestao || 60;
    
    // Marcar questão como não respondida por tempo esgotado
    setQuestoes(prev => prev.map((q, index) => 
      index === questaoAtual 
        ? { 
            ...q, 
            respostaSelecionada: undefined, 
            tempoGasto,
            respondida: true 
          }
        : q
    ));

    // Avançar automaticamente após mostrar mensagem
    setTimeout(() => {
      proximaQuestao();
    }, 2000);
  };

  const finalizarSimulado = () => {
    // Salvar resultado no localStorage
    const resultado = {
      questoes,
      acertos: questoes.filter(q => q.respostaSelecionada === q.respostaCorreta).length,
      erros: questoes.filter(q => q.respostaSelecionada !== undefined && q.respostaSelecionada !== q.respostaCorreta).length,
      naoRespondidas: questoes.filter(q => q.respostaSelecionada === undefined).length,
      tempoTotal: questoes.reduce((total, q) => total + (q.tempoGasto || 0), 0),
      percentualAcerto: Math.round((questoes.filter(q => q.respostaSelecionada === q.respostaCorreta).length / questoes.length) * 100)
    };

    localStorage.setItem('resultadoSimulado', JSON.stringify(resultado));
    navigate('/simulado/resultado');
  };

  const abrirZoom = (imagemUrl: string) => {
    setImagemZoom(imagemUrl);
    document.body.style.overflow = 'hidden';
  };

  const fecharZoom = () => {
    setImagemZoom(null);
    document.body.style.overflow = 'unset';
  };

  // Fechar modal com tecla ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && imagemZoom) {
        fecharZoom();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [imagemZoom]);

  if (loading || !configuracao || questoes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lavender-50 to-purple-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Preparando simulado...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const questao = questoes[questaoAtual];
  const jaRespondida = questao.respondida;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-lavender-50 to-purple-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {/* Header do Simulado */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Simulado Prático</h1>
                <p className="text-slate-600">
                  Questão {questaoAtual + 1} de {questoes.length}
                </p>
              </div>
              
              {/* Progresso */}
              <div className="sm:text-right">
                <div className="text-sm text-slate-600 mb-2">Progresso</div>
                <div className="w-full sm:w-32 bg-slate-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-violet-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${((questaoAtual + 1) / questoes.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Timer */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <Timer
                tempoInicial={configuracao.tempoPorQuestao}
                onTempoEsgotado={onTempoEsgotado}
                pausado={jaRespondida}
                key={questaoAtual} // Reset timer when question changes
              />
            </div>

            {/* Questão */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 p-4 sm:p-6">
                  {/* Coluna da Imagem */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Questão #{questao.id}
                      </span>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                        {questao.tema?.charAt(0).toUpperCase() + questao.tema?.slice(1).replace(/-/g, ' ') || 'Tema'}
                      </span>
                    </div>
                    
                    <div className="relative group cursor-pointer" onClick={() => abrirZoom(questao.imagem)}>
                      {erroImagem ? (
                        <div className="w-full h-64 flex items-center justify-center bg-slate-100 rounded-xl">
                          <div className="text-center">
                            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                            <p className="text-slate-500 text-sm">Imagem não disponível</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          {!imagemCarregada && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 rounded-xl z-10">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                            </div>
                          )}
                          <div className="relative overflow-hidden rounded-xl">
                            <img
                              src={questao.imagem}
                              alt={`Lâmina histológica - ${questao.tema?.charAt(0).toUpperCase() + questao.tema?.slice(1).replace(/-/g, ' ') || 'Histologia'}`}
                              className={`w-full h-64 sm:h-80 object-contain bg-slate-100 border border-slate-200 transition-all duration-300 ${
                                imagemCarregada ? 'opacity-100' : 'opacity-0'
                              } group-hover:scale-105`}
                              onLoad={() => setImagemCarregada(true)}
                              onError={() => setErroImagem(true)}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                              <div className="bg-white bg-opacity-90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                                <ZoomIn className="w-6 h-6 text-slate-700" />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-slate-500">Clique na imagem para ampliar</p>
                    </div>
                  </div>

                  {/* Coluna do Conteúdo */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">
                        {questao.enunciado}
                      </h3>
                    </div>

                    {/* Alternativas */}
                    <div className="space-y-3">
                      {questao.alternativas.map((alternativa, altIndex) => {
                        const isSelected = questao.respostaSelecionada === altIndex;

                        return (
                          <button
                            key={altIndex}
                            onClick={() => selecionarAlternativa(altIndex)}
                            disabled={jaRespondida}
                            className={`w-full text-left p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 ${
                              isSelected
                                ? 'border-purple-500 bg-purple-50'
                                : jaRespondida
                                  ? 'border-slate-200 bg-slate-50 cursor-not-allowed'
                                  : 'border-slate-200 bg-slate-50 hover:border-purple-300 hover:bg-purple-50 cursor-pointer'
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <span className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0 ${
                                isSelected
                                  ? 'bg-purple-500 text-white'
                                  : 'bg-slate-200 text-slate-600'
                              }`}>
                                {String.fromCharCode(65 + altIndex)}
                              </span>
                              <span className="text-slate-800 flex-1 pr-2">{alternativa.texto}</span>
                              {isSelected && (
                                <span className="text-xs sm:text-sm font-medium text-purple-600 whitespace-nowrap">
                                  ✓ Selecionada
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Status da Resposta */}
                    {jaRespondida && (
                      <div className="mt-4 p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="text-center">
                          {questao.respostaSelecionada !== undefined ? (
                            <p className="text-purple-600 font-medium text-sm sm:text-base">✅ Resposta Registrada!</p>
                          ) : (
                            <p className="text-orange-600 font-medium text-sm sm:text-base">⏰ Tempo Esgotado</p>
                          )}
                          <p className="text-slate-600 text-xs sm:text-sm mt-1">
                            {questaoAtual < questoes.length - 1 
                              ? 'Avançando para a próxima questão...'
                              : 'Finalizando simulado...'
                            }
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Mensagem de Tempo Esgotado */}
                    {tempoEsgotado && !questao.respostaSelecionada && (
                      <div className="mt-4 p-3 sm:p-4 rounded-xl bg-orange-50 border border-orange-200">
                        <div className="text-center">
                          <p className="text-orange-600 font-medium text-sm sm:text-base">⏰ Tempo Esgotado!</p>
                          <p className="text-slate-600 text-xs sm:text-sm mt-1">
                            {questaoAtual < questoes.length - 1 
                              ? 'Avançando para a próxima questão...'
                              : 'Finalizando simulado...'
                            }
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal de Zoom */}
      {imagemZoom && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4"
          onClick={fecharZoom}
        >
          <div className="relative max-w-7xl max-h-full w-full flex items-center justify-center">
            <img
              src={imagemZoom}
              alt="Lâmina histológica ampliada"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              Pressione ESC ou clique fora da imagem para fechar
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimuladoExecucaoPage;