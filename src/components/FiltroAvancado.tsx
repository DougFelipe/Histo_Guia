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
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-lavender-200 p-2 rounded-lg">
            <Filter className="w-5 h-5 text-violet-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Filtros</h3>
        </div>
        {temFiltrosAtivos && (
          <button
            onClick={limparFiltros}
            className="text-slate-500 hover:text-slate-700 text-sm flex items-center space-x-1 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            <span>Limpar</span>
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Subtópico</label>
          <select
            value={filtros.subtopico}
            onChange={(e) => atualizarFiltro('subtopico', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:border-purple-500 focus:outline-none transition-colors duration-200"
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
          <label className="block text-sm font-medium text-slate-700 mb-2">Palavras-chave</label>
          <input
            type="text"
            value={filtros.palavrasChave}
            onChange={(e) => atualizarFiltro('palavrasChave', e.target.value)}
            placeholder="Digite palavras-chave..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:border-purple-500 focus:outline-none transition-colors duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default FiltroAvancado;