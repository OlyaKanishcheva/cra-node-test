import {degToRad} from './helper'

class Snake {
  constructor({x, y, angle, length, game}) {
    this.color = '#000'
    this.x = x
    this.y = y
    this.angle = angle
    this.length = length
    this.game = game
    this.ctx = game.ctx
    this.coordinates = []
  }

  draw() {
    const {ctx, color, x, y} = this
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(x, y, Snake.HEAD_RADIUS, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
  }

  running(canvasSize, that) {
    const radian = degToRad(that.angle)
    that.x += Snake.SPEED * Math.cos(radian)
    that.y += Snake.SPEED * Math.sin(radian)
    that.validationCoordinates(canvasSize)
    that.pushCoordinates()
    that.draw()
    that.findSnakeCollision()
  }

  validationCoordinates({mapW, mapH}) {
    const {x, y, finishGame} = this
    if (
      (x < 0) || (x > mapW) ||
      (y < 0) || (y > mapH)
    ) {
      // finishGame()
    }
  }

  pushCoordinates() {
    const {coordinates, x, y} = this
    coordinates.push({x, y})
    this.lengthControl()
  }

  lengthControl() {
    const {coordinates, length, ctx} = this
    if (coordinates.length > length) {
      const {x, y} = coordinates[0]
      ctx.beginPath()
      ctx.fillStyle = '#124'
      ctx.arc(x, y, Snake.HEAD_RADIUS + 2, 0, 2 * Math.PI)
      ctx.fill()
      ctx.closePath()
      this.coordinates.shift()
    }
  }

  findSnakeCollision() {
    this.coordinates.slice(0, Snake.HEAD_RADIUS).forEach(({x, y}) => {
      const distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2)
      if (distance < Snake.HEAD_RADIUS + 2) {
        // this.finishGame()
      }
    })
  }

  directionControl(e) {
    const {game} = this 
    if (game.finished) return
    switch(e.keyCode) {
      case 37: {
        this.turnLeft()
        break
      }
      case 39: {
        this.turnRight()
        break
      }
      default: {

      }
    }
  }

  turnLeft() {
    this.angle -= Snake.ROTATION_SPEED
    this.move(true)
  }

  turnRight() {
    this.angle += Snake.ROTATION_SPEED
    this.move(true)
  }

  move(rotate = false) {
    const koef = rotate ? 0.8 : 1
    const radian = degToRad(this.angle)
    this.x += koef * Snake.SPEED * Math.cos(radian)
    this.y += koef * Snake.SPEED * Math.sin(radian)
    this.pushCoordinates()
    this.draw()
  }

}

Snake.HEAD_RADIUS = 5
Snake.SPEED = 2
Snake.INITIAL_LENGTH = 150
Snake.ROTATION_SPEED = 5

export default Snake