import React, { Component } from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import '../css-folder/concertDashboard.css';
import { Link } from "react-router-dom";



class Concerts extends Component {
  constructor(props) {
    super(props);
    this.state = { listofConcerts: [], userLocation: '' }
  }
  
  findMetroId = () => {
    const userLat = this.props.getUserCoords.userLat;
    const userLng = this.props.getUserCoords.userLng;

    // console.log(`The user location: lat ${userLat}, lng: ${userLng}`)

    axios.get(`https://api.songkick.com/api/3.0/search/locations.json?location=geo:${userLat},${userLng}&apikey=wXhfjuiigBr1Hnnx`)
    .then(responseFromApi => {
    
      const metroId = responseFromApi.data.resultsPage.results.location[0].metroArea.id;
      // console.log(metroId);
      // return metroId;
      return this.findConcertsNearby(metroId);
    })
  }

  findConcertsNearby = (stuff) => {
  

    const test = stuff;
    //console.log(test);
    //console.log('from MIami',test);
    //console.log("from findConcertsNearby:", this.state)

    //const userLat = this.props.getUserCoords.userLat;
    //const userLng = this.props.getUserCoords.userLng;

    //console.log(`The user location: lat ${userLat}, lng: ${userLng}`)

    axios.get(`https://api.songkick.com/api/3.0/metro_areas/${test}/calendar.json?apikey=wXhfjuiigBr1Hnnx`)
    .then(responseFromApi => {

      // the list of concerts in Miami-id# 9776
      // console.log(responseFromApi.data.resultsPage.results.event)
      const apiConcertList = responseFromApi.data.resultsPage.results.event;

      this.setState({
        listofConcerts: apiConcertList
      })
    })
  }



  showConcerts = () => {
    return this.state.listofConcerts.slice(0, 16).map((eachConcert) => {
      return (
       <div className ="fullContain"> 
            <div className="eachJumbo" key={eachConcert.id}>
              <div className="jumbo">
                  <p>{eachConcert.displayName}</p>
                  <br />
                  <a className="thusButton" href={eachConcert.uri}>Buy Ticket</a>
                  <p className="countdown"> Start Time: {eachConcert.start.time}</p>                
            </div>
          </div>
      </div>
      )
    })
  }


  componentDidMount() {
    this.setState({userLocation: this.props});
    this.findMetroId();
    //this.findConcertsNearby()
  }


  render() { 
    // console.log(this.state)
    return ( 
      <div>
        <h1 className="nearYou">Concerts Near You!</h1>
        <div className ="fullContain">
          {this.showConcerts()}
        </div>
      </div>
     );
  }
}
 
export default Concerts;