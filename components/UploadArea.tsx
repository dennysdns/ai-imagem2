
import React, { useRef } from 'react';
import type { ImageFile } from '../types';
import { UploadIcon } from './icons';

interface UploadAreaProps {
  image: ImageFile | null;
  onImageUpload: (file: File) => void;
  title: string;
}

const UploadArea: React.FC<UploadAreaProps> = ({ image, onImageUpload, title }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div>
        <label className="block text-md font-semibold text-slate-300 mb-2">{title}</label>
        <div
        onClick={handleClick}
        className="w-full h-36 bg-slate-700 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-center p-4 cursor-pointer hover:border-purple-500 transition-colors relative overflow-hidden"
        >
        {image ? (
            <img
            src={`data:${image.mimeType};base64,${image.base64}`}
            alt={image.name}
            className="absolute inset-0 w-full h-full object-cover"
            />
        ) : (
            <div className="text-slate-400 flex flex-col items-center">
                <UploadIcon className="w-8 h-8 mb-2" />
                <span className="font-semibold">Clique para selecionar</span>
                <span className="text-xs">PNG, JPG, WebP (máx. 10MB)</span>
            </div>
        )}
        <input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
        />
        </div>
    </div>
  );
};

export default UploadArea;
