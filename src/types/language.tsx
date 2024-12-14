// src/types/language.ts

export type LanguageAcronym = 'br' | 'en' | 'es';

export interface Language {
  country: string;
  language: string;
  acronym: LanguageAcronym;
}
