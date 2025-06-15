// src/store/initData.js

import { chunk } from "../helpers/index.js";

export const prices = {
  win: 20, // win coeficient
  wp: 30,
  hints: {
    correct: 150,
    absent: 10,
  },
};

// Define difficulty levels with their configurations
export const difficultyLevels = {
  easy: {
    wordLengths: [4, 5], // Example: 4-5 letter words
    allowedGuesses: 8,
    hintCostMultiplier: 0.8, // Hints are 20% cheaper
  },
  medium: {
    wordLengths: [6, 7], // Example: 6-7 letter words
    allowedGuesses: 6,
    hintCostMultiplier: 1, // Standard hint cost
  },
  hard: {
    wordLengths: [8, 9, 10], // Example: 8-10 letter words
    allowedGuesses: 5,
    hintCostMultiplier: 1.5, // Hints are 50% more expensive
  },
};

export const languages = [
  { value: "en", label: "English" },
  { value: "ua", label: "Українська" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "pt", label: "Português" },
  { value: "it", label: "Italiano" },
  { value: "nl", label: "Nederlands" },
  { value: "pl", label: "Polski" },
  { value: "sv", label: "Svenska" },
  { value: "ie", label: "Gaeilge" },
  { value: "cs", label: "Čeština" },
  { value: "el", label: "Ελληνικά" },
  { value: "tr", label: "Türkçe" },
  { value: "id", label: "Indonesian" },
  { value: "ph", label: "Filipino" },
  { value: "ar", label: "Arabic" },
];

export const keyboards = {
  en: {
    alpha: "qwertyuiopasdfghjklzxcvbnm",
    get kb() {
      return chunk(this.alpha, [10, 9, 7]);
    },
  },
  ua: {
    alpha: "йцукенгшщзхїфівапролджєячсмитьбю",
    get kb() {
      return chunk(this.alpha, [12, 11, 9]);
    },
  },
  cs: {
    alpha: "qwertyuiopasdfghjklzxcvbnmáčěéíšřůýž",
    get kb() {
      return chunk(this.alpha, [10, 9, 7, 10]);
    },
  },
  de: {
    alpha: "qwertzuiopüasdfghjklöäyxcvbnm",
    get kb() {
      return chunk(this.alpha, [11, 11, 7]);
    },
  },
  el: {
    alpha: "ερτυθιοπασδφγηξκλζχψωβνμ",
    get kb() {
      return chunk(this.alpha, [8, 9, 7]);
    },
  },
  es: {
    alpha: "qwertyuiopasdfghjklñzxcvbnm",
    get kb() {
      return chunk(this.alpha, [10, 10, 7]);
    },
  },
  fr: {
    alpha: "azertyuiopqsdfghjklmùwxcvbn",
    get kb() {
      return chunk(this.alpha, [10, 11, 6]);
    },
  },
  id: {
    alpha: "qwertyuiopasdfghjklzxcvbnm",
    get kb() {
      return chunk(this.alpha, [10, 9, 7]);
    },
  },
  ie: {
    alpha: "qwertyuiopasdfghjklzxcvbnmáéíóú",
    get kb() {
      return chunk(this.alpha, [10, 9, 7, 5]);
    },
  },
  it: {
    alpha: "qwertyuiopasdfghjklzxcvbnm",
    get kb() {
      return chunk(this.alpha, [10, 9, 7]);
    },
  },
  nl: {
    alpha: "qwertyuiopasdfghjklzxcvbnm",
    get kb() {
      return chunk(this.alpha, [10, 9, 7]);
    },
  },
  ph: {
    alpha: "qwertyuiopasdfghjklzxcvbnm",
    get kb() {
      return chunk(this.alpha, [10, 9, 7]);
    },
  },
  pl: {
    alpha: "qwertyuiopasdfghjklzxcvbnmńąćęłóśżź",
    get kb() {
      return chunk(this.alpha, [10, 9, 7, 8]);
    },
  },
  pt: {
    alpha: "qwertyuiopasdfghjklçzxcvbnm",
    get kb() {
      return chunk(this.alpha, [10, 10, 7]);
    },
  },
  sv: {
    alpha: "qwertyuiopåasdfghjklöäzxcvbnm",
    get kb() {
      return chunk(this.alpha, [11, 10, 7]);
    },
  },
  tr: {
    alpha: "qwertyuıopğüasdfghjklşizxcvbnmöç",
    get kb() {
      return chunk(this.alpha, [11, 11, 8]);
    },
  },
  ar: {
    alpha: "ضصثقفغعهخحجدشسيبلاتنمكطذءؤرىزةو ظ",
    get kb() {
      return chunk(this.alpha, [11, 10, 10, 6]);
    },
  },
};
