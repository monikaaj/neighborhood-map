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
      this.getInfoWindowsData();
      this.createMap();
      this.addMarkers();
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
       /*fetch(`https://api.foursquare.com/v2/venues/${location.venueId}` +
          `?client_id=CKNFO3V2Y12VDYZIIKOBW4ZJGL1H515OIDTJUS3HNAD5LSVQ` +
          `&client_secret=LQSLIUGCUU2NT32QN3SR4NWCKM40IA4GN5BOJF1YYHPFRJLI` +
          `&v=20180323`)
          .then(response => response.json())
          .then(data => {
            if (data.meta.code === 200) {
              // location.venueDetails = data;
              console.log(data)
            }
          }).catch(error => {
            console.log(error);
          }) */

          var data = '{"meta":{"code":200,"requestId":"5c1e590e6a607133fad2a30a"},"response":{"venue":{"id":"4bdab8ca2a3a0f478ec4abb6","name":"Błonia","contact":{},"location":{"address":"Błonia","lat":50.05942559167404,"lng":19.908814430236816,"labeledLatLngs":[{"label":"display","lat":50.05942559167404,"lng":19.908814430236816}],"cc":"PL","city":"Krakow","state":"Województwo Małopolskie","country":"Poland","formattedAddress":["Błonia","Krakow","Poland"]},"canonicalUrl":"https://foursquare.com/v/b%C5%82onia/4bdab8ca2a3a0f478ec4abb6","categories":[{"id":"4bf58dd8d48988d163941735","name":"Park","pluralName":"Parks","shortName":"Park","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/parks_outdoors/park_","suffix":".png"},"primary":true},{"id":"4bf58dd8d48988d15f941735","name":"Field","pluralName":"Fields","shortName":"Field","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/parks_outdoors/field_","suffix":".png"}},{"id":"4bf58dd8d48988d1e5941735","name":"Dog Run","pluralName":"Dog Runs","shortName":"Dog Run","icon":{"prefix":"https://ss3.4sqi.net/img/categories_v2/parks_outdoors/dogrun_","suffix":".png"}}],"verified":false,"stats":{"tipCount":17,"usersCount":0,"checkinsCount":0,"visitsCount":0},"likes":{"count":153,"groups":[{"type":"others","count":153,"items":[]}],"summary":"153 Likes"},"dislike":false,"ok":false,"rating":9.2,"ratingColor":"00B551","ratingSignals":168,"beenHere":{"count":0,"unconfirmedCount":0,"marked":false,"lastCheckinExpiredAt":0},"specials":{"count":0,"items":[]},"photos":{"count":312,"groups":[{"type":"checkin","name":"Friends\' check-in photos","count":0,"items":[]},{"type":"venue","name":"Venue photos","count":312,"items":[{"id":"50200b70e4b0a8e47160bd26","createdAt":1344277360,"source":{"name":"Foursquare for Android","url":"https://foursquare.com/download/#/android"},"prefix":"https://fastly.4sqi.net/img/general/","suffix":"/o4MSMrooLg454C9x4uDh-1DmKmOK9XercTr8GhB1Q0g.jpg","width":720,"height":540,"user":{"id":"31139367","firstName":"Arek","lastName":"Smyk","gender":"male","photo":{"prefix":"https://fastly.4sqi.net/img/user/","suffix":"/blank_boy.png","default":true}},"visibility":"public"},{"id":"4fd0d37ee4b02717460f372d","createdAt":1339085694,"source":{"name":"Foursquare for iOS","url":"https://foursquare.com/download/#/iphone"},"prefix":"https://fastly.4sqi.net/img/general/","suffix":"/eV385_RnAu5FP6bjf2cE3QfTQvn90nFWkcE9Be4-hCQ.jpg","width":720,"height":537,"user":{"id":"5101301","firstName":"👑 Wojtek","lastName":"Zajac","gender":"male","photo":{"prefix":"https://fastly.4sqi.net/img/user/","suffix":"/5101301-NQYZRML4QVFHG5IP.jpg"}},"visibility":"public"}]}],"summary":"0 photos"},"reasons":{"count":1,"items":[{"summary":"Lots of people like this place","type":"general","reasonName":"rawLikesReason"}]},"hereNow":{"count":0,"summary":"Nobody here","groups":[]},"createdAt":1272625354,"tips":{"count":17,"groups":[{"type":"others","name":"All tips","count":17,"items":[{"id":"51c353fd498ef304c2331345","createdAt":1371755517,"text":"Czwartki motoryzacyjne są spoko :)","type":"user","canonicalUrl":"https://foursquare.com/item/51c353fd498ef304c2331345","lang":"pl","likes":{"count":1,"groups":[{"type":"others","count":1,"items":[{"id":"56950233","firstName":"Marcus","lastName":"Fuchs","gender":"male","photo":{"prefix":"https://fastly.4sqi.net/img/user/","suffix":"/56950233_-La0iLpd_jN0ZrAxXM6QNZBg1H2eYx7AhDfPSEXiCupXH-xrcVXWJpKsdT2OF2th1LLgswE6k.jpg"}}]}],"summary":"1 like"},"logView":true,"agreeCount":1,"disagreeCount":0,"todo":{"count":0},"user":{"id":"49356121","firstName":"Agnieszka","lastName":"Wanat","gender":"female","photo":{"prefix":"https://fastly.4sqi.net/img/user/","suffix":"/YXBIGM5C1COBII1F.jpg"}}},{"id":"4fc4b1e9e4b02051856d6eb2","createdAt":1338290665,"text":"Można się poopalać :-)","type":"user","canonicalUrl":"https://foursquare.com/item/4fc4b1e9e4b02051856d6eb2","lang":"pl","likes":{"count":1,"groups":[{"type":"others","count":1,"items":[{"id":"59736750","firstName":"Maciek","lastName":"Frej","gender":"none","photo":{"prefix":"https://fastly.4sqi.net/img/user/","suffix":"/G4AWC3COM24MEUI5.jpg"}}]}],"summary":"1 like"},"logView":true,"agreeCount":1,"disagreeCount":0,"todo":{"count":0},"user":{"id":"28665102","firstName":"Szymon","lastName":"Frączek","gender":"male","photo":{"prefix":"https://fastly.4sqi.net/img/user/","suffix":"/28665102-ZTDS33ANWEWUPG4E.jpg"}}}]}]},"shortUrl":"http://4sq.com/c6Z3HY","timeZone":"Europe/Warsaw","listed":{"count":74,"groups":[{"type":"others","name":"Lists from other people","count":74,"items":[{"id":"5079693ce4b01b417a04cbdd","name":"Krakow","description":"","type":"others","user":{"id":"38206406","firstName":"Ihor","lastName":"Hlubochenko","gender":"male","photo":{"prefix":"https://fastly.4sqi.net/img/user/","suffix":"/CEXDHNNYRNG0XHJG.jpg"}},"editable":false,"public":true,"collaborative":false,"url":"/lardaddict/list/krakow","canonicalUrl":"https://foursquare.com/lardaddict/list/krakow","createdAt":1350134076,"updatedAt":1391278621,"followers":{"count":2},"listItems":{"count":56,"items":[{"id":"v4bdab8ca2a3a0f478ec4abb6","createdAt":1350638164}]}},{"id":"53d2760611d2bd0c871c8199","name":"Must-visit Outdoors & Recreation in Kraków","description":"","type":"others","user":{"id":"61706243","firstName":"Mary","lastName":"🍒","gender":"female","photo":{"prefix":"https://fastly.4sqi.net/img/user/","suffix":"/61706243_Z4Phr2AQ_VR_8SaO7RH_oGMhaKl27j2GswKOuqCtKmEjl3eDJ6h9Ps5fYEPp3yCLJPqa1IwVU.jpg"}},"editable":false,"public":true,"collaborative":false,"url":"/user/61706243/list/mustvisit-outdoors--recreation-in-krak%C3%B3w","canonicalUrl":"https://foursquare.com/user/61706243/list/mustvisit-outdoors--recreation-in-krak%C3%B3w","createdAt":1406301702,"updatedAt":1509715343,"photo":{"id":"53ce55ff498eaf2e117b8f68","createdAt":1406031359,"prefix":"https://fastly.4sqi.net/img/general/","suffix":"/68567793_GdhWc7r0RFlQUniBvLAkLlZipuY62rq4SAQCsaG_Xcg.jpg","width":720,"height":960,"user":{"id":"68567793","firstName":"asia 👸🏼","gender":"female","photo":{"prefix":"https://fastly.4sqi.net/img/user/","suffix":"/68567793_JZbqu14N_kIIvEv4xk1oObnH1YhC4UbUtZZy4Xlzx5_8TcJZn1Ud56ZxH2efIxD0PZeSOlCFH.jpg"}},"visibility":"public"},"followers":{"count":7},"listItems":{"count":26,"items":[{"id":"t5372467211d26dd2ea5c11ba","createdAt":1406301702,"photo":{"id":"539738cc498e8a9119d437f9","createdAt":1402419404,"prefix":"https://fastly.4sqi.net/img/general/","suffix":"/39006283_z18AKM5aUsvivOrHa_rVJeDglWytsLxHOvMzvXKkOgU.jpg","width":540,"height":960,"user":{"id":"39006283","firstName":"Szymon","lastName":"Wojtyra","gender":"male","photo":{"prefix":"https://fastly.4sqi.net/img/user/","suffix":"/39006283-XXOXGSPUWI3QU2JA.jpg"}},"visibility":"public"}}]}},{"id":"518a20a4498e06871412b0c2","name":"Kraków","description":"","type":"others","user":{"id":"1340350","firstName":"Alp","gender":"male","photo":{"prefix":"https://fastly.4sqi.net/img/user/","suffix":"/LHVOQONQVB3FN0I2.jpg"}},"editable":false,"public":true,"collaborative":false,"url":"/user/1340350/list/krak%C3%B3w","canonicalUrl":"https://foursquare.com/user/1340350/list/krak%C3%B3w","createdAt":1368006820,"updatedAt":1379085931,"followers":{"count":2},"listItems":{"count":25,"items":[{"id":"v4bdab8ca2a3a0f478ec4abb6","createdAt":1379085931}]}},{"id":"4fd1215fe4b0b5fdab7d8132","name":"miejsca krakow","description":"","type":"others","user":{"id":"29568413","firstName":"Piotr","lastName":"J.","gender":"male","photo":{"prefix":"https://fastly.4sqi.net/img/user/","suffix":"/29568413-3VM5NBB0UBFLJ5DS.jpg"}},"editable":false,"public":true,"collaborative":false,"url":"/user/29568413/list/miejsca-krakow","canonicalUrl":"https://foursquare.com/user/29568413/list/miejsca-krakow","createdAt":1339105631,"updatedAt":1405785909,"followers":{"count":4},"listItems":{"count":43,"items":[{"id":"v4bdab8ca2a3a0f478ec4abb6","createdAt":1339111182}]}}]}]},"popular":{"status":"Likely open","richStatus":{"entities":[],"text":"Likely open"},"isOpen":true,"isLocalHoliday":false,"timeframes":[{"days":"Today","includesToday":true,"open":[{"renderedTime":"9:00 AM–9:00 PM"}],"segments":[]},{"days":"Sun","open":[{"renderedTime":"10:00 AM–9:00 PM"}],"segments":[]},{"days":"Mon","open":[{"renderedTime":"3:00 PM–9:00 PM"}],"segments":[]},{"days":"Tue","open":[{"renderedTime":"3:00 PM–10:00 PM"}],"segments":[]},{"days":"Wed","open":[{"renderedTime":"5:00 PM–10:00 PM"}],"segments":[]},{"days":"Thu","open":[{"renderedTime":"2:00 PM–10:00 PM"}],"segments":[]},{"days":"Fri","open":[{"renderedTime":"3:00 PM–10:00 PM"}],"segments":[]}]},"pageUpdates":{"count":0,"items":[]},"inbox":{"count":0,"items":[]},"venueChains":[],"attributes":{"groups":[{"type":"payments","name":"Credit Cards","summary":"No Credit Cards","count":5,"items":[{"displayName":"Credit Cards","displayValue":"No"}]}]},"bestPhoto":{"id":"50200b70e4b0a8e47160bd26","createdAt":1344277360,"source":{"name":"Foursquare for Android","url":"https://foursquare.com/download/#/android"},"prefix":"https://fastly.4sqi.net/img/general/","suffix":"/o4MSMrooLg454C9x4uDh-1DmKmOK9XercTr8GhB1Q0g.jpg","width":720,"height":540,"visibility":"public"},"colors":{"highlightColor":{"photoId":"50200b70e4b0a8e47160bd26","value":-8353656},"highlightTextColor":{"photoId":"50200b70e4b0a8e47160bd26","value":-16777216},"algoVersion":3}}}}';
          data = JSON.parse(data);

        //assign data from 3rd part API to imported locations
        location.venueDetails = data.response;
        
    })
    this.setState({
      allLocations: locationsData
    }, () => {
      console.log(this.state.allLocations)
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
    }, () => {
      console.log(markersArray)
      console.log(this.state.markers)
    });
  }

  addInfoWindow(marker) {
    console.log(marker)
    const infowindowContent = `<div>
      <h4>${marker.title}</h4>
      <p>${marker.venueDetails.venue.location.city}, ${marker.venueDetails.venue.location.state}, ${marker.venueDetails.venue.location.country}</p>
      <img src=${marker.venueDetails.venue.bestPhoto} width="300" />
      <p>${marker.venueDetails.venue.rating}</p>
      <p>${marker.venueDetails.venue.likes.count}</p>
      <a href="${marker.venueDetails.venue.moreInfo}" target="_blank">More details</a>
    </div>`
    var infowindow = new window.google.maps.InfoWindow({
      content: infowindowContent
    });
    marker.addListener('click', function() {
      this.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(() => {
        marker.setAnimation(null);
      }, 900);
      infowindow.open(map, marker);
    });
  }

  updateLocations(updatedLocations) {
    this.setState({
      locations: updatedLocations
    })
    this.addMarkers();
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
