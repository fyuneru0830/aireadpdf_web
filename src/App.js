import React from 'react';
import Upload from './components/upload';
import Page from './components/page';
import Contents from './components/contents';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="left-panel">
        <Upload />
      </div>
      <div className="center-panel">
        <Page />
      </div>
      <div className="right-panel">
        <Contents />
      </div>
    </div>
  );
}

export default App;