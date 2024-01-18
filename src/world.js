/**
 *
 * @param {number} width
 * @param {number} height
 * @returns {bool[][]}
 */
const init = (width, height) => {
  const world = [];

  for (let y = 0; y < height; y++) {
    world[y] = [];

    for (let x = 0; x < width; x++) {
      world[y][x] = Math.random() < 0.2;
    }
  }

  return world;
};

/**
 *
 * @param {bool[][]} world
 * @param {number} width
 * @param {number} height
 */
const draw = (world, width, height) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      process.stdout.write(world[y][x] ? "⏹" : " ");
    }
    console.log();
  }
};

/**
 *
 * @param {bool[][]} world
 * @param {number} width
 * @param {number} height
 * @returns {bool[][]}
 */
const evolution = (world, width, height) => {
  const newWorld = [];

  for (let y = 0; y < height; y++) {
    newWorld[y] = [];

    for (let x = 0; x < width; x++) {
      let lives = 0;

      for (let ym = y - 1; ym <= y + 1; ym++) {
        for (let xm = x - 1; xm <= x + 1; xm++) {
          if (ym === y && xm === x) continue;

          if (world[yIndex(height, ym)][xIndex(width, xm)]) {
            lives++;
          }
        }
      }

      newWorld[y][x] = lives === 3 || (lives === 2 && world[y][x]);
    }
  }
  return newWorld;
};

/**
 *
 * @param {number} width
 * @param {number} i
 * @returns {number}
 */
const xIndex = (width, i) => {
  if (i < 0) {
    return width + i;
  } else if (i >= width) {
    return width - i;
  }

  return i;
};

/**
 *
 * @param {number} height
 * @param {number} i
 * @returns {number}
 */
const yIndex = (height, i) => {
  if (i < 0) {
    return height + i;
  } else if (i >= height) {
    return height - i;
  }

  return i;
};

/**
 *
 * @param {number} ms
 * @returns
 */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 *
 * @param {number} width
 * @param {number} height
 */
export const start = async (width, height) => {
  let world = init(width, height);

  while (true) {
    console.log("\x1b[H");

    draw(world, width, height);
    world = evolution(world, width, height);
    await sleep(500);
  }
};
