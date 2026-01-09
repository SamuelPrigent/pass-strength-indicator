import type { Translation } from './types';

export const fr: Translation = {
  levels: {
    veryWeak: 'Très faible',
    weak: 'Faible',
    soso: 'Moyen',
    good: 'Bon',
    strong: 'Fort',
  },
  passwordMustInclude: 'Votre mot de passe doit inclure',
  passwordStrength: 'Sécurité du mot de passe',
  rules: {
    minLength: 'Au moins 12 caractères',
    uppercase: 'Au moins une lettre majuscule',
    lowercase: 'Au moins une lettre minuscule',
    number: 'Au moins un chiffre',
    special: 'Au moins un caractère spécial',
    noEmail: 'Ne doit pas contenir votre email',
    noForbiddenWords: 'Ne doit pas contenir de mots interdits',
  },
  placeholder: 'Entrez votre mot de passe',
  label: 'Mot de passe',
};
