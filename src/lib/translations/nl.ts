import type { Translation } from './types';

export const nl: Translation = {
  levels: {
    veryWeak: 'Zeer zwak',
    weak: 'Zwak',
    soso: 'Gemiddeld',
    good: 'Goed',
    strong: 'Sterk',
  },
  passwordMustInclude: 'Uw wachtwoord moet bevatten',
  passwordStrength: 'Wachtwoordsterkte',
  rules: {
    minLength: 'Minimaal 12 tekens',
    uppercase: 'Minimaal één hoofdletter',
    lowercase: 'Minimaal één kleine letter',
    number: 'Minimaal één cijfer',
    special: 'Minimaal één speciaal teken',
    noEmail: 'Mag uw e-mail niet bevatten',
    noForbiddenWords: 'Mag geen verboden woorden bevatten',
  },
  placeholder: 'Voer uw wachtwoord in',
  label: 'Wachtwoord',
};
