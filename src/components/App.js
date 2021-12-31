import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Signa from "./Signa/Signa";
import "./App.scss";

console.log("App js");

export default () => {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Signa name="newImage" />} />
        </Routes>
      </HashRouter>
    </div>
  );
};
