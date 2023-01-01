// Set const to length of row/column of chessboard
const GAMEBOARD = 8;

// Generate all tiles of the board
const generateBoard = (size) => {
  const board = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      board.push(JSON.stringify([i,j]));
    }
  }
  return board;
}

// Get neighbouring nodes to node
const getNeighbours = (str, size) => {
  arr = JSON.parse(str);
  const neighbours = [];
  const valA = arr[0];
  const valB = arr[1];
  // 1,2 , -1,-2 , 2,1 , -2,-1 , 1,-2 , -1, 2, -2, 1 , 2, -1
  // But only if 0 <= nb <= 7
  let j = 2;
  for (let i = 1; i < 3; i++) {
    if (valA + i < size) {
      if (valB + j < size) {
        neighbours.push([valA + i, valB + j]);
      }
      if (valB - j >= 0) {
        neighbours.push([valA + i, valB - j]);
      }
    }
    if (valA - i >= 0) {
      if (valB + j < size) {
        neighbours.push([valA - i, valB + j]);
      }
      if (valB - j >= 0) {
        neighbours.push([valA - i, valB - j]);
      }
    }
    j--;
  }
  return neighbours.map(item => JSON.stringify(item));
}

// Breadth first search through graph until target is found
const bfs = (graph, source, target) => {
  source = JSON.stringify(source);
  target = JSON.stringify(target);
  let distance = new Map();
  distance.set(source, '');
  let queue = [source];
  while (queue.length > 0) {
    const node = queue.shift();
    if (node === target) {
      const path = JSON.parse(`[${distance.get(target)}]`);
      console.log(`You made it in ${path.length} moves!  Here's your path:`);
      path.forEach(element => {
        console.log(element);
      });
      console.log(JSON.parse(target));
      return;
    }
    const neighbours = getNeighbours(node , Math.sqrt(graph.length));
    for (const neighbour of neighbours) {
      if (!distance.has(neighbour)) {
        const comma = distance.get(node)? ',' : '';
        distance.set(neighbour, distance.get(node) + comma + node);
        queue.push(neighbour);
      }
    }
  }
}

// Call function
const board = generateBoard(GAMEBOARD);
bfs(board, [3,3], [0,0]);
