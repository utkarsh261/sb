import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Section from "./components/Section";
import { DataProvider } from "./components/Context";

class App extends React.Component {
  render() {
    return (
      <DataProvider>
        <Router>
          <Header />
          <div className="app">
            <Section />
          </div>
          
        </Router>
      </DataProvider>
    );
  }
}

export default App;
