import { prices } from '../../initData'

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
