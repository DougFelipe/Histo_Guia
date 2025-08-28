import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, Microscope, ArrowRight, Layers, Zap, Clock } from 'lucide-react';

const FeatureCardGrid: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Recursos de Estudo</h2>
          <p className="text-slate-600 text-lg">Escolha a modalidade de estudo que melhor se adapta às suas necessidades</p>
        </div>
        
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Questões Teóricas */}
          <Link to="/questoes-teoricas" className="group block">
            <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">Questões Teóricas</h3>
                    <p className="text-white text-opacity-90 text-base leading-relaxed mb-4">
                      Explore questões organizadas por tema com explicações detalhadas e feedback interativo.
                    </p>
                    <div className="flex space-x-6">
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">15+</div>
                        <div className="text-white text-opacity-80 text-sm">Temas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">200+</div>
                        <div className="text-white text-opacity-80 text-sm">Questões</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">100%</div>
                        <div className="text-white text-opacity-80 text-sm">Explicado</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 p-4 rounded-full group-hover:bg-opacity-30 transition-all duration-300">
                  <ArrowRight className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>

          {/* Questões Práticas */}
          <Link to="/questoes-praticas" className="group block">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
                    <Microscope className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">Questões Práticas</h3>
                    <p className="text-white text-opacity-90 text-base leading-relaxed mb-4">
                      Analise lâminas histológicas em alta definição e teste seus conhecimentos práticos.
                    </p>
                    <div className="flex space-x-6">
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">6+</div>
                        <div className="text-white text-opacity-80 text-sm">Temas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">50+</div>
                        <div className="text-white text-opacity-80 text-sm">Lâminas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">HD</div>
                        <div className="text-white text-opacity-80 text-sm">Imagens</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 p-4 rounded-full group-hover:bg-opacity-30 transition-all duration-300">
                  <ArrowRight className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>

          {/* Flashcards Teóricos */}
          <Link to="/flashcards/teoricos" className="group block">
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
                    <Layers className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">Flashcards Teóricos</h3>
                    <p className="text-white text-opacity-90 text-base leading-relaxed mb-4">
                      Estude conceitos fundamentais com flashcards interativos e animações dinâmicas.
                    </p>
                    <div className="flex space-x-6">
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">5+</div>
                        <div className="text-white text-opacity-80 text-sm">Temas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">100+</div>
                        <div className="text-white text-opacity-80 text-sm">Cards</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">Flip</div>
                        <div className="text-white text-opacity-80 text-sm">Animação</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 p-4 rounded-full group-hover:bg-opacity-30 transition-all duration-300">
                  <ArrowRight className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>

          {/* Flashcards Práticos */}
          <Link to="/flashcards/praticos" className="group block">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">Flashcards Práticos</h3>
                    <p className="text-white text-opacity-90 text-base leading-relaxed mb-4">
                      Identifique estruturas histológicas em lâminas reais com flashcards visuais interativos.
                    </p>
                    <div className="flex space-x-6">
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">6+</div>
                        <div className="text-white text-opacity-80 text-sm">Temas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">50+</div>
                        <div className="text-white text-opacity-80 text-sm">Lâminas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">Visual</div>
                        <div className="text-white text-opacity-80 text-sm">Interativo</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 p-4 rounded-full group-hover:bg-opacity-30 transition-all duration-300">
                  <ArrowRight className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>

          {/* Simulado Prático */}
          <Link to="/simulado/configuracao" className="group block">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
                    <Clock className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">Simulado Prático</h3>
                    <p className="text-white text-opacity-90 text-base leading-relaxed mb-4">
                      Simule uma avaliação prática real com cronômetro e análise detalhada de desempenho.
                    </p>
                    <div className="flex space-x-6">
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">Timer</div>
                        <div className="text-white text-opacity-80 text-sm">Cronômetro</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">Auto</div>
                        <div className="text-white text-opacity-80 text-sm">Avança</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">Score</div>
                        <div className="text-white text-opacity-80 text-sm">Resultado</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 p-4 rounded-full group-hover:bg-opacity-30 transition-all duration-300">
                  <ArrowRight className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </Link>

          {/* Glossário */}
          <Link to="/glossario" className="group block">
            <div className="bg-gradient-to-r from-cyan-500 to-teal-600 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">Glossário</h3>
                    <p className="text-white text-opacity-90 text-base leading-relaxed mb-4">
                      Consulte definições e conceitos fundamentais da histologia organizados alfabeticamente.
                    </p>
                    <div className="flex space-x-6">
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">A-Z</div>
                        <div className="text-white text-opacity-80 text-sm">Alfabético</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">24+</div>
                        <div className="text-white text-opacity-80 text-sm">Termos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">15+</div>
                        <div className="text-white text-opacity-80 text-sm">Categorias</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 p-4 rounded-full group-hover:bg-opacity-30 transition-all duration-300">
                  <ArrowRight className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
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