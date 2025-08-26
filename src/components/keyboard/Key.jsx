// src/components/keyboard/Key.jsx
// this components displays a keyboard key with a letter and handles click events
// it receives the letter to display, a className for styling, and an onClick handler as props
// and renders a div with the letter and the provided className and onClick handler
function Key({ letter, className, onClick }) {
  return (
    <div className={className} onClick={onClick}>
      {letter}
    </div>
  )
}

export default Key
