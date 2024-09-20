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
    this._grid = null;
    // this._player = document.querySelector(".player");
    this._mainContainer = document.querySelector("main");
  }
  getGrid() {
    return this._grid;
  }
  resetGrid() {
    this._grid.innerHTML = "";
  }
  renderGrid() {
    if (this._grid) {
      this.resetGrid();
    } else {
      const gridDiv = document.createElement("div");
      gridDiv.classList.add("grid");
      this._mainContainer.appendChild(gridDiv);
      this._grid = document.querySelector(".grid");
    }
    const cells = game._grid.getGrid();
    cells.forEach((cell, index) => {
      const cellDiv = document.createElement("div");
      const cellMarker = document.createTextNode(cell.getMarker());
      cellDiv.append(cellMarker);
      cellDiv.dataset.index = index;
      cellDiv.addEventListener("click", (e) => {
        if (!game.isRunning()) {
          return;
        }
        game.handleClick(+e.target.dataset.index);
        this.renderGrid();
      });
      this._grid.appendChild(cellDiv);
    });
  }
  // setCurrentPlayer(player) {
  //   this._player.querySelector(".player__name").innerText = player.getName();
  // }
  resetMain() {
    this._mainContainer.innerHTML = "";
  }
  renderEnterPlayers(player = "Player 1") {
    this._mainContainer.innerHTML = `
    <div class="enter-player">
        <p class="enter-player-title">${player}</p>
        <form id="enterPlayerForm" method="post">
          <label
            >Name
            <input type="text" name="name" id="name" minlength="1" required />
          </label>
          <div class="form-buttons">
            <button value="back" type="reset">Back</button>
            <button value="okay" disabled>Okay</button>
          </div>
        </form>
      </div>
    `;
    const nameInput = document.querySelector('input[name="name"]');
    const backButton = document.querySelector('button[value="back"]');
    const okaykButton = document.querySelector('button[value="okay"]');
    nameInput.addEventListener("keyup", (e) => {
      if (e.target.value !== "") {
        okaykButton.disabled = false;
      } else {
        okaykButton.disabled = true;
      }
    });

    backButton.addEventListener("click", () => {
      this.resetMain();
      if (player === "Player 2") {
        return this.renderEnterPlayers("Player 1");
      } else {
        return this.renderMainMenu();
      }
    });

    okaykButton.addEventListener("click", (e) => {
      e.preventDefault();
      const form = document.forms.enterPlayerForm;
      const formData = new FormData(form);
      game._player1.setName(formData.get("name"));

      this.resetMain();

      if (player === "Player 2") {
        // go to actual game state
        game.run();
        return;
      } else {
        return this.renderEnterPlayers("Player 2");
      }
    });
  }
  renderMainMenu() {
    this._mainContainer.innerHTML = `
    <div class="main-menu">
        <button disabled>Singleplayer (vs AI)</button>
        <button value="localMultiplayer">Local Multiplayer</button>
        <button disabled>Online Multiplayer</button>
        <div class="extra-buttons">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4"
              />
              <path d="M12 19l0 .01" />
            </svg>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
              />
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
            </svg>
          </button>
        </div>
      </div>
    `;
    const localMultiplayerButton = document.querySelector(
      'button[value="localMultiplayer"]'
    );
    localMultiplayerButton.addEventListener("click", () => {
      this.resetMain();
      this.renderEnterPlayers();
    });
  }
}

class Game {
  constructor() {
    this._grid = new Grid();
    this._view = new View();
    this._player1 = new Player("john", "X");
    this._player2 = new Player("jane", "O");
    this._currentPlayer = this._player1;
    this._isRunning = false;
  }
  run() {
    this._isRunning = true;
    this._currentPlayer = this._player1;
    this._view.renderGrid();
  }
  handleClick(index) {
    // if cell is already marked
    if (this._grid.getCell(index).getMarker() !== "") {
      console.log("Cell occupied.");
      return;
    }

    // set grid
    this._grid.setGrid(index, this._currentPlayer.getMarker());

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
    // this._view.setCurrentPlayer(this._currentPlayer);
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
// let game;

const game = new Game();
const view = new View();
view.renderMainMenu();

// const startButton = document.querySelector(".start-button");
// startButton.addEventListener("click", (e) => {
//   game = null;
//   game = new Game();
//   game.run();
//   e.target.innerText = "Restart";
// });
