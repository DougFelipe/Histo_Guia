import React, { useState, useEffect } from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';
import { TEMAS_DISPONIVEIS, formatarNomeTema } from '../utils/temas';

interface DropdownTemaProps {
  temaSelecionado: string;
  onTemaSelecionado: (tema: string) => void;
}

const DropdownTema: React.FC<DropdownTemaProps> = ({ temaSelecionado, onTemaSelecionado }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [temas, setTemas] = useState<string[]>([]);

  useEffect(() => {
    // Carregar lista de temas disponíveis da configuração centralizada
    setTemas([...TEMAS_DISPONIVEIS]);
  }, []);

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-slate-100 mx-2 md:mx-0">
      <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-4">
        <div className="bg-purple-100 p-1.5 md:p-2 rounded-lg">
          <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
        </div>
        <h3 className="text-base md:text-lg font-semibold text-slate-800">Selecionar Tema</h3>
      </div>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-3 text-left flex items-center justify-between hover:border-purple-300 focus:border-purple-500 focus:outline-none transition-colors duration-200"
        >
          <span className={`text-sm md:text-base ${temaSelecionado ? 'text-slate-800' : 'text-slate-500'}`}>
            {temaSelecionado ? formatarNomeTema(temaSelecionado) : 'Todos os Temas'}
          </span>
          <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 text-slate-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg md:rounded-xl shadow-xl z-10 animate-slide-down">
            <div className="py-1 md:py-2">
              <button
                onClick={() => {
                  onTemaSelecionado('');
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 md:px-4 py-2 md:py-3 text-sm md:text-base hover:bg-purple-50 transition-colors duration-150 ${
                  temaSelecionado === '' ? 'bg-purple-50 text-purple-600 font-medium' : 'text-slate-700'
                }`}
              >
                Todos os Temas
              </button>
              {temas.map((tema) => (
                <button
                  key={tema}
                  onClick={() => {
                    onTemaSelecionado(tema);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 md:px-4 py-2 md:py-3 text-sm md:text-base hover:bg-purple-50 transition-colors duration-150 ${
                    temaSelecionado === tema ? 'bg-purple-50 text-purple-600 font-medium' : 'text-slate-700'
                  }`}
                >
                  {formatarNomeTema(tema)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownTema;
