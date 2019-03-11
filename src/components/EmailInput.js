import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 120
  }
});

class EmailInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", checkEmail: false };
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
      email: "",
      checkEmail: false
    });
  };

  handleChange = email => event => {
    let patt = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    this.setState({
      [email]: event.target.value,
      checkEmail: patt.test(event.target.value)
    });

    // console.log("email patt is:", patt.test(event.target.value));
    this.props.getEmail(event.target.value, patt.test(event.target.value));
  };

  render() {
    const { classes } = this.props;
    // console.log("this.props email:", this.props);
    let errorItem;

    if (!this.state.email) {
      errorItem = null;
    } else {
      errorItem = <p>The Email Address is in an invalid format.</p>;
    }

    return (
      <div className={classes.container} noValidate autoComplete="off">
        <div className="emailInput">
          <div className="eTextField">
            <TextField
              id="outlined-email-input"
              label="Email"
              className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleChange("email")}
              fullWidth
            />
          </div>

          {this.state.checkEmail ? (
            <div className="eCheck">
              <FontAwesomeIcon icon={faCheck} color={"green"} size="2x" />
            </div>
          ) : (
            <div className="eError">{errorItem}</div>
          )}
        </div>
      </div>
    );
  }
}

EmailInput.propTypes = {
  classes: PropTypes.object.isRequired,
  getEmail: PropTypes.func.isRequired
};

export default withStyles(styles)(EmailInput);
