import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Modal from './Modal'
import Button from '../common/Button'

function WinPopup() {
  const dispatch = useDispatch()
  const { earned } = useSelector((state) => state.hints)
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
      title="win"
      body={
        <>
          <div className="win-row">
            <p>
              {t('win.earned')}: <span className="win-row__earned">{earned}</span> WP
            </p>
          </div>
          <div className="win-row">
            <Button
              className="try-again-btn"
              text={t('win.tryAgainButton')}
              onClick={() => {
                dispatch.popups.close('win')
              }}
            />
          </div>
        </>
      }
    />
  )
}

export default WinPopup
