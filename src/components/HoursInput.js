import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

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

class HoursInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hours: null, hoursCheck: false };
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
      hours: "",
      hoursCheck: false
    });
  };

  handleChange = hours => event => {
    let myHour = event.target.value;
    if (myHour >= 0) {
      this.setState({
        hours: event.target.value,
        hoursCheck: true
      });
      this.props.getHours(event.target.value, true);
    } else {
      this.setState({
        hours: null,
        hoursCheck: false
      });
      this.props.getHours(event.target.value, false);
    }
  };

  render() {
    const { classes } = this.props;

    let errorItem;
    if (this.state.hours) {
      errorItem = null;
    } else {
      errorItem = <p>Hours have to be positive number</p>;
    }

    return (
      <div className={classes.container} noValidate autoComplete="off">
        <div className="hoursInput">
          <div className="hTextField">
            <TextField
              id="outlined-number"
              label="Hours"
              value={this.state.hours}
              onChange={this.handleChange("hours")}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div className="hError">{errorItem}</div>

          {/* {!this.state.hoursCheck ? (
            <div className="hError">
              <p>Hours have to be positive number</p>
            </div>
          ) : null} */}
        </div>
      </div>
    );
  }
}

HoursInput.propTypes = {
  classes: PropTypes.object.isRequired,
  getHours: PropTypes.func.isRequired
};

export default withStyles(styles)(HoursInput);
