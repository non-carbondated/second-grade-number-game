import React, { useState } from 'react'
import Tableau from "./Tableau";

const generateUUID = () => {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
};

const generateNumber = () => Math.round(Math.random() * 10);

export default () => {
  const [points, setPoints] = useState(0);
  const [randomFive, setRandomFive] = useState(
    Array(5)
      .fill()
      .map(() => ({ id: generateUUID(), value: generateNumber() }))
  );
  const [targetNumber, setTargetNumber] = useState(generateNumber());
  const [activeNumbers, setActiveNumbers] = useState([]);

  const handlePass = () => {
    setRandomFive(
      Array(5)
        .fill()
        .map(() => ({ id: generateUUID(), value: generateNumber() }))
    );
    setTargetNumber(generateNumber());
    setActiveNumbers([]);
  };

  const handleSubmit = () => {
    const activeNumberJSON = JSON.stringify(activeNumbers);

    setPoints(points + 2 ** activeNumbers.length);
    setRandomFive(
      randomFive.map(({ id, value }) => {
        if (activeNumberJSON.includes(id)) {
          return { id: generateUUID(), value: generateNumber() };
        }
        return { id, value };
      })
    );
    setTargetNumber(generateNumber());
    setActiveNumbers([]);
  };

  const handlePointReset = () => setPoints(0);

  const handleAddNumber = (obj) => {
    setActiveNumbers([
      ...activeNumbers,
      { id: obj.id, value: obj.value, operation: "add" }
    ]);
  };

  const handleSubtractNumber = (obj) => {
    setActiveNumbers([
      ...activeNumbers,
      { id: obj.id, value: obj.value, operation: "subtract" }
    ]);
  };

  const handleCancelNumber = ({ id }) => {
    setActiveNumbers(activeNumbers.filter((number) => number.id !== id));
  };

  const props = {
    points,
    randomFive,
    targetNumber,
    activeNumbers,
    onAddNumber: handleAddNumber,
    onSubtractNumber: handleSubtractNumber,
    onCancelNumber: handleCancelNumber,
    onPass: handlePass,
    onSubmit: handleSubmit,
    onPointReset: handlePointReset
  }

  return <Tableau {...props} />
};
