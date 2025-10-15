
import type { ImageFile } from '../types';

export const fileToImageFile = (file: File): Promise<ImageFile> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('File is not an image.'));
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      if (base64) {
        resolve({
          base64,
          mimeType: file.type,
          name: file.name,
        });
      } else {
        reject(new Error('Failed to read file as base64.'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const downloadImage = (imageFile: ImageFile) => {
  const link = document.createElement('a');
  link.href = `data:${imageFile.mimeType};base64,${imageFile.base64}`;
  link.download = imageFile.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
