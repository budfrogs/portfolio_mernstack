import React, { useState, useEffect } from "react";
import Die from "../Tenzies/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { Container } from "react-bootstrap";
import "./Tenzies.css";
/*

Track the time it took to win
Save your best time ot localstorage.
check other held dice and see if they match the one that was clicked. If not change to red dice
*/
export function Tenzies() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState({
    firstClick: false,
    startTime: new Date(),
    endTime: new Date(),
    bestTime: localStorage.getItem("bestTime") ? localStorage.getItem("bestTime") : new Date(),
  });

  React.useEffect(() => {
    console.log("dice: ", dice);
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  useEffect(() => {}, [tenzies]);

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
      setCount((oldCount) => oldCount + 1);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setCount((oldCount) => (oldCount = 0));
    }
  }

  function manageTime() {}

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
    setTimer(manageTime());
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div>
        <h3>Number of rolls: {count}</h3>
      </div>
      {/* <div className="dice-container">{diceElements}</div> */}
      <Container className="dice-container">{diceElements}</Container>
      <button
        className="roll-dice"
        onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
