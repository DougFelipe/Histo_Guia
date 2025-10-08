import React from 'react';
import { BookOpen, Target, Users } from 'lucide-react';

const WelcomeSection: React.FC = () => {
  return (
    <section className="py-8 md:py-16 bg-gradient-to-br from-lavender-50 to-purple-50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-4 md:mb-6 animate-fade-in">
            <img 
              src="/logo.png" 
              alt="Histoguia" 
              className="h-20 md:h-28 lg:h-40 w-auto object-contain"
            />
          </div>
          <p className="text-lg md:text-xl text-slate-600 mb-8 md:mb-12 animate-fade-in leading-relaxed px-2">
            Explore questões organizadas por temas, com explicações detalhadas 
            e feedback interativo
          </p>
          <section className="mt-8 md:mt-12 lg:mt-16 bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8 border border-slate-100 mx-2 md:mx-0">
            <div className="text-center">
              <h4 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 md:mb-4">
                Fale conosco sobre o site
              </h4>

              <p className="text-slate-600 text-sm md:text-base mb-3 md:mb-4 max-w-2xl mx-auto">
                Estamos abertos a feedbacks relacionados à <span className="font-semibold">aplicação</span>:
              </p>

              <ul className="text-left text-slate-700 text-sm md:text-base mb-4 md:mb-6 max-w-2xl mx-auto list-disc list-inside space-y-1">
                <li>Uso das funcionalidades e navegação;</li>
                <li>Erros em questões (conteúdo, correção, gabarito);</li>
                <li>Problemas de layout/responsividade no seu dispositivo.</li>
              </ul>

              <p className="text-slate-500 text-xs md:text-sm italic mb-4 md:mb-6 max-w-2xl mx-auto">
                Importante: não atendemos dúvidas pessoais ou temas que não sejam sobre o funcionamento do site.
              </p>

              <div className="bg-lavender-100 p-4 md:p-6 rounded-xl">
                <p className="text-slate-700 font-medium mb-2">Email de Suporte</p>
                <a
                  href="mailto:guia.histologia.ufrn@gmail.com"
                  className="text-purple-600 hover:text-purple-700 font-semibold text-sm md:text-base transition-colors duration-200"
                >
                  guia.histologia.ufrn@gmail.com
                </a>
              </div>
            </div>
          </section>

          {/* Features Grid
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-16">
            <div className="flex flex-col items-center p-4 md:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up mx-4 md:mx-0">
              <div className="bg-purple-100 p-3 md:p-4 rounded-full mb-3 md:mb-4">
                <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">Conteúdo Organizado</h3>

            </div>
            
            <div className="flex flex-col items-center p-4 md:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up mx-4 md:mx-0" style={{ animationDelay: '0.1s' }}>
              <div className="bg-lavender-200 p-3 md:p-4 rounded-full mb-3 md:mb-4">
                <Target className="w-6 h-6 md:w-8 md:h-8 text-violet-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">Feedback Detalhado</h3>

            </div>
            
            <div className="flex flex-col items-center p-4 md:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up mx-4 md:mx-0" style={{ animationDelay: '0.2s' }}>
              <div className="bg-rose-100 p-3 md:p-4 rounded-full mb-3 md:mb-4">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-rose-500" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">Aprendizado Ativo</h3>

            </div>

          </div>
           */}
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
