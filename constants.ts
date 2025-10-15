
import type { CreateFunction, EditFunction } from './types';

interface CreateFunctionConfig {
  id: CreateFunction;
  name: string;
}

interface EditFunctionConfig {
  id: EditFunction;
  name: string;
  requiresTwo?: boolean;
}

export const CREATE_FUNCTIONS: CreateFunctionConfig[] = [
  { id: 'free', name: 'Prompt' },
  { id: 'sticker', name: 'Adesivos' },
  { id: 'logo', name: 'Logo' },
  { id: 'comic', name: 'HQ' },
];

export const EDIT_FUNCTIONS: EditFunctionConfig[] = [
  { id: 'add-remove', name: 'Adicionar' },
  { id: 'retouch', name: 'Retoque' },
  { id: 'style', name: 'Estilo' },
  { id: 'compose', name: 'Unir', requiresTwo: true },
];
