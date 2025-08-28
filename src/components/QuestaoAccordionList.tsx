import React, { useState } from 'react';
import { ChevronDown, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Questao } from '../types';

interface QuestaoAccordionListProps {
  questoes: Questao[];
  loading: boolean;
  temaSelecionado: string;
}

const QuestaoAccordionList: React.FC<QuestaoAccordionListProps> = ({ questoes, loading, temaSelecionado }) => {
  const [questaoExpandida, setQuestaoExpandida] = useState<number | null>(null);
  const [alternativaSelecionada, setAlternativaSelecionada] = useState<{ [key: number]: number | null }>({});

  const toggleQuestao = (index: number) => {
    setQuestaoExpandida(questaoExpandida === index ? null : index);
    setAlternativaSelecionada(prev => ({ ...prev, [index]: null }));
  };

  const selecionarAlternativa = (questaoIndex: number, alternativaIndex: number) => {
    setAlternativaSelecionada(prev => ({
      ...prev,
      [questaoIndex]: alternativaIndex
    }));
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse border border-slate-100">
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!temaSelecionado) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-100">
        <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">Selecione um tema</h3>
        <p className="text-slate-600">Escolha um tema no menu lateral para visualizar as questões disponíveis.</p>
      </div>
    );
  }

  if (questoes.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-100">
        <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">Nenhuma questão encontrada</h3>
        <p className="text-slate-600">Tente ajustar os filtros ou selecionar outro tema.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-lg p-4 border border-slate-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">
            {temaSelecionado.split('-').map(palavra => 
              palavra.charAt(0).toUpperCase() + palavra.slice(1)
            ).join(' ')}
          </h2>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
            {questoes.length} questões
          </span>
        </div>
      </div>

      {questoes.map((questao, index) => (
        <div key={questao.numero} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
          <button
            onClick={() => toggleQuestao(index)}
            className="w-full p-6 text-left hover:bg-slate-50 transition-colors duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    #{questao.numero}
                  </span>
                  <span className="bg-lavender-200 text-violet-700 px-2 py-1 rounded-full text-xs font-medium">
                    {questao.subtopico}
                  </span>
                </div>
                <p className="text-slate-800 text-lg leading-relaxed">{questao.enunciado}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {questao.tags.map(tag => (
                    <span key={tag} className="bg-rose-100 text-rose-600 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-slate-400 transform transition-transform duration-200 ml-4 ${
                  questaoExpandida === index ? 'rotate-180' : ''
                }`} 
              />
            </div>
          </button>

          {questaoExpandida === index && (
            <div className="border-t border-slate-200 p-6 animate-slide-down">
              <div className="space-y-3">
                {questao.alternativas.map((alternativa, altIndex) => {
                  const isSelected = alternativaSelecionada[index] === altIndex;
                  const isCorrect = altIndex === questao.respostaCorreta;
                  const showExplanation = isSelected;

                  return (
                    <div key={altIndex} className="space-y-2">
                      <button
                        onClick={() => selecionarAlternativa(index, altIndex)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                          isSelected
                            ? isCorrect
                              ? 'border-green-500 bg-green-50'
                              : 'border-red-500 bg-red-50'
                            : 'border-slate-200 bg-slate-50 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            isSelected
                              ? isCorrect
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                              : 'bg-slate-200 text-slate-600'
                          }`}>
                            {String.fromCharCode(65 + altIndex)}
                          </span>
                          <span className="text-slate-800">{alternativa.texto}</span>
                          {isSelected && (
                            <div className="ml-auto">
                              {isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-500" />
                              )}
                            </div>
                          )}
                        </div>
                      </button>
                      
                      {showExplanation && (
                        <div className={`p-4 rounded-xl animate-slide-down ${
                          isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                        }`}>
                          <div className="flex items-start space-x-3">
                            {isCorrect ? (
                              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                            )}
                            <div>
                              <p className={`font-medium mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                                {isCorrect ? 'Resposta Correta!' : 'Resposta Incorreta'}
                              </p>
                              <p className={`text-sm leading-relaxed ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
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
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestaoAccordionList;