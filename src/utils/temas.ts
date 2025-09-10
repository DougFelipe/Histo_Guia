// Configuração centralizada dos temas disponíveis
export const TEMAS_DISPONIVEIS = [
  'tecido-epitelial',
  'tecido-conjuntivo', 
  'tecido-muscular',
  'tecido-nervoso',
  'sistema-circulatorio',
  'cartilagem',
  'tecido-osseo'
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
