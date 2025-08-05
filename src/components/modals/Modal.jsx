import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Popup from 'reactjs-popup'
import SVG from 'react-inlinesvg'
import CloseSVG from '../../assets/svg/close.svg'

// Modal.jsx
// This component serves as a generic modal dialog for the application.
// It uses Redux for state management and i18next for translations.
// The modal can be used to display various types of content, such as hints, defeat messages
function Modal({ preClose, title, body }) {
  const dispatch = useDispatch()
  const popups = useSelector((state) => state.popups)
  const { t } = useTranslation()

  return (
    <Popup
      modal
      open={popups[title]}
      onClose={() => {
        preClose && preClose()
        dispatch.popups.close(title)
      }}
      position="center center">
      {(close) => (
        <div className={`modal ${title}`}>
          <div className="modal-header">
            <button className="modal__close-btn" onClick={close}>
              <SVG src={CloseSVG} />
            </button>
            <h3 className="modal-title">{t(`${title}.title`)}</h3>
          </div>
          <div className="modal-body">{body}</div>
        </div>
      )}
    </Popup>
  )
}

export default Modal
