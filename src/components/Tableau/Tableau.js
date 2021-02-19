import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import NumberCard from "../NumberCard";
import Equation from "../Equation";
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
  colorPrimary: {
    background: "#06c",
  },
  tableauActions: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: 'center',
    margin: theme.spacing(0, 2, 2),
    width: theme.spacing(80)
  },
  actionButton: {
    padding: theme.spacing(0, 3),
    height: theme.spacing(8)
  },
  primaryActionButton: {
    backgroundColor: '#06c',
    '&:hover': {
      backgroundColor: '#2882dc'
    }
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
      <div className={classes.tableauActions}>
        <Button
          className={classes.actionButton}
          variant="contained"
          color="secondary"
          endIcon={<DoubleArrowTwoToneIcon />}
          disabled={isCorrect}
          onClick={handlePass}
        >
          Pass
        </Button>
        <Badge
          classes={{
            colorPrimary: classes.colorPrimary
          }}
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
        <Button
          className={classes.actionButton}
          classes={{
            containedPrimary: classes.primaryActionButton
          }}
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
      {points > 0 && (<Button
        size="small"
        variant="outlined"
        onClick={handleResetPoints}
      >
        Reset points
      </Button>
      )}
    </div>
  );
};

export default Tableau;
