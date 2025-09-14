import React, { useState, useEffect } from 'react';
import { ArrowLeft, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import DropdownTema from '../components/DropdownTema';
import BarraBuscaPratica from '../components/questoes-praticas/BarraBuscaPratica';
import QuestoesGrid from '../components/questoes-praticas/QuestoesGrid';
import SEOHead from '../components/SEOHead';
import { QuestaoPratica, FiltroPraticoState } from '../types';
import { formatarNomeTema } from '../utils/temas';
import { mapearImagensQuestoes, temImagensDisponiveis } from '../utils/imagens';

const QuestoesPraticasPage: React.FC = () => {
  const [questoes, setQuestoes] = useState<QuestaoPratica[]>([]);
  const [questoesFiltradas, setQuestoesFiltradas] = useState<QuestaoPratica[]>([]);
  const [temaSelecionado, setTemaSelecionado] = useState<string>('');
  const [filtros, setFiltros] = useState<FiltroPraticoState>({
    tema: '',
    palavrasChave: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (temaSelecionado) {
      carregarQuestoes(temaSelecionado);
    } else {
      carregarTodasQuestoes();
    }
  }, [temaSelecionado]);

  useEffect(() => {
    aplicarFiltros();
  }, [questoes, filtros]);

    const carregarQuestoes = async (tema: string) => {
    setLoading(true);
    try {
      console.log('Carregando questões práticas para o tema:', tema);
      // Importar dinamicamente o arquivo JSON
      const questoesModule = await import(`../data/temas/${tema}/questoes-praticas.json`);
      let data = questoesModule.default;
      
      // Se o tema tem imagens locais disponíveis, mapear as questões para usar essas imagens
      if (temImagensDisponiveis(tema)) {
        data = mapearImagensQuestoes(tema, data);
        console.log('Questões mapeadas com imagens locais:', data);
      }
      
      console.log('Questões práticas carregadas:', data);
      setQuestoes(data || []);
    } catch (error) {
      console.error('Erro ao carregar questões práticas:', error);
      setQuestoes([]);
    } finally {
      setLoading(false);
    }
  };

  const carregarTodasQuestoes = async () => {
    setLoading(true);
    try {
      const todasQuestoes = [];
      const temas = ['tecido-epitelial', 'tecido-conjuntivo', 'tecido-muscular', 'tecido-nervoso', 'cartilagem', 'tecido-osseo', 'sistema-circulatorio'];
      
      for (const tema of temas) {
        try {
          const questoesModule = await import(`../data/temas/${tema}/questoes-praticas.json`);
          let data = questoesModule.default;
          
          if (temImagensDisponiveis(tema)) {
            data = mapearImagensQuestoes(tema, data);
          }
          
          todasQuestoes.push(...(data || []));
        } catch (error) {
          console.warn(`Erro ao carregar questões práticas do tema ${tema}:`, error);
        }
      }
      
      console.log('Todas as questões práticas carregadas:', todasQuestoes);
      setQuestoes(todasQuestoes);
    } catch (error) {
      console.error('Erro ao carregar todas as questões práticas:', error);
      setQuestoes([]);
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

    // Aplicar filtro de palavras-chave
    if (filtros.palavrasChave && filtros.palavrasChave.trim() !== '') {
      const palavras = filtros.palavrasChave.toLowerCase().trim().split(' ').filter(p => p.length > 0);
      questoesFiltradas = questoesFiltradas.filter(q => 
        palavras.some(palavra => 
          // Buscar no enunciado
          q.enunciado.toLowerCase().includes(palavra) ||
          // Buscar no tema
          q.tema.toLowerCase().includes(palavra) ||
          // Buscar no texto das alternativas
          q.alternativas.some(alt => alt.texto.toLowerCase().includes(palavra))
        )
      );
    }

    setQuestoesFiltradas(questoesFiltradas);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalArticle",
    "headline": `Questões Práticas de Histologia${temaSelecionado ? ` - ${formatarNomeTema(temaSelecionado)}` : ''}`,
    "description": `Questões práticas com análise de lâminas histológicas${temaSelecionado ? ` sobre ${formatarNomeTema(temaSelecionado)}` : ''}. Teste seus conhecimentos com imagens reais de microscopia.`,
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
        title={`Questões Práticas de Histologia${temaSelecionado ? ` - ${formatarNomeTema(temaSelecionado)}` : ''} | Histoguia`}
        description={`Teste seus conhecimentos com questões práticas de histologia${temaSelecionado ? ` sobre ${formatarNomeTema(temaSelecionado)}` : ''}. Análise de lâminas histológicas com imagens reais de microscopia.`}
        keywords={`questões práticas histologia, ${temaSelecionado ? formatarNomeTema(temaSelecionado) + ', ' : ''}microscopia, lâminas histológicas, medicina, biomedicina`}
        url={`https://histoguia.com/questoes-praticas${temaSelecionado ? `?tema=${temaSelecionado}` : ''}`}
        structuredData={structuredData}
        canonical="https://histoguia.com/questoes-praticas"
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
            <div className="flex items-center space-x-2 md:space-x-3 mb-2">
              <div className="bg-purple-100 p-1.5 md:p-2 rounded-lg">
                <Microscope className="w-4 h-4 md:w-6 md:h-6 text-purple-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                Questões Práticas de Histologia
                {temaSelecionado && (
                  <span className="block text-lg md:text-xl text-purple-600 font-medium mt-1">
                    {formatarNomeTema(temaSelecionado)}
                  </span>
                )}
              </h1>
            </div>
            <p className="text-slate-600 text-sm md:text-base">
              {temaSelecionado 
                ? `Analise lâminas histológicas de ${formatarNomeTema(temaSelecionado).toLowerCase()} e teste seus conhecimentos práticos`
                : 'Analise lâminas histológicas e teste seus conhecimentos práticos'
              }
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
            <aside className="lg:col-span-1 space-y-4 md:space-y-6" role="complementary">
              <DropdownTema 
                temaSelecionado={temaSelecionado}
                onTemaSelecionado={setTemaSelecionado}
              />
              

              
              <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-slate-100 mx-2 md:mx-0">
                <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-4">
                  <div className="bg-purple-100 p-1.5 md:p-2 rounded-lg">
                    <Microscope className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-800">Buscar Questões</h3>
                </div>
                <BarraBuscaPratica
                  valor={filtros.palavrasChave}
                  onChange={(valor) => setFiltros(prev => ({ ...prev, palavrasChave: valor }))}
                  placeholder="Digite palavras-chave..."
                />
              </div>
            </aside>
            <section className="lg:col-span-3" role="main">
              <QuestoesGrid 
                questoes={questoesFiltradas}
                loading={loading}
                temaFiltrado={temaSelecionado}
                termoBusca={filtros.palavrasChave}
              />
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default QuestoesPraticasPage;
