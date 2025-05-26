import Win from './Win'
import Defeat from './Defeat'
import WordNotFound from './WordNotFound'
import HowToPlay from './HowToPlay'
import Statistics from './Statistics'
import Settings from './Settings'
import Hints from '../modals/Hints'

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
