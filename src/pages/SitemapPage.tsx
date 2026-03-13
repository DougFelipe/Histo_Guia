import React from 'react';
import { ArrowLeft, ExternalLink, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import SEOHead from '../components/SEOHead';
import { getSitemapStudyModules } from '../config/studyModules';
import { STUDY_MODULE_ICONS } from '../utils/studyModuleIcons';

const SitemapPage: React.FC = () => {
  const enabledSitemapModules = getSitemapStudyModules();

  const sections = [
    ...enabledSitemapModules.map((module) => ({
      id: module.id,
      title: module.title,
      description: module.description,
      link: module.primaryPath,
      temas: module.sitemapTopics,
      IconComponent: STUDY_MODULE_ICONS[module.iconKey],
    })),
    {
      id: 'equipe',
      title: 'Equipe',
      description: 'Conheça nossa equipe multidisciplinar',
      link: '/equipe',
      temas: [
        'Especialistas em Histologia',
        'Desenvolvedores',
        'Designers',
        'Revisores de Conteúdo',
      ],
      IconComponent: Users,
    },
  ];

  const navigationLinks = [
    { label: 'Página Inicial', link: '/' },
    ...enabledSitemapModules.map((module) => ({
      label: module.title,
      link: module.primaryPath,
    })),
    { label: 'Equipe', link: '/equipe' },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Mapa do Site - Histoguia',
    description: 'Navegue pelos recursos educacionais disponíveis na plataforma Histoguia',
    url: 'https://histoguia.com/sitemap',
    mainEntity: {
      '@type': 'SiteNavigationElement',
      name: 'Navegação Principal',
      url: 'https://histoguia.com/sitemap',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Início',
          item: 'https://histoguia.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Mapa do Site',
          item: 'https://histoguia.com/sitemap',
        },
      ],
    },
  };

  return (
    <>
      <SEOHead
        title="Mapa do Site - Recursos Disponíveis | Histoguia"
        description="Navegue pelos recursos educacionais atualmente ativos na plataforma Histoguia."
        keywords="mapa do site, navegação, recursos histologia, questões, flashcards, glossário"
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
            <p className="text-slate-600">
              Navegue pelos recursos educacionais disponíveis na plataforma
            </p>
          </header>

          <div className="max-w-6xl mx-auto">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Recursos de Estudo</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section) => {
                  const IconComponent = section.IconComponent;

                  return (
                    <article
                      key={section.id}
                      className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-shadow duration-300"
                    >
                      <header className="flex items-center space-x-3 mb-4">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <IconComponent className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800">{section.title}</h3>
                      </header>

                      <p className="text-slate-600 mb-4">{section.description}</p>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-slate-700 mb-2">Conteúdo disponível:</h4>
                        <ul className="space-y-1">
                          {section.temas.map((tema) => (
                            <li key={`${section.id}-${tema}`} className="text-sm text-slate-600 flex items-center">
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

            <section className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Links Úteis</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-slate-700 mb-3">Navegação Principal</h3>
                  <ul className="space-y-2">
                    {navigationLinks.map((item) => (
                      <li key={item.link}>
                        <Link
                          to={item.link}
                          className="text-purple-600 hover:text-purple-700 transition-colors duration-200"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-slate-700 mb-3">Recursos Externos</h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="https://gitlab.com/histoguia/histoguia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-700 transition-colors duration-200 inline-flex items-center"
                      >
                        Código Fonte
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="/sitemap.xml"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-700 transition-colors duration-200 inline-flex items-center"
                      >
                        Sitemap XML
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </li>
                  </ul>
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

