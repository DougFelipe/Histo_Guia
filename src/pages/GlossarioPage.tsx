import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BarraBusca from '../components/glossario/BarraBusca';
import FiltroAlfabetico from '../components/glossario/FiltroAlfabetico';
import ListaTermos from '../components/glossario/ListaTermos';
import SEOHead from '../components/SEOHead';
import { TermoGlossario } from '../types';

interface IndexedTerm {
  original: TermoGlossario;
  termoNormalizado: string;
  definicaoNormalizada: string;
  categoriaNormalizada: string;
  letraInicial: string;
}

const normalizarTexto = (valor: string): string => {
  return valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[\u2010-\u2015]/g, '-')
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const GlossarioPage: React.FC = () => {
  const [termos, setTermos] = useState<TermoGlossario[]>([]);
  const [busca, setBusca] = useState<string>('');
  const [letraSelecionada, setLetraSelecionada] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    carregarGlossario();
  }, []);

  const termosIndexados = useMemo<IndexedTerm[]>(() => {
    return termos.map((termo) => {
      const termoNormalizado = normalizarTexto(termo.termo);

      return {
        original: termo,
        termoNormalizado,
        definicaoNormalizada: normalizarTexto(termo.definicao),
        categoriaNormalizada: normalizarTexto(termo.categoria),
        letraInicial: termoNormalizado.charAt(0).toUpperCase(),
      };
    });
  }, [termos]);

  const letrasDisponiveis = useMemo(() => {
    return Array.from(new Set(termosIndexados.map((termo) => termo.letraInicial))).sort();
  }, [termosIndexados]);

  const termosFiltrados = useMemo(() => {
    if (termosIndexados.length === 0) {
      return [];
    }

    let filtrados = [...termosIndexados];

    if (letraSelecionada && letraSelecionada.trim() !== '') {
      const letraNormalizada = normalizarTexto(letraSelecionada).charAt(0).toUpperCase();
      filtrados = filtrados.filter((termo) => termo.letraInicial === letraNormalizada);
    }

    if (busca && busca.trim() !== '') {
      const termoBuscaNormalizado = normalizarTexto(busca);
      filtrados = filtrados.filter(
        (termo) =>
          termo.termoNormalizado.includes(termoBuscaNormalizado) ||
          termo.definicaoNormalizada.includes(termoBuscaNormalizado) ||
          termo.categoriaNormalizada.includes(termoBuscaNormalizado),
      );
    }

    return filtrados.map((termo) => termo.original);
  }, [termosIndexados, busca, letraSelecionada]);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Glossário de Histologia',
    description:
      'Glossário completo de termos de histologia com definições detalhadas organizadas por categoria',
    inDefinedTermSet: termos.map((termo) => ({
      '@type': 'DefinedTerm',
      name: termo.termo,
      description: termo.definicao,
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        name: termo.categoria,
      },
    })),
    publisher: {
      '@type': 'Organization',
      name: 'Histoguia',
    },
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
            <p className="text-slate-600">
              Explore definições e conceitos fundamentais da histologia organizados alfabeticamente
            </p>
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
              letrasDisponiveis={letrasDisponiveis}
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

