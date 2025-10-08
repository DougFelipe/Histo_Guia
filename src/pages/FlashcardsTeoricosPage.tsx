import React, { useState, useEffect } from 'react';
import { ArrowLeft, Brain, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Flashcard from '../components/flashcards/Flashcard';
import BarraBuscaFlashcard from '../components/flashcards/BarraBuscaFlashcard';
import NavegacaoFlashcard from '../components/flashcards/NavegacaoFlashcard';
import DropdownTema from '../components/DropdownTema';
import { FlashcardTeorico, FiltroFlashcardState, Questao } from '../types';
import { TEMAS_DISPONIVEIS, mapeamentoTemas } from '../utils/temas';

const FlashcardsTeoricosPage: React.FC = () => {
  const [flashcards, setFlashcards] = useState<FlashcardTeorico[]>([]);
  const [flashcardsFiltrados, setFlashcardsFiltrados] = useState<FlashcardTeorico[]>([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [filtros, setFiltros] = useState<FiltroFlashcardState>({
    tema: '',
    palavrasChave: '',
  });
  const [loading, setLoading] = useState(true);

  // Lista de temas disponíveis
  const temasDisponiveis = TEMAS_DISPONIVEIS;

  useEffect(() => {
    carregarFlashcards();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [flashcards, filtros]);

  useEffect(() => {
    // Resetar índice quando os flashcards filtrados mudarem
    setIndiceAtual(0);
  }, [flashcardsFiltrados]);

  const carregarFlashcards = async () => {
    setLoading(true);
    try {
      const todosFlashcards: FlashcardTeorico[] = [];
      
      // Carregar questões de todos os temas e converter para flashcards
      for (const tema of temasDisponiveis) {
        try {
          const questoesModule = await import(`../data/temas/${tema}/questoes-teoricas.json`);
          const questoesTema: Questao[] = questoesModule.default;
          
          if (questoesTema && Array.isArray(questoesTema)) {
            // Converter questões para flashcards
            const temaFormatado = mapeamentoTemas[tema] || tema.split('-').map(palavra => 
              palavra.charAt(0).toUpperCase() + palavra.slice(1)
            ).join(' ');
            
            const flashcardsTema = questoesTema.map(questao => {
              const alternativaCorreta = questao.alternativas[questao.respostaCorreta];
              
              return {
                id: `${tema}-${questao.numero}`,
                tema: temaFormatado,
                frente: questao.enunciado,
                verso: {
                  resposta: alternativaCorreta?.texto || 'Resposta não encontrada',
                  explicacao: alternativaCorreta?.explicacao || 'Explicação não disponível'
                },
                tags: questao.tags || []
              };
            });
            
            todosFlashcards.push(...flashcardsTema);
          }
        } catch (error) {
          console.warn(`Não foi possível carregar questões do tema: ${tema}`, error);
        }
      }
      

      setFlashcards(todosFlashcards);
    } catch (error) {
      console.error('Erro ao carregar flashcards:', error);
      setFlashcards([]);
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = () => {
    if (flashcards.length === 0) {
      setFlashcardsFiltrados([]);
      return;
    }

    let flashcardsFiltrados = [...flashcards];
    


    // Aplicar filtro de tema
    if (filtros.tema && filtros.tema.trim() !== '') {
      flashcardsFiltrados = flashcardsFiltrados.filter(flashcard => 
        flashcard.tema === filtros.tema
      );
    }

    // Aplicar filtro de palavras-chave
    if (filtros.palavrasChave && filtros.palavrasChave.trim() !== '') {
      const palavras = filtros.palavrasChave.toLowerCase().trim().split(' ').filter(p => p.length > 0);
      flashcardsFiltrados = flashcardsFiltrados.filter(flashcard => 
        palavras.some(palavra => 
          flashcard.frente.toLowerCase().includes(palavra) ||
          flashcard.verso.resposta.toLowerCase().includes(palavra) ||
          flashcard.verso.explicacao.toLowerCase().includes(palavra) ||
          flashcard.tema.toLowerCase().includes(palavra) ||
          flashcard.tags.some(tag => tag.toLowerCase().includes(palavra))
        )
      );
    }


    setFlashcardsFiltrados(flashcardsFiltrados);
  };

  const proximoFlashcard = () => {
    if (indiceAtual < flashcardsFiltrados.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    }
  };

  const flashcardAnterior = () => {
    if (indiceAtual > 0) {
      setIndiceAtual(indiceAtual - 1);
    }
  };

  const embaralharFlashcards = () => {
    const flashcardsEmbaralhados = [...flashcardsFiltrados].sort(() => Math.random() - 0.5);
    setFlashcardsFiltrados(flashcardsEmbaralhados);
    setIndiceAtual(0);
  };

  const reiniciarFlashcards = () => {
    setIndiceAtual(0);
    setFiltros({ tema: '', palavrasChave: '' });
  };



  // Get current flashcard safely
  const flashcardAtual = flashcardsFiltrados[indiceAtual];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lavender-50 to-purple-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Carregando flashcards...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">Flashcards Teóricos</h1>
          </div>
          <p className="text-slate-600">Estude conceitos de histologia com flashcards interativos</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar com Filtros */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Buscar Flashcards</h3>
              <BarraBuscaFlashcard
                valor={filtros.palavrasChave}
                onChange={(valor) => setFiltros(prev => ({ ...prev, palavrasChave: valor }))}
                placeholder="Digite palavras-chave..."
              />
            </div>
            
            <DropdownTema
              temaSelecionado={filtros.tema}
              onTemaSelecionado={(tema: string) => setFiltros(prev => ({ ...prev, tema }))}
            />
          </div>

          {/* Área Principal */}
          <div className="lg:col-span-3 space-y-8">
            {flashcardsFiltrados.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-100">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {filtros.palavrasChave || filtros.tema ? 'Nenhum flashcard encontrado' : 'Nenhum flashcard disponível'}
                </h3>
                <p className="text-slate-600">
                  {filtros.palavrasChave || filtros.tema ? 'Tente ajustar seus filtros.' : 'Carregue os flashcards teóricos.'}
                </p>
              </div>
            ) : (
              <>
                {/* Título da Seção */}
                <div className="bg-white rounded-2xl shadow-lg p-4 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-800">
                      {filtros.tema || 'Todos os Temas'}
                    </h2>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                      {flashcardsFiltrados.length} flashcard{flashcardsFiltrados.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Flashcard Atual */}
                <div className="flex justify-center">
                  {flashcardAtual ? (
                    <Flashcard
                      frente={flashcardAtual.frente}
                      verso={flashcardAtual.verso}
                      tema={flashcardAtual.tema}
                      isImagem={false}
                    />
                  ) : (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-100">
                      <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-slate-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">Carregando flashcard...</h3>
                      <p className="text-slate-600">Aguarde um momento.</p>
                    </div>
                  )}
                </div>

                {/* Navegação */}
                {flashcardAtual && (
                  <NavegacaoFlashcard
                    indiceAtual={indiceAtual}
                    total={flashcardsFiltrados.length}
                    onAnterior={flashcardAnterior}
                    onProximo={proximoFlashcard}
                    onEmbaralhar={embaralharFlashcards}
                    onReiniciar={reiniciarFlashcards}
                  />
                )}

                {/* Estatísticas */}
                {flashcardAtual && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-purple-600">{flashcardsFiltrados.length}</div>
                        <div className="text-sm text-slate-600">Total de Cards</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-emerald-600">{indiceAtual + 1}</div>
                        <div className="text-sm text-slate-600">Card Atual</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-violet-600">
                          {Math.round(((indiceAtual + 1) / flashcardsFiltrados.length) * 100)}%
                        </div>
                        <div className="text-sm text-slate-600">Progresso</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-rose-600">
                          {flashcardsFiltrados.length - (indiceAtual + 1)}
                        </div>
                        <div className="text-sm text-slate-600">Restantes</div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FlashcardsTeoricosPage;
