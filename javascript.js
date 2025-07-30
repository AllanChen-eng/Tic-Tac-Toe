//game manager - player1 and player 2, has an array for the gameboard, announce winner
function createGameManager(player1Name, player2Name) {
  const playerOne = createPlayer(player1Name, "X");
  const playerTwo = createPlayer(player2Name, "O");
  const gameboard = createGameBoard(3);
  let currentPlayer = playerOne;
  function swapCurrentPlayer(){
    if(currentPlayer === playerOne)currentPlayer = playerTwo;
    else currentPlayer = playerOne;
  }
  function playRound(){
    const x = prompt(currentPlayer.playerName + "'s x value");
    const y = prompt(currentPlayer.playerName + "'s y value");
    gameboard.makeMove(currentPlayer,x,y);
    swapCurrentPlayer();
    gameboard.getBoard();
    console.log(`A round has been played! It is now ${currentPlayer.playerName}'s turn!`);
    gameboard.addCounter();
  }
  function announceWinner(symbol){
    if(symbol ==="Tie") return "It's a tie!";
    if(symbol === "X")return "Player One wins!";
    if(symbol === "O")return "Player Two wins!";
  }
  while(!gameboard.checkWinner()){
    playRound();
  }
  console.log(announceWinner(gameboard.checkWinner()));

}

// gameboard object - board state, mark board with (player), check for win condition or tie
function createGameBoard(size) {
    console.log("Welcome to the game! May the odds be in your favor!");
  //2d array
  let counter = 0;
  const tieCounter = Math.pow(size,2);
  let gameboard = [];
  for (let x = 0; x < size; x++) {
    gameboard[x] = [];
    for (let i = 0; i < size; i++) {
      gameboard[x][i] = "";
    }
  }
  const addCounter = () => {counter++};
  // making a move
  const makeMove = (player, positionX, positionY) => {
    if(gameboard[positionX][positionY] ===""){
    gameboard[positionX][positionY] = player.marker;
    }else{
        const newX = prompt("That position is taken, select a different x:");
        const newY = prompt("That position is taken, select a different Y:");
        makeMove(player,newX,newY);
    }
  };
  // checking for winner
  const checkWinner = () => {
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
    if(counter === 9){ return "Tie";}
    return null;
  };
  // returning game state
  const getBoard = () => {
      for (let row of gameboard) {
    console.log(row.join(" | "));
  }
  };
  return { addCounter, makeMove, checkWinner, getBoard};
}

//Player controller - takes in console inputs and puts them into the game control to make a move
// Player object - if they're X or 0 and their names
function createPlayer(name, symbol) {
  const playerName= name;
  const marker = symbol;
  return { playerName, marker };
}
setTimeout(() => {
const player1 = prompt ("Player One's Name:");
const player2 = prompt( "Player Two's Name:");
const game = createGameManager(player1, player2);
}, 2000);
