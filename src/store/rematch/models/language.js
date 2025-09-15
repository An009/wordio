// src/store/rematch/models/language.js
// this file defines the initial state and reducers for the language model in the application.
export const language = {
  state: 'en',
  reducers: {
    setLanguage(_, language) {
      return language.value
    }
  }
}
