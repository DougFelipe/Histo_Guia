import React from 'react';
import { Search } from 'lucide-react';

interface BarraBuscaPraticaProps {
  valor: string;
  onChange: (valor: string) => void;
  placeholder?: string;
}

const BarraBuscaPratica: React.FC<BarraBuscaPraticaProps> = ({ 
  valor, 
  onChange, 
  placeholder = "Buscar por palavra-chave..." 
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-2 md:pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 md:h-5 md:w-5 text-slate-400" />
      </div>
      <input
        type="text"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2 md:py-3 bg-white border-2 border-slate-200 rounded-lg md:rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 text-slate-800 placeholder-slate-500 text-sm md:text-base"
      />
    </div>
  );
};

export default BarraBuscaPratica;
