import React, { useState } from 'react';
import { RotateCcw, Eye, EyeOff, ZoomIn } from 'lucide-react';

interface FlashcardProps {
  frente: string;
  verso: {
    resposta: string;
    explicacao: string;
  };
  tema: string;
  isImagem?: boolean;
  enunciado?: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ 
  frente, 
  verso, 
  tema, 
  isImagem = false,
  enunciado 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imagemCarregada, setImagemCarregada] = useState(false);
  const [erroImagem, setErroImagem] = useState(false);
  const [imagemZoom, setImagemZoom] = useState<string | null>(null);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleImageLoad = () => {
    setImagemCarregada(true);
  };

  const handleImageError = () => {
    setErroImagem(true);
  };

  const abrirZoom = (e: React.MouseEvent, imagemUrl: string) => {
    e.stopPropagation();
    setImagemZoom(imagemUrl);
    document.body.style.overflow = 'hidden';
  };

  const fecharZoom = () => {
    setImagemZoom(null);
    document.body.style.overflow = 'unset';
  };

  // Fechar modal com tecla ESC
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && imagemZoom) {
        fecharZoom();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [imagemZoom]);

  return (
    <>
      <div className="relative w-full max-w-2xl mx-auto">
        <div 
          className={`relative w-full h-[600px] cursor-pointer transition-transform duration-700 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={flipCard}
        >
          {/* Frente do Card */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl shadow-xl p-6 h-full flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {tema}
                </span>
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <Eye className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="flex-1 flex flex-col min-h-0">
                {isImagem ? (
                  <>
                    {enunciado && (
                      <div className="mb-4 flex-shrink-0">
                        <p className="text-white text-lg font-medium text-center">
                          {enunciado}
                        </p>
                      </div>
                    )}
                    <div className="flex-1 bg-white bg-opacity-10 rounded-xl p-4 flex items-center justify-center min-h-0 overflow-hidden">
                      {erroImagem ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <p className="text-white text-center">Imagem não disponível</p>
                        </div>
                      ) : (
                        <div className="relative w-full h-full flex items-center justify-center group">
                          {!imagemCarregada && (
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                            </div>
                          )}
                          <img
                            src={frente}
                            alt="Lâmina histológica"
                            className={`max-w-full max-h-full object-contain rounded-lg transition-opacity duration-300 ${
                              imagemCarregada ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            style={{ 
                              maxWidth: '100%', 
                              maxHeight: '100%',
                              width: 'auto',
                              height: 'auto'
                            }}
                          />
                          {/* Botão de Zoom */}
                          {imagemCarregada && !erroImagem && (
                            <button
                              onClick={(e) => abrirZoom(e, frente)}
                              className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 z-20"
                              title="Ampliar imagem"
                            >
                              <ZoomIn className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-white text-xl font-medium text-center leading-relaxed">
                      {frente}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="text-center mt-4 flex-shrink-0">
                <p className="text-white text-opacity-80 text-sm">
                  Clique para ver a resposta
                </p>
              </div>
            </div>
          </div>

          {/* Verso do Card */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-6 h-full flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Resposta
                </span>
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <EyeOff className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-center space-y-4 min-h-0 overflow-y-auto">
                <div className="bg-white bg-opacity-10 rounded-xl p-4 flex-shrink-0">
                  <h3 className="text-white text-lg font-bold mb-2">Resposta Correta:</h3>
                  <p className="text-white text-lg font-medium">
                    {verso.resposta}
                  </p>
                </div>
                
                <div className="bg-white bg-opacity-10 rounded-xl p-4 flex-shrink-0">
                  <h4 className="text-white text-sm font-semibold mb-2 opacity-90">Explicação:</h4>
                  <p className="text-white text-sm leading-relaxed opacity-90">
                    {verso.explicacao}
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-4 flex-shrink-0">
                <p className="text-white text-opacity-80 text-sm">
                  Clique para voltar à pergunta
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Botão de Reset */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFlipped(false);
          }}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-shadow duration-200"
          title="Resetar card"
        >
          <RotateCcw className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Modal de Zoom */}
      {imagemZoom && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4"
          onClick={fecharZoom}
        >
          <div className="relative max-w-7xl max-h-full w-full flex items-center justify-center">
            <img
              src={imagemZoom}
              alt="Lâmina histológica ampliada"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              Pressione ESC ou clique fora da imagem para fechar
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Flashcard;