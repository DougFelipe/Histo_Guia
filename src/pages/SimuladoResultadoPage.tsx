import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, RotateCcw, ZoomIn, ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { ResultadoSimulado } from '../types';

const SimuladoResultadoPage: React.FC = () => {
  const navigate = useNavigate();
  const [resultado, setResultado] = useState<ResultadoSimulado | null>(null);
  const [questaoExpandida, setQuestaoExpandida] = useState<number | null>(null);
  const [imagemZoom, setImagemZoom] = useState<string | null>(null);

  useEffect(() => {
    carregarResultado();
  }, []);

  const carregarResultado = () => {
    const resultadoSalvo = localStorage.getItem('resultadoSimulado');
    if (!resultadoSalvo) {
      navigate('/simulado/configuracao');
      return;
    }

    const resultado: ResultadoSimulado = JSON.parse(resultadoSalvo);
    setResultado(resultado);
  };

  const formatarTempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos}:${segs.toString().padStart(2, '0')}`;
  };

  const toggleQuestao = (index: number) => {
    setQuestaoExpandida(questaoExpandida === index ? null : index);
  };

  const abrirZoom = (imagemUrl: string) => {
    setImagemZoom(imagemUrl);
    document.body.style.overflow = 'hidden';
  };

  const fecharZoom = () => {
    setImagemZoom(null);
    document.body.style.overflow = 'unset';
  };

  const novoSimulado = () => {
    // Limpar dados do simulado anterior
    localStorage.removeItem('resultadoSimulado');
    localStorage.removeItem('configuracaoSimulado');
    navigate('/simulado/configuracao');
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

  if (!resultado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lavender-50 to-purple-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Carregando resultado...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const getCorDesempenho = (percentual: number) => {
    if (percentual >= 80) return 'text-green-600';
    if (percentual >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMensagemDesempenho = (percentual: number) => {
    if (percentual >= 90) return 'Excelente! 🏆';
    if (percentual >= 80) return 'Muito Bom! 🎉';
    if (percentual >= 70) return 'Bom! 👍';
    if (percentual >= 60) return 'Regular 📚';
    return 'Precisa Melhorar 💪';
  };

  return (
    <>
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
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Resultado do Simulado</h1>
              </div>
            </div>
            <p className="text-slate-600">Confira seu desempenho e revise as questões</p>
          </div>

          <div className="max-w-6xl mx-auto space-y-6">
            {/* Resumo do Resultado */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-100">
              <div className="text-center mb-6">
                <div className={`text-4xl sm:text-6xl font-bold mb-2 ${getCorDesempenho(resultado.percentualAcerto)}`}>
                  {resultado.percentualAcerto}%
                </div>
                <div className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">
                  {getMensagemDesempenho(resultado.percentualAcerto)}
                </div>
                <div className="text-slate-600 text-sm sm:text-base">
                  Você acertou {resultado.acertos} de {resultado.questoes.length} questões
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">{resultado.acertos}</div>
                  <div className="text-sm text-slate-600">Acertos</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <div className="text-2xl font-bold text-red-600">
                    {resultado.questoes.length - resultado.acertos}
                  </div>
                  <div className="text-sm text-slate-600">Erros</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">
                    {formatarTempo(resultado.tempoTotal)}
                  </div>
                  <div className="text-sm text-slate-600">Tempo Total</div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={novoSimulado}
                  className="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-violet-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Novo Simulado</span>
                </button>
              </div>
            </div>

            {/* Revisão das Questões */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-100">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4 sm:mb-6">Revisão das Questões</h2>
              
              <div className="space-y-4">
                {resultado.questoes.map((questao, index) => {
                  const isExpanded = questaoExpandida === index;
                  const isCorrect = questao.respostaSelecionada === questao.respostaCorreta;
                  const wasAnswered = questao.respostaSelecionada !== undefined;

                  return (
                    <div key={questao.id} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleQuestao(index)}
                        className="w-full p-3 sm:p-4 text-left hover:bg-slate-50 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 sm:space-x-4 flex-1 mr-3">
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-base flex-shrink-0 ${
                              !wasAnswered || !isCorrect ? 'bg-red-500' : 'bg-green-500'
                            }`}>
                              {!wasAnswered || !isCorrect ? '✗' : '✓'}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-slate-800 text-sm sm:text-base">
                                Questão {index + 1} - {questao.tema?.charAt(0).toUpperCase() + questao.tema?.slice(1).replace(/-/g, ' ') || 'Tema não identificado'}
                              </div>
                              <div className="text-xs sm:text-sm text-slate-600">
                                {!wasAnswered || !isCorrect ? 'Incorreta' : 'Correta'} • Tempo: {formatarTempo(questao.tempoGasto || 0)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              !wasAnswered || !isCorrect ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                            }`}>
                              {!wasAnswered || !isCorrect ? 'Incorreto' : 'Correto'}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-slate-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="border-t border-slate-200 p-4 sm:p-6 bg-slate-50">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                            {/* Imagem */}
                            <div className="space-y-4">
                              <div className="relative group cursor-pointer" onClick={() => abrirZoom(questao.imagem)}>
                                <img
                                  src={questao.imagem}
                                  alt={`Lâmina histológica - ${questao.tema?.charAt(0).toUpperCase() + questao.tema?.slice(1).replace(/-/g, ' ') || 'Histologia'}`}
                                  className="w-full h-64 sm:h-80 object-contain bg-slate-100 rounded-xl group-hover:scale-105 transition-transform duration-300 border border-slate-200"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center rounded-xl">
                                  <div className="bg-white bg-opacity-90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <ZoomIn className="w-6 h-6 text-slate-700" />
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-slate-500 text-center">Clique para ampliar</p>
                            </div>

                            {/* Conteúdo */}
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-slate-800 mb-2">Enunciado:</h4>
                                <p className="text-slate-700">{questao.enunciado}</p>
                              </div>

                              {/* Alternativas */}
                              <div className="space-y-2">
                                <h4 className="font-semibold text-slate-800">Alternativas:</h4>
                                {questao.alternativas.map((alternativa, altIndex) => {
                                  const isSelected = questao.respostaSelecionada === altIndex;
                                  const isCorrectAnswer = altIndex === questao.respostaCorreta;

                                  return (
                                    <div
                                      key={altIndex}
                                      className={`p-3 rounded-lg border-2 ${
                                        isCorrectAnswer
                                          ? 'border-green-500 bg-green-50'
                                          : isSelected
                                            ? 'border-red-500 bg-red-50'
                                            : 'border-slate-200 bg-white'
                                      }`}
                                    >
                                      <div className="flex items-start space-x-3">
                                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                                          isCorrectAnswer
                                            ? 'bg-green-500 text-white'
                                            : isSelected
                                              ? 'bg-red-500 text-white'
                                              : 'bg-slate-200 text-slate-600'
                                        }`}>
                                          {String.fromCharCode(65 + altIndex)}
                                        </span>
                                        <span className="text-slate-800 flex-1 pr-2 text-sm sm:text-base">{alternativa.texto}</span>
                                        {isSelected && (
                                          <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                                            Sua resposta
                                          </span>
                                        )}
                                        {isCorrectAnswer && (
                                          <span className="text-xs sm:text-sm font-medium text-green-600 whitespace-nowrap">
                                            Resposta correta
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Explicação */}
                              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                <h4 className="font-semibold text-purple-800 mb-2">Explicação:</h4>
                                <p className="text-purple-700 text-sm leading-relaxed">
                                  {questao.alternativas[questao.respostaCorreta].explicacao}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
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

export default SimuladoResultadoPage;