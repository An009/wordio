import { useDispatch, useSelector } from "react-redux";
import Button from "./common/Button.jsx";
import SVG from "react-inlinesvg";
import SettingsSVG from "../assets/svg/settings.svg";
import StatisticsSVG from "../assets/svg/statistics.svg";
import InfoSVG from "../assets/svg/info.svg";
import LightSVG from "../assets/svg/light.svg";
import { prices, difficultyLevels } from "../store/initData.js";
import dictionary from "../dictionary/index.js";

function Controls() {
  const dispatch = useDispatch();
  const { letters, wordLength, answer, row, difficulty } = useSelector(
    (state) => state.board
  ); // Get difficulty from state
  const language = useSelector((state) => state.language.value); // Get the value property of language
  const currentDifficultyConfig = difficultyLevels[difficulty]; // Get current difficulty config

  function checkWordNotExist(dict, currentWord) {
    if (!dict.find((word) => word === currentWord)) {
      dispatch.popups.open("unknown");
      console.log(`"${currentWord}" is not a valid word in ${language}.`);
      return true;
    }
    return false;
  }

  function processWord() {
    const currentWord = letters
      .map((item) => item.letter)
      .slice((row - 1) * wordLength, row * wordLength) // Get letters only for the current row
      .join("");

    if (checkWordNotExist(dictionary[language], currentWord)) {
      return;
    }

    const newCorrectLettersInGuess = [];
    const newPresentLettersInGuess = [];
    const newAbsentLettersInGuess = [];

    const answerLetters = answer.split("");
    const guessLetters = currentWord.split("");

    // Create a mutable copy of answer letters to track used letters for 'present' status
    const tempAnswerLetters = [...answerLetters];

    // First pass for correct letters (green)
    for (let i = 0; i < wordLength; i++) {
      if (guessLetters[i] === tempAnswerLetters[i]) {
        // Mark letter status on board
        dispatch.board.updateLetterStatus({
          index: (row - 1) * wordLength + i,
          status: "correct",
        });
        newCorrectLettersInGuess.push(guessLetters[i]);
        tempAnswerLetters[i] = null; // Mark as used
      }
    }

    // Second pass for present letters (yellow) and absent letters (gray)
    for (let i = 0; i < wordLength; i++) {
      // Only process if not already marked 'correct' from the first pass
      if (letters[(row - 1) * wordLength + i].status !== "correct") {
        const letter = guessLetters[i];
        const answerIndex = tempAnswerLetters.indexOf(letter);

        if (answerIndex > -1) {
          dispatch.board.updateLetterStatus({
            index: (row - 1) * wordLength + i,
            status: "present",
          });
          newPresentLettersInGuess.push(letter);
          tempAnswerLetters[answerIndex] = null; // Mark as used
        } else {
          dispatch.board.updateLetterStatus({
            index: (row - 1) * wordLength + i,
            status: "absent",
          });
          newAbsentLettersInGuess.push(letter);
        }
      }
    }

    // Dispatch these new actions to update hints model based on the current guess
    dispatch.hints.addCorrectLetter(newCorrectLettersInGuess);
    dispatch.hints.addAbsentLetter(newAbsentLettersInGuess);

    // After processing the word, increment the row in the board state
    dispatch.board.addWord(); // This action just increments the row

    // Check game over conditions
    if (currentWord === answer) {
      dispatch.popups.open("win");
      dispatch.statistics.win();
      dispatch.hints.reset(); // Reset hints for new game
      dispatch.hints.addWP(
        prices.win * wordLength +
          5 * (currentDifficultyConfig.allowedGuesses - row)
      ); // Adjust points based on remaining guesses
    } else if (row === currentDifficultyConfig.allowedGuesses) {
      dispatch.popups.open("defeat");
      dispatch.statistics.defeat();
      dispatch.hints.reset(); // Reset hints for new game
    }
  }

  return (
    <div className="controls">
      <button type="button" className="controls-btn">
        <SVG
          src={SettingsSVG}
          onClick={() => dispatch.popups.open("settings")}
        />
      </button>
      <button type="button" className="controls-btn">
        <SVG
          src={StatisticsSVG}
          onClick={() => dispatch.popups.open("statistics")}
        />
      </button>
      <Button
        className="submit-btn"
        text="Submit"
        onClick={processWord}
        disabled={letters.length !== row * wordLength}
      />
      <button type="button" className="controls-btn">
        <SVG src={InfoSVG} onClick={() => dispatch.popups.open("howToPlay")} />
      </button>
      <button type="button" className="controls-btn">
        <SVG src={LightSVG} onClick={() => dispatch.popups.open("hints")} />
      </button>
    </div>
  );
}

export default Controls;
