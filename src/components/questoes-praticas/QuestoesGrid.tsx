import React, { useState } from 'react';
import { CheckCircle, XCircle, ZoomIn, AlertCircle } from 'lucide-react';
import { QuestaoPratica } from '../../types';
import { formatarNomeTema } from '../../utils/temas';

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

  // Adicionar suporte ao ESC para fechar modal
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && imagemZoom) {
        fecharZoom();
      }
    };

    if (imagemZoom) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [imagemZoom]);

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
      ? `Nenhuma questão encontrada para o tema "${formatarNomeTema(temaFiltrado)}"`
      : termoBusca
        ? 'Nenhuma questão encontrada para sua busca'
        : 'Nenhuma questão disponível';

    const sugestao = temaFiltrado 
      ? 'Tente selecionar outro tema.'
      : termoBusca
        ? 'Tente buscar por palavras como "epitélio", "pavimentoso", "estratificado" ou ajustar os termos de busca.'
        : 'Selecione um tema para visualizar as questões práticas.';

    return (
      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-12 text-center border border-slate-100 mx-2 md:mx-0">
        <div className="bg-slate-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
          <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-slate-500" />
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">{mensagem}</h3>
        <p className="text-sm md:text-base text-slate-600">{sugestao}</p>
      </div>
    );
  }

  const getTituloSecao = () => {
    if (temaFiltrado && termoBusca) {
      return `${formatarNomeTema(temaFiltrado)} - Busca: "${termoBusca}"`;
    } else if (temaFiltrado) {
      return formatarNomeTema(temaFiltrado);
    } else if (termoBusca) {
      return `Resultados para: "${termoBusca}"`;
    }
    return 'Questões Práticas de Histologia';
  };

  return (
    <>
      <div className="space-y-4 md:space-y-6">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-3 md:p-4 border border-slate-100 mx-2 md:mx-0">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-base md:text-xl font-semibold text-slate-800 leading-tight">{getTituloSecao()}</h2>
            <span className="bg-purple-100 text-purple-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap">
              {questoes.length} questão{questoes.length !== 1 ? 'ões' : ''}
            </span>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          {questoes.map((questao) => {
            const alternativaEscolhida = alternativaSelecionada[questao.id];

            return (
              <div key={questao.id} className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden border border-slate-100 hover:shadow-xl transition-shadow duration-300 mx-2 md:mx-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 p-3 md:p-6">
                  {/* Coluna da Imagem */}
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="bg-purple-600 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                        Questão #{questao.id}
                      </span>
                      <span className="bg-purple-100 text-purple-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                        {formatarNomeTema(questao.tema)}
                      </span>
                    </div>
                    
                    <div className="relative group cursor-pointer" onClick={() => abrirZoom(questao.imagem)}>
                      {errosImagem[questao.id] ? (
                        <div className="w-full h-56 md:h-72 flex items-center justify-center bg-slate-100 rounded-lg md:rounded-xl">
                          <div className="text-center">
                            <AlertCircle className="w-8 h-8 md:w-12 md:h-12 text-slate-400 mx-auto mb-2" />
                            <p className="text-slate-500 text-xs md:text-sm">Imagem não disponível</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          {!imagensCarregadas[questao.id] && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 rounded-lg md:rounded-xl z-10">
                              <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-purple-600"></div>
                            </div>
                          )}
                          <div className="relative overflow-hidden rounded-lg md:rounded-xl bg-slate-100">
                            <img
                              src={questao.imagem}
                              alt={`Lâmina histológica - ${formatarNomeTema(questao.tema)}`}
                              className={`w-full h-56 md:h-72 object-contain transition-all duration-300 ${
                                imagensCarregadas[questao.id] ? 'opacity-100' : 'opacity-0'
                              } group-hover:scale-105`}
                              onLoad={() => handleImageLoad(questao.id)}
                              onError={() => handleImageError(questao.id)}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                              <div className="bg-white bg-opacity-90 p-2 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                                <ZoomIn className="w-4 h-4 md:w-6 md:h-6 text-slate-700" />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs md:text-sm text-slate-500">Clique na imagem para ampliar</p>
                    </div>
                  </div>

                  {/* Coluna do Conteúdo */}
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2 md:mb-3 leading-tight">
                        {questao.enunciado}
                      </h3>
                    </div>

                    {/* Alternativas */}
                    <div className="space-y-2 md:space-y-3">
                      {questao.alternativas.map((alternativa, altIndex) => {
                        const isSelected = alternativaEscolhida === altIndex;
                        const isCorrect = altIndex === questao.respostaCorreta;
                        const showExplanation = isSelected;

                        return (
                          <div key={altIndex} className="space-y-2">
                            <button
                              onClick={() => selecionarAlternativa(questao.id, altIndex)}
                              className={`w-full text-left p-2 md:p-3 rounded-lg md:rounded-xl border-2 transition-all duration-200 ${
                                isSelected
                                  ? isCorrect
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-red-500 bg-red-50'
                                  : 'border-slate-200 bg-slate-50 hover:border-purple-300'
                              }`}
                            >
                              <div className="flex items-start space-x-2 md:space-x-3">
                                <span className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs md:text-sm font-medium flex-shrink-0 mt-0.5 ${
                                  isSelected
                                    ? isCorrect
                                      ? 'bg-green-500 text-white'
                                      : 'bg-red-500 text-white'
                                    : 'bg-slate-200 text-slate-600'
                                }`}>
                                  {String.fromCharCode(65 + altIndex)}
                                </span>
                                <span className="text-slate-800 text-xs md:text-sm leading-relaxed flex-1">{alternativa.texto}</span>
                                {isSelected && (
                                  <div className="flex-shrink-0">
                                    {isCorrect ? (
                                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                                    ) : (
                                      <XCircle className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                                    )}
                                  </div>
                                )}
                              </div>
                            </button>
                            
                            {showExplanation && (
                              <div className={`p-2 md:p-3 rounded-lg md:rounded-xl animate-slide-down ${
                                isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                              }`}>
                                <div className="flex items-start space-x-2">
                                  {isCorrect ? (
                                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  ) : (
                                    <XCircle className="w-3 h-3 md:w-4 md:h-4 text-red-600 mt-0.5 flex-shrink-0" />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className={`font-medium text-xs md:text-sm mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
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

      {/* Modal de Zoom Responsivo */}
      {imagemZoom && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-2 md:p-4"
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
            <div className="absolute bottom-3 md:bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm backdrop-blur-sm">
              <span className="hidden md:inline">Pressione ESC ou clique fora da imagem para fechar</span>
              <span className="md:hidden">Toque fora da imagem para fechar</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestoesGrid;
