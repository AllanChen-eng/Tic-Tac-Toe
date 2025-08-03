//game manager - player1 and player 2, has an array for the gameboard, announce winner
function createGameManager(player1Name, player2Name) {
  const playerOne = createPlayer(player1Name, "X");
  const playerTwo = createPlayer(player2Name, "O");
  let gameboard = "";
  const display = displayManager();
  let winner = "";
  let currentPlayer = playerOne;
  function swapCurrentPlayer() {
    if (currentPlayer === playerOne) currentPlayer = playerTwo;
    else currentPlayer = playerOne;
  }
  function playRound(x, y) {
    console.log("making a move! x is" + x + " " + y);
    if (winner) {
      alert("Game is over! Please start a new game!");
      return;
    }
    if (gameboard.makeMove(currentPlayer, x, y)) {
      // if the move is valid, do something
      display.markBox(currentPlayer, display.cordinatesToID(x, y));
      swapCurrentPlayer();
      gameboard.getBoard();
      console.log(
        `A round has been played! It is now ${currentPlayer.playerName}'s turn!`
      );
      gameboard.addCounter();
      console.log(gameboard.getCounter());
      winner = announceWinner(gameboard.checkWinner());
      if (winner) alert(winner);
    }
  }
  function announceWinner(symbol) {
    if (symbol === "Tie") return "It's a tie!";
    if (symbol === "X") return "Player One wins!";
    if (symbol === "O") return "Player Two wins!";
  }
  function startGame() {
    gameboard = createGameBoard(3);
    winner = "";
    display.createBoard();
    display.setScript(playRound);
    console.log("Game has started!");
  }
  display.setNames(playerOne.playerName, playerTwo.playerName);
  display.initializeButtons(startGame);
  startGame();
}

// gameboard object - board state, mark board with (player), check for win condition or tie
function createGameBoard(size) {
  console.log("Welcome to the game! May the odds be in your favor!");
  //2d array
  let counter = 0;
  const tieCounter = Math.pow(size, 2);
  let gameboard = [];
  for (let x = 0; x < size; x++) {
    gameboard[x] = [];
    for (let i = 0; i < size; i++) {
      gameboard[x][i] = "";
    }
  }
  const getCounter = () => {
    return counter;
  };
  const addCounter = () => {
    counter++;
  };
  // making a move
  const makeMove = (player, positionX, positionY) => {
    console.log(gameboard[positionX][positionY] + "is this");
    if (gameboard[positionX][positionY] === "") {
      gameboard[positionX][positionY] = player.marker;
      return true;
    } else {
      alert("Invalid Move!");
      return false;
    }
  };
  // checking for winner
  const checkWinner = () => {
    console.log("winner's counter:" + counter);
    for (let a = 0; a < size; a++) {
      if (
        gameboard[a][0] === gameboard[a][1] &&
        gameboard[a][1] === gameboard[a][2] &&
        gameboard[a][0]
      ) {
        return gameboard[a][0];
      }
      if (
        gameboard[0][a] === gameboard[1][a] &&
        gameboard[1][a] === gameboard[2][a] &&
        gameboard[0][a]
      ) {
        return gameboard[0][a];
      }
    }
    if (
      gameboard[0][0] === gameboard[1][1] &&
      gameboard[1][1] === gameboard[2][2] &&
      gameboard[0][0]
    ) {
      return gameboard[0][0];
    }
    if (
      gameboard[0][2] === gameboard[1][1] &&
      gameboard[1][1] === gameboard[2][0] &&
      gameboard[0][2]
    ) {
      return gameboard[0][2];
    }
    if (counter === 9) {
      return "Tie";
    }
    return null;
  };
  // returning game state
  const getBoard = () => {
    for (let row of gameboard) {
      console.log(row.join(" | "));
    }
  };
  return { addCounter, getCounter, makeMove, checkWinner, getBoard };
}

function displayManager() {
  const setScript = (playRound) => {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      box.addEventListener("click", () => {
        const index = translateIdtoCordinates(box.id);
        playRound(index.row, index.col);
        console.log(index);
      });
    });
  };
  const deleteBoard = () => {
    const board = document.querySelector(".board");
    board.remove();
  };
  const createBoard = () => {
    //works
    const container = document.querySelector(".game");
    const board = document.createElement("div");
    board.classList.add("board");
    for (let x = 0; x < 9; x++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.id = `${x}`;
      board.appendChild(box);
    }
    container.appendChild(board);
  };
  function translateIdtoCordinates(num) {
    const row = Math.floor(num / 3);
    const col = num % 3;
    return { row, col };
  }
  function cordinatesToID(x, y) {
    return x * 3 + y;
  }
  const markBox = (player, ID) => {
    const box = document.getElementById(`${ID}`);
    box.textContent = player.marker;
  };
  const initializeButtons = (startGame) => {
    const newGame = document.querySelector("#restart");
    const confirmBtnp1 = document.querySelector("#confirmBtnP1");
    const p1Name = document.querySelector("#set-name-p1");
    const confirmBtnp2 = document.querySelector("#confirmBtnP2");
    const p2Name = document.querySelector("#set-name-p2");
    newGame.addEventListener("click", () => {
      deleteBoard();
      startGame();
    });
    confirmBtnp1.addEventListener("click",(e) =>{
        e.preventDefault();
        setNames(p1Name.value);
    })
    confirmBtnp2.addEventListener("click",(e) =>{ 
        e.preventDefault();
        setNames(null, p2Name.value);
    })
  };
  const setNames = (name1, name2) => {
    const p1Tag = document.getElementById("p1Nametag");
    const p2Tag = document.getElementById("p2Nametag");
    if (name1 !== null && name1 !== undefined) {
      p1Tag.textContent = name1 + " (X)";
    }

    if (name2 !== null && name2 !== undefined) {
      p2Tag.textContent = name2 + " (O)";
    }
  };

  return {
    setScript,
    deleteBoard,
    createBoard,
    cordinatesToID,
    markBox,
    initializeButtons,
    setNames,
  };
}

//Player controller - takes in console inputs and puts them into the game control to make a move
// Player object - if they're X or 0 and their names
function createPlayer(name, symbol) {
  const playerName = name;
  const marker = symbol;
  return { playerName, marker };
}
setTimeout(() => {
  const player1 = prompt("Player One's Name:");
  const player2 = prompt("Player Two's Name:");
  const game = createGameManager(player1, player2);
}, 500);
