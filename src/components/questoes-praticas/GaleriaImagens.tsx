import React, { useState } from 'react';
import { X, ZoomIn, Grid } from 'lucide-react';
import { getImagensTema, temImagensDisponiveis } from '../../utils/imagens';
import { formatarNomeTema } from '../../utils/temas';

interface GaleriaImagensProps {
  tema: string;
  isOpen: boolean;
  onClose: () => void;
}

const GaleriaImagens: React.FC<GaleriaImagensProps> = ({ tema, isOpen, onClose }) => {
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);

  if (!isOpen || !temImagensDisponiveis(tema)) {
    return null;
  }

  const imagens = getImagensTema(tema);

  const abrirImagem = (imagem: string) => {
    setImagemSelecionada(imagem);
  };

  const fecharImagem = () => {
    setImagemSelecionada(null);
  };

  const fecharGaleria = () => {
    setImagemSelecionada(null);
    onClose();
  };

  // Fechar com ESC
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (imagemSelecionada) {
          fecharImagem();
        } else {
          fecharGaleria();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, imagemSelecionada]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 md:p-4">
      {/* Modal da Galeria */}
      {!imagemSelecionada && (
        <div className="bg-white rounded-xl md:rounded-2xl max-w-4xl max-h-full w-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Grid className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-slate-800">
                Galeria - {formatarNomeTema(tema)}
              </h2>
            </div>
            <button
              onClick={fecharGaleria}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Grid de Imagens */}
          <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {imagens.map((imagem, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer rounded-lg overflow-hidden bg-slate-200 border border-slate-300"
                  onClick={() => abrirImagem(imagem)}
                >
                  <img
                    src={imagem}
                    alt={`Lâmina ${index + 1} - ${formatarNomeTema(tema)}`}
                    className="w-full h-56 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ZoomIn className="w-5 h-5 text-slate-700" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                    Imagem {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 md:p-6 border-t border-slate-200 bg-slate-50">
            <p className="text-sm text-slate-600 text-center">
              Clique em uma imagem para visualizar em tamanho maior
            </p>
          </div>
        </div>
      )}

      {/* Modal da Imagem Individual */}
      {imagemSelecionada && (
        <div className="relative max-w-7xl max-h-full w-full flex items-center justify-center">
          <img
            src={imagemSelecionada}
            alt="Lâmina histológica ampliada"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          
          {/* Botão de fechar */}
          <button
            onClick={fecharImagem}
            className="absolute top-4 right-4 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Instruções */}
          <div className="absolute bottom-3 md:bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm backdrop-blur-sm">
            <span className="hidden md:inline">Pressione ESC para voltar à galeria</span>
            <span className="md:hidden">Toque no X para voltar</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GaleriaImagens;
