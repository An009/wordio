// src/components/common/Button.jsx
// this is a simple button component that can take an icon and test as props
// and spread the rest of the props to the button element
// it can be used in other components to create buttons with icons and text
function Button({ icon, text, ...rest }) {
  return (
    <button {...rest}>
      {icon}
      {text}
    </button>
  )
}

export default Button
