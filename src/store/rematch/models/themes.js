// src/store/rematch/models/themes.js
// this file defines the initial state and reducers for the themes model in the application.
// it sets the initial theme based on the user's system preference (dark or light mode).
export const themes = {
  state: window?.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light',
  reducers: {
    setTheme(_, theme) {
      return theme
    }
  }
}
