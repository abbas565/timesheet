import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import EmailInput from "./EmailInput";
import HoursInput from "./HoursInput";
import MinutesInput from "./MinutesInput";
import MessageInput from "./MessageInput";
import WorkTypeInput from "./WorkTypeInput";

import Buttons from "./Buttons";

class MainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      hours: null,
      minutes: null,
      message: "",
      workType: "",
      isEnabled: false,
      emailCheck: false,
      minutesCheck: false,
      hoursCheck: false,
      workTypeCheck: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onClear = this.onClear.bind(this);
  }
  //Get latest state of EmailInput component
  getEmailState = (val, echeck) => {
    this.setState({ email: val, emailCheck: echeck });
    console.log("this.state.email:", val);
    console.log("this.state.emailCheck:", echeck);
    if (
      echeck &&
      this.state.hoursCheck &&
      this.state.minutesCheck &&
      this.state.workTypeCheck
    ) {
      this.setState({ isEnabled: true });
    }
  };
  //Get latest state of HoursInput component
  getHoursState = (val, hcheck) => {
    this.setState({ hours: val, hoursCheck: hcheck });
    console.log("this.state.hourse:", val);
    if (
      this.state.emailCheck &&
      hcheck &&
      this.state.minutesCheck &&
      this.state.workTypeCheck
    ) {
      this.setState({ isEnabled: true });
    }
  };
  //Get latest state of MinutesInput component
  getMinutesState = (val, mcheck) => {
    this.setState({ minutes: val, minutesCheck: mcheck });
    console.log("this.state.minutes:", val);
    console.log("this.state.minutesCheck:", mcheck);
    if (
      this.state.emailCheck &&
      this.state.hoursCheck &&
      mcheck &&
      this.state.workTypeCheck
    ) {
      this.setState({ isEnabled: true });
    }
  };
  //Get latest state of MessageInput component
  getMessageState = val => {
    this.setState({ message: val });
    console.log("this.state.message:", val);
  };
  //Get latest state of WorkTypeInput component
  getWorkTypeState = (val, wcheck) => {
    this.setState({ workType: val, workTypeCheck: wcheck });
    console.log("this.state.workType:", val);
    console.log("this.state.workTypeCheck:", wcheck);
    if (
      this.state.emailCheck &&
      this.state.hoursCheck &&
      this.state.minutesCheck &&
      wcheck
    ) {
      this.setState({ isEnabled: true });
    }
  };
  onSubmit(e) {
    e.preventDefault();
    console.log("this.props.history:", this.props.history);
    this.props.history.push({
      pathname: "/thanks",
      state: {
        tEmail: this.state.email,
        tHours: this.state.hours,
        tMinutes: this.state.minutes
      }
    });
  }
  onClear = () => {
    this.setState({
      email: "",
      hours: null,
      minutes: null,
      message: "",
      workType: "",
      isEnabled: false,
      emailCheck: false,
      minutesCheck: false,
      hoursCheck: false,
      workTypeCheck: false
    });
    // Click child method by parent onClick
    this.EmailInputRef.changeState();
    this.HoursInputRef.changeState();
    this.MinutesInputRef.changeState();
    this.MessageInputRef.changeState();
    this.WorkTypeInputRef.changeState();
  };
  //Prevent users from submitting form by hitting Enter
  onKeyPress(event) {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  }

  render() {
    return (
      <div className="appForm">
        <div className="mainTitle">
          <p>Submit Timesheet</p>
        </div>
        <form onSubmit={this.onSubmit} onKeyPress={this.onKeyPress}>
          <div className="mainForm">
            <div className="email">
              <EmailInput
                getEmail={this.getEmailState}
                onRef={ref => (this.EmailInputRef = ref)}
              />
            </div>
            <div className="hours">
              <HoursInput
                getHours={this.getHoursState}
                onRef={ref => (this.HoursInputRef = ref)}
              />
            </div>
            <div className="minutes">
              <MinutesInput
                getMinutes={this.getMinutesState}
                onRef={ref => (this.MinutesInputRef = ref)}
                mHoursCheck={this.state.hoursCheck}
              />
            </div>
            <div className="message">
              <MessageInput
                getMessage={this.getMessageState}
                onRef={ref => (this.MessageInputRef = ref)}
              />
            </div>
            <div className="workType">
              <WorkTypeInput
                getWorkType={this.getWorkTypeState}
                onRef={ref => (this.WorkTypeInputRef = ref)}
              />
            </div>

            <div className="nextB">
              <Buttons
                lable="Next"
                color="primary"
                onClick={this.onSubmit}
                dis={!this.state.isEnabled}
              />
            </div>
            <div className="clearB">
              <Buttons lable="Clear" color="secondary" onClick={this.onClear} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(MainForm);
