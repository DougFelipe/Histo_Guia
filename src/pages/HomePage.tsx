import React from 'react';
import Header from '../components/Header';
import WelcomeSection from '../components/WelcomeSection';
import FeatureCardGrid from '../components/FeatureCardGrid';
import SEOHead from '../components/SEOHead';

const HomePage: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Histoguia",
    "url": "https://histoguia.com",
    "description": "Plataforma completa de estudo de histologia com questões interativas, flashcards e simulados práticos",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://histoguia.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "EducationalOrganization",
      "name": "Histoguia",
      "educationalLevel": "Higher Education",
      "educationalUse": "Study Guide",
      "learningResourceType": "Interactive Learning"
    }
  };

  return (
    <>
      <SEOHead
        title="Histoguia - Plataforma de Estudo de Histologia"
        description="Plataforma completa de estudo de histologia com mais de 200 questões interativas, flashcards e simulados práticos. Aprenda sobre tecidos epiteliais, conjuntivos, musculares e nervosos com imagens reais de lâminas histológicas."
        keywords="histologia, medicina, biomedicina, tecido epitelial, tecido conjuntivo, tecido muscular, tecido nervoso, lâminas histológicas, questões práticas, flashcards, simulado, educação médica, estudo medicina"
        url="https://histoguia.com"
        structuredData={structuredData}
        canonical="https://histoguia.com"
      />
      
      <div className="min-h-screen">
        <Header />
        <main role="main">
          <WelcomeSection />
          <FeatureCardGrid />
        </main>
      </div>
    </>
  );
};

export default HomePage;