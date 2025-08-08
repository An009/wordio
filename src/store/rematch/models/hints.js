import { prices } from '../../initData'

// hints.js
// this file defines the initial state and reducers for the hints model in the application.
// it manages the word points (wp), earned points, correct letters, and absent letters.
// it provides functionality to reset the hints, add correct letters, add absent letters,
// and add word points (wp).
const init = {
  wp: prices.wp,
  earned: 0,
  correctWord: [],
  absentLetters: []
}

export const hints = {
  state: init,
  reducers: {
    reset(state) {
      return { ...init, wp: state.wp }
    },

    addCorrectLetter(state, { letter, activeLetterIndex }) {
      state.correctWord[activeLetterIndex] = { letter, status: 'correct' }
      state.wp -= prices.hints.correct
    },

    addAbsentLetter(state, letter) {
      state.absentLetters.push({ letter, status: 'absent' })
      state.wp -= prices.hints.absent
    },

    addWP(state, points) {
      state.wp += points
      state.earned = points
    }
  }
}
