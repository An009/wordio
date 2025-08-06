import { chunk } from '../helpers'

export const prices = {
  win: 20, // win coeficient
  wp: 30,
  hints: {
    correct: 150,
    absent: 10
  }
}

export const languages = [
  { value: 'en', label: 'English' },
  { value: 'ua', label: 'Українська' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'pt', label: 'Português' },
  { value: 'it', label: 'Italiano' },
  { value: 'nl', label: 'Nederlands' },
  { value: 'pl', label: 'Polski' },
  { value: 'sv', label: 'Svenska' },
  { value: 'ie', label: 'Gaeilge' },
  { value: 'cs', label: 'Čeština' },
  { value: 'el', label: 'Ελληνικά' },
  { value: 'tr', label: 'Türkçe' },
  { value: 'id', label: 'Indonesian' },
  { value: 'ph', label: 'Filipino' },
  { value: 'ar', label: 'العربية' }
]

export const keyboards = {
  en: {
    alpha: 'qwertyuiopasdfghjklzxcvbnm',
    get kb() {
      return chunk(this.alpha, [10, 9, 7])
    }
  },
  ua: {
    alpha: 'йцукенгшщзхїфівапролджєячсмитьбю',
    get kb() {
      return chunk(this.alpha, [12, 11, 9])
    }
  },
  cs: {
    alpha: 'qwertyuiopasdfghjklzxcvbnmáčěéíšřůýž',
    get kb() {
      return chunk(this.alpha, [10, 9, 7, 10])
    }
  },
  de: {
    alpha: 'qwertzuiopüasdfghjklöäyxcvbnm',
    get kb() {
      return chunk(this.alpha, [11, 11, 7])
    }
  },
  el: {
    alpha: 'ερτυθιοπασδφγηξκλζχψωβνμ',
    get kb() {
      return chunk(this.alpha, [8, 9, 7])
    }
  },
  es: {
    alpha: 'qwertyuiopasdfghjklñzxcvbnm',
    get kb() {
      return chunk(this.alpha, [10, 10, 7])
    }
  },
  fr: {
    alpha: 'azertyuiopqsdfghjklmùwxcvbn',
    get kb() {
      return chunk(this.alpha, [10, 11, 6])
    }
  },
  id: {
    alpha: 'qwertyuiopasdfghjklzxcvbnm',
    get kb() {
      return chunk(this.alpha, [10, 9, 7])
    }
  },
  ie: {
    alpha: 'qwertyuiopasdfghjklzxcvbnmáéíóú',
    get kb() {
      return chunk(this.alpha, [10, 9, 7, 5])
    }
  },
  it: {
    alpha: 'qwertyuiopèasdfghjklòàùzxcvbnm',
    get kb() {
      return chunk(this.alpha, [11, 12, 7])
    }
  },
  nl: {
    alpha: 'qwertyuiopasdfghjklzxcvbnm',
    get kb() {
      return chunk(this.alpha, [10, 9, 7])
    }
  },
  ph: {
    alpha: 'qwertyuiopasdfghjklzxcvbnm',
    get kb() {
      return chunk(this.alpha, [10, 9, 7])
    }
  },
  pl: {
    alpha: 'qwertyuiopasdfghjklzxcvbnmąćęłńóśźż',
    get kb() {
      return chunk(this.alpha, [10, 9, 7, 9])
    }
  },
  pt: {
    alpha: 'qwertyuiopasdfghjklçzxcvbnm',
    get kb() {
      return chunk(this.alpha, [10, 10, 7])
    }
  },
  sv: {
    alpha: 'qwertyuiopåasdfghjklöäzxcvbnm',
    get kb() {
      return chunk(this.alpha, [11, 11, 7])
    }
  },
  tr: {
    alpha: 'ertyuıopğüasdfghjklşizcvbnmöç',
    get kb() {
      return chunk(this.alpha, [10, 11, 8])
    }
  },
  ar: {
    alpha: 'ضصثقفغعهخحجدشسيبلا تنمكطئءؤرﻻىةوزظ',
    get kb() {
      // Split by space to get each Arabic letter as a key
      return chunk(this.alpha.split(' '), [12, 11, 10])
    }
  }
}
