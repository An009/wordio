// src/store/rematch/models/hints.js

import { prices, difficultyLevels, keyboards } from "../../initData.js";
import { shuffle } from "../../../helpers/index.js";

const init = {
  wp: prices.wp,
  earned: 0,
  correctWord: [],
  absentLetters: [],
};

export const hints = {
  state: init,
  reducers: {
    reset(state) {
      return { ...init, wp: state.wp };
    },
    // This reducer is for when correct letters are revealed by a guess
    addCorrectLetter(state, letters) {
      letters.forEach((letter) => {
        if (!state.correctWord.includes(letter)) {
          state.correctWord.push(letter);
        }
      });
      return state;
    },
    // This reducer is for when absent letters are revealed by a guess
    addAbsentLetter(state, letters) {
      letters.forEach((letter) => {
        if (!state.absentLetters.includes(letter)) {
          state.absentLetters.push(letter);
        }
      });
      return state;
    },
    // This is for the hint button functionality (revealing a specific correct letter for a cost)
    revealCorrectLetter(
      state,
      { letter, activeLetterIndex, currentDifficulty }
    ) {
      const currentDifficultyConfig = difficultyLevels[currentDifficulty];
      state.correctWord[activeLetterIndex] = { letter, status: "correct" }; // This might need adjustment if correctWord is just a list of letters
      state.wp -=
        prices.hints.correct * currentDifficultyConfig.hintCostMultiplier;
      return state;
    },
    // This is for the hint button functionality (revealing an absent letter for a cost)
    revealAbsentLetter(state, { letter, currentDifficulty }) {
      const currentDifficultyConfig = difficultyLevels[currentDifficulty];
      state.absentLetters.push({ letter, status: "absent" });
      state.wp -=
        prices.hints.absent * currentDifficultyConfig.hintCostMultiplier;
      return state;
    },
    addWP(state, points) {
      state.earned += points;
      state.wp += points;
      return state;
    },
  },
  effects: (dispatch, _rootState) => ({
    // Effect for revealing a correct letter using hint points
    showCorrectLetter(payload, rootState) {
      const { answer, difficulty } = rootState.board;
      const { activeLetterIndex } = payload;
      dispatch.hints.revealCorrectLetter({
        letter: answer[activeLetterIndex],
        activeLetterIndex,
        currentDifficulty: difficulty,
      });
    },
    // Effect for revealing an absent letter using hint points
    showAbsentLetter(_payload, rootState) {
      const { letters, _wordLength, answer, difficulty } = rootState.board;
      const { absentLetters } = rootState.hints;
      const language = rootState.language.value; // Access the actual language value

      // Filter out letters that are in the answer, already marked absent, or already on the board as absent
      const absentBoard = letters
        .filter((item) => item.status === "absent")
        .map((obj) => obj.letter);
      const absentHint = absentLetters.map((obj) => obj.letter);

      const aLetters = keyboards[language].alpha // Access keyboards from initData
        .split("")
        .filter((item) => !answer.split("").includes(item)) // Not in the answer
        .filter((item) => !absentBoard.includes(item)) // Not already marked absent on board
        .filter((item) => !absentHint.includes(item)); // Not already revealed by hint

      const absentLetter = shuffle(aLetters).at(-1); // Get a random absent letter
      if (absentLetter) {
        dispatch.hints.revealAbsentLetter({
          letter: absentLetter,
          currentDifficulty: difficulty,
        });
      }
    },
  }),
};
