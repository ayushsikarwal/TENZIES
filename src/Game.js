import React from 'react';
import Confetti from "react-confetti";
import Die from "./Die";
import { nanoid } from "nanoid";

const Game = ({ player, tenzies, setTenzies, resetGame }) => {
  const [dice, setDice] = React.useState(allNewDice());
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice, setTenzies]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      resetGame(); // Reset the game for both players when either player wins
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const countIncrease = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const displayFunc1 = () => {
    rollDice();
    countIncrease();
  };

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <div>
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <h3>{player}</h3>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice" onClick={displayFunc1}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>

      <h3 className="cou">count: {counter}</h3>
    </div>
  );
};

export default Game;
