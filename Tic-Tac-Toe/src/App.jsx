import React, { useState } from 'react'

const App = () => {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
  ]

  const checkWinner = (newBoard) => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a]
      }
    }
    if (newBoard.every(cell => cell != null)) {
      return "Draw"
    }
    return null
  }

  const handleClick = (index) => {
    if (board[index]) return

    if (winner) return

    const newBoard = [...board];

    newBoard[index] = currentPlayer;

    setBoard(newBoard)

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner)
    } else {
      setCurrentPlayer(
        currentPlayer === "X" ? "O" : "X"
      )
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X")
    setWinner(null);
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-zinc-900 gap-5">

      <h1 className="text-5xl font-bold text-white">
        Tic Tac Toe
      </h1>
      {winner ? (

        winner === "Draw" ? (
          <h2 className="text-2xl text-yellow-400">
            It's a Draw!
          </h2>
        ) : (
          <h2 className="text-2xl text-green-400">
            Winner: {winner}
          </h2>
        )

      ) : (

        <h2 className="text-2xl text-white">
          Current Player: {currentPlayer}
        </h2>

      )}

      <div className="grid grid-cols-3 gap-3">

        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="h-24 w-24 bg-zinc-800 text-white text-4xl rounded-xl hover:bg-zinc-700 transition"
          >
            {cell}
          </button>
        ))}

      </div>

      <button
        onClick={resetGame}
        className="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:scale-105 transition"
      >
        Reset
      </button>

    </div>
  )
}

export default App