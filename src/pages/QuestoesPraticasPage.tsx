import React, { useState, useEffect } from 'react';
import { ArrowLeft, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BarraBuscaPratica from '../components/questoes-praticas/BarraBuscaPratica';
import FiltroTema from '../components/questoes-praticas/FiltroTema';
import QuestoesGrid from '../components/questoes-praticas/QuestoesGrid';
import { QuestaoPratica, FiltroPraticoState } from '../types';

const QuestoesPraticasPage: React.FC = () => {
  const [questoes, setQuestoes] = useState<QuestaoPratica[]>([]);
  const [questoesFiltradas, setQuestoesFiltradas] = useState<QuestaoPratica[]>([]);
  const [filtros, setFiltros] = useState<FiltroPraticoState>({
    tema: '',
    palavrasChave: '',
  });
  const [loading, setLoading] = useState(true);

  // Lista de temas disponíveis
  const temasDisponiveis = [
    'tecido-conjuntivo',
    'tecido-epitelial', 
    'tecido-muscular',
    'tecido-nervoso',
    'sistema-circulatorio',
    'cartilagem'
  ];

  useEffect(() => {
    carregarTodasQuestoes();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [questoes, filtros]);

  const carregarTodasQuestoes = async () => {
    setLoading(true);
    try {
      console.log('Carregando questões práticas...');
      const todasQuestoes: QuestaoPratica[] = [];
      
      // Carregar questões de todos os temas
      for (const tema of temasDisponiveis) {
        try {
          console.log(`Carregando questões do tema: ${tema}`);
          const questoesModule = await import(`../data/temas/${tema}/questoes-praticas.json`);
          const questoesTema = questoesModule.default;
          console.log(`Questões carregadas para ${tema}:`, questoesTema);
          if (questoesTema && Array.isArray(questoesTema)) {
            todasQuestoes.push(...questoesTema);
          }
        } catch (error) {
          console.warn(`Não foi possível carregar questões do tema: ${tema}`, error);
        }
      }
      
      console.log('Total de questões práticas carregadas:', todasQuestoes.length);
      setQuestoes(todasQuestoes);
    } catch (error) {
      console.error('Erro ao carregar questões práticas:', error);
      setQuestoes([]);
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = () => {
    if (questoes.length === 0) {
      setQuestoesFiltradas([]);
      return;
    }

    let questoesFiltradas = [...questoes];

    // Aplicar filtro de tema
    if (filtros.tema && filtros.tema.trim() !== '') {
      questoesFiltradas = questoesFiltradas.filter(q => q.tema === filtros.tema);
    }

    // Aplicar filtro de palavras-chave
    if (filtros.palavrasChave && filtros.palavrasChave.trim() !== '') {
      const palavras = filtros.palavrasChave.toLowerCase().trim().split(' ').filter(p => p.length > 0);
      questoesFiltradas = questoesFiltradas.filter(q => 
        palavras.some(palavra => 
          q.enunciado.toLowerCase().includes(palavra) ||
          q.tema.toLowerCase().includes(palavra) ||
          q.alternativas.some(alt => alt.texto.toLowerCase().includes(palavra))
        )
      );
    }

    setQuestoesFiltradas(questoesFiltradas);
  };

  // Obter temas únicos das questões carregadas
  const getTemasDisponiveis = () => {
    return Array.from(new Set(questoes.map(q => q.tema))).sort();
  };

  return (
    <div className="min-h-screen bg-slate-50">
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
              <Microscope className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">Questões Práticas</h1>
          </div>
          <p className="text-slate-600">Analise lâminas histológicas e teste seus conhecimentos práticos</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Buscar Questões</h3>
              <BarraBuscaPratica
                valor={filtros.palavrasChave}
                onChange={(valor) => setFiltros(prev => ({ ...prev, palavrasChave: valor }))}
                placeholder="Digite palavras-chave..."
              />
            </div>
            
            <FiltroTema 
              temaSelecionado={filtros.tema}
              onTemaSelecionado={(tema) => setFiltros(prev => ({ ...prev, tema }))}
              temasDisponiveis={getTemasDisponiveis()}
            />
          </div>
          
          <div className="lg:col-span-3">
            <QuestoesGrid 
              questoes={questoesFiltradas}
              loading={loading}
              temaFiltrado={filtros.tema}
              termoBusca={filtros.palavrasChave}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestoesPraticasPage;