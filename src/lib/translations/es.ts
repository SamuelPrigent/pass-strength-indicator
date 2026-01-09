import type { Translation } from './types';

export const es: Translation = {
  levels: {
    veryWeak: 'Muy débil',
    weak: 'Débil',
    soso: 'Regular',
    good: 'Buena',
    strong: 'Fuerte',
  },
  passwordMustInclude: 'Tu contraseña debe incluir',
  passwordStrength: 'Seguridad de la contraseña',
  rules: {
    minLength: 'Al menos 12 caracteres',
    uppercase: 'Al menos una letra mayúscula',
    lowercase: 'Al menos una letra minúscula',
    number: 'Al menos un número',
    special: 'Al menos un carácter especial',
    noEmail: 'No debe contener tu email',
    noForbiddenWords: 'No debe contener palabras prohibidas',
  },
  placeholder: 'Ingresa tu contraseña',
  label: 'Contraseña',
};
