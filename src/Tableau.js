import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import NumberCard from "./NumberCard";
import Equation from "./Equation";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import BeenhereTwoToneIcon from "@material-ui/icons/BeenhereTwoTone";
import DoubleArrowTwoToneIcon from "@material-ui/icons/DoubleArrowTwoTone";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  numberCards: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  goalCard: {
    margin: theme.spacing(0.5),
    width: theme.spacing(22),
    background: "#06c",
    textAlign: "center"
  },
  tableauActions: {
    display: "flex",
    justifyContent: "space-evenly",
    margin: theme.spacing(2),
    width: theme.spacing(30)
  }
}));

const emojiScale = {
  correct: ["😀", "😃", "😁", "😊", "🤩"],
  incorrect: ["😟", "😧", "😢", "😭", "😱"],
  default: "🤔"
};

const generateUUID = () => {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
};

const generateNumber = () => Math.round(Math.random() * 10);

const Tableau = () => {
  const classes = useStyles();
  const [points, setPoints] = useState(0);
  const [randomFive, setRandomFive] = useState(
    Array(5)
      .fill()
      .map(() => ({ id: generateUUID(), value: generateNumber() }))
  );
  const [targetNumber, setTargetNumber] = useState(generateNumber());
  const [activeNumbers, setActiveNumbers] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const calculateActiveNumbers = (activeNumbers) =>
    activeNumbers.reduce((acc, { value, operation }) => {
      acc = operation === "add" ? acc + value : acc - value;
      return acc;
    }, 0);

  useEffect(() => {
    if (activeNumbers.length > 0) {
      const total = calculateActiveNumbers(activeNumbers);

      setIsCorrect(total === targetNumber);
    }
  }, [activeNumbers, targetNumber]);

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

  const handlePass = () => {
    setRandomFive(
      Array(5)
        .fill()
        .map(() => ({ id: generateUUID(), value: generateNumber() }))
    );
    setTargetNumber(generateNumber());
    setActiveNumbers([]);
    setIsCorrect(false);
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
    setIsCorrect(false);
  };

  const handleResetPoints = () => setPoints(0);

  return (
    <div className={classes.root}>
      <div className={classes.numberCards}>
        {randomFive.map((x) => (
          <NumberCard
            key={x.id}
            id={x.id}
            value={x.value}
            onAdd={handleAddNumber}
            onSubtract={handleSubtractNumber}
            onCancel={handleCancelNumber}
          />
        ))}
      </div>
      <Equation
        leftSide={activeNumbers}
        rightSide={targetNumber}
        isValid={isCorrect}
      />
      <Badge
        badgeContent={`+${2 ** activeNumbers.length} points!`}
        color="primary"
        invisible={activeNumbers.length === 0 || !isCorrect}
      >
        <Typography variant="h1">
          {isCorrect
            ? emojiScale.correct[activeNumbers.length - 1]
            : activeNumbers.length === 0
            ? emojiScale.default
            : emojiScale.incorrect[activeNumbers.length - 1]}
        </Typography>
      </Badge>
      <Card className={classes.goalCard} variant="elevation">
        <CardContent>
          <Typography variant="h1">{targetNumber}</Typography>
        </CardContent>
      </Card>
      <div className={classes.tableauActions}>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<DoubleArrowTwoToneIcon />}
          disabled={isCorrect}
          onClick={handlePass}
        >
          Pass
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<BeenhereTwoToneIcon />}
          disabled={!isCorrect}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      <Typography variant="button" gutterBottom>
        Total points: {points}
      </Typography>
      <Button size="small" variant="outlined" onClick={handleResetPoints}>
        Reset points
      </Button>
    </div>
  );
};

export default Tableau;
