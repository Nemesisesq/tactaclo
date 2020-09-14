import React, {useState} from 'react';
import logo from './logo.svg';
import './App.scss';

const App = () => {


    let initialState = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ].map(i => {
        return i.map(c => {
            return {
                num: c, player: {
                    class: "blank",
                    letter: ""
                }
            }

        })
    });

    const initPlayers = {
        player2: {
            name: "Lola",
            chosen: [],
            class: "navy",
            letter: "X"
        },
        player1: {
            name: "Aizen",
            chosen: [],
            class: "orange",
            letter: "O"
        },
    }

    const [players, setPlayers] = useState(initPlayers)
    const [turn, setTurn] = useState("player1")

    const [board, setBoard] = useState(initialState)


    const handleBoxClick = (row, col) => {
        console.log(row, col)

        if (board[row][col].player.class === "blank") {
            board[row][col].player = players[turn]
        } else {
            alert("hey you can't do that!!!!")
            return
        }

        const tmp = [...board]
        debugger
        setBoard(tmp)

        if (turn === "player1") {
            setTurn("player2")
        } else {
            setTurn("player1")
        }


        players[turn].chosen.push(`${row}${col}`)


    }

    const reset = () => {
        setBoard(initialState)
        setTurn("player1")
    }
    return (
        <div className="App">
            {Object.keys(players).map(p => {
                let chosen = p === turn

                return <div className={chosen && "chosen"}>
                    <h1>{players[p].name}</h1>
                </div>
            })}
            <button onClick={reset}>RESET</button>
            {board.map((row, rowindex) => {
                return <div className="row">
                    {row.map((col, colindex) => {
                            return <div id={`Box${col.num}`} onClick={() => handleBoxClick(rowindex, colindex)}
                                        className={col.player.class}>
                                <span>{col.player.letter}</span>
                            </div>
                        }
                    )}
                </div>
            })}
        </div>
    );
}

export default App;
