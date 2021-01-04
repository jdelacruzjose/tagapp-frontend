import React, { Component } from "react";
import axios from "axios";

class EventCountdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfEvents: [],
      days: 0,
      hours: 0,
      min: 0,
      sec: 0
    };
  }

  componentDidMount() {
    this.getAllEvents();
    // update every second

  }

  getAllEvents = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/events`).then(responseFromApi => {
      this.setState({
        listOfEvents: responseFromApi.data
      });
    });
  };


  getNextEvent = () => {

    let copyOfEvents = this.state.listOfEvents;

      console.log("copyOfEvents.length is: ", copyOfEvents.length)
      console.log("copyOfEvents: ", copyOfEvents)
      console.log("trying to access date: ", copyOfEvents[0].startDate)
      
      copyOfEvents = copyOfEvents.sort((a, b) => (parseFloat(a.startDate) > parseFloat(b.startDate)) ? 1 : -1);
      let nextEvent = copyOfEvents[0];
      console.log("nextEvent is: ", nextEvent)

    return nextEvent;
  }

  theCountDown = () => {

      let nextEvent = this.getNextEvent();
      console.log('theCountDown is: ', nextEvent);
      console.log(`the countDown date is: `, nextEvent.startDate)
      let convertDate = new Date(nextEvent.startDate);
      console.log(`The name of the event is:`, nextEvent.eventName);
      let eventName = nextEvent.eventName;
      console.log(`The description of the event is:`, nextEvent.description);
      let eventDescription = nextEvent.description;
      console.log(`the convertDate is: `, convertDate);
      let now = new Date()
      console.log(`the now is: `, now);
      
  }

  render() {

    console.log('EventCountdown Event List:', this.state.listOfEvents);
/*     if(this.state.listOfEvents.length > 0){
      this.getNextEvent();
    } */
    return (
      <div>
        <h1>EventCountdown React Component</h1>
        <p>Your Next Event!</p>
        <p>
          {this.state.listOfEvents.length > 0 && this.theCountDown()}
        </p>
      </div>
    );
  }
}

export default EventCountdown;
