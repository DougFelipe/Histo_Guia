import React from 'react';
import { BookOpen, Target, Users } from 'lucide-react';

const WelcomeSection: React.FC = () => {
  return (
    <section className="py-8 md:py-16 bg-gradient-to-br from-lavender-50 to-purple-50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 md:mb-6 animate-fade-in">
            Bem-vindo ao Histoguia
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-8 md:mb-12 animate-fade-in leading-relaxed px-2">
            Sua plataforma completa de apoio ao estudo de histologia. 
            Explore questões organizadas por temas, com explicações detalhadas 
            e feedback interativo para potencializar seu aprendizado.
          </p>
          <div className="mx-4 md:mx-0">
            <p className="text-sm md:text-lg text-slate-600 mb-6 md:mb-8 animate-fade-in bg-lavender-100 p-3 md:p-4 rounded-lg">
              Plataforma em desenvolvimento.<br />
              Dúvidas, críticas, sugestões ou erros encontrados devem ser encaminhados para 
              <span className="block mt-1 font-medium">guia.histologia.ufrn@gmail.com</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-16">
            <div className="flex flex-col items-center p-4 md:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up mx-4 md:mx-0">
              <div className="bg-purple-100 p-3 md:p-4 rounded-full mb-3 md:mb-4">
                <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">Conteúdo Organizado</h3>
              <p className="text-sm md:text-base text-slate-600 text-center">
                Questões estruturadas por temas e níveis de dificuldade
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 md:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up mx-4 md:mx-0" style={{ animationDelay: '0.1s' }}>
              <div className="bg-lavender-200 p-3 md:p-4 rounded-full mb-3 md:mb-4">
                <Target className="w-6 h-6 md:w-8 md:h-8 text-violet-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">Feedback Detalhado</h3>
              <p className="text-sm md:text-base text-slate-600 text-center">
                Explicações completas para cada alternativa das questões
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 md:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up mx-4 md:mx-0" style={{ animationDelay: '0.2s' }}>
              <div className="bg-rose-100 p-3 md:p-4 rounded-full mb-3 md:mb-4">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-rose-500" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">Aprendizado Ativo</h3>
              <p className="text-sm md:text-base text-slate-600 text-center">
                Interface interativa que promove o engajamento no estudo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
