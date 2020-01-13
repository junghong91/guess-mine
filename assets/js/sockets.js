import { handleNewUser, handleDisconnected } from "./notifications";
import { handleNewMessage } from "./chat";

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
  aSocket.on(events.disconnected, handleDisconnected);
  aSocket.on(events.newMsg, handleNewMessage);
};
