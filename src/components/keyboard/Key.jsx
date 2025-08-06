// src/components/keyboard/Key.jsx
// this components displays a keyboard key with a letter and handles click events
function Key({ letter, className, onClick }) {
  return (
    <div className={className} onClick={onClick}>
      {letter}
    </div>
  )
}

export default Key
