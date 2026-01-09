import type { Translation } from './types';

export const sv: Translation = {
  levels: {
    veryWeak: 'Mycket svagt',
    weak: 'Svagt',
    soso: 'Medel',
    good: 'Bra',
    strong: 'Starkt',
  },
  passwordMustInclude: 'Ditt lösenord måste innehålla',
  passwordStrength: 'Lösenordsstyrka',
  rules: {
    minLength: 'Minst 12 tecken',
    uppercase: 'Minst en stor bokstav',
    lowercase: 'Minst en liten bokstav',
    number: 'Minst en siffra',
    special: 'Minst ett specialtecken',
    noEmail: 'Får inte innehålla din e-post',
    noForbiddenWords: 'Får inte innehålla förbjudna ord',
  },
  placeholder: 'Ange ditt lösenord',
  label: 'Lösenord',
};
