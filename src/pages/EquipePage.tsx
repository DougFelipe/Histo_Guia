import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import CardEquipe from '../components/CardEquipe';
import SEOHead from '../components/SEOHead';

interface MembroEquipe {
  nome: string;
  cargo: string;
  descricao: string;
  contribuicao: string;
  foto: string;
  email?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
}

const EquipePage: React.FC = () => {
  // Dados da equipe - você pode modificar conforme necessário
  const equipe: MembroEquipe[] = [
    {
      nome: "Dr. Sérgio Moura",
      cargo: "Coordenador do Projeto",
      descricao: "Professor Titular de Histologia da UFR. Tem experiência nas áreas de Odontologia e Morfologia, com ênfase em Estomatologia e Histologia.",
      contribuicao: "Supervisão geral do projeto, revisão científica do conteúdo e desenvolvimento da metodologia pedagógica.",
      foto: "/images/equipe/joao-silva.jpg", // Placeholder - substitua pelos caminhos reais
    },
    {
      nome: "MSc. Douglas Felipe",
      cargo: "Desenvolvedor",
      descricao: "Biomédico Bioinformata, Graduando em Engenharia de Software e Monitor de Histologia.",
      contribuicao: "Desenvolvimento da plataforma web, implementação das funcionalidades e curadoria de conteúdo.",
      foto: "/images/equipe/felipe-santos.jpg",
      github: "https://github.com/DougFelipe",
      instagram: "https://instagram.com/histologuiavirtual"
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "headline": "Equipe do Histoguia",
    "description": "Conheça a equipe multidisciplinar responsável pelo desenvolvimento da plataforma Histoguia - especialistas em histologia, educação e tecnologia.",
    "author": {
      "@type": "Organization",
      "name": "Histoguia",
      "member": equipe.map(membro => ({
        "@type": "Person",
        "name": membro.nome,
        "jobTitle": membro.cargo,
        "description": membro.descricao
      }))
    }
  };

  return (
    <>
      <SEOHead
        title="Equipe | Histoguia - Conheça Nossa Equipe Multidisciplinar"
        description="Conheça a equipe de especialistas em histologia, educação e tecnologia responsável pelo desenvolvimento da plataforma Histoguia."
        keywords="equipe histoguia, professores histologia, desenvolvedores, educação médica, UFRN"
        url="https://histoguia.com/equipe"
        structuredData={structuredData}
        canonical="https://histoguia.com/equipe"
      />
      
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main role="main" className="container mx-auto px-2 md:px-4 py-4 md:py-8">
          <header className="mb-6 md:mb-8 px-2 md:px-0">
            <nav aria-label="Breadcrumb">
              <Link 
                to="/" 
                className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-200 mb-3 md:mb-4 text-sm md:text-base"
              >
                <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                Voltar ao início
              </Link>
            </nav>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 md:mb-4">
              Nossa Equipe
            </h1>
          </header>

          {/* ===== LINHA MODIFICADA ===== */}
          <section className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
            {equipe.map((membro, index) => (
              <CardEquipe key={index} membro={membro} index={index} />
            ))}
          </section>

          {/* Seção de Contato */}
          <section className="mt-8 md:mt-12 lg:mt-16 bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8 border border-slate-100 mx-2 md:mx-0">
            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 md:mb-4">
                Entre em Contato
              </h2>
              <p className="text-slate-600 text-sm md:text-base mb-4 md:mb-6 max-w-2xl mx-auto">
                Tem dúvidas, sugestões ou gostaria de contribuir com o projeto? 
                Nossa equipe está sempre aberta a colaborações e feedback.
              </p>
              <div className="bg-lavender-100 p-4 md:p-6 rounded-xl">
                <p className="text-slate-700 font-medium mb-2">Email Institucional</p>
                <a 
                  href="mailto:guia.histologia.ufrn@gmail.com" 
                  className="text-purple-600 hover:text-purple-700 font-semibold text-sm md:text-base transition-colors duration-200"
                >
                  guia.histologia.ufrn@gmail.com
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default EquipePage;
