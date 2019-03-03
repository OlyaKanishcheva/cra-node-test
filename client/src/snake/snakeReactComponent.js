import React, { Component } from 'react';
import Snake from './snake.js';
import './snake.css';
import { foodGenerator, findFoodCollisions } from './foodGenerator';

class SnakeReactComponent extends Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
  };

  componentDidMount() {
    this.game = null;
  };

  startGame() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const game = { ctx };

    game.snake = new Snake({
      x: 100,
      y: 100,
      angle: 0,
      length: Snake.INITIAL_LENGTH,
      game: game,
    });

    game.foods = [];

    document.addEventListener('keydown', game.snake.directionControl.bind(game.snake));

    this.game = game;
    this.run(game);
  };

  run(game) {
    const { snake, ctx, foods } = game;
    const canvasSize = {
      mapW: 500,
      mapH: 500,
    };

    foodGenerator(foods, ctx);
    game.snakeInterval = setInterval(snake.running, 30, canvasSize, snake);
    game.foodInterval = setInterval(findFoodCollisions, 30, foods, ctx, snake);
  };

  stopGame() {
    const { game } = this;
    const { snake } = game;

    document.removeEventListener('keydown', snake.directionControl.bind(snake));

    snake.finishGame();
  };

  render() {
    return (
      <div className='snake__wrapper'>
        <div className='snake__header'>
          <div className='snake__btn-wrapper'>
            <button className='snake__btn' onClick={this.startGame}>Start</button>
            <button className='snake__btn' onClick={this.stopGame}>Stop</button>
          </div>
          <div className='snake__score'>Length: 0</div>
        </div>
        <canvas 
          ref='canvas' 
          className='snake__map' 
          id='snake__map' 
          width='500' 
          height='500'>
        </canvas>
      </div>
    );
  };
};

export default SnakeReactComponent;