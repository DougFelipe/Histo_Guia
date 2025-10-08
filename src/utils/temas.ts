// Configuração centralizada dos temas disponíveis
export const TEMAS_DISPONIVEIS = [
  'tecido-epitelial',
  'tecido-conjuntivo', 
  'tecido-muscular',
  'tecido-nervoso',
  'tecido-osseo',
  'cartilagem',
  'sistema-circulatorio',
  'sistema-respiratorio',
  'sistema-linfatico',
  'sistema-digestorio-1',
  'sistema-digestorio-2',
  'sistema-digestorio-anexos'
] as const;

export type TemaDisponivel = typeof TEMAS_DISPONIVEIS[number];

// Função para formatar nome do tema para exibição
export const formatarNomeTema = (tema: string): string => {
  return tema.split('-').map(palavra => 
    palavra.charAt(0).toUpperCase() + palavra.slice(1)
  ).join(' ');
};

// Função para verificar se um tema existe
export const temaExiste = (tema: string): boolean => {
  return TEMAS_DISPONIVEIS.includes(tema as TemaDisponivel);
};

// Mapeamento de temas com nomes formatados
export const TEMAS_COM_NOMES = TEMAS_DISPONIVEIS.map(tema => ({
  arquivo: tema,
  nome: formatarNomeTema(tema)
}));

// Mapeamento usado para conversão entre nomes de arquivo e nomes de exibição
export const mapeamentoTemas: Record<string, string> = {
  'tecido-epitelial': 'Tecido Epitelial',
  'tecido-conjuntivo': 'Tecido Conjuntivo',
  'tecido-muscular': 'Tecido Muscular',
  'tecido-nervoso': 'Tecido Nervoso',
  'tecido-osseo': 'Tecido Ósseo',
  'cartilagem': 'Cartilagem',
  'sistema-circulatorio': 'Sistema Circulatório',
  'sistema-respiratorio': 'Sistema Respiratório',
  'sistema-linfatico': 'Sistema Linfático',
  'sistema-digestorio-1': 'Sistema Digestório I',
  'sistema-digestorio-2': 'Sistema Digestório II',
  'sistema-digestorio-anexos': 'Sistema Digestório - Anexos'
};
