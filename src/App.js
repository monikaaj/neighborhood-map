import React, { Component } from "react";
import Sidebar from "react-sidebar";
import "./App.css";

class App extends Component {
  state = {
    sidebarOpen: true
  };

  onSetSidebarOpen = this.onSetSidebarOpen.bind(this);

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    return (
      <div className="app">
        <Sidebar
          sidebar={<b>Sidebar content</b>}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white" } }}
        >
          <button onClick={() => this.onSetSidebarOpen(true)}>
            Open sidebar
          </button>
        </Sidebar>
      </div>
    );
  }
}

export default App;
