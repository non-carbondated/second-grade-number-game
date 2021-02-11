import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
    width: theme.spacing(22),
    background: "rebeccapurple",
    textAlign: "center"
  },
  isActive: {
    background: "#ccc"
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  cardActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  cardButton: {
    background: "rgba(255,255,255, 0.75)"
  }
}));

const propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number,
  onAdd: PropTypes.func,
  onSubtract: PropTypes.func,
  onCancel: PropTypes.func
};
const defaultProps = {
  value: 0,
  onAdd: () => {},
  onSubtract: () => {},
  onCancel: () => {}
};
const NumberCard = ({ id, value, onAdd, onSubtract, onCancel }) => {
  const classes = useStyles();
  const [isActive, setIsActive] = useState(false);
  const [sign, setSign] = useState("");

  const handleAddClick = (event) => {
    setIsActive(true);
    setSign("+");
    onAdd({ id, value });
  };

  const handleSubtractClick = (event) => {
    setIsActive(true);
    setSign("-");
    onSubtract({ id, value });
  };

  const handleCancelClick = (event) => {
    onCancel({ id, value, sign });
    setIsActive(false);
    setSign("");
  };

  return (
    <Card
      className={classNames(classes.root, {
        [classes.isActive]: isActive
      })}
      variant="outlined"
    >
      <CardContent className={classes.cardContent}>
        <Typography variant="h2" display="inline">
          {sign}
        </Typography>
        <Typography variant="h1" display="inline">
          {value}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {isActive ? (
          <Button
            className={classes.cardButton}
            size="small"
            variant="contained"
            onClick={handleCancelClick}
          >
            Undo
          </Button>
        ) : (
          <>
            <Button
              className={classes.cardButton}
              size="small"
              variant="contained"
              onClick={handleAddClick}
            >
              Add
            </Button>
            <Button
              className={classes.cardButton}
              size="small"
              variant="contained"
              onClick={handleSubtractClick}
            >
              Subtract
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};
NumberCard.propTypes = propTypes;
NumberCard.defaultProps = defaultProps;

export default NumberCard;
