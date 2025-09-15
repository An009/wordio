// src/store/rematch/models/statistics.js
// this file defines the initial state and reducers for the statistics model in the application.
// it manages the number of games played, wins, defeats, win rate, current streak, and max streak.
// it provides functionality to reset statistics, record a win, and record a defeat.
const init = {
  played: 0,
  wins: 0,
  defeat: 0,
  winRate: 0,
  currentStreak: 0,
  maxStreak: 0
}

export const statistics = {
  state: init,
  reducers: {
    reset() {
      return init
    },

    win(state) {
      state.wins += 1
      state.played += 1
      state.winRate = (state.wins / state.played) * 100
      state.currentStreak += 1
      state.maxStreak = Math.max(state.currentStreak, state.maxStreak)
    },

    defeat(state) {
      state.defeat += 1
      state.played += 1
      state.winRate = (state.wins / state.played) * 100
      state.currentStreak = 0
      state.maxStreak = Math.max(state.currentStreak, state.maxStreak)
    }
  }
}
