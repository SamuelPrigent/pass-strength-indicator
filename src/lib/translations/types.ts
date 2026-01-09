import type { StrengthLevel } from '../types';

export interface Translation {
  levels: Record<StrengthLevel, string>;
  passwordMustInclude: string;
  passwordStrength: string;
  rules: {
    minLength: string;
    uppercase: string;
    lowercase: string;
    number: string;
    special: string;
    noEmail: string;
    noForbiddenWords: string;
  };
  placeholder: string;
  label: string;
}
