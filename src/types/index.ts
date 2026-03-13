export interface Alternativa {
  texto: string;
  explicacao: string;
}

export interface Questao {
  numero: number;
  enunciado: string;
  nivel: string;
  subtopico: string;
  tipo: string;
  tags: string[];
  alternativas: Alternativa[];
  respostaCorreta: number;
  temaOrigem?: string;
}

export interface FiltroState {
  subtopico: string;
  palavrasChave: string;
}

export interface TermoGlossario {
  termo: string;
  definicao: string;
  categoria: string;
}

export interface QuestaoPratica {
  id: number;
  tema: string;
  imagem: string;
  enunciado: string;
  alternativas: Alternativa[];
  respostaCorreta: number;
}

export interface FiltroPraticoState {
  tema: string;
  palavrasChave: string;
}

export interface FlashcardTeorico {
  id: string;
  tema: string;
  frente: string;
  verso: {
    resposta: string;
    explicacao: string;
  };
  tags: string[];
}

export interface FlashcardPratico {
  id: string;
  tema: string;
  frente: string; // URL da imagem
  verso: {
    resposta: string;
    explicacao: string;
  };
  enunciado: string;
}

export interface FiltroFlashcardState {
  tema: string;
  palavrasChave: string;
}

// Tipos para o Simulado
export interface ConfiguracaoSimulado {
  temasSelecionados: string[];
  numeroQuestoes: number;
  tempoPorQuestao: number; // em segundos
}

export interface QuestaoSimulado extends QuestaoPratica {
  respostaSelecionada?: number;
  tempoGasto?: number;
  respondida: boolean;
}

export interface ResultadoSimulado {
  questoes: QuestaoSimulado[];
  acertos: number;
  erros: number;
  tempoTotal: number;
  percentualAcerto: number;
}

export type StudyModuleId =
  | 'questoes-teoricas'
  | 'questoes-praticas'
  | 'flashcards-teoricos'
  | 'flashcards-praticos'
  | 'simulado-pratico'
  | 'glossario';

export type StudyModuleHeaderGroup = 'main' | 'flashcards';

export type StudyModuleIconKey =
  | 'brain'
  | 'microscope'
  | 'layers'
  | 'zap'
  | 'clock'
  | 'book-open';

export interface StudyModuleMetric {
  value: string;
  label: string;
}

export interface StudyModuleDefinition {
  id: StudyModuleId;
  title: string;
  description: string;
  primaryPath: string;
  paths: string[];
  sitemapPaths: string[];
  showInHome: boolean;
  showInHeader: boolean;
  showInSitemap: boolean;
  headerGroup: StudyModuleHeaderGroup;
  iconKey: StudyModuleIconKey;
  homeGradientClass: string;
  homeMetrics: StudyModuleMetric[];
  sitemapTopics: string[];
}

export interface HeaderNavConfig {
  mainItems: StudyModuleDefinition[];
  flashcardItems: StudyModuleDefinition[];
}
