import './App.css';
import {useState, useEffect } from 'react'
import React, { Component } from 'react';
import Square from './components/Square';
import { Patterns } from './components/Patterns';
import Header from './components/Header';


function App() {
  const [board, setBoard] = useState(["","","","","","","","",""]);
  const [player, setPlayer] = useState("O");
  const user = player;
  const [result, setResult] = useState({winner: "none", state: "none"})

  useEffect(() => {
    checkWin();
    checkIfTie();
    if (player == "X") {
      setPlayer("O"); 
    }else{
      setPlayer("X")
    }
  }, [board]);

  useEffect(() => {
    if (result.state != "none") {
    alert(`Game Finished! Winning Player: ${result.winner}`);
    restartGame();
  }
}, [result]);

  const chooseSquare = (square) => {
    setBoard(
      board.map((val, idx) => {
        if (idx == square && val == "") {
          return player;
        }
        return val;
      })
    );
  }

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });
      if (foundWinningPattern) {
        setResult({winner:player, state: "won"})
      }
    });
  }

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    });
  

    if (filled) {
      setResult({ winner: "No One", state: "Tie"});
    }
  };
  
  const restartGame = () => {
    setBoard(["","","","","","","","",""]);
    setPlayer("X");
  }

  function refreshPage() {
    window.location.reload(false);
};


  return (
    <div className='App'>
      <Header user={user}/>
     <div className='board'>
        <Square val={board[0]} 
        chooseSquare ={() => {
          chooseSquare(0);
        }} 
        />
           <Square val={board[1]} 
        chooseSquare ={() => {
          chooseSquare(1);
        }} 
        />
          <Square val={board[2]} 
        chooseSquare ={() => {
          chooseSquare(2);
        }} 
        />
      <Square val={board[3]} 
        chooseSquare ={() => {
          chooseSquare(3);
        }} 
        />
           <Square val={board[4]} 
        chooseSquare ={() => {
          chooseSquare(4);
        }} 
        />
          <Square val={board[5]} 
        chooseSquare ={() => {
          chooseSquare(5);
        }} 
        />
      <Square val={board[6]} 
        chooseSquare ={() => {
          chooseSquare(6);
        }} 
        />
           <Square val={board[7]} 
        chooseSquare ={() => {
          chooseSquare(7);
        }} 
        />
          <Square val={board[8]} 
        chooseSquare ={() => {
          chooseSquare(8);
        }} 
        />
     </div>
     <button className='button' onClick={refreshPage} data-inline="true">Reset Game</button>
    </div> 
  ); 
}

  
export default App;
