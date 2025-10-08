import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Histoguia" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity" onClick={closeMenu}>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden">
              <img 
                src="/logo.png" 
                alt="Histoguia" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-800">{title}</h1>
              <p className="text-xs md:text-sm text-slate-600">Plataforma de Estudos</p>
            </div>
          </Link>

          {/* Menu Desktop */}
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
                  {/* Flashcards Práticos 
                  <Link 
                    to="/flashcards/praticos" 
                    className="block px-4 py-2 text-slate-600 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                  >
                    Flashcards Práticos
                  </Link>*/}
                </div>
              </div>
            </div>
            {/* Flashcards Práticos 
            <Link 
              to="/simulado/configuracao" 
              className="text-slate-600 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Simulado
            </Link>*/}
            <Link 
              to="/glossario" 
              className="text-slate-600 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Glossário
            </Link>
            <Link 
              to="/equipe" 
              className="text-slate-600 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Equipe
            </Link>
          </nav>

          {/* Botão Menu Mobile */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-slate-600" />
            ) : (
              <Menu className="w-6 h-6 text-slate-600" />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 mt-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <nav className="bg-slate-50 rounded-xl p-4 space-y-3">
            <Link 
              to="/" 
              className="block py-3 px-4 text-slate-600 hover:text-purple-600 hover:bg-white rounded-lg transition-all duration-200 font-medium"
              onClick={closeMenu}
            >
              Início
            </Link>
            <Link 
              to="/questoes-teoricas" 
              className="block py-3 px-4 text-slate-600 hover:text-purple-600 hover:bg-white rounded-lg transition-all duration-200 font-medium"
              onClick={closeMenu}
            >
              Questões Teóricas
            </Link>
            <Link 
              to="/questoes-praticas" 
              className="block py-3 px-4 text-slate-600 hover:text-purple-600 hover:bg-white rounded-lg transition-all duration-200 font-medium"
              onClick={closeMenu}
            >
              Questões Práticas
            </Link>
            <div className="border-l-4 border-purple-300 pl-4 ml-4">
              <p className="text-sm text-slate-500 mb-2 font-medium">Flashcards</p>
              <Link 
                to="/flashcards/teoricos" 
                className="block py-2 px-4 text-slate-600 hover:text-purple-600 hover:bg-white rounded-lg transition-all duration-200"
                onClick={closeMenu}
              >
                Flashcards Teóricos
              </Link>
              
              {/* Menu Mobile 
              <Link 
                to="/flashcards/praticos" 
                className="block py-2 px-4 text-slate-600 hover:text-purple-600 hover:bg-white rounded-lg transition-all duration-200"
                onClick={closeMenu}
              >
                Flashcards Práticos
              </Link>*/}
              
            </div>
            <Link 
              to="/simulado/configuracao" 
              className="block py-3 px-4 text-slate-600 hover:text-purple-600 hover:bg-white rounded-lg transition-all duration-200 font-medium"
              onClick={closeMenu}
            >
              Simulado
            </Link>
            <Link 
              to="/glossario" 
              className="block py-3 px-4 text-slate-600 hover:text-purple-600 hover:bg-white rounded-lg transition-all duration-200 font-medium"
              onClick={closeMenu}
            >
              Glossário
            </Link>
            <Link 
              to="/equipe" 
              className="block py-3 px-4 text-slate-600 hover:text-purple-600 hover:bg-white rounded-lg transition-all duration-200 font-medium"
              onClick={closeMenu}
            >
              Equipe
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
