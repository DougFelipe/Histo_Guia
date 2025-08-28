import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, BookOpen, Brain, Microscope, Layers, Zap, Clock } from 'lucide-react';
import Header from '../components/Header';
import SEOHead from '../components/SEOHead';

const SitemapPage: React.FC = () => {
  const sections = [
    {
      title: "Questões Teóricas",
      description: "Questões organizadas por tema com explicações detalhadas",
      icon: Brain,
      link: "/questoes-teoricas",
      temas: [
        "Tecido Epitelial",
        "Tecido Conjuntivo", 
        "Tecido Muscular",
        "Tecido Nervoso",
        "Sistema Circulatório"
      ]
    },
    {
      title: "Questões Práticas",
      description: "Análise de lâminas histológicas em alta definição",
      icon: Microscope,
      link: "/questoes-praticas",
      temas: [
        "Tecido Conjuntivo",
        "Tecido Epitelial",
        "Tecido Muscular", 
        "Tecido Nervoso",
        "Sistema Circulatório",
        "Cartilagem"
      ]
    },
    {
      title: "Flashcards Teóricos",
      description: "Estude conceitos com flashcards interativos",
      icon: Layers,
      link: "/flashcards/teoricos",
      temas: [
        "Conceitos Fundamentais",
        "Tipos de Tecidos",
        "Células e Estruturas",
        "Funções Histológicas"
      ]
    },
    {
      title: "Flashcards Práticos", 
      description: "Identifique estruturas em lâminas reais",
      icon: Zap,
      link: "/flashcards/praticos",
      temas: [
        "Identificação Visual",
        "Estruturas Microscópicas",
        "Lâminas Histológicas",
        "Análise Prática"
      ]
    },
    {
      title: "Simulado Prático",
      description: "Simule uma avaliação real com cronômetro",
      icon: Clock,
      link: "/simulado/configuracao",
      temas: [
        "Configuração Personalizada",
        "Timer por Questão",
        "Relatório de Desempenho",
        "Revisão Completa"
      ]
    },
    {
      title: "Glossário",
      description: "Definições de termos fundamentais",
      icon: BookOpen,
      link: "/glossario",
      temas: [
        "Termos por Categoria",
        "Busca Alfabética",
        "Definições Detalhadas",
        "Conceitos Essenciais"
      ]
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Mapa do Site - Histoguia",
    "description": "Navegue por todos os recursos educacionais disponíveis na plataforma Histoguia",
    "url": "https://histoguia.com/sitemap",
    "mainEntity": {
      "@type": "SiteNavigationElement",
      "name": "Navegação Principal",
      "url": "https://histoguia.com/sitemap"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Início",
          "item": "https://histoguia.com"
        },
        {
          "@type": "ListItem", 
          "position": 2,
          "name": "Mapa do Site",
          "item": "https://histoguia.com/sitemap"
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Mapa do Site - Todos os Recursos | Histoguia"
        description="Navegue por todos os recursos educacionais da plataforma Histoguia: questões teóricas e práticas, flashcards, simulados e glossário de histologia."
        keywords="mapa do site, navegação, recursos histologia, questões medicina, flashcards, simulado, glossário"
        url="https://histoguia.com/sitemap"
        structuredData={structuredData}
        canonical="https://histoguia.com/sitemap"
      />
      
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main role="main" className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <nav aria-label="Breadcrumb">
              <Link 
                to="/" 
                className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-200 mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao início
              </Link>
            </nav>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Mapa do Site</h1>
            <p className="text-slate-600">Navegue por todos os recursos educacionais disponíveis na plataforma</p>
          </header>

          <div className="max-w-6xl mx-auto">
            {/* Seções Principais */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Recursos de Estudo</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section, index) => {
                  const IconComponent = section.icon;
                  return (
                    <article key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                      <header className="flex items-center space-x-3 mb-4">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <IconComponent className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                      </header>
                      
                      <p className="text-slate-600 mb-4">{section.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-slate-700 mb-2">Conteúdo Disponível:</h4>
                        <ul className="space-y-1">
                          {section.temas.map((tema, temaIndex) => (
                            <li key={temaIndex} className="text-sm text-slate-600 flex items-center">
                              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                              {tema}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Link
                        to={section.link}
                        className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
                      >
                        Acessar {section.title}
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </Link>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Links Úteis */}
            <section className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Links Úteis</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-slate-700 mb-3">Navegação Principal</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/" className="text-purple-600 hover:text-purple-700 transition-colors duration-200">
                        🏠 Página Inicial
                      </Link>
                    </li>
                    <li>
                      <Link to="/questoes-teoricas" className="text-purple-600 hover:text-purple-700 transition-colors duration-200">
                        🧠 Questões Teóricas
                      </Link>
                    </li>
                    <li>
                      <Link to="/questoes-praticas" className="text-purple-600 hover:text-purple-700 transition-colors duration-200">
                        🔬 Questões Práticas
                      </Link>
                    </li>
                    <li>
                      <Link to="/flashcards/teoricos" className="text-purple-600 hover:text-purple-700 transition-colors duration-200">
                        📚 Flashcards Teóricos
                      </Link>
                    </li>
                    <li>
                      <Link to="/flashcards/praticos" className="text-purple-600 hover:text-purple-700 transition-colors duration-200">
                        ⚡ Flashcards Práticos
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-slate-700 mb-3">Recursos Especiais</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/simulado/configuracao" className="text-purple-600 hover:text-purple-700 transition-colors duration-200">
                        ⏱️ Simulado Prático
                      </Link>
                    </li>
                    <li>
                      <Link to="/glossario" className="text-purple-600 hover:text-purple-700 transition-colors duration-200">
                        📖 Glossário
                      </Link>
                    </li>
                    <li>
                      <a 
                        href="https://gitlab.com/histoguia/histoguia" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-700 transition-colors duration-200 inline-flex items-center"
                      >
                        💻 Código Fonte
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Estatísticas */}
            <section className="mt-8 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl shadow-lg p-6 text-white">
              <h2 className="text-xl font-semibold mb-4">Estatísticas da Plataforma</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">200+</div>
                  <div className="text-sm opacity-90">Questões Teóricas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm opacity-90">Questões Práticas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">150+</div>
                  <div className="text-sm opacity-90">Flashcards</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24+</div>
                  <div className="text-sm opacity-90">Termos no Glossário</div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default SitemapPage;