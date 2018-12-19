import React, { Component } from "react";
import Sidebar from "react-sidebar";
import "./App.css";

const mql = window.matchMedia(`(min-width: 800px)`);

class App extends Component {
  state = {
    sidebarDocked: mql.matches,
    sidebarOpen: true
  };

  mediaQueryChanged = this.mediaQueryChanged.bind(this);
  onSetSidebarOpen = this.onSetSidebarOpen.bind(this);

  componentWillMount() {
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

  render() {
    return (
      <div className="app">
        <Sidebar
          sidebar={<b>Sidebar content</b>}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          docked={this.state.sidebarDocked}
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
