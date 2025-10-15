
import { GoogleGenAI, Modality, Part } from "@google/genai";
import type { ImageFile, CreateFunction, EditFunction, Mode } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this context, we assume the key is present.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const imageFileToPart = (image: ImageFile): Part => ({
  inlineData: {
    data: image.base64,
    mimeType: image.mimeType,
  },
});

export const generateImageWithGemini = async (
  mode: Mode,
  func: CreateFunction | EditFunction,
  prompt: string,
  image1: ImageFile | null,
  image2: ImageFile | null
): Promise<string> => {
  if (mode === 'create') {
    const model = 'imagen-4.0-generate-001';
    let finalPrompt = prompt;

    switch (func as CreateFunction) {
      case 'sticker':
        finalPrompt = `A die-cut sticker of ${prompt}, vector art, cartoon style, white background`;
        break;
      case 'logo':
        finalPrompt = `A modern, minimalist logo for "${prompt}", vector graphic, high resolution, on a clean white background`;
        break;
      case 'comic':
        finalPrompt = `A comic book panel illustration of ${prompt}, dynamic lighting, bold outlines, vibrant colors, professional comic art style`;
        break;
      case 'free':
        // Use prompt as is
        break;
    }

    const response = await ai.models.generateImages({
      model: model,
      prompt: finalPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages[0].image.imageBytes;
    } else {
      throw new Error('Image generation failed, no images returned.');
    }
  } else { // mode === 'edit'
    const model = 'gemini-2.5-flash-image';
    
    if (!image1) {
      throw new Error('An image is required for editing.');
    }

    const parts: Part[] = [imageFileToPart(image1)];

    if (func === 'compose' && image2) {
      parts.push(imageFileToPart(image2));
    }

    parts.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: model,
      contents: { parts },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }

    throw new Error('Image editing failed, no image was returned.');
  }
};
