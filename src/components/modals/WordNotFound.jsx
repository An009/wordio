import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Popup from 'reactjs-popup'

// WordNotFound.jsx
// This component displays a message when the user tries to guess a word that is not found in
// the game's dictionary. It uses Redux for state management and i18next for translations.
// The message is shown in a popup that automatically closes after a short duration.
// The component is designed to provide feedback to the user about their input.
// It is a simple notification that informs the user that the word they entered does not exist in
// the game's vocabulary.

function WordNotFound() {
  const dispatch = useDispatch()
  const { unknown } = useSelector((state) => state.popups)
  const { t } = useTranslation()

  useEffect(() => {
    unknown && setTimeout(() => dispatch.popups.close('unknown'), 2000)
  }, [dispatch.popups, unknown])

  return (
    <Popup open={unknown} onClose={() => dispatch.popups.close('unknown')} position="top center">
      <div className="word-not-found">{t('wordNotFound')}</div>
    </Popup>
  )
}

export default WordNotFound
