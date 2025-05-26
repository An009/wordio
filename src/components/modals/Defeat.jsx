import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Modal from './Modal'
import Button from '../common/Button'

function DefeatPopup() {
  const dispatch = useDispatch()
  const { answer } = useSelector((state) => state.board)
  const language = useSelector((state) => state.language)
  const { t } = useTranslation()

  function newGame() {
    dispatch.board.reset()
    dispatch.hints.reset()
    dispatch.board.newAnswer(language)
  }

  return (
    <Modal
      preClose={newGame}
      title="defeat"
      body={
        <>
          <div className="defeat-row">
            <p>{t('defeat.answer')}:</p>
          </div>
          <div className="defeat-row">
            <div className="defeat-answer">{answer}</div>
          </div>
          <div className="defeat-row">
            <Button
              className="try-again-btn"
              text={t('defeat.tryAgainButton')}
              onClick={() => {
                dispatch.popups.close('defeat')
              }}
            />
          </div>
        </>
      }
    />
  )
}

export default DefeatPopup
