import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

const ThanksPage = props => {
  return (
    <div data-test="divdatatest" className="myclass">
      <Paper
        className={props.classes.root}
        elevation={1}
        data-test="paperdatatest"
      >
        <Typography variant="h5" component="h3">
          Timesheet Submitted
        </Typography>
        <FontAwesomeIcon icon={faCheck} color={"green"} size="5x" />

        <Typography component="p">
          Thank you {props.tpEmail}
          <br />
          You have logged {props.tpHours} h and {props.tpMinutes} min of work
          today.
        </Typography>
      </Paper>
    </div>
  );
};

ThanksPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ThanksPage));
