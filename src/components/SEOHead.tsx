import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
  canonical?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Histoguia - Plataforma de Estudo de Histologia",
  description = "Plataforma completa de estudo de histologia com questões interativas, flashcards e simulados práticos. Aprenda sobre tecidos epiteliais, conjuntivos, musculares e nervosos.",
  keywords = "histologia, medicina, biomedicina, tecido epitelial, tecido conjuntivo, tecido muscular, tecido nervoso, lâminas histológicas",
  image = "https://histoguia.com/og-image.jpg",
  url = "https://histoguia.com",
  type = "website",
  structuredData,
  canonical
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;