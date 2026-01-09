import type { Translation } from './types';

export const pt: Translation = {
  levels: {
    veryWeak: 'Muito fraca',
    weak: 'Fraca',
    soso: 'Média',
    good: 'Boa',
    strong: 'Forte',
  },
  passwordMustInclude: 'Sua senha deve incluir',
  passwordStrength: 'Força da senha',
  rules: {
    minLength: 'Pelo menos 12 caracteres',
    uppercase: 'Pelo menos uma letra maiúscula',
    lowercase: 'Pelo menos uma letra minúscula',
    number: 'Pelo menos um número',
    special: 'Pelo menos um caractere especial',
    noEmail: 'Não deve conter seu email',
    noForbiddenWords: 'Não deve conter palavras proibidas',
  },
  placeholder: 'Digite sua senha',
  label: 'Senha',
};
