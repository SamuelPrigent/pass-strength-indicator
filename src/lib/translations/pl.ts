import type { Translation } from './types';

export const pl: Translation = {
  levels: {
    veryWeak: 'Bardzo słabe',
    weak: 'Słabe',
    soso: 'Średnie',
    good: 'Dobre',
    strong: 'Silne',
  },
  passwordMustInclude: 'Twoje hasło musi zawierać',
  passwordStrength: 'Siła hasła',
  rules: {
    minLength: 'Co najmniej 12 znaków',
    uppercase: 'Co najmniej jedną wielką literę',
    lowercase: 'Co najmniej jedną małą literę',
    number: 'Co najmniej jedną cyfrę',
    special: 'Co najmniej jeden znak specjalny',
    noEmail: 'Nie może zawierać Twojego emaila',
    noForbiddenWords: 'Nie może zawierać zabronionych słów',
  },
  placeholder: 'Wprowadź hasło',
  label: 'Hasło',
};
