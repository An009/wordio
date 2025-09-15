// src/hooks/useTheme.j
// this hook manages the application's theme by applying the current theme to the document body.
// it retrieves the current theme from the Redux store and updates the body's class accordingly.

import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function useTheme() {
  const theme = useSelector((state) => state.themes)
  useEffect(() => {
    document.body.className = `theme-${theme}`
  })
}

export default useTheme
