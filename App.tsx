
import React, { useState, useCallback } from 'react';
import type { Mode, CreateFunction, EditFunction, ImageFile } from './types';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import { generateImageWithGemini } from './services/geminiService';
import { fileToImageFile } from './utils/fileUtils';

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>('create');
  const [createFunction, setCreateFunction] = useState<CreateFunction>('free');
  const [editFunction, setEditFunction] = useState<EditFunction>('add-remove');
  const [prompt, setPrompt] = useState<string>('');
  const [image1, setImage1] = useState<ImageFile | null>(null);
  const [image2, setImage2] = useState<ImageFile | null>(null);
  const [generatedImage, setGeneratedImage] = useState<ImageFile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    const activeFunction = mode === 'create' ? createFunction : editFunction;

    try {
      const resultBase64 = await generateImageWithGemini(
        mode,
        activeFunction,
        prompt,
        image1,
        image2
      );
      setGeneratedImage({
        base64: resultBase64,
        mimeType: 'image/png', // Gemini output is typically png
        name: 'generated-image.png',
      });
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [mode, createFunction, editFunction, prompt, image1, image2]);
  
  const handleImage1Upload = async (file: File) => {
    try {
      const imageFile = await fileToImageFile(file);
      setImage1(imageFile);
    } catch (err) {
      setError('Failed to process image file.');
      console.error(err);
    }
  };
  
  const handleImage2Upload = async (file: File) => {
    try {
      const imageFile = await fileToImageFile(file);
      setImage2(imageFile);
    } catch (err) {
      setError('Failed to process image file.');
      console.error(err);
    }
  };

  const startEditingGeneratedImage = () => {
    if (generatedImage) {
      setMode('edit');
      setEditFunction('add-remove');
      setImage1(generatedImage);
      setImage2(null);
      setGeneratedImage(null);
      setPrompt('');
    }
  };
  
  const resetStateForModeChange = (newMode: Mode) => {
    setMode(newMode);
    setPrompt('');
    setImage1(null);
    setImage2(null);
    setGeneratedImage(null);
    setError(null);
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-900 text-gray-200">
      <LeftPanel
        mode={mode}
        setMode={resetStateForModeChange}
        createFunction={createFunction}
        setCreateFunction={setCreateFunction}
        editFunction={editFunction}
        setEditFunction={setEditFunction}
        prompt={prompt}
        setPrompt={setPrompt}
        image1={image1}
        image2={image2}
        onImage1Upload={handleImage1Upload}
        onImage2Upload={handleImage2Upload}
        onGenerate={handleGenerate}
        isLoading={isLoading}
      />
      <RightPanel
        isLoading={isLoading}
        generatedImage={generatedImage}
        error={error}
        onEdit={startEditingGeneratedImage}
      />
    </div>
  );
};

export default App;
