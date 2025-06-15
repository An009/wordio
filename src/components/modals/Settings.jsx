// src/components/modals/Settings.jsx

import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import Switch from "react-switch";
import Modal from "./Modal.jsx";
import { languages, difficultyLevels } from "../../store/initData.js"; // Import difficultyLevels

function Settings() {
  const dispatch = useDispatch();
  const { wordLength, difficulty } = useSelector((state) => state.board); // Get difficulty from state
  const language = useSelector((state) => state.language.value); // Get the value property of language
  const theme = useSelector((state) => state.themes.theme); // Get the theme property
  const { t, i18n } = useTranslation();

  // Function to handle difficulty change
  function changeDifficulty(selectedOption) {
    dispatch.board.setDifficulty(selectedOption.value); // Set the new difficulty
    dispatch.board.reset(); // Reset game state
    dispatch.hints.reset(); // Reset hints
    dispatch.board.newAnswer(language); // Generate new answer based on new difficulty
  }

  function changeWordLength(count) {
    dispatch.board.setWordLength(count);
    dispatch.board.reset();
    dispatch.hints.reset();
    dispatch.board.newAnswer(language);
  }

  function changeLanguage(lang) {
    i18n.changeLanguage(lang.value);
    dispatch.board.reset();
    dispatch.hints.reset();
    dispatch.language.setLanguage(lang.value); // Set the language value
    dispatch.board.newAnswer(lang.value);
  }

  function changeTheme(isChecked) {
    const theme = isChecked ? "dark" : "light";
    dispatch.themes.setTheme(theme);
  }

  // Prepare options for difficulty select
  const difficultyOptions = Object.keys(difficultyLevels).map((level) => ({
    value: level,
    label: t(`settings.difficulty.${level}`), // Assuming translations for difficulty levels
  }));

  return (
    <Modal
      title="settings"
      body={
        <>
          {/* Difficulty Setting */}
          <div className="settings-row">
            <div>
              <div className="settings-row__title">
                {t("settings.difficulty.title")}
              </div>
              <div className="settings-row__desc">
                {t("settings.difficulty.desc")}
              </div>
            </div>
            <Select
              className="settings-row__select"
              classNamePrefix="react-select"
              isSearchable={false}
              defaultValue={difficultyOptions.find(
                (item) => item.value === difficulty
              )}
              options={difficultyOptions}
              onChange={changeDifficulty}
            />
          </div>

          {/* Existing Number of Letters (can be made dependent on difficulty or removed if difficulty is primary) */}
          {/* Keeping it for now, but its relevance reduces with difficulty selection */}
          <div className="settings-row">
            <div className="settings-row__num-of-letters">
              <div className="settings-row__title align-center">
                {t("settings.numberOfLetters")}
              </div>
              <div className="numbers">
                {[...new Array(8)].map((_, index) => {
                  const count = index + 4;
                  return (
                    <div
                      key={count}
                      className={
                        wordLength === count
                          ? "numbers__checkbox correct"
                          : "numbers__checkbox"
                      }
                      onClick={() => changeWordLength(count)}
                    >
                      {count}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Existing Language Setting */}
          <div className="settings-row">
            <div>
              <div className="settings-row__title">
                {t("settings.language.title")}
              </div>
              <div className="settings-row__desc">
                {t("settings.language.desc")}
              </div>
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

          {/* Existing Dark Mode Setting */}
          <div className="settings-row">
            <div>
              <div className="settings-row__title">
                {t("settings.darkMode.title")}
              </div>
              <div className="settings-row__desc">
                {t("settings.darkMode.desc")}
              </div>
            </div>
            <div className="settings-row__checkbox">
              <Switch
                checked={theme === "dark"}
                onChange={changeTheme}
                onColor="#60b1ff"
                onHandleColor="#262626"
                handleDiameter={20}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={13}
                width={34}
              />
            </div>
          </div>
        </>
      }
    />
  );
}

export default Settings;
