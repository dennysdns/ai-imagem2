
import React from 'react';
import type { Mode, CreateFunction, EditFunction, ImageFile } from '../types';
import { CREATE_FUNCTIONS, EDIT_FUNCTIONS } from '../constants';
import FunctionCard from './FunctionCard';
import UploadArea from './UploadArea';
import { GenerateIcon, SpinnerIcon } from './icons';

interface LeftPanelProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  createFunction: CreateFunction;
  setCreateFunction: (func: CreateFunction) => void;
  editFunction: EditFunction;
  setEditFunction: (func: EditFunction) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  image1: ImageFile | null;
  image2: ImageFile | null;
  onImage1Upload: (file: File) => void;
  onImage2Upload: (file: File) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  mode,
  setMode,
  createFunction,
  setCreateFunction,
  editFunction,
  setEditFunction,
  prompt,
  setPrompt,
  image1,
  image2,
  onImage1Upload,
  onImage2Upload,
  onGenerate,
  isLoading,
}) => {
  const showUpload = mode === 'edit';
  const showDualUpload = mode === 'edit' && editFunction === 'compose';
  
  const isGenerateDisabled = isLoading || !prompt || (mode === 'edit' && !image1) || (showDualUpload && !image2);

  return (
    <div className="w-full md:w-[400px] lg:w-[450px] bg-slate-800 p-6 flex flex-col h-full overflow-y-auto shrink-0">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white">AI Image Studio</h1>
        <p className="text-slate-400">Gerador profissional de imagens</p>
      </header>

      <div className="flex-grow flex flex-col gap-6">
        <div>
          <label htmlFor="prompt" className="block text-lg font-semibold text-slate-300 mb-2">
            Descreva sua ideia
          </label>
          <textarea
            id="prompt"
            className="w-full h-28 p-3 bg-slate-700 border-2 border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            placeholder="Ex: um astronauta surfando em uma onda cósmica..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 bg-slate-700 p-1 rounded-lg">
          <button
            onClick={() => setMode('create')}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
              mode === 'create' ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-slate-600'
            }`}
          >
            Criar
          </button>
          <button
            onClick={() => setMode('edit')}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
              mode === 'edit' ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-slate-600'
            }`}
          >
            Editar
          </button>
        </div>

        {mode === 'create' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CREATE_FUNCTIONS.map((func) => (
              <FunctionCard
                key={func.id}
                label={func.name}
                isActive={createFunction === func.id}
                onClick={() => setCreateFunction(func.id)}
              />
            ))}
          </div>
        )}

        {mode === 'edit' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {EDIT_FUNCTIONS.map((func) => (
              <FunctionCard
                key={func.id}
                label={func.name}
                isActive={editFunction === func.id}
                onClick={() => setEditFunction(func.id)}
              />
            ))}
          </div>
        )}
        
        {showUpload && !showDualUpload && (
          <UploadArea image={image1} onImageUpload={onImage1Upload} title="Imagem para Editar"/>
        )}

        {showDualUpload && (
            <div className="flex flex-col gap-4">
               <UploadArea image={image1} onImageUpload={onImage1Upload} title="Primeira Imagem"/>
               <UploadArea image={image2} onImageUpload={onImage2Upload} title="Segunda Imagem"/>
            </div>
        )}

      </div>
      
      <div className="mt-auto pt-6">
        <button
          onClick={onGenerate}
          disabled={isGenerateDisabled}
          className="w-full flex items-center justify-center gap-3 bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {isLoading ? <SpinnerIcon /> : <GenerateIcon />}
          <span>{isLoading ? 'Gerando...' : 'Gerar Imagem'}</span>
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;
