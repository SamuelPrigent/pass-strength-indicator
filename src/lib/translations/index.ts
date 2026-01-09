import type { Translation } from './types';

// Cache des traductions déjà chargées
const translationCache = new Map<string, Translation>();

// Traduction par défaut (anglais) chargée de manière synchrone pour le fallback
import { en as defaultTranslation } from './en';

/**
 * Charge une traduction de manière asynchrone (lazy loading)
 * Retourne la traduction en cache si déjà chargée
 */
export async function loadTranslation(locale: string): Promise<Translation> {
  // Vérifier le cache
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!;
  }

  try {
    let translation: Translation;

    // Dynamic imports pour chaque locale
    switch (locale) {
      case 'en':
        translation = (await import('./en')).en;
        break;
      case 'fr':
        translation = (await import('./fr')).fr;
        break;
      case 'es':
        translation = (await import('./es')).es;
        break;
      case 'de':
        translation = (await import('./de')).de;
        break;
      case 'pt':
        translation = (await import('./pt')).pt;
        break;
      case 'it':
        translation = (await import('./it')).it;
        break;
      case 'nl':
        translation = (await import('./nl')).nl;
        break;
      case 'pl':
        translation = (await import('./pl')).pl;
        break;
      case 'sv':
        translation = (await import('./sv')).sv;
        break;
      case 'uk':
        translation = (await import('./uk')).uk;
        break;
      case 'zh':
        translation = (await import('./zh')).zh;
        break;
      case 'ja':
        translation = (await import('./ja')).ja;
        break;
      case 'ko':
        translation = (await import('./ko')).ko;
        break;
      default:
        translation = defaultTranslation;
    }

    // Mettre en cache
    translationCache.set(locale, translation);
    return translation;
  } catch {
    // Fallback vers l'anglais en cas d'erreur
    return defaultTranslation;
  }
}

/**
 * Obtient une traduction de manière synchrone (depuis le cache ou fallback)
 * Utilisé pour le rendu initial avant que la traduction async soit chargée
 */
export function getTranslationSync(locale: string): Translation {
  return translationCache.get(locale) ?? defaultTranslation;
}

/**
 * Précharge une traduction (utile pour optimiser le chargement)
 */
export function preloadTranslation(locale: string): void {
  loadTranslation(locale);
}

export type { Translation };
export { defaultTranslation };
