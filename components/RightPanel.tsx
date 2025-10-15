
import React from 'react';
import type { ImageFile } from '../types';
import { downloadImage } from '../utils/fileUtils';
import { DownloadIcon, EditIcon, ImageIcon, SpinnerIcon } from './icons';

interface RightPanelProps {
  isLoading: boolean;
  generatedImage: ImageFile | null;
  error: string | null;
  onEdit: () => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ isLoading, generatedImage, error, onEdit }) => {
  const Placeholder = () => (
    <div className="text-center text-slate-400">
      <ImageIcon className="mx-auto mb-4 h-16 w-16 text-slate-600" />
      <h2 className="text-xl font-semibold">Sua obra de arte aparecerá aqui</h2>
      <p>Descreva sua ideia, escolha um estilo e clique em gerar.</p>
    </div>
  );

  const LoadingState = () => (
    <div className="text-center text-slate-300">
      <SpinnerIcon className="mx-auto mb-4 h-16 w-16" />
      <h2 className="text-xl font-semibold animate-pulse">Gerando sua imagem...</h2>
      <p>A criatividade da IA está em ação!</p>
    </div>
  );

  const ErrorState = () => (
    <div className="text-center text-red-400 bg-red-900/50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Ocorreu um erro</h2>
      <p className="text-sm">{error}</p>
    </div>
  );
  
  const ImageDisplay = () => {
    if (!generatedImage) return null;

    return (
        <div className="relative w-full max-w-[512px] aspect-square group">
            <img 
                src={`data:${generatedImage.mimeType};base64,${generatedImage.base64}`} 
                alt="Imagem Gerada" 
                className="w-full h-full object-contain rounded-lg shadow-2xl shadow-black/50"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center gap-4">
                <button 
                    onClick={onEdit}
                    title="Editar"
                    className="p-3 bg-slate-700/80 rounded-full text-white hover:bg-purple-600 transition-colors"
                >
                    <EditIcon className="w-6 h-6" />
                </button>
                <button 
                    onClick={() => downloadImage(generatedImage)}
                    title="Download"
                    className="p-3 bg-slate-700/80 rounded-full text-white hover:bg-purple-600 transition-colors"
                >
                    <DownloadIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
  }

  return (
    <main className="flex-grow flex items-center justify-center p-4 md:p-8 bg-slate-900">
      {isLoading ? <LoadingState /> :
       error ? <ErrorState /> :
       generatedImage ? <ImageDisplay /> :
       <Placeholder />
      }
    </main>
  );
};

export default RightPanel;
