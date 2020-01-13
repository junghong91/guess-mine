// 모든 파일에서 events 를 공유(오타 방지 등 가능)하기 위해서
// pug 파일에서는 render할때 events 객체를 넘겨주고, script에서 받는다.
// server 파일과, socketController.js 파일에서는 같은 폴더에 들어있기 때문에 import 해서 사용할 수 있다.

const events = {
  setNickname: "setNickname",
  newUser: "newUser",
  disconnect: "disconnect",
  disconnected: "disconnected",
  sendMsg: "sendMsg",
  newMsg: "newMsg",
  beginPath: "beginPath",
  strokePath: "strokePath",
  beganPath: "beganPath",
  strokedPath: "strokedPath",
  fill: "fill",
  filled: "filled"
};

export default events;
