import React, { Component } from 'react';
import './Search.css';
import { Debounce } from 'react-throttle';
import { locations } from '../locations';

class Search extends Component {
  state = {
    markers: this.props.markers
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        markers: this.props.markers
      })
    }, 1000);
  }

  render() {
    console.log(this.state)
    console.log(this.props)
    const { markers } = this.state;
    return (
      <div>
        <div className="search-locations-bar">
          <div className="search-locations-input-wrapper">
            <Debounce time='1000' handler="onChange">
              <input type="text" placeholder="Search location"
              onChange={(event) => this.updateQuery(event.target.value)}
              />
            </Debounce>
          </div>
        </div>
        <div className="search-results">
          {markers.map((marker) => (
            <li key={marker.id} className="search-item">
              {marker.title}
            </li>
          ))}
        </div>
      </div>
    );
  }
}

export default Search;