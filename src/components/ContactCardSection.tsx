import React from 'react';

const ContactCardSection: React.FC = () => {
  return (
    <section className="py-8 md:py-16 bg-gradient-to-br from-lavender-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8 border border-slate-100">
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
        </div>
      </div>
    </section>
  );
};

export default ContactCardSection;
