import React, { Component } from 'react';
import './Search.css';
import { Debounce } from 'react-throttle';
import escapeRegExp from 'escape-string-regexp';
import { locations } from '../locations';

class Search extends Component {
  state = {
    query: '',
    markers: this.props.markers,
    showingLocations: []
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        markers: this.props.markers
      })
    }, 1000);
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  updateMarkers(showingLocations) {
    setTimeout(() => {
      this.setState({
        markers: showingLocations
      })
    }, 1000);
  }

  render() {
    let { query, markers, showingLocations } = this.state;

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingLocations = markers.filter((location) => match.test(location.title));
      this.updateMarkers(showingLocations);
    }
    else {
      showingLocations = locations;
    }
    
    return (
      <div>
        <div className="search-locations-bar">
          <div className="search-locations-input-wrapper">
            <Debounce time='1000' handler="onChange">
              <input
                type = "text"
                placeholder = "Search location"
                onChange = {(event) => this.updateQuery(event.target.value)}
              />
            </Debounce>
          </div>
        </div>
        <div className="search-results">
          {showingLocations.map((marker) => (
            <li key={marker.venueId} className="search-item">
              <span className="search-item">{marker.title}</span>
            </li>
          ))}
        </div>
      </div>
    );
  }
}

export default Search;