import React from 'react';
import { ChevronLeft, ChevronRight, Shuffle, RotateCcw } from 'lucide-react';

interface NavegacaoFlashcardProps {
  indiceAtual: number;
  total: number;
  onAnterior: () => void;
  onProximo: () => void;
  onEmbaralhar: () => void;
  onReiniciar: () => void;
}

const NavegacaoFlashcard: React.FC<NavegacaoFlashcardProps> = ({
  indiceAtual,
  total,
  onAnterior,
  onProximo,
  onEmbaralhar,
  onReiniciar
}) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Indicador de Progresso */}
      <div className="flex items-center space-x-4">
        <div className="bg-white rounded-full px-4 py-2 shadow-lg">
          <span className="text-slate-700 font-medium">
            {indiceAtual + 1} de {total}
          </span>
        </div>
        
        {/* Barra de Progresso */}
        <div className="w-32 bg-slate-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-violet-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((indiceAtual + 1) / total) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Botões de Navegação */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onAnterior}
          disabled={indiceAtual === 0}
          className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
            indiceAtual === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-white text-slate-700 hover:bg-slate-50 hover:shadow-xl'
          }`}
          title="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={onEmbaralhar}
          className="p-3 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 shadow-lg hover:shadow-xl transition-all duration-200"
          title="Embaralhar"
        >
          <Shuffle className="w-5 h-5" />
        </button>

        <button
          onClick={onReiniciar}
          className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 shadow-lg hover:shadow-xl transition-all duration-200"
          title="Reiniciar"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={onProximo}
          disabled={indiceAtual === total - 1}
          className={`p-3 rounded-full shadow-lg transition-all duration-200 ${
            indiceAtual === total - 1
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-white text-slate-700 hover:bg-slate-50 hover:shadow-xl'
          }`}
          title="Próximo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default NavegacaoFlashcard;