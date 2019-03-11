import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

function Buttons(props) {
  const { classes } = props;
  console.log("props");
  return (
    <div>
      <Button
        variant="contained"
        color={props.color}
        className={classes.button}
        disabled={props.dis}
        onClick={props.onClick}
      >
        {props.lable}
      </Button>
    </div>
  );
}

Buttons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Buttons);
