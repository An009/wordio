import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import SVG from 'react-inlinesvg'
import TrashSVG from '../../assets/svg/trash.svg'
import Modal from './Modal'

import Button from '../common/Button'

// Statistics.jsx
// This component displays the player's game statistics, including the number of games played, wins, win
// rate, current streak, and maximum streak.
// It uses Redux for state management and i18next for translations.
// The statistics are displayed in a modal dialog, and users can clear their statistics if desired.
// The component also includes a button to clear the statistics, which is disabled if no games have been played.
// The statistics are formatted and displayed in a user-friendly manner.
function Statistics() {
  const dispatch = useDispatch()
  const { played, wins, winRate, currentStreak, maxStreak } = useSelector(
    (state) => state.statistics
  )
  const { t } = useTranslation()

  function clearStatistics() {
    dispatch.statistics.reset()
  }

  return (
    <Modal
      title="statistics"
      body={
        <>
          <div className="statistics__row">
            <div className="statistics__card">
              <div className="statistics__value">{played}</div>
              <div className="statistics__hint">{t('statistics.played')}</div>
            </div>
            <div className="statistics__card">
              <div className="statistics__value">{wins}</div>
              <div className="statistics__hint">{t('statistics.wins')}</div>
            </div>
            <div className="statistics__card">
              <div className="statistics__value">{winRate.toFixed()}</div>
              <div className="statistics__hint">{t('statistics.winRate')}</div>
            </div>
          </div>
          <div className="statistics__row">
            <div className="statistics__card">
              <div className="statistics__value">{currentStreak}</div>
              <div className="statistics__hint">{t('statistics.currentStreak')}</div>
            </div>
            <div className="statistics__card">
              <div className="statistics__value">{maxStreak}</div>
              <div className="statistics__hint">{t('statistics.maxStreak')}</div>
            </div>
          </div>

          <div className="statistics__row">
            <Button
              className="clear-btn"
              icon={<SVG src={TrashSVG} />}
              text={t('statistics.clearBtn')}
              onClick={clearStatistics}
              disabled={played === 0}
            />
          </div>
        </>
      }
    />
  )
}

export default Statistics
