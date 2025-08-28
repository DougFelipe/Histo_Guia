import React from 'react';

interface FiltroAlfabeticoProps {
  letraSelecionada: string;
  onLetraSelecionada: (letra: string) => void;
  letrasDisponiveis: string[];
}

const FiltroAlfabetico: React.FC<FiltroAlfabeticoProps> = ({ 
  letraSelecionada, 
  onLetraSelecionada, 
  letrasDisponiveis 
}) => {
  const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Filtrar por Letra</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onLetraSelecionada('')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            letraSelecionada === ''
              ? 'bg-purple-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Todas
        </button>
        {alfabeto.map(letra => {
          const temTermos = letrasDisponiveis.includes(letra);
          return (
            <button
              key={letra}
              onClick={() => onLetraSelecionada(letra)}
              disabled={!temTermos}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                letraSelecionada === letra
                  ? 'bg-purple-600 text-white'
                  : temTermos
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    : 'bg-slate-50 text-slate-300 cursor-not-allowed'
              }`}
            >
              {letra}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FiltroAlfabetico;