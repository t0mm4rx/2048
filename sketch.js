var grid = [];
const TILE_SIZE = 100,
  MARGIN = 10;

function preload() {}

function setup() {
  createCanvas(450, 450);
  grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  console.table(grid);
}

function draw() {
  background(100);

  /*** Drawing grid ***/
  noStroke();
  for (var x = 0; x < grid.length; x++) {
    for (var y = 0; y < grid[x].length; y++) {
      fill(100, 150, 100);
      rect(x * (MARGIN + TILE_SIZE) + MARGIN, y * (MARGIN + TILE_SIZE) + MARGIN, TILE_SIZE, TILE_SIZE);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(35);
      text(grid[x][y], x * (MARGIN + TILE_SIZE) + MARGIN + TILE_SIZE / 2, y * (MARGIN + TILE_SIZE) + MARGIN + TILE_SIZE / 2);
    }
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
