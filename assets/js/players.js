import {
  disableCanvas,
  hideControls,
  enableCanvas,
  showControls,
  resetCanvas
} from "./paint";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");

const addPlayers = players => {
  board.innerHTML = "";
  players.forEach(player => {
    const playerElement = document.createElement("span");
    playerElement.innerHTML = `${player.nickname}: ${player.points} `;
    board.appendChild(playerElement);
  });
};

const setNotifs = text => {
  notifs.innerText = "";
  notifs.innerText = text;
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = () => {
  setNotifs(""); // game 시작될때, reset
  // disable canvas event
  disableCanvas();
  // hide the canvas controlls
  hideControls();
};

export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  setNotifs(`You are the leader, paint: ${word}`);
};

export const handleGameEnded = () => {
  setNotifs("Game Ended.");
  disableCanvas();
  hideControls();
  resetCanvas();
};
