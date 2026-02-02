import type { Translation } from './types';

// All translations bundled synchronously (~8KB total, eliminates flash on locale switch)
import { en } from './en';
import { fr } from './fr';
import { es } from './es';
import { de } from './de';
import { pt } from './pt';
import { it } from './it';
import { nl } from './nl';
import { pl } from './pl';
import { sv } from './sv';
import { uk } from './uk';
import { zh } from './zh';
import { ja } from './ja';
import { ko } from './ko';

const defaultTranslation = en;

const translations: Record<string, Translation> = {
  en, fr, es, de, pt, it, nl, pl, sv, uk, zh, ja, ko,
};

/**
 * Returns the translation for a locale synchronously.
 * Falls back to English if the locale is not found.
 */
export function getTranslation(locale: string): Translation {
  return translations[locale] ?? defaultTranslation;
}

// Backward-compatible exports

export async function loadTranslation(locale: string): Promise<Translation> {
  return getTranslation(locale);
}

export function getTranslationSync(locale: string): Translation {
  return getTranslation(locale);
}

export function preloadTranslation(_locale: string): void {
  // No-op: all translations are bundled
}

export type { Translation };
export { defaultTranslation };
