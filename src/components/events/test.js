import React, { Component, useLayoutEffect } from 'react';
import PropTypes from 'prop-types'

/**
 * Note : 
 * If you're using react v 15.4 or less
 * You can directly import PropTypes from react instead. 
 * Refer to this : https://reactjs.org/warnings/dont-call-proptypes.html
 */

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      nextEventObj: ""
    }
  }

  componentDidMount() {
    // update every second
    console.log(`this.props? :`, this.props)
    console.log(`this.props.date? :`, this.props.date)
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      date ? this.setState(date) : this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(nextEventObj) {

    console.log("FROM TEST.JS ===> nextEventObj: ", nextEventObj)
    let endDate = nextEventObj.startDate
    console.log("FROM TEST.JS ===> calculateCountdown(endDate)", endDate)
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;
    /* let diff = (Date.parse(new Date()) - Date.parse(new Date(endDate))) / 1000; */
    console.log(`the diff is: `, diff)
    /* console.log(`the neg dif is: `, negDiff) */

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0
    };

    // calculate time difference between now and expected date
    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }

  render() {
    
    const countDown = this.state;
    console.log('COUNTDOWN is: ', countDown);
    

    return (
      <div className="Countdown">
        <h1>{`YOUR NEXT EVENT: ${this.props.date.eventName}`}</h1>
         
        <span className="Countdown-col">
          <span className="Countdown-col-element">
              <strong>{this.addLeadingZeros(countDown.days)}</strong>
              <span>{countDown.days === 1 ? 'Day' : 'Days'}</span>
          </span>
        </span>

        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong>{this.addLeadingZeros(countDown.hours)}</strong>
            <span>Hours</span>
          </span>
        </span>


        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong>{this.addLeadingZeros(countDown.min)}</strong>
            <span>Min</span>
          </span>
        </span>

        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong>{this.addLeadingZeros(countDown.sec)}</strong>
            <span>Sec</span>
          </span>
        </span>
      </div>
    );
  }
}

/* Countdown.propTypes = {
  date: PropTypes.string.isRequired
}; */

Countdown.defaultProps = {
  date: new Date()
};

export default Countdown;