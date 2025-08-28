import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BarraBusca from '../components/glossario/BarraBusca';
import FiltroAlfabetico from '../components/glossario/FiltroAlfabetico';
import ListaTermos from '../components/glossario/ListaTermos';
import SEOHead from '../components/SEOHead';
import { TermoGlossario } from '../types';

const GlossarioPage: React.FC = () => {
  const [termos, setTermos] = useState<TermoGlossario[]>([]);
  const [termosFiltrados, setTermosFiltrados] = useState<TermoGlossario[]>([]);
  const [busca, setBusca] = useState<string>('');
  const [letraSelecionada, setLetraSelecionada] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarGlossario();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [termos, busca, letraSelecionada]);

  const carregarGlossario = async () => {
    setLoading(true);
    try {
      const glossarioModule = await import('../data/glossario/glossario.json');
      const data = glossarioModule.default;
      setTermos(data);
    } catch (error) {
      console.error('Erro ao carregar glossário:', error);
      setTermos([]);
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = () => {
    if (termos.length === 0) {
      setTermosFiltrados([]);
      return;
    }

    let termosFiltrados = [...termos];

    // Aplicar filtro por letra inicial
    if (letraSelecionada && letraSelecionada.trim() !== '') {
      termosFiltrados = termosFiltrados.filter(termo => 
        termo.termo.charAt(0).toUpperCase() === letraSelecionada
      );
    }

    // Aplicar filtro de busca
    if (busca && busca.trim() !== '') {
      const termoBusca = busca.toLowerCase().trim();
      termosFiltrados = termosFiltrados.filter(termo => 
        termo.termo.toLowerCase().includes(termoBusca) ||
        termo.definicao.toLowerCase().includes(termoBusca) ||
        termo.categoria.toLowerCase().includes(termoBusca)
      );
    }

    setTermosFiltrados(termosFiltrados);
  };

  // Obter letras que têm termos disponíveis
  const getLetrasDisponiveis = () => {
    return Array.from(new Set(termos.map(termo => termo.termo.charAt(0).toUpperCase()))).sort();
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "Glossário de Histologia",
    "description": "Glossário completo de termos de histologia com definições detalhadas organizadas por categoria",
    "inDefinedTermSet": termos.map(termo => ({
      "@type": "DefinedTerm",
      "name": termo.termo,
      "description": termo.definicao,
      "inDefinedTermSet": {
        "@type": "DefinedTermSet",
        "name": termo.categoria
      }
    })),
    "publisher": {
      "@type": "Organization",
      "name": "Histoguia"
    }
  };

  return (
    <>
      <SEOHead
        title="Glossário de Histologia - Termos e Definições | Histoguia"
        description="Glossário completo de histologia com mais de 24 termos fundamentais organizados alfabeticamente. Definições detalhadas de tecidos, células, proteínas e estruturas histológicas."
        keywords="glossário histologia, termos histologia, definições medicina, tecido epitelial, tecido conjuntivo, colágeno, fibroblasto, neurônio, epitélio"
        url="https://histoguia.com/glossario"
        structuredData={structuredData}
        canonical="https://histoguia.com/glossario"
      />
      
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main role="main" className="container mx-auto px-4 py-8">
          <header className="mb-6">
            <nav aria-label="Breadcrumb">
              <Link 
                to="/" 
                className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-200 mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao início
              </Link>
            </nav>
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h1 className="text-3xl font-bold text-slate-800">Glossário de Histologia</h1>
            </div>
            <p className="text-slate-600">Explore definições e conceitos fundamentais da histologia organizados alfabeticamente</p>
          </header>

          <div className="max-w-4xl mx-auto space-y-6">
            <section className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Buscar Termos</h2>
              <BarraBusca
                valor={busca}
                onChange={setBusca}
                placeholder="Digite um termo, definição ou categoria..."
              />
            </section>

            <FiltroAlfabetico
              letraSelecionada={letraSelecionada}
              onLetraSelecionada={setLetraSelecionada}
              letrasDisponiveis={getLetrasDisponiveis()}
            />
            
            <section role="main">
              <ListaTermos 
                termos={termosFiltrados}
                loading={loading}
                letraSelecionada={letraSelecionada}
                termoBusca={busca}
              />
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default GlossarioPage;