class Cell {
  constructor() {
    this._marker = "";
  }
  getMarker() {
    return this._marker;
  }
  setMarker(marker) {
    this._marker = marker;
  }
}

class Grid {
  constructor() {
    this._grid = Array.from({ length: 9 }, () => new Cell());
  }
  getGrid() {
    return this._grid;
  }
  getCell(index) {
    return this.getGrid()[index];
  }
  setGrid(index, marker) {
    this._grid[index].setMarker(marker);
  }
}

class Player {
  constructor(name, marker) {
    this._name = name;
    this._marker = marker;
  }
  getName() {
    return this._name;
  }
  setName(name) {
    this._name = name;
  }
  getMarker() {
    return this._marker;
  }
  setMarker(marker) {
    this._marker = marker;
  }
}

class View {
  // controlling the view (html)
  constructor() {
    this._grid = document.querySelector(".grid");
    this._player = document.querySelector(".player");
  }
  getGrid() {
    return this._grid;
  }
  resetGrid() {
    this._grid.innerHTML = "";
  }
  renderGrid(grid) {
    this.resetGrid();
    const cells = grid.getGrid();
    cells.forEach((cell, index) => {
      const cellDiv = document.createElement("div");
      const cellMarker = document.createTextNode(cell.getMarker());
      cellDiv.append(cellMarker);
      cellDiv.dataset.index = index;
      cellDiv.addEventListener("click", (e) => {
        if (!game.isRunning()) {
          return;
        }
        game.handleClick(+e.target.dataset.index, grid);
        this.renderGrid(grid);
      });
      this._grid.appendChild(cellDiv);
    });
  }
  setCurrentPlayer(player) {
    this._player.querySelector(".player__name").innerText = player.getName();
  }
}

class Game {
  constructor() {
    this._grid = new Grid();
    this._view = new View();
    this._player1 = new Player("john", "X");
    this._player2 = new Player("jane", "O");
    this._currentPlayer = null;
    this._isRunning = false;
  }
  run() {
    this._isRunning = true;
    this._currentPlayer = this._player1;
    this._view.renderGrid(this._grid);
    this._view.setCurrentPlayer(this._currentPlayer);
  }
  handleClick(index, grid) {
    // if cell is already marked
    if (grid.getCell(index).getMarker() !== "") {
      console.log("Cell occupied.");
      return;
    }

    // set grid
    grid.setGrid(index, this._currentPlayer.getMarker());

    // check for win
    if (this.checkForWin(index)) {
      console.log(this._currentPlayer.getName(), "wins!");
      this.quit();
      return;
    }

    // if no more empty cells
    if (!this.checkEmptyCells()) {
      this.quit();
      console.log("no more empty cells, it's a tie");
    }

    // change current player
    this.changeCurrentPlayer();
  }
  checkForWin(index) {
    // check horizontal
    if (index <= 2) {
      const row = this._grid.getGrid().slice(0, 3);
      const rowMarkers = row.map((cell) => cell.getMarker());
      if (new Set(rowMarkers).size === 1) return true;
    } else if (index > 2 && index <= 5) {
      const row = this._grid.getGrid().slice(3, 6);
      const rowMarkers = row.map((cell) => cell.getMarker());
      if (new Set(rowMarkers).size === 1) return true;
    } else {
      const row = this._grid.getGrid().slice(6, 9);
      const rowMarkers = row.map((cell) => cell.getMarker());
      if (new Set(rowMarkers).size === 1) return true;
    }

    // check vertical
    if (index <= 2) {
      const first = this._grid.getCell(index).getMarker();
      const second = this._grid.getCell(index + 3).getMarker();
      const third = this._grid.getCell(index + 6).getMarker();
      const columnMarkers = [first, second, third];
      if (new Set(columnMarkers).size === 1) return true;
    } else if (index > 2 && index <= 5) {
      const first = this._grid.getCell(index - 3).getMarker();
      const second = this._grid.getCell(index).getMarker();
      const third = this._grid.getCell(index + 3).getMarker();
      const columnMarkers = [first, second, third];
      if (new Set(columnMarkers).size === 1) return true;
    } else {
      const first = this._grid.getCell(index - 6).getMarker();
      const second = this._grid.getCell(index - 3).getMarker();
      const third = this._grid.getCell(index).getMarker();
      const columnMarkers = [first, second, third];
      if (new Set(columnMarkers).size === 1) return true;
    }

    // check diagonal (if index is either 0, 2, 4, 6, 8)
    if (index === 0 || index === 8) {
      // top left to bottom right diag
      const topLeftToBottomRight = [
        this._grid.getCell(0),
        this._grid.getCell(4),
        this._grid.getCell(8),
      ];
      const diagonalMarkers = topLeftToBottomRight.map((cell) =>
        cell.getMarker()
      );
      if (new Set(diagonalMarkers).size === 1) return true;
    } else if (index === 2 || index === 6) {
      // top right to bottom left diag
      const topRightToBottomLeft = [
        this._grid.getCell(2),
        this._grid.getCell(4),
        this._grid.getCell(6),
      ];
      const diagonalMarkers = topRightToBottomLeft.map((cell) =>
        cell.getMarker()
      );
      if (new Set(diagonalMarkers).size === 1) return true;
    } else if (index === 4) {
      const topLeftToBottomRight = [
        this._grid.getCell(0),
        this._grid.getCell(4),
        this._grid.getCell(8),
      ];
      const diagonalMarkers = topLeftToBottomRight.map((cell) =>
        cell.getMarker()
      );
      if (new Set(diagonalMarkers).size === 1) return true;
      const topRightToBottomLeft = [
        this._grid.getCell(2),
        this._grid.getCell(4),
        this._grid.getCell(6),
      ];
      const diagonalMarkers2 = topRightToBottomLeft.map((cell) =>
        cell.getMarker()
      );
      if (new Set(diagonalMarkers2).size === 1) return true;
    }
    return false;
  }
  checkEmptyCells() {
    for (let cell of this._grid.getGrid()) {
      const marker = cell.getMarker();
      if (marker === "") {
        return true;
      }
    }
    return false;
  }
  changeCurrentPlayer() {
    this._currentPlayer =
      this._currentPlayer === this._player1 ? this._player2 : this._player1;
    this._view.setCurrentPlayer(this._currentPlayer);
  }
  quit() {
    this._isRunning = false;
  }
  isRunning() {
    return this._isRunning;
  }
}

class GameControls {
  constructor() {
    this._startButton = document.querySelector(".start-button");
    // this._players =
  }
}

// init
let game;
// const view = new View

const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", (e) => {
  game = null;
  game = new Game();
  game.run();
  e.target.innerText = "Restart";
});
