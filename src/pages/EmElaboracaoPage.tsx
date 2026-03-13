import React from 'react';
import { ArrowLeft, Construction } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import SEOHead from '../components/SEOHead';
import {
  getEnabledStudyModules,
  getModuleById,
  isStudyModuleId,
} from '../config/studyModules';

const EmElaboracaoPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const moduleParam = searchParams.get('modulo');
  const from = searchParams.get('from');

  const blockedModule = isStudyModuleId(moduleParam) ? getModuleById(moduleParam) : null;
  const enabledModules = getEnabledStudyModules();

  return (
    <>
      <SEOHead
        title="Módulo em Elaboração | Histoguia"
        description="Este módulo ainda está em elaboração. Aproveite os outros conteúdos disponíveis na plataforma Histoguia."
        keywords="módulo em elaboração, histoguia"
        url="https://histoguia.com/em-elaboracao"
        canonical="https://histoguia.com/em-elaboracao"
      />

      <div className="min-h-screen bg-slate-50">
        <Header />
        <main role="main" className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao início
            </Link>

            <section className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 md:p-8 mb-6">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-xl">
                  <Construction className="w-6 h-6 text-amber-600" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-slate-800 mb-2">
                    {blockedModule ? blockedModule.title : 'Módulo'} em elaboração
                  </h1>
                  <p className="text-slate-600 leading-relaxed">
                    Este conteúdo ainda está em elaboração, aproveite os outros conteúdos já
                    disponíveis.
                  </p>

                  {from && (
                    <p className="text-sm text-slate-500 mt-4">
                      Rota solicitada: <code>{from}</code>
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 md:p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Conteúdos disponíveis agora</h2>

              {enabledModules.length === 0 ? (
                <p className="text-slate-600">Nenhum módulo ativo no momento.</p>
              ) : (
                <ul className="space-y-3">
                  {enabledModules.map((module) => (
                    <li key={module.id}>
                      <Link
                        to={module.primaryPath}
                        className="text-purple-600 hover:text-purple-700 transition-colors duration-200 font-medium"
                      >
                        {module.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6">
                <Link
                  to="/"
                  className="inline-flex items-center bg-purple-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  Ir para a Home
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default EmElaboracaoPage;

