import React from 'react';
import { Filter } from 'lucide-react';

interface FiltroTemaProps {
  temaSelecionado: string;
  onTemaSelecionado: (tema: string) => void;
  temasDisponiveis: string[];
}

const FiltroTema: React.FC<FiltroTemaProps> = ({ 
  temaSelecionado, 
  onTemaSelecionado, 
  temasDisponiveis 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-purple-100 p-2 rounded-lg">
          <Filter className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">Filtrar por Tema</h3>
      </div>
      
      <div className="space-y-2">
        <button
          onClick={() => onTemaSelecionado('')}
          className={`w-full text-left px-4 py-3 rounded-xl transition-colors duration-200 ${
            temaSelecionado === ''
              ? 'bg-purple-100 text-purple-700 font-medium'
              : 'bg-slate-50 text-slate-700 hover:bg-purple-50'
          }`}
        >
          Todos os Temas
        </button>
        {temasDisponiveis.map(tema => (
          <button
            key={tema}
            onClick={() => onTemaSelecionado(tema)}
            className={`w-full text-left px-4 py-3 rounded-xl transition-colors duration-200 ${
              temaSelecionado === tema
                ? 'bg-purple-100 text-purple-700 font-medium'
                : 'bg-slate-50 text-slate-700 hover:bg-purple-50'
            }`}
          >
            {tema}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FiltroTema;