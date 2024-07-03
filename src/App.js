import React from "react";
import { nanoid } from "nanoid";
import Game from "./Game";
import Game1 from "./Game1";
import "./andex.css";
export default function App() {
  const [player1Tenzies, setPlayer1Tenzies] = React.useState(false);
  const [player2Tenzies, setPlayer2Tenzies] = React.useState(false);

  const resetGame = () => {
    setPlayer1Tenzies(false);
    setPlayer2Tenzies(false);
  };

  return (
    <div className="ma">
      <Game
        player="player1"
        tenzies={player1Tenzies}
        setTenzies={setPlayer1Tenzies}
        resetGame={resetGame}
      />
      <Game1
        player="player2"
        tenzies={player2Tenzies}
        setTenzies={setPlayer2Tenzies}
        resetGame={resetGame}
      />
    </div>
  );
}
