import React, { Component } from 'react';
import './App.css';
import MonsterForm from './monsterForm/monsterForm.js';
import SnakeReactComponent from './snake/snakeReactComponent.js';

class App extends Component {

  render() {
    // return (
    //   <div className='App'>
    //     <header className='App-header'></header>
    //     <MonsterForm sendData={(data) => this.addMonster(data)}/>
    //   </div>
    // );
    return (
      <div className='App'>
        <header className='App-header'></header>
        <main className='App-main'>
          <SnakeReactComponent />
          <MonsterForm sendData={() => {}}/>
        </main>
      </div>
    );
  };
};

export default App;
