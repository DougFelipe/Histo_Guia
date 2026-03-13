import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getHomeStudyModules } from '../config/studyModules';
import { STUDY_MODULE_ICONS } from '../utils/studyModuleIcons';

const FeatureCardGrid: React.FC = () => {
  const activeHomeModules = getHomeStudyModules();

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 md:mb-4">
            Recursos de Estudo
          </h2>
          <p className="text-slate-600 text-base md:text-lg px-4">
            Escolha a modalidade de estudo que melhor se adapta às suas necessidades
          </p>
        </div>

        {activeHomeModules.length === 0 ? (
          <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Nenhum módulo disponível</h3>
            <p className="text-slate-600">
              Nenhum recurso de estudo está ativo no momento. Tente novamente mais tarde.
            </p>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
            {activeHomeModules.map((module) => {
              const ModuleIcon = STUDY_MODULE_ICONS[module.iconKey];

              return (
                <Link key={module.id} to={module.primaryPath} className="group block">
                  <div
                    className={`${module.homeGradientClass} p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 mx-2 md:mx-0`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                        <div className="bg-white bg-opacity-20 p-3 md:p-4 rounded-xl md:rounded-2xl self-start">
                          <ModuleIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                            {module.title}
                          </h3>
                          <p className="text-white text-opacity-90 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                            {module.description}
                          </p>
                          <div className="flex flex-wrap gap-4 md:space-x-6">
                            {module.homeMetrics.map((metric) => (
                              <div key={`${module.id}-${metric.label}`} className="text-center">
                                <div className="text-white font-bold text-base md:text-lg">
                                  {metric.value}
                                </div>
                                <div className="text-white text-opacity-80 text-xs md:text-sm">
                                  {metric.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-20 p-3 md:p-4 rounded-full group-hover:bg-opacity-30 transition-all duration-300 self-end md:self-auto">
                        <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureCardGrid;

