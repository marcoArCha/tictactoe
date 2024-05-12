import { Children, useState } from "react";

//Para definir los turnos
const TURNS = { // turnos
  X: '❌',
  O: '⚪'
}

const Square = ({ children, isSelected, updateBoard, index }) => {
  
  const className = `square ${isSelected ? "is-selected" : ""}`

  const handleClick =() =>{
    updateBoard(index)
    
  }
  
  return (
    //Renderizado condicional, agregamos o quitamos una clase dependiendo de alfgunas condiciones
    //En este caso si isSelected es True
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const updateBoard = (index)=> {

  //Si el square ya tiene algo, no cambiar
  if(board[index]) return
  
  const newBoard = [...board]
  newBoard[index] = turn
  setBoard(newBoard)


  //Seambia el estado de Turn
  const newTurn = turn === TURNS.X ?TURNS.O : TURNS.X
  setTurn(newTurn)

}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App(){
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) =>{

    for(const combo of WINNER_COMBOS){

      const[a, b, c] = combo
      if(

        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
 
      ){
        return boardToCheck[a]
      }
    }

    return null
  }

  const resetGame = () => {

    //Reseteamos los estados para volver a empezar el juego
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) =>{
    return newBoard.every((square) => square !== null)
  }
 
  const updateBoard = (index)=> {

    //Si el square ya tiene algo, no cambiar
    //El resto de código de la función no se ejecuta
    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)


    //Seambia el estado de Turn
    const newTurn = turn === TURNS.X ?TURNS.O : TURNS.X
    setTurn(newTurn)

    //Revisar si hay ganador
    const newWinner = checkWinner(newBoard)

    if(newWinner) {

      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false) //empate
    }

    //Check is game is over




  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }

      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false ? "Empate" : "Ganó"
                }
              </h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}

              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>


          </section>
        )


      }
    </main>
  )
}

export default App
