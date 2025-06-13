// src/store/rematch/models/board.js

import dictionary from '../../../dictionary';
import { getRandomWord } from '../../../helpers';

const init = {
  // ... (existing state)
};

export const board = {
  state: init,
  reducers: {
    // ... (existing reducers)
  },
  effects: (dispatch) => ({
    async checkWord(payload, rootState) {
      const { letters, row, wordLength, answer } = rootState.board;
      const currentWord = letters
        .map((item) => item.letter)
        .slice(-wordLength)
        .join('');

      if (!dictionary[rootState.language].find((word) => word === currentWord)) {
        dispatch.popups.open('unknown');
        console.log(`"${currentWord}" is not a valid word in ${rootState.language}.`);
        return;
      }

      const newWord = { correct: [], present: [] };
      answer.split('').forEach((letter, index) => {
        newWord.correct.push(letter === currentWord[index]);
        newWord.present.push(answer.includes(currentWord[index]));
      });
      dispatch.board.addWord(newWord);

      if (currentWord === answer) {
        dispatch.popups.open('win');
        dispatch.statistics.win();
        dispatch.hints.reset();
        dispatch.hints.addWP(prices.win * wordLength + 5 * (6 - row));
      } else if (row === 6) {
        dispatch.popups.open('defeat');
        dispatch.statistics.defeat();
        dispatch.hints.reset();
      }
    },
  }),
};