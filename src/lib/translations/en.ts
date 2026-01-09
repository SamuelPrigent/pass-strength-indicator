import type { Translation } from './types';

export const en: Translation = {
  levels: {
    veryWeak: 'Very Weak',
    weak: 'Weak',
    soso: 'Mid',
    good: 'Good',
    strong: 'Strong',
  },
  passwordMustInclude: 'Your Password must include',
  passwordStrength: 'Password Strength',
  rules: {
    minLength: 'At least 12 characters',
    uppercase: 'At least one uppercase letter',
    lowercase: 'At least one lowercase letter',
    number: 'At least one number',
    special: 'At least one special character',
    noEmail: 'Must not contain your email',
    noForbiddenWords: 'Must not contain forbidden words',
  },
  placeholder: 'Enter your password',
  label: 'Password',
};
