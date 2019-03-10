import React, { Component } from 'react';
import './App.css';
import MonsterForm from './monsterForm/monsterForm.js';

class App extends Component {

  render() {
    return (
      <div className='App'>
        <header className='App-header'></header>
        <MonsterForm sendData={(data) => this.addMonster(data)}/>
      </div>
    );
  };
};

export default App;
