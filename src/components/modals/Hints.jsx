import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Modal from './Modal'
import { keyboards, prices } from '../../store/initData'
import { shuffle } from '../../helpers'

function Hints() {
  const dispatch = useDispatch()
  const { letters, wordLength, answer } = useSelector((state) => state.board)
  const { wp, correctWord, absentLetters } = useSelector((state) => state.hints)
  const language = useSelector((state) => state.language)
  const [activeLetterIndex, setActiveLetterIndex] = useState(0)
  const { t } = useTranslation()

  function showCorrectLetter() {
    dispatch.hints.addCorrectLetter({ letter: answer[activeLetterIndex], activeLetterIndex })
  }

  function showAbsentLetter() {
    const absentLetter = getAbsentLetter()
    dispatch.hints.addAbsentLetter(absentLetter)
  }

  function getAbsentLetter() {
    const absentBoard = letters.filter((item) => item.status === 'absent').map((obj) => obj.letter)
    const absentHint = absentLetters.map((obj) => obj.letter)
    const aLetters = keyboards[language].alpha
      .split('')
      .filter((item) => !answer.split('').includes(item))
      .filter((item) => !absentBoard.includes(item))
      .filter((item) => !absentHint.includes(item))

    return shuffle(aLetters).at(-1)
  }

  function setActiveIndex(index) {
    correctWord[index]?.status !== 'correct' && setActiveLetterIndex(index)
  }

  return (
    <Modal
      title="hints"
      body={
        <>
          <div className={`hints-row__word`}>
            {[...new Array(wordLength)].map((_, index) => (
              <div
                key={index}
                className={`hints-row__cell ${correctWord[index]?.status} ${
                  activeLetterIndex === index && 'active'
                }`}
                onClick={() => setActiveIndex(index)}>
                {correctWord[index]?.letter}
              </div>
            ))}
          </div>
          <div className="hints-row">
            <div>
              <div className="hints-row__title">{t('hints.correct.title')}</div>
              <div className="hints-row__hint">{t('hints.correct.desc')}</div>
            </div>
            <button
              className="hints-row__button"
              onClick={showCorrectLetter}
              disabled={
                correctWord.filter((item) => item?.status === 'correct').length >= wordLength ||
                correctWord[activeLetterIndex]?.status === 'correct' ||
                wp < prices.hints.correct
              }>
              {prices.hints.correct} WP
            </button>
          </div>
          <div className="hints-row">
            <div>
              <div className="hints-row__title">{t('hints.absent.title')}</div>
              <div className="hints-row__hint">{t('hints.absent.desc')}</div>
            </div>
            <button
              className="hints-row__button"
              onClick={showAbsentLetter}
              disabled={
                absentLetters.length > keyboards[language].alpha.length - wordLength ||
                wp < prices.hints.absent
              }>
              {prices.hints.absent} WP
            </button>
          </div>
        </>
      }
    />
  )
}

export default Hints
