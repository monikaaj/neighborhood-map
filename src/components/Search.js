import React, { Component } from 'react';
import './Search.css';
import { Debounce } from 'react-throttle';
import escapeRegExp from 'escape-string-regexp';

class Search extends Component {
  state = {
    query: '',
    locations: this.props.locations
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.updateLocations();
  }

  clearQuery = () => {
    this.setState({ query: '' }, () => {
      this.updateLocations()
    })
  }

  updateLocations() {
    let { query, showingLocations } = this.state;
    const match = new RegExp(escapeRegExp(query), 'i');
    showingLocations = this.props.allLocations.filter((location) => match.test(location.title));
    setTimeout(() => {
      this.setState({
        locations: showingLocations
      })
    }, 1000);
    if (this.props.onUpdateLocations) {
      this.props.onUpdateLocations(showingLocations)
    }
  }

  onChooseLocation(marker) {
    let showingLocations = this.props.allLocations.filter((location) => marker.title === location.title);
    setTimeout(() => {
      this.setState({
        locations: showingLocations
      })
    }, 1000);
    if (this.props.onUpdateLocations) {
      this.props.onUpdateLocations(showingLocations)
    }
  }

  onClickLocation(location) {
    this.setState({ query: location.title }, () => {
      this.props.onUpdateLocations([location])
    })
  }

  render() {
    let { query } = this.state;

    let showingLocations = [];

    if (query.length > 0) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingLocations = this.props.allLocations.filter((location) => match.test(location.title));
    }
    else {
      console.log(this.props.allLocations)
      showingLocations = this.props.allLocations;
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
          {showingLocations.map((location) => (
            <li key={location.venueId} className="search-item">
              <p 
                className="search-item-name"
                onClick = {() => this.onClickLocation(location)}>
                {location.title}
              </p>
            </li>
          ))}
        </div>
        <div className="button-wrapper">
          <button
            type="button"
            className="btn btn-primary all-locations-button"
            onClick= {() => this.clearQuery()}>
              Show all locations
          </button>
        </div>
      </div>
    );
  }
}

export default Search;