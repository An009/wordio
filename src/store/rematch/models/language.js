export const language = {
  state: 'en',
  reducers: {
    setLanguage(_, language) {
      return language.value
    }
  }
}
