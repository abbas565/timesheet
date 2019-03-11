import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 120
  }
});

class MinutesInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { minutes: null, minutesCheck: false };
    this.handleChange = this.handleChange.bind(this);
    this.changeState = this.changeState.bind(this);
  }
  //click child method by parent onClick
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }
  changeState = () => {
    this.setState({
      minutes: "",
      minutesCheck: false
    });
  };

  handleChange = minutes => event => {
    //--------------------------------------------

    let patt = new RegExp(/.*\S.*/);
    let myMin = event.target.value;
    console.log("patt is:", patt.test(event.target.value));
    if (myMin <= 60 && myMin >= 0 && patt.test(event.target.value)) {
      this.setState({
        minutes: event.target.value,
        minutesCheck: true
      });
      this.props.getMinutes(event.target.value, true);
    } else {
      this.setState({
        minutes: null,
        minutesCheck: false
      });
      this.props.getMinutes(event.target.value, false);
    }
  };

  render() {
    const { classes } = this.props;

    let errorItem;

    if (this.state.minutes) {
      errorItem = null;
    } else {
      errorItem = <p>Minutes have to be less than 60!</p>;
    }

    return (
      <div className={classes.container} noValidate autoComplete="off">
        <div className="minutseInput">
          <div className="mTextField">
            <TextField
              id="outlined-number"
              label="Minutes"
              value={this.state.minutes}
              onChange={this.handleChange("minutes")}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
            />
          </div>

          {this.state.minutesCheck && this.props.mHoursCheck ? (
            <div className="mCheck">
              <FontAwesomeIcon icon={faCheck} color={"green"} size="2x" />
            </div>
          ) : (
            <div className="mError">{errorItem}</div>
          )}
        </div>
      </div>
    );
  }
}

MinutesInput.propTypes = {
  classes: PropTypes.object.isRequired,
  getMinutes: PropTypes.func.isRequired
};

export default withStyles(styles)(MinutesInput);
