import { useTranslation } from 'react-i18next'
import Modal from './Modal'
import SampleWord from '../common/SampleWord'

// HowToPlay.jsx
// This component displays instructions on how to play the game, including examples of correct, present, and absent letters.
// It uses the i18next library for translations and a SampleWord component to show examples.
// It is designed to be used as a modal dialog in the application.

function HowToPlay() {
  const { t } = useTranslation()

  return (
    <Modal
      title="howToPlay"
      body={
        <>
          <div className="howToPlay-row">
            <p className="desc">{t('howToPlay.description')}</p>
          </div>
          <div className="howToPlay-row">
            <SampleWord word={t('howToPlay.sample.correct.word')} state="correct" />
            <p className="desc">{t('howToPlay.sample.correct.desc')}</p>
          </div>
          <div className="howToPlay-row">
            <SampleWord word={t('howToPlay.sample.present.word')} state="present" />
            <p className="desc">{t('howToPlay.sample.present.desc')}</p>
          </div>
          <div className="howToPlay-row">
            <SampleWord word={t('howToPlay.sample.absent.word')} state="absent" />
            <p className="desc">{t('howToPlay.sample.absent.desc')}</p>
          </div>
        </>
      }
    />
  )
}

export default HowToPlay
