import type { Locale, StrengthLevel } from "./types";

export interface Translation {
  levels: Record<StrengthLevel, string>;
  passwordMustInclude: string;
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

export const translations: Record<Locale, Translation> = {
  en: {
    levels: {
      veryWeak: "Very Weak",
      weak: "Weak",
      soso: "So-so",
      good: "Good",
      strong: "Strong",
    },
    passwordMustInclude: "Your Password must include",
    rules: {
      minLength: "At least 12 characters",
      uppercase: "At least one uppercase letter",
      lowercase: "At least one lowercase letter",
      number: "At least one number",
      special: "At least one special character",
      noEmail: "Must not contain your email",
      noForbiddenWords: "Must not contain forbidden words",
    },
    placeholder: "Enter your password",
    label: "Password",
  },
  fr: {
    levels: {
      veryWeak: "Très faible",
      weak: "Faible",
      soso: "Moyen",
      good: "Bon",
      strong: "Fort",
    },
    passwordMustInclude: "Votre mot de passe doit inclure",
    rules: {
      minLength: "Au moins 12 caractères",
      uppercase: "Au moins une lettre majuscule",
      lowercase: "Au moins une lettre minuscule",
      number: "Au moins un chiffre",
      special: "Au moins un caractère spécial",
      noEmail: "Ne doit pas contenir votre email",
      noForbiddenWords: "Ne doit pas contenir de mots interdits",
    },
    placeholder: "Entrez votre mot de passe",
    label: "Mot de passe",
  },
  es: {
    levels: {
      veryWeak: "Muy débil",
      weak: "Débil",
      soso: "Regular",
      good: "Buena",
      strong: "Fuerte",
    },
    passwordMustInclude: "Tu contraseña debe incluir",
    rules: {
      minLength: "Al menos 12 caracteres",
      uppercase: "Al menos una letra mayúscula",
      lowercase: "Al menos una letra minúscula",
      number: "Al menos un número",
      special: "Al menos un carácter especial",
      noEmail: "No debe contener tu email",
      noForbiddenWords: "No debe contener palabras prohibidas",
    },
    placeholder: "Ingresa tu contraseña",
    label: "Contraseña",
  },
};

export function getTranslation(locale: Locale): Translation {
  return translations[locale] || translations.en;
}
