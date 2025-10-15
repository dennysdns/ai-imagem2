
export type Mode = 'create' | 'edit';
export type CreateFunction = 'free' | 'sticker' | 'logo' | 'comic';
export type EditFunction = 'add-remove' | 'retouch' | 'style' | 'compose';

export interface ImageFile {
  base64: string;
  mimeType: string;
  name: string;
}
