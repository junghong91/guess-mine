import { handleNewUser } from "./notifications";

let socket = null;

export const getSocket = () => socket;

export const updateSocket = aSocket => (socket = aSocket);

// export const initSocket = () => {
//   const socket = getSocket();
//   socket.on(window.events.newUser, handleNewUser);
// };

export const initSockets = aSocket => {
  const { events } = window;
  updateSocket(aSocket);
  aSocket.on(events.newUser, handleNewUser);
};
