function createPlayer(name, marker) {
  return { name, marker };
}

const gameboard = (function () {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  const getGameboard = () => gameboard;
  const getSquare = (index) => gameboard[index];
  const setGameboard = (index, marker) => (gameboard[index] = marker);
  return { getGameboard, getSquare, setGameboard };
})();

// Create players
const player1 = createPlayer("john", "X");
const player2 = createPlayer("jane", "O");

let currentPlayer = player1;
let currentPlayerIndex = prompt("Pick index");
if (gameboard.getGameboard()[currentPlayerIndex] !== "") {
  console.log("Square already occupied, pick different index");
}
gameboard.setGameboard(currentPlayerIndex, currentPlayer.marker);

// Game:
// Init: X plays first
// If no empty string elements in array: game over.
// Player: picks index of gameboard array to place their marker
// If index is not empty string (already occupied), player needs to pick new index.
// App checks if there's 3 in a row
// If true: that player wins, else continue
// Return to line 17 but with player 2
