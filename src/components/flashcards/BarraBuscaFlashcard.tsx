import React from 'react';
import { Search } from 'lucide-react';

interface BarraBuscaFlashcardProps {
  valor: string;
  onChange: (valor: string) => void;
  placeholder?: string;
}

const BarraBuscaFlashcard: React.FC<BarraBuscaFlashcardProps> = ({ 
  valor, 
  onChange, 
  placeholder = "Buscar por palavra-chave..." 
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 text-slate-800 placeholder-slate-500"
      />
    </div>
  );
};

export default BarraBuscaFlashcard;