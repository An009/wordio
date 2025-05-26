import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Popup from 'reactjs-popup'

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
