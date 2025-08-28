import React from 'react';
import { Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Histoguia" }) => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-2 rounded-xl">
              <Microscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
              <p className="text-sm text-slate-600">Plataforma de Histologia</p>
            </div>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className="text-slate-600 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Início
            </Link>
            <Link 
              to="/questoes-teoricas" 
              className="text-slate-600 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Questões Teóricas
            </Link>
            <Link 
              to="/questoes-praticas" 
              className="text-slate-600 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Questões Práticas
            </Link>
            <div className="relative group">
              <button className="text-slate-600 hover:text-purple-600 transition-colors duration-200 font-medium">
                Flashcards
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="py-2">
                  <Link 
                    to="/flashcards/teoricos" 
                    className="block px-4 py-2 text-slate-600 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                  >
                    Flashcards Teóricos
                  </Link>
                  <Link 
                    to="/flashcards/praticos" 
                    className="block px-4 py-2 text-slate-600 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                  >
                    Flashcards Práticos
                  </Link>
                </div>
              </div>
            </div>
            <Link 
              to="/simulado/configuracao" 
              className="text-slate-600 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Simulado
            </Link>
            <Link 
              to="/glossario" 
              className="text-slate-600 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Glossário
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;