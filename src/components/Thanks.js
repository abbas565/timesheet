import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Spinner from "./Spinner";
import ThanksPage from "./ThanksPage";
import Buttons from "./Buttons";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class Thanks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timeKeeper: false };
    this.startAgain = this.startAgain.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ timeKeeper: true });
    }, 1000);
  }

  startAgain() {
    this.props.history.push({ pathname: "/" });
  }

  render() {
    const { classes } = this.props;
    let thanksPage;

    !this.state.timeKeeper
      ? (thanksPage = <Spinner />)
      : (thanksPage = (
          <ThanksPage
            tpEmail={this.props.history.location.state.tEmail}
            tpHours={this.props.history.location.state.tHours}
            tpMinutes={this.props.history.location.state.tMinutes}
          />
        ));

    return (
      <div>
        {thanksPage}
        {this.state.timeKeeper ? (
          <div>
            <Buttons lable="Start Again" onClick={this.startAgain} />
          </div>
        ) : null}
      </div>
    );
  }
}

Thanks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Thanks));
