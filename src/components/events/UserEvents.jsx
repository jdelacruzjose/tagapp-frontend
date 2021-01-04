import React, { Component } from "react";
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel'
import CarouselCaption from "react-bootstrap/CarouselCaption";

let filterEvents = [];
class UserEvents extends Component {
  constructor(props) {
    super(props);
    this.state = { userEvents: [], myId: "" };
  }

  componentDidMount() {
    this.setState(
      {
        myId: this.props.myUser._id
      },
      () => {
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/events`)
          .then(responseFromApi => {
            this.setState({
              userEvents: responseFromApi.data
            });
          })
          .catch(err => console.log(err));
      }
    );
  }

  myUserEvents = myId => {
    if (this.state.userEvents.length) {
      let theArray = this.state.userEvents;
      filterEvents = theArray.filter(eachEvent => {

        return eachEvent.author === myId;
      });
    }
    // console.log(filterEvents);
    return filterEvents.map(eachEvent => {
      return (
        
  
          <Carousel.Item>
              <img 
                key={eachEvent._id}
                className="d-block w-100"
                src={eachEvent.imageUrl} 
                alt="boohoo" 
        /*         max-width="100%"
                max-height="100%" */
                height="600" 
              />
              <CarouselCaption>
                <h3>{eachEvent.eventName}</h3>
              </CarouselCaption>
            
          </Carousel.Item>
     

      );
    });
  };

  render() {
    return (
      <div>
        <h1>My Events:</h1>
        <Carousel>
          {this.myUserEvents(this.state.myId)}
        </Carousel>
      </div>
    );
  }
}

export default UserEvents;



{/* <Carousel>
<Carousel.Item>
    <img 
      key={eachEvent._id}
      className="d-block w-100"
      src={eachEvent.imageUrl} 
      alt="boohoo" 
      height="300" 
    />
    <CarouselCaption>
      <h3>{eachEvent.eventName}</h3>
    </CarouselCaption>
  
</Carousel.Item>
</Carousel> */}