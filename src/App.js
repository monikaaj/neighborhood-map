import React, { Component } from "react";
import Sidebar from "react-sidebar";
import { Button, Glyphicon } from "react-bootstrap";
import scriptLoader from 'react-async-script-loader'
import "./App.css";
import Map from "./components/Map";
import Search from "./components/Search";
import { locations } from "./locations";

const mql = window.matchMedia(`(min-width: 800px)`);
let map = {};
let markersArray = [];

class App extends Component {
  
  state = {
    sidebarDocked: mql.matches,
    sidebarOpen: true,
    markers: []
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
      this.addMarkers();
      this.setState({
        markers: markersArray
      })
    }
  }

  createMap() {
    map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 50.061527, lng: 19.937959},
      zoom: 13,
      mapTypeControl: false
    });
  }

  addMarkers() {
    if (this.state.markers.length > 0) {
      markersArray.forEach((marker) => {
        marker.setMap(null);
      })
      this.createMarkers(this.state.markers);
    }
    else {
      this.createMarkers(locations);
    }
  }

  createMarkers(markersToCreate) {
    for (let i = 0; i < markersToCreate.length; i++) {
      var marker = new window.google.maps.Marker({
        position: locations[i].location,
        map: map,
        title: locations[i].title,
        animation: window.google.maps.Animation.DROP,
        venueId: locations[i].venueId
      });
      this.addInfoWindow(marker);
      markersArray.push(marker);
    }
  }

  addInfoWindow(marker) {
    var infowindow = new window.google.maps.InfoWindow({
      content: marker.title
    });
    marker.addListener('click', function() {
      this.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(() => {
        marker.setAnimation(null);
      }, 900);
      infowindow.open(map, marker);
    });
  }

  updateMarkers(updatedMarkers) {
    this.setState(state => ({
      markers: updatedMarkers
    }))
    this.addMarkers()
  }

  render() {
    return (
      <div className="app">
        <Sidebar
          sidebar={
            <Search 
              markers={ this.state.markers }
              onUpdateMarkers = {(updatedMarkers) => {
                this.updateMarkers(updatedMarkers)
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
