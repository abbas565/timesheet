import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class WorkTypeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { work: "", labelWidth: 0, checkWorkType: false };
    this.handleChange = this.handleChange.bind(this);
    this.changeState = this.changeState.bind(this);
  }
  //click child method by parent onClick
  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }
  changeState = () => {
    this.setState({
      work: "",
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      checkWorkType: false
    });
  };

  handleChange = name => event => {
    if (name) {
      this.setState({
        [name]: event.target.value,
        checkWorkType: true
      });
      this.props.getWorkType(event.target.value, true);
    } else {
      this.setState({
        [name]: "",
        checkWorkType: false
      });
      this.props.getWorkType(event.target.value, false);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl variant="outlined" className={classes.formControl}>
          <div className="workTypeInput">
            <div className="wTextField">
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-work-native-simple"
              >
                Work type of work is this for?
              </InputLabel>
              <Select
                native
                value={this.state.work}
                onChange={this.handleChange("work")}
                input={
                  <OutlinedInput
                    name="work"
                    labelWidth={this.state.labelWidth}
                    id="outlined-work-native-simple"
                  />
                }
                style={{ width: 450 }}
              >
                <option value="" />
                <option value={"Time working on bugs & features"}>
                  Time working on bugs & features
                </option>
                <option
                  value={"Time spent reviewing and the work of a junior dev."}
                >
                  Time spent reviewing and the work of a junior dev.
                </option>
              </Select>
            </div>

            {this.state.checkWorkType ? (
              <div className="wCheck">
                <FontAwesomeIcon icon={faCheck} color={"green"} size="2x" />
              </div>
            ) : (
              <div className="wError">
                <p className="pwError">Select your work type please.</p>
              </div>
            )}
          </div>
        </FormControl>
      </div>
    );
  }
}

WorkTypeInput.propTypes = {
  classes: PropTypes.object.isRequired,
  getWorkType: PropTypes.func.isRequired
};

export default withStyles(styles)(WorkTypeInput);
