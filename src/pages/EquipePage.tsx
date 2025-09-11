import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import douglasImage from '../images/douglas.jpeg';
import sergioImage from '../images/sergio.jpg';

// --- Ícones como Componentes SVG ---
// Isso substitui a necessidade de instalar a biblioteca 'lucide-react'
const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m12 19-7-7 7-7"/>
    <path d="M19 12H5"/>
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);


// --- Interface para Membros da Equipe ---
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

// --- Componente CardEquipe ---
// Este componente agora está dentro do mesmo arquivo
const CardEquipe = ({ membro }: { membro: MembroEquipe }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm flex flex-col border border-slate-100 transform hover:scale-105 transition-transform duration-300">
      <div className="flex justify-center mb-6">
        <img
          src={membro.foto}
          alt={`Foto de ${membro.nome}`}
          className="w-40 h-48 rounded-2xl object-contain ring-4 ring-purple-100 shadow-lg bg-gray-50"
          // Adiciona uma imagem padrão em caso de erro
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/160x192/E9D5FF/4C1D95?text=Foto'; }}
        />
      </div>
      <div className="text-center flex-grow">
        <h3 className="text-xl font-bold text-slate-800">{membro.nome}</h3>
        <p className="text-purple-600 font-medium mb-3">{membro.cargo}</p>
        <p className="text-slate-600 text-sm mb-4">{membro.descricao}</p>
        <p className="text-slate-700 text-sm font-semibold mb-1">Contribuição:</p>
        <p className="text-slate-600 text-sm">{membro.contribuicao}</p>
      </div>
      <div className="flex justify-center items-center space-x-4 border-t border-slate-200 pt-4 mt-6">
        {membro.github && (
          <a
            href={membro.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Perfil de ${membro.nome} no Github`}
            className="text-slate-500 hover:text-slate-800 transition-colors"
          >
            <GithubIcon className="w-6 h-6" />
          </a>
        )}
        {membro.instagram && (
          <a
            href={membro.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Perfil de ${membro.nome} no Instagram`}
            className="text-slate-500 hover:text-purple-600 transition-colors"
          >
            <InstagramIcon className="w-6 h-6" />
          </a>
        )}
      </div>
    </div>
  );
};


// --- Componente Principal da Página ---
export default function App() {
  const equipe: MembroEquipe[] = [
    {
      nome: "Dr. Sérgio Moura",
      cargo: "Coordenador do Projeto",
      descricao: "Professor Titular de Histologia da UFR. Tem experiência nas áreas de Odontologia e Morfologia, com ênfase em Estomatologia e Histologia.",
      contribuicao: "Supervisão geral do projeto, revisão científica do conteúdo e desenvolvimento da metodologia pedagógica.",
      foto: sergioImage,
    },
    {
      nome: "MSc. Douglas Felipe",
      cargo: "Desenvolvedor",
      descricao: "Biomédico Bioinformata, Graduando em Engenharia de Software e Monitor de Histologia.",
      contribuicao: "Desenvolvimento da plataforma web, implementação das funcionalidades e curadoria de conteúdo.",
      foto: douglasImage,
      github: "https://github.com/DougFelipe",
      instagram: "https://instagram.com/histologuiavirtual"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />

      <main role="main" className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200 mb-4 text-base">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>
          <h1 className="text-4xl font-bold text-slate-800">
            Nossa Equipe
          </h1>
        </header>

        {/* Seção dos cards centralizada */}
        <section className="flex flex-wrap justify-center items-stretch gap-8">
          {equipe.map((membro, index) => (
            <CardEquipe key={index} membro={membro} />
          ))}
        </section>

        {/* Seção de Contato */}
        <section className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Entre em Contato
            </h2>
            <p className="text-slate-600 text-base mb-6 max-w-2xl mx-auto">
              Tem dúvidas, sugestões ou gostaria de contribuir com o projeto?
              Nossa equipe está sempre aberta a colaborações e feedback.
            </p>
            <div className="bg-purple-50 p-6 rounded-xl inline-block">
              <p className="text-slate-700 font-medium mb-2">Email Institucional</p>
              <a href="mailto:guia.histologia.ufrn@gmail.com" className="text-purple-600 hover:text-purple-800 font-semibold text-base transition-colors duration-200">
                guia.histologia.ufrn@gmail.com
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
