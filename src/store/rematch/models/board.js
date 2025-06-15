// src/store/rematch/models/board.js

import dictionary from "../../../dictionary/index.js";
import { getRandomWord } from "../../../helpers/index.js";
import { difficultyLevels } from "../../initData.js";

const init = {
  letters: [],
  wordLength: 5, // Default word length, will be set by difficulty
  row: 1,
  answer: "",
  difficulty: "medium", // Initialize with a default difficulty
};

export const board = {
  state: init,
  reducers: {
    reset(state) {
      // Preserve wordLength and difficulty on reset for new game in same settings
      return {
        ...init,
        wordLength: state.wordLength,
        difficulty: state.difficulty,
      };
    },
    setWordLength(state, payload) {
      state.wordLength = payload;
      return state;
    },
    setDifficulty(state, payload) {
      state.difficulty = payload;
      const config = difficultyLevels[payload];
      // Randomly select a word length from the allowed range for the chosen difficulty
      state.wordLength =
        config.wordLengths[
          Math.floor(Math.random() * config.wordLengths.length)
        ];
      return state;
    },
    addLetter(state, payload) {
      const currentDifficultyConfig = difficultyLevels[state.difficulty];
      if (
        state.letters.length < state.row * state.wordLength &&
        state.row <= currentDifficultyConfig.allowedGuesses
      ) {
        state.letters.push({ letter: payload.letter, status: "" });
      }
      return state;
    },
    backspace(state) {
      if (state.letters.length > (state.row - 1) * state.wordLength) {
        state.letters.pop();
      }
      return state;
    },
    addWord(state) {
      // Simplified addWord, now primarily for incrementing row
      state.row += 1;
      return state;
    },
    newAnswer(state, language) {
      const currentDifficultyConfig = difficultyLevels[state.difficulty];
      const words = dictionary[language];

      // Filter words based on the selected difficulty's word lengths
      const filteredWords = words.filter(
        (word) =>
          word.length >= currentDifficultyConfig.wordLengths[0] &&
          word.length <=
            currentDifficultyConfig.wordLengths[
              currentDifficultyConfig.wordLengths.length - 1
            ]
      );
      state.answer = getRandomWord(filteredWords, state.wordLength);
      state.letters = [];
      state.row = 1;
      return state;
    },
    updateLetterStatus(state, { index, status }) {
      if (state.letters[index]) {
        state.letters[index].status = status;
      }
      return state;
    },
  },
  effects: (_dispatch) => ({
    // checkWord effect moved into Controls.jsx to handle direct DOM manipulation and detailed letter status updates
    // It now dispatches more granular actions.
  }),
};
