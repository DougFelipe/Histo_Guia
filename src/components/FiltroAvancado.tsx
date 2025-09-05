import React from 'react';
import { Filter, X } from 'lucide-react';
import { FiltroState, Questao } from '../types';

interface FiltroAvancadoProps {
  filtros: FiltroState;
  onFiltrosChange: (filtros: FiltroState) => void;
  questoes: Questao[];
}

const FiltroAvancado: React.FC<FiltroAvancadoProps> = ({ filtros, onFiltrosChange, questoes }) => {
  const subtopicos = Array.from(new Set(questoes.map(q => q.subtopico))).filter(Boolean);

  const atualizarFiltro = (campo: keyof FiltroState, valor: string) => {
    onFiltrosChange({
      ...filtros,
      [campo]: valor
    });
  };

  const limparFiltros = () => {
    onFiltrosChange({
      subtopico: '',
      palavrasChave: '',
    });
  };

  const temFiltrosAtivos = Object.values(filtros).some(valor => valor !== '');

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-slate-100 mx-2 md:mx-0">
      <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0 mb-4">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="bg-lavender-200 p-1.5 md:p-2 rounded-lg">
            <Filter className="w-4 h-4 md:w-5 md:h-5 text-violet-600" />
          </div>
          <h3 className="text-base md:text-lg font-semibold text-slate-800">Filtros</h3>
        </div>
        {temFiltrosAtivos && (
          <button
            onClick={limparFiltros}
            className="text-slate-500 hover:text-slate-700 text-xs md:text-sm flex items-center space-x-1 transition-colors duration-200 self-start md:self-auto"
          >
            <X className="w-3 h-3 md:w-4 md:h-4" />
            <span>Limpar</span>
          </button>
        )}
      </div>
      
      <div className="space-y-3 md:space-y-4">
        <div>
          <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1 md:mb-2">Subtópico</label>
          <select
            value={filtros.subtopico}
            onChange={(e) => atualizarFiltro('subtopico', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 md:px-3 py-2 text-sm md:text-base focus:border-purple-500 focus:outline-none transition-colors duration-200"
          >
            <option value="">Todos os subtópicos</option>
            {subtopicos.map(subtopico => (
              <option key={subtopico} value={subtopico}>
                {subtopico.charAt(0).toUpperCase() + subtopico.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1 md:mb-2">Palavras-chave</label>
          <input
            type="text"
            value={filtros.palavrasChave}
            onChange={(e) => atualizarFiltro('palavrasChave', e.target.value)}
            placeholder="Digite palavras-chave..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 md:px-3 py-2 text-sm md:text-base focus:border-purple-500 focus:outline-none transition-colors duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default FiltroAvancado;