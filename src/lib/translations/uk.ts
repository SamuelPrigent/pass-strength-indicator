import type { Translation } from './types';

export const uk: Translation = {
  levels: {
    veryWeak: 'Дуже слабкий',
    weak: 'Слабкий',
    soso: 'Середній',
    good: 'Добрий',
    strong: 'Сильний',
  },
  passwordMustInclude: 'Ваш пароль повинен містити',
  passwordStrength: 'Надійність пароля',
  rules: {
    minLength: 'Мінімум 12 символів',
    uppercase: 'Принаймні одну велику літеру',
    lowercase: 'Принаймні одну малу літеру',
    number: 'Принаймні одну цифру',
    special: 'Принаймні один спеціальний символ',
    noEmail: 'Не повинен містити вашу електронну пошту',
    noForbiddenWords: 'Не повинен містити заборонені слова',
  },
  placeholder: 'Введіть пароль',
  label: 'Пароль',
};
