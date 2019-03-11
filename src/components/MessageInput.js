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
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
    this.handleChange = this.handleChange.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }
  changeState = () => {
    this.setState({
      message: ""
    });
  };

  handleChange = message => event => {
    this.setState({
      [message]: event.target.value
    });
    this.props.getMessage(event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container} noValidate autoComplete="off">
        <div className="messageInput">
          <TextField
            id="outlined-multiline-static"
            label="Message(Optional)"
            multiline
            rows="4"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            type="text"
            name="message"
            value={this.state.message}
            onChange={this.handleChange("message")}
            fullWidth
          />
        </div>
      </div>
    );
  }
}

MessageInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MessageInput);
