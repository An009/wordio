import { Board, Controls, Keyboard } from '../components'

// Game.jsx
// This component serves as the main game interface, integrating the Board, Controls, and Keyboard components
// to provide a cohesive gaming experience.

function Game() {
  return (
    <main id="game-wrapper">
      <Board />
      <Controls />
      <Keyboard />
    </main>
  )
}

export default Game
