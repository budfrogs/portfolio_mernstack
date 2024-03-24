import React from "react";
import "./die.css";

const Pip = () => <span className="pip" />;

const Face = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div
      style={styles}
      className="face"
      onClick={props.holdDice}
    >
      {props.pips}
    </div>
  );
};

const Die = ({ isHeld, holdDice, value }) => {
  let pips = Number.isInteger(value)
    ? Array(value)
        .fill(0)
        .map((_, i) => <Pip key={i} />)
    : null;
  return (
    <Face
      pips={pips}
      holdDice={holdDice}
      isHeld={isHeld}
    ></Face>
  );
};

export default Die;
