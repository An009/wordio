import { useDispatch, useSelector } from 'react-redux'
import Button from './common/Button'
import SVG from 'react-inlinesvg'
import SettingsSVG from '../assets/svg/settings.svg'
import StatisticsSVG from '../assets/svg/statistics.svg'
import InfoSVG from '../assets/svg/info.svg'
import LightSVG from '../assets/svg/light.svg'
import { prices } from '../store/initData'
import dictionary from '../dictionary'

function Controls() {
  const dispatch = useDispatch()
  const { row, answer, letters, wordLength } = useSelector((state) => state.board)
  const language = useSelector((state) => state.language)

  function checkWordNotExist(dictionary, currentWord) {
    if (!dictionary.find((word) => word === currentWord)) {
      dispatch.popups.open('unknown')
      return true
    }
  }

  function addWordToBoard(currentWord) {
    const newWord = { correct: [], present: [] }

    answer.split('').forEach((letter, index) => {
      newWord.correct.push(letter === currentWord[index])
      newWord.present.push(answer.includes(currentWord[index]))
    })

    dispatch.board.addWord(newWord)
  }

  function checkGameOver(currentWord, answer, row) {
    if (currentWord === answer) {
      dispatch.popups.open('win')
      dispatch.statistics.win()
      dispatch.hints.reset()
      dispatch.hints.addWP(prices.win * wordLength + 5 * (6 - row))
    } else if (row === 6) {
      dispatch.popups.open('defeat')
      dispatch.statistics.defeat()
      dispatch.hints.reset()
    }
  }

  function checkWord() {
    const currentWord = letters
      .map((item) => item.letter)
      .slice(-wordLength)
      .join('')

    checkWordNotExist(dictionary[language], currentWord) || addWordToBoard(currentWord)
    checkGameOver(currentWord, answer, row)
  }

  return (
    <div className="controls">
      <button className="controls-btn">
        <SVG src={SettingsSVG} onClick={() => dispatch.popups.open('settings')} />
      </button>
      <button className="controls-btn">
        <SVG src={StatisticsSVG} onClick={() => dispatch.popups.open('statistics')} />
      </button>
      <Button
        className="submit-btn"
        text="Submit"
        onClick={checkWord}
        disabled={letters.length !== row * wordLength}
      />
      <button className="controls-btn">
        <SVG src={InfoSVG} onClick={() => dispatch.popups.open('howToPlay')} />
      </button>
      <button className="controls-btn">
        <SVG src={LightSVG} onClick={() => dispatch.popups.open('hints')} />
      </button>
    </div>
  )
}

export default Controls
