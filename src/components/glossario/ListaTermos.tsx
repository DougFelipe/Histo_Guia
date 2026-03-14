import React, { useState, useEffect } from 'react';
import { BookOpen, Tag } from 'lucide-react';
import { TermoGlossario } from '../../types';

interface ListaTermosProps {
  termos: TermoGlossario[];
  loading: boolean;
  letraSelecionada?: string;
  termoBusca?: string;
  temFiltroAtivo?: boolean;
}

const ITENS_POR_LOTE = 20;

const ListaTermos: React.FC<ListaTermosProps> = ({ 
  termos, 
  loading, 
  letraSelecionada = '', 
  termoBusca = '',
  temFiltroAtivo = false
}) => {
  const [itensVisiveis, setItensVisiveis] = useState(ITENS_POR_LOTE);

  // Resetar itens visíveis quando filtros mudam
  useEffect(() => {
    setItensVisiveis(ITENS_POR_LOTE);
  }, [letraSelecionada, termoBusca]);
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse border border-slate-100">
            <div className="flex justify-between items-start mb-3">
              <div className="h-6 bg-slate-200 rounded w-1/4"></div>
              <div className="h-6 bg-slate-200 rounded w-20"></div>
            </div>
            <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (termos.length === 0) {
    const mensagem = letraSelecionada 
      ? `Nenhum termo encontrado para a letra "${letraSelecionada}"`
      : termoBusca
        ? 'Nenhum termo encontrado para sua busca'
        : 'Nenhum termo encontrado';

    const sugestao = letraSelecionada 
      ? 'Tente selecionar outra letra.'
      : termoBusca
        ? 'Tente ajustar sua busca.'
        : 'Carregue o glossário.';

    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-100">
        <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{mensagem}</h3>
        <p className="text-slate-600">{sugestao}</p>
      </div>
    );
  }

  const getCategoriaColor = (categoria: string) => {
    const cores = {
      'Tecido': 'bg-purple-100 text-purple-700',
      'Célula': 'bg-blue-100 text-blue-700',
      'Proteína': 'bg-green-100 text-green-700',
      'Estrutura': 'bg-orange-100 text-orange-700',
      'Organela': 'bg-pink-100 text-pink-700',
      'Junção Celular': 'bg-indigo-100 text-indigo-700',
      'Componente Celular': 'bg-teal-100 text-teal-700',
      'Estrutura Neural': 'bg-violet-100 text-violet-700',
      'Célula Neural': 'bg-cyan-100 text-cyan-700',
      'Estrutura Vascular': 'bg-red-100 text-red-700',
      'Célula Sanguínea': 'bg-rose-100 text-rose-700',
      'Estrutura Glandular': 'bg-amber-100 text-amber-700',
      'Célula Óssea': 'bg-stone-100 text-stone-700',
      'Estrutura Muscular': 'bg-emerald-100 text-emerald-700',
      'Tecido Especializado': 'bg-fuchsia-100 text-fuchsia-700'
    };
    return cores[categoria as keyof typeof cores] || 'bg-slate-100 text-slate-700';
  };

  // Ordenar termos alfabeticamente
  const termosOrdenados = [...termos].sort((a, b) => a.termo.localeCompare(b.termo));

  const getTituloSecao = () => {
    if (letraSelecionada && termoBusca) {
      return `Termos com "${letraSelecionada}" - Busca: "${termoBusca}"`;
    } else if (letraSelecionada) {
      return `Termos com "${letraSelecionada}"`;
    } else if (termoBusca) {
      return `Resultados para: "${termoBusca}"`;
    }
    return 'Glossário de Histologia';
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-lg p-4 border border-slate-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">{getTituloSecao()}</h2>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
            {termos.length} termo{termos.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Aplicar limite quando não há filtro ativo */}
      {(() => {
        const termosParaExibir = temFiltroAtivo ? termosOrdenados : termosOrdenados.slice(0, itensVisiveis);
        const termosRestantes = temFiltroAtivo ? 0 : termosOrdenados.length - itensVisiveis;

        return (
          <>
            {termosParaExibir.map((termo, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-slate-800">{termo.termo}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getCategoriaColor(termo.categoria)}`}>
                    <Tag className="w-4 h-4" />
                    <span>{termo.categoria}</span>
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed text-lg">{termo.definicao}</p>
              </div>
            ))}

            {!temFiltroAtivo && termosRestantes > 0 && (
              <div className="flex justify-center">
                <button
                  onClick={() => setItensVisiveis(prev => prev + ITENS_POR_LOTE)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Carregar mais ({Math.min(termosRestantes, ITENS_POR_LOTE)} de {termosRestantes} restantes)
                </button>
              </div>
            )}
          </>
        );
      })()}
    </div>
  );
};

export default ListaTermos;