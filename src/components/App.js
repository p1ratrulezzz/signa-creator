import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Signa } from './Signa/Signa';
import './index.scss';

export default ({ version }) => {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Signa name="newImage" />} />
        </Routes>
      </HashRouter>
      <div className="app-version">{version}</div>
    </div>
  );
};
