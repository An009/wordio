import { useSelector, useDispatch } from 'react-redux'
import flagsSvg from '../assets/svg/flags.svg'

function Header() {
  const dispath = useDispatch()
  const { wp } = useSelector((state) => state.hints)
  const language = useSelector((state) => state.language)

  return (
    <header className="header">
      <div className="header__language">
        <div className="header__flags">
          <svg>
            <use href={`${flagsSvg}#${language}`} />
          </svg>
          <span>{language}</span>
        </div>
      </div>
      <div className="header__title">
        <h2>
          <span>W</span>
          <span>o</span>
          <span>r</span>
          <span>d</span>
          <span className="correct">i</span>
          <span className="present">o</span>
        </h2>
      </div>
      <div className="header__points" onClick={() => dispath.statistics.setTest('dark')}>
        {wp} <span>WP</span>
      </div>
    </header>
  )
}

export default Header
