import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import Switch from 'react-switch'
import Modal from './Modal'
import { languages } from '../../store/initData'

function Settings() {
  const dispatch = useDispatch()
  const { wordLength } = useSelector((state) => state.board)
  const language = useSelector((state) => state.language)
  const theme = useSelector((state) => state.themes)
  const { t, i18n } = useTranslation()

  function changeWordLength(count) {
    dispatch.board.reset()
    dispatch.hints.reset()
    dispatch.board.setWordLength(count)
    dispatch.board.newAnswer(language)
  }

  function changeLanguage(lang) {
    i18n.changeLanguage(lang.value)
    dispatch.board.reset()
    dispatch.hints.reset()
    dispatch.language.setLanguage(lang)
    dispatch.board.newAnswer(lang.value)
  }

  function changeTheme(isChecked) {
    const theme = isChecked ? 'dark' : 'light'
    dispatch.themes.setTheme(theme)
  }

  return (
    <Modal
      title="settings"
      body={
        <>
          <div className="settings-row">
            <div className="settings-row__num-of-letters">
              <div className="settings-row__title align-center">
                {t('settings.numberOfLetters')}
              </div>
              <div className="numbers">
                {[...new Array(8)].map((_, index) => {
                  const count = index + 4
                  return (
                    <div
                      key={count}
                      className={
                        wordLength === count ? 'numbers__checkbox correct' : 'numbers__checkbox'
                      }
                      onClick={() => changeWordLength(count)}>
                      {count}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="settings-row">
            <div>
              <div className="settings-row__title">{t('settings.language.title')}</div>
              <div className="settings-row__desc">{t('settings.language.desc')}</div>
            </div>
            <Select
              className="settings-row__select"
              classNamePrefix="react-select"
              isSearchable={false}
              defaultValue={languages.find((item) => item.value === language)}
              options={languages}
              onChange={changeLanguage}
            />
          </div>
          <div className="settings-row">
            <div>
              <div className="settings-row__title">{t('settings.darkMode.title')}</div>
              <div className="settings-row__desc">{t('settings.darkMode.desc')}</div>
            </div>
            <div className="settings-row__checkbox">
              <Switch
                checked={theme === 'dark'}
                onChange={changeTheme}
                onColor="#35bba6"
                checkedIcon={false}
                uncheckedIcon={false}
                handleDiameter={20}
                width={50}
                className="react-switch"
              />
            </div>
          </div>
        </>
      }
    />
  )
}

export default Settings
