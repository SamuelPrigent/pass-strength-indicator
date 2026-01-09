import type { Translation } from './types';

export const de: Translation = {
  levels: {
    veryWeak: 'Sehr schwach',
    weak: 'Schwach',
    soso: 'Mittel',
    good: 'Gut',
    strong: 'Stark',
  },
  passwordMustInclude: 'Ihr Passwort muss enthalten',
  passwordStrength: 'Passwortstärke',
  rules: {
    minLength: 'Mindestens 12 Zeichen',
    uppercase: 'Mindestens einen Großbuchstaben',
    lowercase: 'Mindestens einen Kleinbuchstaben',
    number: 'Mindestens eine Zahl',
    special: 'Mindestens ein Sonderzeichen',
    noEmail: 'Darf Ihre E-Mail nicht enthalten',
    noForbiddenWords: 'Darf keine verbotenen Wörter enthalten',
  },
  placeholder: 'Geben Sie Ihr Passwort ein',
  label: 'Passwort',
};
