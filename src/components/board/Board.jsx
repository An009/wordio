import { useSelector } from 'react-redux'
import Cell from './Cell'

function Board() {
  const { letters, wordLength } = useSelector((state) => state.board)

  return (
    <>
      <div className={`board-${wordLength}`}>
        {[...new Array(wordLength * 6)].map((_, index) => (
          <Cell
            key={index}
            letter={letters[index]?.letter ?? ''}
            status={letters[index]?.status ?? ''}
            anim={letters.length === index + 1 ? 'fill-animation' : ''}
          />
        ))}
      </div>
    </>
  )
}

export default Board
