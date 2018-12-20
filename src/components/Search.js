import React, { Component } from 'react';
import './Search.css';
import { Debounce } from 'react-throttle';
import { locations } from '../locations';

class Search extends Component {
  state = {
    markers: []
  }

  componentWillMount() {
    this.setState({
      markers: this.props.markers
    })
  }

  render() {
    console.log(this.props);
    console.log(this.state.markers)
    return (
      <div className="search-locations-bar">
        <div className="search-locations-input-wrapper">
          <Debounce time='1000' handler="onChange">
            <input type="text" placeholder="Search location"
            onChange={(event) => this.updateQuery(event.target.value)}
            />
          </Debounce>
        </div>
      </div>
    );
  }
}

export default Search;