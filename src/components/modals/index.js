import Win from './Win'
import Defeat from './Defeat'
import WordNotFound from './WordNotFound'
import HowToPlay from './HowToPlay'
import Statistics from './Statistics'
import Settings from './Settings'
import Hints from '../modals/Hints'

// Modals/index.js
// this file serves as an entry point for all modal componenets in the application.
// it imports various modal components such as win, defeat and how yo play
// and exports them for use in other parts of the application.
function Modals() {
  return (
    <>
      <Win />
      <Defeat />
      <WordNotFound />
      <HowToPlay />
      <Statistics />
      <Settings />
      <Hints />
    </>
  )
}

export default Modals
