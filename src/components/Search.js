import React, { Component } from 'react';
import './Search.css';
import { Debounce } from "react-throttle";

class Search extends Component {
  render() {
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