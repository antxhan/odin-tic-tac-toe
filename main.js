class Board {
  constructor() {
    this.board = null;
    this.initBoard();
  }
  initBoard() {
    this.board = Array.from({ length: 9 }, () => "");
  }
  setBoard(index, marker) {
    this.board[index] = marker;
  }
}

class Player {
  constructor(name, marker) {
    this.name = name;
    this.marker = marker;
    this.score = 0;
  }
  incrementScore() {
    this.score++;
  }
}

class View {
  // state handling of the views
  constructor() {
    this.mainContainer = document.querySelector("main");
  }
  clearMain() {
    this.mainContainer.innerHTML = "";
  }
  createMainMenuButton(textContent, isDisabled, onClick) {
    const button = document.createElement("button");
    button.disabled = isDisabled;
    button.textContent = textContent;
    if (onClick) {
      button.addEventListener("click", () => onClick());
    }
    return button;
  }
  createHelpButton() {
    const helpButton = document.createElement("button");
    helpButton.innerHTML = `
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
    `;
    return helpButton;
  }
  createSettingsButton() {
    const settingsButton = document.createElement("button");
    settingsButton.innerHTML = `
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
    `;
    return settingsButton;
  }
  createPlayer(name, score) {
    const player = document.createElement("div");
    player.className = "player";
    const playerName = document.createElement("p");
    playerName.textContent = name;
    const playerScore = document.createElement("p");
    playerScore.textContent = score;
    player.appendChild(playerName);
    player.appendChild(playerScore);
    return player;
  }
  createGameButton(value, textContent, func) {
    const button = document.createElement("button");
    button.value = value;
    button.textContent = textContent;
    button.addEventListener("click", () => func());
    return button;
  }
  renderMainMenu() {
    this.clearMain();

    // creating container
    const mainMenu = document.createElement("div");
    mainMenu.className = "main-menu";

    // creating main buttons
    const singlePlayerButton = this.createMainMenuButton(
      "Singleplayer (vs AI)",
      true
    );
    const localMultiplayerButton = this.createMainMenuButton(
      "Local Multiplayer",
      false,
      () => {
        this.renderEnterPlayers();
      }
    );
    const onlineMultiplayerButton = this.createMainMenuButton(
      "Online Multiplayer",
      true
    );
    mainMenu.appendChild(singlePlayerButton);
    mainMenu.appendChild(localMultiplayerButton);
    mainMenu.appendChild(onlineMultiplayerButton);

    // creating extra buttons
    const extraButtonsContainer = document.createElement("div");
    extraButtonsContainer.className = "extra-buttons";
    const helpButton = this.createHelpButton();
    const settingsButton = this.createSettingsButton();
    extraButtonsContainer.appendChild(helpButton);
    extraButtonsContainer.appendChild(settingsButton);
    mainMenu.appendChild(extraButtonsContainer);

    // appending menu to main container
    this.mainContainer.appendChild(mainMenu);
  }
  renderEnterPlayers(player = "Player 1") {
    this.clearMain();

    // container
    const container = document.createElement("div");
    container.className = "enter-player";

    // title
    const title = document.createElement("p");
    title.className = "enter-player-title";
    title.textContent = player;
    container.appendChild(title);

    // form
    const form = document.createElement("form");
    form.id = "enterPlayerForm";
    form.method = "post";

    // label
    const label = document.createElement("label");
    label.textContent = "Name";

    // input
    const input = document.createElement("input");
    input.type = "text";
    input.name = "name";
    input.id = "name";
    input.minLength = "1";
    input.required = true;
    input.autofocus = true;

    // buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "form-buttons";

    // back button
    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.type = "reset";
    backButton.addEventListener("click", () => {
      if (player === "Player 1") {
        this.renderMainMenu();
      } else {
        this.renderEnterPlayers();
      }
    });

    // okay button
    const okayButton = document.createElement("button");
    okayButton.textContent = "Okay";
    okayButton.disabled = true;
    okayButton.addEventListener("click", (e) => {
      e.preventDefault();
      const form = document.forms.enterPlayerForm;
      const formData = new FormData(form);
      if (player === "Player 2") {
        app.game.player2.name = formData.get("name");
        this.renderGame();
      } else {
        app.game.player1.name = formData.get("name");
        this.renderEnterPlayers("Player 2");
      }
    });

    input.addEventListener("keyup", (e) => {
      okayButton.disabled = e.target.value === "";
    });

    // appending
    label.appendChild(input);
    buttonContainer.appendChild(backButton);
    buttonContainer.appendChild(okayButton);
    form.appendChild(label);
    form.appendChild(buttonContainer);
    container.appendChild(form);
    this.mainContainer.appendChild(container);
  }
  renderGame() {
    this.clearMain();

    // container
    const container = document.createElement("div");
    container.className = "grid-container";

    // players
    const players = document.createElement("div");
    players.className = "players";
    const player1 = this.createPlayer(
      app.game.player1.name,
      app.game.player1.score
    );
    const player2 = this.createPlayer(
      app.game.player2.name,
      app.game.player2.score
    );
    const currentPlayer = this.createPlayer(
      "Now Playing",
      app.game.currentPlayer.name
    );

    // grid
    const grid = document.createElement("div");
    grid.className = "grid";
    const cells = app.game.board.board;
    cells.forEach((cell, index) => {
      const cellDiv = document.createElement("div");
      let markerSVG;
      if (cell === "X") {
        markerSVG = `
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
          class="x-marker"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
        `;
      } else if (cell === "O") {
        markerSVG = `
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
          class="o-marker"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        </svg>
        `;
      } else {
        markerSVG = "";
      }
      // cellDiv.append(cell);
      cellDiv.innerHTML = markerSVG;
      cellDiv.dataset.index = index;
      cellDiv.addEventListener("click", (e) => app.game.handleSquare(e));
      grid.appendChild(cellDiv);
    });

    // buttons
    const buttons = document.createElement("div");
    buttons.className = "grid-buttons";
    const quitButton = this.createGameButton("quit", "Quit", () => {
      app.game.initGame();
      this.renderMainMenu();
    });
    const restartButton = this.createGameButton("restart", "Restart", () => {
      restartButton.textContent = "Restart";
      app.game.initRound();
      this.renderGame();
    });

    // extra buttons
    const extraButtons = document.createElement("div");
    extraButtons.className = "grid__extra-buttons";
    const helpButton = this.createHelpButton();
    const settingsButton = this.createSettingsButton();
    extraButtons.appendChild(helpButton);
    extraButtons.appendChild(settingsButton);

    // appending
    players.appendChild(player1);
    players.appendChild(currentPlayer);
    players.appendChild(player2);
    buttons.appendChild(quitButton);
    buttons.appendChild(restartButton);
    buttons.appendChild(extraButtons);
    container.appendChild(players);
    container.appendChild(grid);
    container.appendChild(buttons);
    this.mainContainer.appendChild(container);
  }
  renderEndScreen(message) {
    const board = document.querySelector(".grid");
    const endScreen = document.createElement("div");
    endScreen.className = "end-screen";
    endScreen.textContent = message;
    board.appendChild(endScreen);
  }
  renderError(message) {
    const board = document.querySelector(".grid");
    const error = document.createElement("div");
    error.className = "error-message";
    error.textContent = message;
    board.appendChild(error);
    setTimeout(() => {
      error.remove();
    }, 1000);
  }
  toggleRestartButtonText() {
    document.querySelector('button[value="restart"]').textContent =
      "Next Round";
  }
}

class Game {
  // state handling of the game itself
  constructor() {
    this.board = new Board();
    this.player1 = new Player("Player 1", "X");
    this.player2 = new Player("Player 2", "O");
    this.currentPlayer = this.player1;
  }
  initGame() {
    this.board = new Board();
    this.player1 = new Player("Player 1", "X");
    this.player2 = new Player("Player 2", "O");
    this.currentPlayer = this.player1;
  }
  initRound() {
    this.board = new Board();
    this.currentPlayer = this.player1;
  }
  handleSquare(e) {
    if (app.game.board.board[+e.target.dataset.index] !== "") {
      app.view.renderError("Cell occupied.");
      return;
    }
    this.board.setBoard(+e.target.dataset.index, this.currentPlayer.marker);
    if (this.isWin(+e.target.dataset.index)) {
      this.currentPlayer.incrementScore();
      app.view.renderGame();
      app.view.toggleRestartButtonText();
      app.view.renderEndScreen(`${this.currentPlayer.name} wins!`);
    } else if (this.isTie()) {
      app.view.renderGame();
      app.view.toggleRestartButtonText();
      app.view.renderEndScreen("Tie");
    } else {
      app.game.toggleCurrentPlayer();
      app.view.renderGame();
    }
  }
  toggleCurrentPlayer() {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
  }
  isWin(index) {
    // check horizontal
    if (index <= 2) {
      const row = this.board.board.slice(0, 3);
      if (new Set(row).size === 1) return true;
    } else if (index > 2 && index <= 5) {
      const row = this.board.board.slice(3, 6);
      if (new Set(row).size === 1) return true;
    } else {
      const row = this.board.board.slice(6, 9);
      if (new Set(row).size === 1) return true;
    }

    // check vertical
    if (index <= 2) {
      const first = this.board.board[index];
      const second = this.board.board[index + 3];
      const third = this.board.board[index + 6];
      const columnMarkers = [first, second, third];
      if (new Set(columnMarkers).size === 1) return true;
    } else if (index > 2 && index <= 5) {
      const first = this.board.board[index - 3];
      const second = this.board.board[index];
      const third = this.board.board[index + 3];
      const columnMarkers = [first, second, third];
      if (new Set(columnMarkers).size === 1) return true;
    } else {
      const first = this.board.board[index - 6];
      const second = this.board.board[index - 3];
      const third = this.board.board[index];
      const columnMarkers = [first, second, third];
      if (new Set(columnMarkers).size === 1) return true;
    }

    // check diagonal (if index is either 0, 2, 4, 6, 8)
    if (index === 0 || index === 8) {
      // top left to bottom right diag
      const topLeftToBottomRight = [
        this.board.board[0],
        this.board.board[4],
        this.board.board[8],
      ];
      const diagonalMarkers = topLeftToBottomRight.map((cell) => cell);
      if (new Set(diagonalMarkers).size === 1) return true;
    } else if (index === 2 || index === 6) {
      // top right to bottom left diag
      const topRightToBottomLeft = [
        this.board.board[2],
        this.board.board[4],
        this.board.board[6],
      ];
      const diagonalMarkers = topRightToBottomLeft.map((cell) => cell);
      if (new Set(diagonalMarkers).size === 1) return true;
    } else if (index === 4) {
      const topLeftToBottomRight = [
        this.board.board[0],
        this.board.board[4],
        this.board.board[8],
      ];
      const diagonalMarkers = topLeftToBottomRight.map((cell) => cell);
      if (new Set(diagonalMarkers).size === 1) return true;
      const topRightToBottomLeft = [
        this.board.board[2],
        this.board.board[4],
        this.board.board[6],
      ];
      const diagonalMarkers2 = topRightToBottomLeft.map((cell) => cell);
      if (new Set(diagonalMarkers2).size === 1) return true;
    }
    return false;
  }
  isTie() {
    return !this.board.board.includes("");
  }
}

class App {
  // handler of the website
  constructor() {
    this.view = new View();
    this.game = new Game();
    // this.view.renderMainMenu();
    this.view.renderEnterPlayers("Player 2");
    // this.view.renderGame();
  }
}

const app = new App();
