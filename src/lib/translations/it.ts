import type { Translation } from './types';

export const it: Translation = {
  levels: {
    veryWeak: 'Molto debole',
    weak: 'Debole',
    soso: 'Media',
    good: 'Buona',
    strong: 'Forte',
  },
  passwordMustInclude: 'La tua password deve includere',
  passwordStrength: 'Sicurezza della password',
  rules: {
    minLength: 'Almeno 12 caratteri',
    uppercase: 'Almeno una lettera maiuscola',
    lowercase: 'Almeno una lettera minuscola',
    number: 'Almeno un numero',
    special: 'Almeno un carattere speciale',
    noEmail: 'Non deve contenere la tua email',
    noForbiddenWords: 'Non deve contenere parole vietate',
  },
  placeholder: 'Inserisci la tua password',
  label: 'Password',
};
