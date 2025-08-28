import React, { useState, useEffect } from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';

interface DropdownTemaProps {
  temaSelecionado: string;
  onTemaSelecionado: (tema: string) => void;
}

const DropdownTema: React.FC<DropdownTemaProps> = ({ temaSelecionado, onTemaSelecionado }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [temas, setTemas] = useState<string[]>([]);

  useEffect(() => {
    // Carregar lista de temas disponíveis
    // Por enquanto, usaremos uma lista fixa, mas pode ser carregada dinamicamente
    const temasDisponiveis = [
      'tecido-epitelial',
      'tecido-conjuntivo',
      'tecido-muscular',
      'tecido-nervoso',
      'sistema-circulatorio',
    ];
    setTemas(temasDisponiveis);
  }, []);

  const formatarNomeTema = (tema: string) => {
    return tema.split('-').map(palavra => 
      palavra.charAt(0).toUpperCase() + palavra.slice(1)
    ).join(' ');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-purple-100 p-2 rounded-lg">
          <BookOpen className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">Selecionar Tema</h3>
      </div>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-left flex items-center justify-between hover:border-purple-300 focus:border-purple-500 focus:outline-none transition-colors duration-200"
        >
          <span className={`${temaSelecionado ? 'text-slate-800' : 'text-slate-500'}`}>
            {temaSelecionado ? formatarNomeTema(temaSelecionado) : 'Escolha um tema...'}
          </span>
          <ChevronDown className={`w-5 h-5 text-slate-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-10 animate-slide-down">
            <div className="py-2">
              {temas.map((tema) => (
                <button
                  key={tema}
                  onClick={() => {
                    onTemaSelecionado(tema);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-purple-50 transition-colors duration-150 ${
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