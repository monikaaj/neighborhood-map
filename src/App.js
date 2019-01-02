import React, { Component } from "react";
import Sidebar from "react-sidebar";
import { Button, Glyphicon } from "react-bootstrap";
import scriptLoader from 'react-async-script-loader'
import "./App.css";
import Map from "./components/Map";
import Search from "./components/Search";
import { locationsData } from "./locations";

const mql = window.matchMedia(`(min-width: 800px)`);
let map = {};

class App extends Component {
  
  state = {
    sidebarDocked: mql.matches,
    sidebarOpen: true,
    markers: [],
    locations: [],
    allLocations: []
  };

  mediaQueryChanged = this.mediaQueryChanged.bind(this);
  onSetSidebarOpen = this.onSetSidebarOpen.bind(this);

  componentWillMount() {
    if (window.innerWidth < 800) {
      this.mediaQueryChanged();
    }
    mql.addListener(this.mediaQueryChanged);
  }
 
  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  componentWillReceiveProps({ isScriptLoadSucceed }) {
    if(isScriptLoadSucceed) {
      this.createMap();
      this.getInfoWindowsData();
    }
  }

  createMap() {
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 50.061527, lng: 19.937959},
      zoom: 13,
      mapTypeControl: false
    });
  }

  // gets all locations data from foursquare
  getInfoWindowsData() {
    locationsData.forEach((location) => {
       fetch(`https://api.foursquare.com/v2/venues/${location.venueId}` +
          `?client_id=CKNFO3V2Y12VDYZIIKOBW4ZJGL1H515OIDTJUS3HNAD5LSVQ` +
          `&client_secret=LQSLIUGCUU2NT32QN3SR4NWCKM40IA4GN5BOJF1YYHPFRJLI` +
          `&v=20180323`)
          .then(response => response.json())
          .then(data => {
            if (data.meta.code === 200) {
              location.venueDetails = data.response;
            }
          }).catch(error => {
            window.alert(`Couldn't get Foursquare data due to ${error}`);
          })   
    })

    this.setState({
      allLocations: locationsData
    }, () => {
      setTimeout(() => {
        this.addMarkers();
      }, 1000);
    });
  }

  addMarkers() {
    // delete all existing markers; set state markers to empty array
    if (this.state.markers.length > 0) {
      this.state.markers.forEach((marker) => {
        marker.setMap(null);
      })
      this.setState({
        markers: []
      })
    }

    //create markers for given locations
    if(this.state.locations.length > 0) {
      this.createMarkers(this.state.locations);
    }
    else {
      this.createMarkers(locationsData);
    }
  }

  createMarkers = (markersToCreate) => {
    let markersArray = [];
    for (let i = 0; i < markersToCreate.length; i++) {
      var marker = new window.google.maps.Marker({
        position: markersToCreate[i].location,
        map: map,
        title: markersToCreate[i].title,
        animation: window.google.maps.Animation.DROP,
        venueId: markersToCreate[i].venueId,
        venueDetails: markersToCreate[i].venueDetails
      });
      this.addInfoWindow(marker);
      markersArray.push(marker);
    }
    this.setState({
      markers: markersArray
    })
    this.setState({
      markers: markersArray
    })
  }

  addInfoWindow(marker) {
    // add info window content
    console.log(marker)
    let infowindowContent = '';
    if(marker.venueDetails.venue) {
      const photo = marker.venueDetails.venue.bestPhoto.prefix + 'width300' + marker.venueDetails.venue.bestPhoto.suffix;
      console.log(photo)
      infowindowContent = `<div class="info-window">
        <h4>${marker.title}</h4>
        <p>${marker.venueDetails.venue.location.city}, ${marker.venueDetails.venue.location.state}, ${marker.venueDetails.venue.location.country}</p>
        <img src=${photo} alt="${marker.title}" />
        <p class="info rating">Rating: ${marker.venueDetails.venue.rating}</p>
        <p class="info likes">Likes: ${marker.venueDetails.venue.likes.count}</p>
        <a href="${marker.venueDetails.venue.canonicalUrl}" target="_blank">More details</a>
      </div>`
    }
    else {
      infowindowContent = `<div class="info-window">
        <h4>${marker.title}</h4>
        <p>Sorry, unable to get place data :(</p>
      </div>`
    }
    var infowindow = new window.google.maps.InfoWindow({
      content: infowindowContent
    });
    marker.addListener('click', function() {
      this.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(() => {
        marker.setAnimation(null);
      }, 900);
      infowindow.open(map, marker);
      setTimeout(function () { infowindow.close(); }, 5000);
    });
  }

  updateLocations(updatedLocations) {
    this.setState({
      locations: updatedLocations
    }, () => {
      this.addMarkers();
    });
  }

  render() {
    return (
      <div className="app">
        <Sidebar
          sidebar={
            <Search 
              locations={ this.state.locations }
              allLocations={ this.state.allLocations }
              onUpdateLocations = {(updatedLocations) => {
                this.updateLocations(updatedLocations)
              }}
            />
          }
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          docked={this.state.sidebarDocked}
          sidebarClassName={'sidebar'}
          styles={{ sidebar: { background: "#1e2129" } }}
        >
        <Button className="sidebar-button" onClick={() => this.onSetSidebarOpen(true)}>
          <Glyphicon glyph="align-justify" />
        </Button>
        </Sidebar>
        <Map />
      </div>
    );
  }
}

export default scriptLoader(
  ['https://maps.googleapis.com/maps/api/js?key=AIzaSyD4jvFejxbYtA2gfrAh5RYRG_NO8qzm97Q']
)(App)
