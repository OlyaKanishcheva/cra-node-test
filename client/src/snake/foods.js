import Food from './food';
import Snake from './snake';

const foodGenerator = (foods = [], ctx) => {
  const maxAmount = 100;
  let diff = maxAmount - foods.length;
  while (diff > 0) {
    const x = Math.random() * 500 >> 0;
    const y = Math.random() * 500 >> 0;
    // const color = '#' + ((1 << 24) * Math.random()|0).toString(16);
    const food = new Food({ x, y, ctx });
    foods.push(food);
    diff--;
  };
};

const findFoodCollisions = (foods, ctx, snake, onCollision) => {
  for (const food of foods) {
    if ((snake.x > food.x - 10 && snake.x < food.x + 10) &&
       (snake.y > food.y - 10 && snake.y < food.y + 10)
      ) {
        food.destroy(ctx);
        foods.splice(foods.indexOf(food), 1);
        snake.length++;
        // changeScore(snake.length - Snake.INITIAL_LENGTH);
        onCollision(snake.length - Snake.INITIAL_LENGTH);
      };
  };
};

// const changeScore = (score) => {
//   console.warn(score);
// };

export { foodGenerator, findFoodCollisions };