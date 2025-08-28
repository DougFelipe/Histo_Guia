import React, { useState } from 'react';
import { ChevronDown, CheckCircle, XCircle, ZoomIn, AlertCircle } from 'lucide-react';
import { QuestaoPratica } from '../../types';

interface QuestoesGridProps {
  questoes: QuestaoPratica[];
  loading: boolean;
  temaFiltrado: string;
  termoBusca: string;
}

const QuestoesGrid: React.FC<QuestoesGridProps> = ({ 
  questoes, 
  loading, 
  temaFiltrado, 
  termoBusca 
}) => {
  const [alternativaSelecionada, setAlternativaSelecionada] = useState<{ [key: number]: number | null }>({});
  const [imagensCarregadas, setImagensCarregadas] = useState<{ [key: number]: boolean }>({});
  const [errosImagem, setErrosImagem] = useState<{ [key: number]: boolean }>({});
  const [imagemZoom, setImagemZoom] = useState<string | null>(null);

  const selecionarAlternativa = (questaoId: number, alternativaIndex: number) => {
    setAlternativaSelecionada(prev => ({
      ...prev,
      [questaoId]: alternativaIndex
    }));
  };

  const handleImageLoad = (questaoId: number) => {
    setImagensCarregadas(prev => ({ ...prev, [questaoId]: true }));
  };

  const handleImageError = (questaoId: number) => {
    setErrosImagem(prev => ({ ...prev, [questaoId]: true }));
  };

  const abrirZoom = (imagemUrl: string) => {
    setImagemZoom(imagemUrl);
    // Prevenir scroll do body quando modal estiver aberto
    document.body.style.overflow = 'hidden';
  };

  const fecharZoom = () => {
    setImagemZoom(null);
    // Restaurar scroll do body
    document.body.style.overflow = 'unset';
  };

  // Fechar modal com tecla ESC
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && imagemZoom) {
        fecharZoom();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Garantir que o scroll seja restaurado ao desmontar o componente
      document.body.style.overflow = 'unset';
    };
  }, [imagemZoom]);

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse border border-slate-100">
            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div className="h-64 bg-slate-200 rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                <div className="space-y-2">
                  <div className="h-10 bg-slate-200 rounded"></div>
                  <div className="h-10 bg-slate-200 rounded"></div>
                  <div className="h-10 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (questoes.length === 0) {
    const mensagem = temaFiltrado 
      ? `Nenhuma questão encontrada para o tema "${temaFiltrado}"`
      : termoBusca
        ? 'Nenhuma questão encontrada para sua busca'
        : 'Nenhuma questão disponível';

    const sugestao = temaFiltrado 
      ? 'Tente selecionar outro tema.'
      : termoBusca
        ? 'Tente ajustar sua busca.'
        : 'Carregue as questões práticas.';

    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-100">
        <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{mensagem}</h3>
        <p className="text-slate-600">{sugestao}</p>
      </div>
    );
  }

  const getTituloSecao = () => {
    if (temaFiltrado && termoBusca) {
      return `${temaFiltrado} - Busca: "${termoBusca}"`;
    } else if (temaFiltrado) {
      return temaFiltrado;
    } else if (termoBusca) {
      return `Resultados para: "${termoBusca}"`;
    }
    return 'Questões Práticas de Histologia';
  };

  return (
    <>
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-4 border border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">{getTituloSecao()}</h2>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
              {questoes.length} questão{questoes.length !== 1 ? 'ões' : ''}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {questoes.map((questao) => {
            const alternativaEscolhida = alternativaSelecionada[questao.id];
            const mostrarResposta = alternativaEscolhida !== undefined && alternativaEscolhida !== null;
            const respostaCorreta = alternativaEscolhida === questao.respostaCorreta;

            return (
              <div key={questao.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  {/* Coluna da Imagem */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Questão #{questao.id}
                      </span>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                        {questao.tema}
                      </span>
                    </div>
                    
                    <div className="relative group cursor-pointer" onClick={() => abrirZoom(questao.imagem)}>
                      {errosImagem[questao.id] ? (
                        <div className="w-full h-64 flex items-center justify-center bg-slate-100 rounded-xl">
                          <div className="text-center">
                            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                            <p className="text-slate-500 text-sm">Imagem não disponível</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          {!imagensCarregadas[questao.id] && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 rounded-xl z-10">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                            </div>
                          )}
                          <div className="relative overflow-hidden rounded-xl">
                            <img
                              src={questao.imagem}
                              alt={`Lâmina histológica - ${questao.tema}`}
                              className={`w-full h-64 object-cover transition-all duration-300 ${
                                imagensCarregadas[questao.id] ? 'opacity-100' : 'opacity-0'
                              } group-hover:scale-105`}
                              onLoad={() => handleImageLoad(questao.id)}
                              onError={() => handleImageError(questao.id)}
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
                      <h3 className="text-lg font-semibold text-slate-800 mb-3">
                        {questao.enunciado}
                      </h3>
                    </div>

                    {/* Alternativas */}
                    <div className="space-y-3">
                      {questao.alternativas.map((alternativa, altIndex) => {
                        const isSelected = alternativaEscolhida === altIndex;
                        const isCorrect = altIndex === questao.respostaCorreta;
                        const showExplanation = isSelected;

                        return (
                          <div key={altIndex} className="space-y-2">
                            <button
                              onClick={() => selecionarAlternativa(questao.id, altIndex)}
                              className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-200 ${
                                isSelected
                                  ? isCorrect
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-red-500 bg-red-50'
                                  : 'border-slate-200 bg-slate-50 hover:border-purple-300'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                                  isSelected
                                    ? isCorrect
                                      ? 'bg-green-500 text-white'
                                      : 'bg-red-500 text-white'
                                    : 'bg-slate-200 text-slate-600'
                                }`}>
                                  {String.fromCharCode(65 + altIndex)}
                                </span>
                                <span className="text-slate-800 text-sm">{alternativa.texto}</span>
                                {isSelected && (
                                  <div className="ml-auto">
                                    {isCorrect ? (
                                      <CheckCircle className="w-4 h-4 text-green-500" />
                                    ) : (
                                      <XCircle className="w-4 h-4 text-red-500" />
                                    )}
                                  </div>
                                )}
                              </div>
                            </button>
                            
                            {showExplanation && (
                              <div className={`p-3 rounded-xl animate-slide-down ${
                                isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                              }`}>
                                <div className="flex items-start space-x-2">
                                  {isCorrect ? (
                                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                                  )}
                                  <div>
                                    <p className={`font-medium text-sm mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                                      {isCorrect ? 'Resposta Correta!' : 'Resposta Incorreta'}
                                    </p>
                                    <p className={`text-xs leading-relaxed ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                      {alternativa.explicacao}
                                    </p>
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
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de Zoom Simplificado */}
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
            
            {/* Instruções discretas */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              Pressione ESC ou clique fora da imagem para fechar
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestoesGrid;