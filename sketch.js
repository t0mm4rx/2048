var grid = [];
var hasChanged = false;
var score = 0, bestScore = 0;

const TILE_SIZE = 100,
  MARGIN = 10;

const dirs = {
  "UP": 1,
  "DOWN": 2,
  "RIGHT": 3,
  "LEFT": 4
};

const colors = [];
colors[0] = [70, 70, 70];
colors[2] = [110, 70, 70];
colors[4] = [140, 80, 80];
colors[8] = [180, 90, 90];
colors[16] = [150, 130, 120];
colors[32] = [130, 150, 140];
colors[64] = [100, 180, 120];
colors[128] = [100, 150, 140];
colors[256] = [100, 130, 180];
colors[512] = [100, 110, 200];
colors[1024] = [100, 140, 200];
colors[2048] = [100, 180, 200];


function preload() {}

function setup() {
  createCanvas(450, 530);
  grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  addTile();
  if (document.cookie) {
      if (document.cookie.split("=")[1]) {
          bestScore = parseInt(document.cookie.split("=")[1]);
          console.log("Best Score : " + bestScore);
      }
  }
}

function draw() {
  background(100);

  /*** Drawing grid ***/
  noStroke();
  for (var x = 0; x < grid.length; x++) {
    for (var y = 0; y < grid[x].length; y++) {
      fill(colors[grid[x][y]]);
      rect(x * (MARGIN + TILE_SIZE) + MARGIN, y * (MARGIN + TILE_SIZE) + MARGIN, TILE_SIZE, TILE_SIZE);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(35);
      text(grid[x][y], x * (MARGIN + TILE_SIZE) + MARGIN + TILE_SIZE / 2, y * (MARGIN + TILE_SIZE) + MARGIN + TILE_SIZE / 2);
    }
  }

  /*** Score ***/
  fill(255);
  textSize(25);
  text("Score : " + score, width / 2, height - 75);
  textSize(20);
  text("Best : " + bestScore, width / 2, height - 55);
  textSize(20);
  text("Press r to restart", width / 2, height - 25);
}

function keyPressed() {
  switch (keyCode) {
    case 38:
      // Haut
      slide(dirs.UP);
      break;
    case 40:
      // Bas
      slide(dirs.DOWN);
      break;
    case 37:
      // Gauche
      slide(dirs.LEFT);
      break;
    case 39:
      // Droite
      slide(dirs.RIGHT);
      break;
    case 82:
      grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      score = 0;
      addTile();
      break;
  }
}

function addTile() {
  var aval = [];
  for (var x = 0; x < grid.length; x++) {
    for (var y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === 0) {
        aval.push({
          x: x,
          y: y
        });
      }
    }
  }
  if (aval.length > 0) {
    let sel = random(aval);
    grid[sel.x][sel.y] = (random() > 0.5 ? 2 : 4);
  }

}

function slide(dir) {
  if (dir === dirs.RIGHT) {
    shiftRight();
    combineRight();
    shiftRight();
    shiftRight();
    shiftRight();
    if (hasChanged)
      addTile();
    hasChanged = false;
  }
  if (dir === dirs.LEFT) {
    shiftLeft();
    combineLeft();
    shiftLeft();
    shiftLeft();
    shiftLeft();
    if (hasChanged)
      addTile();
    hasChanged = false;
  }
  if (dir === dirs.UP) {
    shiftUp();
    combineUp();
    shiftUp();
    shiftUp();
    shiftUp();
    if (hasChanged)
      addTile();
    hasChanged = false;
  }
  if (dir === dirs.DOWN) {
    shiftDown();
    combineDown();
    shiftDown();
    shiftDown();
    shiftDown();
    if (hasChanged)
      addTile();
    hasChanged = false;
  }
}

function combineDown() {
  for (var y = 0; y < grid.length; y++) {
    for (var x = 0; x < grid.length; x++) {
      if (grid[x][y]) {
        if (typeof grid[x][y + 1] !== 'undefined') {
          if (grid[x][y + 1] === grid[x][y]) {
            grid[x][y] = grid[x][y] * 2;
            grid[x][y + 1] = 0;
            score += grid[x][y] * 2;
            if (score > bestScore) {
              document.cookie = "record=" + score;
              bestScore = score;
            }
          }
        }
      }
    }
  }
}

function shiftDown() {
  for (var y = 0; y < grid.length; y++) {
    for (var x = 0; x < grid.length; x++) {
      if (grid[x][y]) {
        if (typeof grid[x][y + 1] !== 'undefined') {
          if (grid[x][y + 1] === 0) {
            grid[x][y + 1] = grid[x][y];
            grid[x][y] = 0;
            hasChanged = true;
          }
        }
      }
    }
  }
}

function combineUp() {
  for (var y = grid.length - 1; y > 0; y--) {
    for (var x = 0; x < grid.length; x++) {
      if (grid[x][y]) {
        if (typeof grid[x][y - 1] !== 'undefined') {
          if (grid[x][y - 1] === grid[x][y]) {
            grid[x][y] = grid[x][y] * 2;
            grid[x][y - 1] = 0;
            score += grid[x][y] * 2;
            if (score > bestScore) {
              document.cookie = "record=" + score;
              bestScore = score;
            }
          }
        }
      }
    }
  }
}

function shiftUp() {
  for (var y = 0; y < grid.length; y++) {
    for (var x = 0; x < grid.length; x++) {
      if (grid[x][y]) {
        if (typeof grid[x][y - 1] !== 'undefined') {
          if (grid[x][y - 1] === 0) {
            grid[x][y - 1] = grid[x][y];
            grid[x][y] = 0;
            hasChanged = true;
          }
        }
      }
    }
  }
}

function shiftLeft() {
  for (var y = 0; y < grid.length; y++) {
    for (var x = grid.length - 1; x > 0; x--) {
      if (grid[x][y]) {
        if (typeof grid[x - 1] !== 'undefined') {
          if (grid[x - 1][y] === 0) {
            grid[x - 1][y] = grid[x][y];
            grid[x][y] = 0;
            hasChanged = true;
          }
        }
      }
    }
  }
}

function combineLeft() {
  for (var y = 0; y < grid.length; y++) {
    for (var x = 0; x < grid.length; x++) {
      if (grid[x][y]) {
        if (typeof grid[x + 1] !== 'undefined') {
          if (grid[x + 1][y] === grid[x][y]) {
            grid[x][y] = grid[x][y] * 2;
            grid[x + 1][y] = 0;
            score += grid[x][y] * 2;
            if (score > bestScore) {
              document.cookie = "record=" + score;
              bestScore = score;
            }
          }
        }
      }
    }
  }
}

function shiftRight() {
  for (var y = 0; y < grid.length; y++) {
    for (var x = 0; x < grid.length; x++) {
      if (grid[x][y]) {
        if (typeof grid[x + 1] !== 'undefined') {
          if (grid[x + 1][y] === 0) {
            grid[x + 1][y] = grid[x][y];
            grid[x][y] = 0;
            hasChanged = true;
          }
        }
      }
    }
  }
}

function combineRight() {
  for (var y = 0; y < grid.length; y++) {
    for (var x = grid.length - 1; x > 0; x--) {
      if (grid[x][y]) {
        if (typeof grid[x - 1] !== 'undefined') {
          if (grid[x - 1][y] === grid[x][y]) {
            grid[x][y] = grid[x][y] * 2;
            grid[x - 1][y] = 0;
            score += grid[x][y] * 2;
            if (score > bestScore) {
              document.cookie = "record=" + score;
              bestScore = score;
            }
          }
        }
      }
    }
  }
}
