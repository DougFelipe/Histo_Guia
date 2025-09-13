import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, Microscope, ArrowRight, Layers, Clock } from 'lucide-react';

const FeatureCardGrid: React.FC = () => {
  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 md:mb-4">Recursos de Estudo</h2>
          <p className="text-slate-600 text-base md:text-lg px-4">Escolha a modalidade de estudo que melhor se adapta às suas necessidades</p>
        </div>
        
        <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
          {/* Questões Teóricas */}
          <Link to="/questoes-teoricas" className="group block">
            <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 mx-2 md:mx-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="bg-white bg-opacity-20 p-3 md:p-4 rounded-xl md:rounded-2xl self-start">
                    <Brain className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Questões Teóricas</h3>
                    <p className="text-white text-opacity-90 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                      Explore questões organizadas por tema com explicações detalhadas e feedback interativo.
                    </p>
                    <div className="flex flex-wrap gap-4 md:space-x-6">
                      <div className="text-center">
                        <div className="text-white font-bold text-base md:text-lg">15+</div>
                        <div className="text-white text-opacity-80 text-xs md:text-sm">Temas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-base md:text-lg">200+</div>
                        <div className="text-white text-opacity-80 text-xs md:text-sm">Questões</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-base md:text-lg">100%</div>
                        <div className="text-white text-opacity-80 text-xs md:text-sm">Explicado</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 p-3 md:p-4 rounded-full group-hover:bg-opacity-30 transition-all duration-300 self-end md:self-auto">
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>

            {/* Questões Práticas */}
            <Link to="/questoes-praticas" className="group block">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 mx-2 md:mx-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    <div className="bg-white bg-opacity-20 p-3 md:p-4 rounded-xl md:rounded-2xl self-start">
                      <Microscope className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Questões Práticas</h3>
                      <p className="text-white text-opacity-90 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                        Analise lâminas histológicas em alta definição e teste seus conhecimentos práticos.
                      </p>
                      <div className="flex flex-wrap gap-4 md:space-x-6">
                        <div className="text-center">
                          <div className="text-white font-bold text-base md:text-lg">6+</div>
                          <div className="text-white text-opacity-80 text-xs md:text-sm">Temas</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-bold text-base md:text-lg">50+</div>
                          <div className="text-white text-opacity-80 text-xs md:text-sm">Lâminas</div>
                        </div>
                        <div className="text-center">
                          <div className="text-white font-bold text-base md:text-lg">HD</div>
                          <div className="text-white text-opacity-80 text-xs md:text-sm">Imagens</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-20 p-3 md:p-4 rounded-full group-hover:bg-opacity-30 transition-all duration-300 self-end md:self-auto">
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
            

          {/* Flashcards Teóricos */}
          <Link to="/flashcards/teoricos" className="group block">
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 mx-2 md:mx-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="bg-white bg-opacity-20 p-3 md:p-4 rounded-xl md:rounded-2xl self-start">
                    <Layers className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Flashcards Teóricos</h3>
                    <p className="text-white text-opacity-90 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                      Estude conceitos fundamentais com flashcards interativos e animações dinâmicas.
                    </p>
                    <div className="flex flex-wrap gap-4 md:space-x-6">
                      <div className="text-center">
                        <div className="text-white font-bold text-base md:text-lg">5+</div>
                        <div className="text-white text-opacity-80 text-xs md:text-sm">Temas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-base md:text-lg">100+</div>
                        <div className="text-white text-opacity-80 text-xs md:text-sm">Cards</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-base md:text-lg">Flip</div>
                        <div className="text-white text-opacity-80 text-xs md:text-sm">Animação</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 p-3 md:p-4 rounded-full group-hover:bg-opacity-30 transition-all duration-300 self-end md:self-auto">
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>
                          {/* Flashcards Práticos  */}
            {/*
          <Link to="/flashcards/praticos" className="group block">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 mx-2 md:mx-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="bg-white bg-opacity-20 p-3 md:p-4 rounded-xl md:rounded-2xl self-start">
                    <Zap className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Flashcards Práticos</h3>
                    <p className="text-white text-opacity-90 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                      Identifique estruturas histológicas em lâminas reais com flashcards visuais interativos.
                    </p>
                    <div className="flex flex-wrap gap-4 md:space-x-6">
                      <div className="text-center">
                        <div className="text-white font-bold text-base md:text-lg">6+</div>
                        <div className="text-white text-opacity-80 text-xs md:text-sm">Temas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-base md:text-lg">50+</div>
                        <div className="text-white text-opacity-80 text-xs md:text-sm">Lâminas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-base md:text-lg">Visual</div>
                        <div className="text-white text-opacity-80 text-xs md:text-sm">Interativo</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 p-3 md:p-4 rounded-full group-hover:bg-opacity-30 transition-all duration-300 self-end md:self-auto">
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link> */}

          {/* Simulado Prático */}
          <Link to="/simulado/configuracao" className="group block">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 mx-2 md:mx-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="bg-white bg-opacity-20 p-3 md:p-4 rounded-xl md:rounded-2xl self-start">
                    <Clock className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Simulado Prático</h3>
                    <p className="text-white text-opacity-90 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                      Simule uma avaliação prática real com cronômetro e análise detalhada de desempenho.
                    </p>
                    <div className="flex flex-wrap gap-4 md:space-x-6">
                      <div className="text-center">
                        <div className="text-white font-bold text-base md:text-lg">Timer</div>
                        <div className="text-white text-opacity-80 text-xs md:text-sm">Cronômetro</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-base md:text-lg">Auto</div>
                        <div className="text-white text-opacity-80 text-xs md:text-sm">Avança</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-base md:text-lg">Score</div>
                        <div className="text-white text-opacity-80 text-xs md:text-sm">Resultado</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 p-3 md:p-4 rounded-full group-hover:bg-opacity-30 transition-all duration-300 self-end md:self-auto">
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link> 

          {/* Glossário */}
          <Link to="/glossario" className="group block">
            <div className="bg-gradient-to-r from-cyan-500 to-teal-600 p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 mx-2 md:mx-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="bg-white bg-opacity-20 p-3 md:p-4 rounded-xl md:rounded-2xl self-start">
                    <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Glossário</h3>
                    <p className="text-white text-opacity-90 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                      Consulte definições e conceitos fundamentais da histologia organizados alfabeticamente.
                    </p>
                    <div className="flex flex-wrap gap-4 md:space-x-6">
                      <div className="text-center">
                        <div className="text-white font-bold text-base md:text-lg">A-Z</div>
                        <div className="text-white text-opacity-80 text-xs md:text-sm">Alfabético</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-base md:text-lg">400+</div>
                        <div className="text-white text-opacity-80 text-xs md:text-sm">Termos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-base md:text-lg">60+</div>
                        <div className="text-white text-opacity-80 text-xs md:text-sm">Categorias</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 p-3 md:p-4 rounded-full group-hover:bg-opacity-30 transition-all duration-300 self-end md:self-auto">
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureCardGrid;
