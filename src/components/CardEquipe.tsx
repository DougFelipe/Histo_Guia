import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

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

interface CardEquipeProps {
  membro: MembroEquipe;
  index: number;
}

const CardEquipe: React.FC<CardEquipeProps> = ({ membro, index }) => {
  return (
    <article 
      className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-slate-100 mx-2 md:mx-0"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Foto do Membro */}
      <div className="relative h-48 md:h-56 lg:h-64 bg-gradient-to-br from-purple-100 to-lavender-100 overflow-hidden">
        {/* Placeholder para foto - substitua por imagem real quando disponível */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600">
              {membro.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
        </div>
        {/* Quando tiver imagens reais, use este código:
        <img 
          src={membro.foto} 
          alt={`Foto de ${membro.nome}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        */}
        
        {/* Overlay com informações rápidas */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white text-sm font-medium">
              {membro.cargo}
            </p>
          </div>
        </div>
      </div>

      {/* Informações do Membro */}
      <div className="p-4 md:p-6">
        <header className="mb-3 md:mb-4">
          <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-1">
            {membro.nome}
          </h2>
          <p className="text-sm md:text-base text-purple-600 font-medium">
            {membro.cargo}
          </p>
        </header>

        <div className="space-y-3 md:space-y-4">
          {/* Descrição */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-1 md:mb-2">Sobre</h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              {membro.descricao}
            </p>
          </div>

          {/* Contribuição */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-1 md:mb-2">Contribuição</h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              {membro.contribuicao}
            </p>
          </div>

          {/* Links de Contato */}
          {(membro.email || membro.linkedin || membro.github) && (
            <div className="pt-2 md:pt-3 border-t border-slate-100">
              <div className="flex space-x-3">
                {membro.email && (
                  <a
                    href={`mailto:${membro.email}`}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-purple-600 transition-colors duration-200 group"
                    title={`Enviar email para ${membro.nome}`}
                  >
                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                )}
                {membro.linkedin && (
                  <a
                    href={membro.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 transition-colors duration-200 group"
                    title={`LinkedIn de ${membro.nome}`}
                  >
                    <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                )}
                {membro.github && (
                  <a
                    href={membro.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-100 hover:bg-gray-200 text-slate-600 hover:text-gray-800 transition-colors duration-200 group"
                    title={`GitHub de ${membro.nome}`}
                  >
                    <Github className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default CardEquipe;
