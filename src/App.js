/*
 * @project     Data Visulization
 * @author      Faheem Akhtar <faheempiscean@gmail.com>
 * @copyright   Copyright (c)  G42
 * @description Main APP
*/
import React, { Component } from 'react';

import { Graph1, Graph2, Graph3 } from './components/Graphs'
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 0
    }
  }
  renderGraph = (type, props = {}) => {
    switch (type) {
      case 1:
        return <Graph1 {...props} />
      case 2:
        return <Graph2 {...props} />
      case 3:
        return <Graph3 {...props} />
      default:
        return <h1 className="msg">Data Visualization</h1>
    }
  }
  render() {
    const { type } = this.state

    return (
      <div className="app">
        <header className="app-header">
          <button className={`app-button${type === 1 ? ' active' : ''}`} onClick={() => { this.setState({ type: 1 }) }}>T10Y2Y</button>
          <button className={`app-button${type === 2 ? ' active' : ''}`} onClick={() => { this.setState({ type: 2 }) }}>GDPCA</button>
          <button className={`app-button${type === 3 ? ' active' : ''}`} onClick={() => { this.setState({ type: 3 }) }}>DGS10 - T10YIE</button>
        </header>
        <main className="main">{this.renderGraph(type)}</main>
      </div>
    );
  }
}

export default App;
