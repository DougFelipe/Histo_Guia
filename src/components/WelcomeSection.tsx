import React from 'react';
import { BookOpen, Target, Users } from 'lucide-react';

const WelcomeSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-lavender-50 to-purple-50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 animate-fade-in">
            Bem-vindo ao Histoguia
          </h2>
          <p className="text-xl text-slate-600 mb-12 animate-fade-in leading-relaxed">
            Sua plataforma completa de apoio ao estudo de histologia. 
            Explore questões organizadas por temas, com explicações detalhadas 
            e feedback interativo para potencializar seu aprendizado.
          </p>
          <p className="text-lg text-slate-600 mb-8 animate-fade-in bg-lavender-100 p-4 rounded-lg">
            Plataforma em desenvolvimento.<br />
            Dúvidas, críticas, sugestões ou erros encontrados devem ser encaminhados para guia.histologia.ufrn@gmail.com
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Conteúdo Organizado</h3>
              <p className="text-slate-600 text-center">
                Questões estruturadas por temas e níveis de dificuldade
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-lavender-200 p-4 rounded-full mb-4">
                <Target className="w-8 h-8 text-violet-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Feedback Detalhado</h3>
              <p className="text-slate-600 text-center">
                Explicações completas para cada alternativa das questões
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-rose-100 p-4 rounded-full mb-4">
                <Users className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Aprendizado Ativo</h3>
              <p className="text-slate-600 text-center">
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
