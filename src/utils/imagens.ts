/**
 * Utilitários para gerenciar imagens dos temas
 */

/**
 * Gera o caminho para uma imagem específica de um tema
 * @param tema - Nome do tema (ex: 'tecido-epitelial')
 * @param nomeImagem - Nome do arquivo de imagem (ex: 'image1.jpg')
 * @returns Caminho completo para a imagem
 */
export const getImagemTema = (tema: string, nomeImagem: string): string => {
  return `/images/temas/${tema}/${nomeImagem}`;
};

/**
 * Gera uma lista de caminhos para todas as imagens de um tema
 * @param tema - Nome do tema
 * @param quantidade - Número de imagens disponíveis (padrão: 3)
 * @returns Array com caminhos das imagens
 */
export const getImagensTema = (tema: string, quantidade: number = 3): string[] => {
  const imagens: string[] = [];
  for (let i = 1; i <= quantidade; i++) {
    imagens.push(getImagemTema(tema, `image${i}.jpg`));
  }
  return imagens;
};

/**
 * Mapeia questões com suas respectivas imagens locais
 * @param tema - Nome do tema
 * @param questoes - Array de questões
 * @returns Array de questões com imagens atualizadas
 */
export const mapearImagensQuestoes = (tema: string, questoes: any[]): any[] => {
  const imagensTema = getImagensTema(tema);
  
  return questoes.map((questao, index) => ({
    ...questao,
    imagem: imagensTema[index % imagensTema.length] // Usa módulo para reutilizar imagens se necessário
  }));
};

/**
 * Configuração de imagens disponíveis por tema
 */
export const IMAGENS_TEMAS: Record<string, number> = {
  'tecido-epitelial': 3,
  'tecido-conjuntivo': 0, // Ainda não implementado
  'tecido-muscular': 0,   // Ainda não implementado
  'tecido-nervoso': 0,    // Ainda não implementado
  'tecido-osseo': 0,      // Ainda não implementado
  'cartilagem': 0,        // Ainda não implementado
  'sistema-circulatorio': 0 // Ainda não implementado
};

/**
 * Verifica se um tema tem imagens disponíveis
 * @param tema - Nome do tema
 * @returns True se o tema tem imagens disponíveis
 */
export const temImagensDisponiveis = (tema: string): boolean => {
  return IMAGENS_TEMAS[tema] > 0;
};
