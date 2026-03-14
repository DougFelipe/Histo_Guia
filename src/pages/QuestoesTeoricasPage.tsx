import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import DropdownTema from '../components/DropdownTema';
import FiltroAvancado from '../components/FiltroAvancado';
import QuestaoAccordionList from '../components/QuestaoAccordionList';
import Paginacao from '../components/Paginacao';
import SEOHead from '../components/SEOHead';
import { Questao, FiltroState } from '../types';
import { TEMAS_DISPONIVEIS } from '../utils/temas';

const QUESTOES_POR_PAGINA = 20;

const QuestoesTeoricasPage: React.FC = () => {
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [questoesFiltradas, setQuestoesFiltradas] = useState<Questao[]>([]);
  const [temaSelecionado, setTemaSelecionado] = useState<string>('');
  const [filtros, setFiltros] = useState<FiltroState>({
    subtopico: '',
    palavrasChave: '',
  });
  const [loading, setLoading] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    // Limpar filtros quando o tema muda
    setFiltros({
      subtopico: '',
      palavrasChave: '',
    });
    
    if (temaSelecionado) {
      carregarQuestoes(temaSelecionado);
    } else {
      carregarTodasQuestoes();
    }
  }, [temaSelecionado]);

  useEffect(() => {
    aplicarFiltros();
    setPaginaAtual(1);
  }, [questoes, filtros]);

  const carregarQuestoes = async (tema: string) => {
    setLoading(true);
    try {
      // Importar dinamicamente o arquivo JSON
      const questoesModule = await import(`../data/temas/${tema}/questoes-teoricas.json`);
      const data = questoesModule.default;
      // As questões teóricas estão direto no array, não em data.questoes
      const questoesDoTema = Array.isArray(data) ? data.map(questao => ({
        ...questao,
        temaOrigem: tema // Adicionar o tema para identificação
      })) : [];
      
      setQuestoes(questoesDoTema);
      setQuestoesFiltradas(questoesDoTema);
    } catch (error) {
      console.error('Erro ao carregar questões teóricas:', error);
      setQuestoes([]);
      setQuestoesFiltradas([]);
    } finally {
      setLoading(false);
    }
  };

  const carregarTodasQuestoes = async () => {
    setLoading(true);
    try {
      const temas = TEMAS_DISPONIVEIS;

      // Carregamento paralelo de todos os temas
      const resultados = await Promise.all(
        temas.map(async (tema) => {
          try {
            const questoesModule = await import(`../data/temas/${tema}/questoes-teoricas.json`);
            const data = questoesModule.default;
            if (data && Array.isArray(data)) {
              return data.map((questao: Questao) => ({
                ...questao,
                temaOrigem: tema
              }));
            }
            return [];
          } catch (error) {
            console.warn(`Erro ao carregar questões do tema ${tema}:`, error);
            return [];
          }
        })
      );

      const todasQuestoes = resultados.flat();
      setQuestoes(todasQuestoes);
      setQuestoesFiltradas(todasQuestoes);
    } catch (error) {
      console.error('Erro ao carregar todas as questões teóricas:', error);
      setQuestoes([]);
      setQuestoesFiltradas([]);
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = () => {
    if (questoes.length === 0) {
      setQuestoesFiltradas([]);
      return;
    }

    let questoesFiltradas = [...questoes];

    // Aplicar filtro de subtópico apenas se houver um valor selecionado
    if (filtros.subtopico && filtros.subtopico.trim() !== '') {
      questoesFiltradas = questoesFiltradas.filter(q => q.subtopico === filtros.subtopico);
    }

    // Aplicar filtro de palavras-chave apenas se houver texto digitado
    if (filtros.palavrasChave && filtros.palavrasChave.trim() !== '') {
      const palavras = filtros.palavrasChave.toLowerCase().trim().split(' ').filter(p => p.length > 0);
      questoesFiltradas = questoesFiltradas.filter(q => 
        palavras.some(palavra => {
          // Buscar no enunciado
          if (q.enunciado && q.enunciado.toLowerCase().includes(palavra)) return true;
          
          // Buscar no subtópico se existir
          if (q.subtopico && q.subtopico.toLowerCase().includes(palavra)) return true;
          
          // Buscar nas tags se existirem
          if (q.tags && Array.isArray(q.tags)) {
            if (q.tags.some(tag => tag.toLowerCase().includes(palavra))) return true;
          }
          
          // Buscar nas alternativas e suas explicações se existirem
          if (q.alternativas && Array.isArray(q.alternativas)) {
            if (q.alternativas.some(alt => {
              if (alt.texto && alt.texto.toLowerCase().includes(palavra)) return true;
              if (alt.explicacao && alt.explicacao.toLowerCase().includes(palavra)) return true;
              return false;
            })) return true;
          }
          
          return false;
        })
      );
    }

    setQuestoesFiltradas(questoesFiltradas);
  };

  // Paginação
  const totalPaginas = Math.ceil(questoesFiltradas.length / QUESTOES_POR_PAGINA);
  const questoesPaginadas = useMemo(() => {
    const inicio = (paginaAtual - 1) * QUESTOES_POR_PAGINA;
    return questoesFiltradas.slice(inicio, inicio + QUESTOES_POR_PAGINA);
  }, [questoesFiltradas, paginaAtual]);

  const formatarNomeTema = (tema: string) => {
    return tema.split('-').map(palavra => 
      palavra.charAt(0).toUpperCase() + palavra.slice(1)
    ).join(' ');
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalArticle",
    "headline": `Questões Teóricas de Histologia${temaSelecionado ? ` - ${formatarNomeTema(temaSelecionado)}` : ''}`,
    "description": `Questões teóricas organizadas por tema para estudo de histologia${temaSelecionado ? ` sobre ${formatarNomeTema(temaSelecionado)}` : ''}. Inclui explicações detalhadas para cada alternativa.`,
    "author": {
      "@type": "Organization",
      "name": "Histoguia"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "Histoguia",
      "logo": {
        "@type": "ImageObject",
        "url": "https://histoguia.com/logo.png"
      }
    },
    "educationalLevel": "Higher Education",
    "educationalUse": "Study Guide",
    "learningResourceType": "Practice Questions",
    "about": [
      {
        "@type": "Thing",
        "name": "Histologia",
        "description": "Estudo dos tecidos biológicos"
      }
    ]
  };

  return (
    <>
      <SEOHead
        title={`Questões Teóricas de Histologia${temaSelecionado ? ` - ${formatarNomeTema(temaSelecionado)}` : ''} | Histoguia`}
        description={`Estude histologia com questões teóricas organizadas por tema${temaSelecionado ? ` sobre ${formatarNomeTema(temaSelecionado)}` : ''}. Mais de 200 questões com explicações detalhadas para cada alternativa.`}
        keywords={`questões histologia, ${temaSelecionado ? formatarNomeTema(temaSelecionado) + ', ' : ''}estudo medicina, questões teóricas, medicina, biomedicina`}
        url={`https://histoguia.com/questoes-teoricas${temaSelecionado ? `?tema=${temaSelecionado}` : ''}`}
        structuredData={structuredData}
        canonical="https://histoguia.com/questoes-teoricas"
      />
      
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main role="main" className="container mx-auto px-2 md:px-4 py-4 md:py-8">
          <header className="mb-4 md:mb-6 px-2 md:px-0">
            <nav aria-label="Breadcrumb">
              <Link 
                to="/" 
                className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-200 mb-3 md:mb-4 text-sm md:text-base"
              >
                <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                Voltar ao início
              </Link>
            </nav>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Questões Teóricas de Histologia</h1>
            <p className="text-slate-600 text-sm md:text-base">Explore questões por tema com explicações detalhadas</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
            <aside className="lg:col-span-1 space-y-4 md:space-y-6" role="complementary">
              <DropdownTema 
                temaSelecionado={temaSelecionado}
                onTemaSelecionado={setTemaSelecionado}
              />
              <FiltroAvancado 
                filtros={filtros}
                onFiltrosChange={setFiltros}
                questoes={temaSelecionado ? questoes : []}
              />
            </aside>
            <section className="lg:col-span-3" role="main">
              <QuestaoAccordionList 
                questoes={questoesPaginadas}
                loading={loading}
                temaSelecionado={temaSelecionado}
              />
              <Paginacao
                paginaAtual={paginaAtual}
                totalPaginas={totalPaginas}
                onPaginaChange={setPaginaAtual}
              />
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default QuestoesTeoricasPage;
