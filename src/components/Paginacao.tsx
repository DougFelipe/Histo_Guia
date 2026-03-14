import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onPaginaChange: (pagina: number) => void;
}

const Paginacao: React.FC<PaginacaoProps> = ({ paginaAtual, totalPaginas, onPaginaChange }) => {
  if (totalPaginas <= 1) return null;

  const irParaPagina = (pagina: number) => {
    onPaginaChange(pagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Gerar range de páginas visíveis (máximo 5 botões)
  const gerarPaginas = (): number[] => {
    const paginas: number[] = [];
    let inicio = Math.max(1, paginaAtual - 2);
    const fim = Math.min(totalPaginas, inicio + 4);
    inicio = Math.max(1, fim - 4);

    for (let i = inicio; i <= fim; i++) {
      paginas.push(i);
    }
    return paginas;
  };

  return (
    <nav aria-label="Paginação" className="flex items-center justify-center gap-2 mt-6 mb-4 mx-2 md:mx-0">
      <button
        onClick={() => irParaPagina(paginaAtual - 1)}
        disabled={paginaAtual === 1}
        aria-label="Página anterior"
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          paginaAtual === 1
            ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
            : 'bg-white text-slate-600 hover:bg-purple-50 hover:text-purple-600 border border-slate-200 shadow-sm'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      <div className="flex items-center gap-1">
        {gerarPaginas().map(pagina => (
          <button
            key={pagina}
            onClick={() => irParaPagina(pagina)}
            aria-label={`Página ${pagina}`}
            aria-current={pagina === paginaAtual ? 'page' : undefined}
            className={`w-9 h-9 md:w-10 md:h-10 rounded-lg text-sm font-medium transition-colors duration-200 ${
              pagina === paginaAtual
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-purple-50 hover:text-purple-600 border border-slate-200'
            }`}
          >
            {pagina}
          </button>
        ))}
      </div>

      <button
        onClick={() => irParaPagina(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
        aria-label="Próxima página"
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          paginaAtual === totalPaginas
            ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
            : 'bg-white text-slate-600 hover:bg-purple-50 hover:text-purple-600 border border-slate-200 shadow-sm'
        }`}
      >
        <span className="hidden sm:inline">Próxima</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

export default Paginacao;
