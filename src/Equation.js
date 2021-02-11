import React from "react";
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0)
  },
  isValid: {
    color: "#06c"
  },
  isNotValid: {
    color: "#f00"
  }
}));

const Equation = ({ leftSide, rightSide, isValid }) => {
  const classes = useStyles();

  const leftSideString = leftSide
    .map(({ value, operation }, index) =>
      operation === "add"
        ? `${index === 0 ? "" : "+ "}${value}`
        : `-${index === 0 ? "" : " "}${value}`
    )
    .join(" ");

  return (
    <Typography
      className={classNames(classes.root, {
        [classes.isValid]: isValid
      })}
      variant="h1"
    >
      {`${
        leftSideString === ""
          ? "??? ="
          : leftSideString + (isValid ? " =" : " ≠")
      } ${rightSide}`}
    </Typography>
  );
};

export default Equation;
