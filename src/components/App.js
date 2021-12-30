import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signa from "./Signa/Signa";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Signa name="newImage" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
