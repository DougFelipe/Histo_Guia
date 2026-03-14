import React from 'react';

const WelcomeSection: React.FC = () => {
  return (
    <section className="py-8 md:py-16 bg-gradient-to-br from-lavender-50 to-purple-50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-4 md:mb-6 animate-fade-in">
            <img src="/logo.png" alt="Histoguia" className="h-20 md:h-28 lg:h-40 w-auto object-contain" />
          </div>
          <p className="text-lg md:text-xl text-slate-600 mb-8 md:mb-12 animate-fade-in leading-relaxed px-2">
            Explore questões organizadas por temas, com explicações detalhadas e feedback interativo
          </p>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;

