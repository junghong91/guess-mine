(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

require("./sockets");

require("./login");

require("./notifications");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfYzk2NjRkZTUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vc29ja2V0c1wiO1xyXG5pbXBvcnQgXCIuL2xvZ2luXCI7XHJcbmltcG9ydCBcIi4vbm90aWZpY2F0aW9uc1wiO1xyXG4iXX0=
},{"./login":2,"./notifications":3,"./sockets":4}],2:[function(require,module,exports){
"use strict";

var _sockets = require("./sockets");

var body = document.querySelector("body");
var loginForm = document.getElementById("jsLogin");
var NICKNAME = "nickname";
var LOGGED_OUT = "loggedOut";
var LOGGED_IN = "loggedIn"; // local storage 의 nickname 변수에 들어있는 값.

var nickname = localStorage.getItem(NICKNAME);

var login = function login(nickname) {
  // const socket = io("/"); // socket connection
  var socket = io("/"); // 모든 파일에서 window를 통해서 socket에 접근할 수 있다.

  socket.emit(window.events.setNickname, {
    nickname: nickname
  }); // window.events.setNickname 이벤트("nickname")로 nickname 전달

  (0, _sockets.initSockets)(socket);
};

if (nickname === null) {
  body.className = LOGGED_OUT; // body.loginBox 를 display:block
} else {
  body.className = LOGGED_IN; // body.gameContainer 의 display:block

  login(nickname);
}

var handleFormSubmit = function handleFormSubmit(event) {
  event.preventDefault(); // nickname 입력 후 페이지 이동을 막기 위해.

  var input = loginForm.querySelector("input");
  var value = input.value;
  input.value = "";
  localStorage.setItem(NICKNAME, value);
  body.className = LOGGED_IN;
  login(value);
};

if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJsb2dpbkZvcm0iLCJnZXRFbGVtZW50QnlJZCIsIk5JQ0tOQU1FIiwiTE9HR0VEX09VVCIsIkxPR0dFRF9JTiIsIm5pY2tuYW1lIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImxvZ2luIiwic29ja2V0IiwiaW8iLCJlbWl0Iiwid2luZG93IiwiZXZlbnRzIiwic2V0Tmlja25hbWUiLCJjbGFzc05hbWUiLCJoYW5kbGVGb3JtU3VibWl0IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImlucHV0IiwidmFsdWUiLCJzZXRJdGVtIiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQSxJQUFNQSxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixNQUF2QixDQUFiO0FBQ0EsSUFBTUMsU0FBUyxHQUFHRixRQUFRLENBQUNHLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBbEI7QUFFQSxJQUFNQyxRQUFRLEdBQUcsVUFBakI7QUFDQSxJQUFNQyxVQUFVLEdBQUcsV0FBbkI7QUFDQSxJQUFNQyxTQUFTLEdBQUcsVUFBbEIsQyxDQUVBOztBQUNBLElBQU1DLFFBQVEsR0FBR0MsWUFBWSxDQUFDQyxPQUFiLENBQXFCTCxRQUFyQixDQUFqQjs7QUFFQSxJQUFNTSxLQUFLLEdBQUcsU0FBUkEsS0FBUSxDQUFBSCxRQUFRLEVBQUk7QUFDeEI7QUFDQSxNQUFNSSxNQUFNLEdBQUdDLEVBQUUsQ0FBQyxHQUFELENBQWpCLENBRndCLENBRUE7O0FBQ3hCRCxFQUFBQSxNQUFNLENBQUNFLElBQVAsQ0FBWUMsTUFBTSxDQUFDQyxNQUFQLENBQWNDLFdBQTFCLEVBQXVDO0FBQUVULElBQUFBLFFBQVEsRUFBUkE7QUFBRixHQUF2QyxFQUh3QixDQUc4Qjs7QUFDdEQsNEJBQVlJLE1BQVo7QUFDRCxDQUxEOztBQU9BLElBQUlKLFFBQVEsS0FBSyxJQUFqQixFQUF1QjtBQUNyQlIsRUFBQUEsSUFBSSxDQUFDa0IsU0FBTCxHQUFpQlosVUFBakIsQ0FEcUIsQ0FDUTtBQUM5QixDQUZELE1BRU87QUFDTE4sRUFBQUEsSUFBSSxDQUFDa0IsU0FBTCxHQUFpQlgsU0FBakIsQ0FESyxDQUN1Qjs7QUFDNUJJLEVBQUFBLEtBQUssQ0FBQ0gsUUFBRCxDQUFMO0FBQ0Q7O0FBRUQsSUFBTVcsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixDQUFBQyxLQUFLLEVBQUk7QUFDaENBLEVBQUFBLEtBQUssQ0FBQ0MsY0FBTixHQURnQyxDQUNSOztBQUN4QixNQUFNQyxLQUFLLEdBQUduQixTQUFTLENBQUNELGFBQVYsQ0FBd0IsT0FBeEIsQ0FBZDtBQUZnQyxNQUd4QnFCLEtBSHdCLEdBR2RELEtBSGMsQ0FHeEJDLEtBSHdCO0FBSWhDRCxFQUFBQSxLQUFLLENBQUNDLEtBQU4sR0FBYyxFQUFkO0FBQ0FkLEVBQUFBLFlBQVksQ0FBQ2UsT0FBYixDQUFxQm5CLFFBQXJCLEVBQStCa0IsS0FBL0I7QUFDQXZCLEVBQUFBLElBQUksQ0FBQ2tCLFNBQUwsR0FBaUJYLFNBQWpCO0FBQ0FJLEVBQUFBLEtBQUssQ0FBQ1ksS0FBRCxDQUFMO0FBQ0QsQ0FSRDs7QUFVQSxJQUFJcEIsU0FBSixFQUFlO0FBQ2JBLEVBQUFBLFNBQVMsQ0FBQ3NCLGdCQUFWLENBQTJCLFFBQTNCLEVBQXFDTixnQkFBckM7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluaXRTb2NrZXRzIH0gZnJvbSBcIi4vc29ja2V0c1wiO1xyXG5cclxuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xyXG5jb25zdCBsb2dpbkZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzTG9naW5cIik7XHJcblxyXG5jb25zdCBOSUNLTkFNRSA9IFwibmlja25hbWVcIjtcclxuY29uc3QgTE9HR0VEX09VVCA9IFwibG9nZ2VkT3V0XCI7XHJcbmNvbnN0IExPR0dFRF9JTiA9IFwibG9nZ2VkSW5cIjtcclxuXHJcbi8vIGxvY2FsIHN0b3JhZ2Ug7J2YIG5pY2tuYW1lIOuzgOyImOyXkCDrk6TslrTsnojripQg6rCSLlxyXG5jb25zdCBuaWNrbmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKE5JQ0tOQU1FKTtcclxuXHJcbmNvbnN0IGxvZ2luID0gbmlja25hbWUgPT4ge1xyXG4gIC8vIGNvbnN0IHNvY2tldCA9IGlvKFwiL1wiKTsgLy8gc29ja2V0IGNvbm5lY3Rpb25cclxuICBjb25zdCBzb2NrZXQgPSBpbyhcIi9cIik7IC8vIOuqqOuToCDtjIzsnbzsl5DshJwgd2luZG9366W8IO2Gte2VtOyEnCBzb2NrZXTsl5Ag7KCR6re87ZWgIOyImCDsnojri6QuXHJcbiAgc29ja2V0LmVtaXQod2luZG93LmV2ZW50cy5zZXROaWNrbmFtZSwgeyBuaWNrbmFtZSB9KTsgLy8gd2luZG93LmV2ZW50cy5zZXROaWNrbmFtZSDsnbTrsqTtirgoXCJuaWNrbmFtZVwiKeuhnCBuaWNrbmFtZSDsoITri6xcclxuICBpbml0U29ja2V0cyhzb2NrZXQpO1xyXG59O1xyXG5cclxuaWYgKG5pY2tuYW1lID09PSBudWxsKSB7XHJcbiAgYm9keS5jbGFzc05hbWUgPSBMT0dHRURfT1VUOyAvLyBib2R5LmxvZ2luQm94IOulvCBkaXNwbGF5OmJsb2NrXHJcbn0gZWxzZSB7XHJcbiAgYm9keS5jbGFzc05hbWUgPSBMT0dHRURfSU47IC8vIGJvZHkuZ2FtZUNvbnRhaW5lciDsnZggZGlzcGxheTpibG9ja1xyXG4gIGxvZ2luKG5pY2tuYW1lKTtcclxufVxyXG5cclxuY29uc3QgaGFuZGxlRm9ybVN1Ym1pdCA9IGV2ZW50ID0+IHtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBuaWNrbmFtZSDsnoXroKUg7ZuEIO2OmOydtOyngCDsnbTrj5nsnYQg66eJ6riwIOychO2VtC5cclxuICBjb25zdCBpbnB1dCA9IGxvZ2luRm9ybS5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XHJcbiAgY29uc3QgeyB2YWx1ZSB9ID0gaW5wdXQ7XHJcbiAgaW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKE5JQ0tOQU1FLCB2YWx1ZSk7XHJcbiAgYm9keS5jbGFzc05hbWUgPSBMT0dHRURfSU47XHJcbiAgbG9naW4odmFsdWUpO1xyXG59O1xyXG5cclxuaWYgKGxvZ2luRm9ybSkge1xyXG4gIGxvZ2luRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZUZvcm1TdWJtaXQpO1xyXG59XHJcbiJdfQ==
},{"./sockets":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleNewUser = void 0;
var notifications = document.getElementById("jsNotifications");

var handleNewUser = function handleNewUser(_ref) {
  var nickname = _ref.nickname;
  console.log(nickname, " just joined");
}; // window.socket.on(window.events.newUser, handleNewUser); // handleNewUser를 export 해서 sockets.js 에서 다룰것.


exports.handleNewUser = handleNewUser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGlmaWNhdGlvbnMuanMiXSwibmFtZXMiOlsibm90aWZpY2F0aW9ucyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJoYW5kbGVOZXdVc2VyIiwibmlja25hbWUiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFNQSxhQUFhLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixpQkFBeEIsQ0FBdEI7O0FBRU8sSUFBTUMsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixPQUFrQjtBQUFBLE1BQWZDLFFBQWUsUUFBZkEsUUFBZTtBQUM3Q0MsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlGLFFBQVosRUFBc0IsY0FBdEI7QUFDRCxDQUZNLEMsQ0FJUCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG5vdGlmaWNhdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzTm90aWZpY2F0aW9uc1wiKTtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVOZXdVc2VyID0gKHsgbmlja25hbWUgfSkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKG5pY2tuYW1lLCBcIiBqdXN0IGpvaW5lZFwiKTtcclxufTtcclxuXHJcbi8vIHdpbmRvdy5zb2NrZXQub24od2luZG93LmV2ZW50cy5uZXdVc2VyLCBoYW5kbGVOZXdVc2VyKTsgLy8gaGFuZGxlTmV3VXNlcuulvCBleHBvcnQg7ZW07IScIHNvY2tldHMuanMg7JeQ7IScIOuLpOujsOqygy5cclxuIl19
},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSockets = exports.updateSocket = exports.getSocket = void 0;

var _notifications = require("./notifications");

var socket = null;

var getSocket = function getSocket() {
  return socket;
};

exports.getSocket = getSocket;

var updateSocket = function updateSocket(aSocket) {
  return socket = aSocket;
}; // export const initSocket = () => {
//   const socket = getSocket();
//   socket.on(window.events.newUser, handleNewUser);
// };


exports.updateSocket = updateSocket;

var initSockets = function initSockets(aSocket) {
  var _window = window,
      events = _window.events;
  updateSocket(aSocket);
  aSocket.on(events.newUser, _notifications.handleNewUser);
};

exports.initSockets = initSockets;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvY2tldHMuanMiXSwibmFtZXMiOlsic29ja2V0IiwiZ2V0U29ja2V0IiwidXBkYXRlU29ja2V0IiwiYVNvY2tldCIsImluaXRTb2NrZXRzIiwid2luZG93IiwiZXZlbnRzIiwib24iLCJuZXdVc2VyIiwiaGFuZGxlTmV3VXNlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBLElBQUlBLE1BQU0sR0FBRyxJQUFiOztBQUVPLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFZO0FBQUEsU0FBTUQsTUFBTjtBQUFBLENBQWxCOzs7O0FBRUEsSUFBTUUsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQUMsT0FBTztBQUFBLFNBQUtILE1BQU0sR0FBR0csT0FBZDtBQUFBLENBQTVCLEMsQ0FFUDtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFFTyxJQUFNQyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFBRCxPQUFPLEVBQUk7QUFBQSxnQkFDakJFLE1BRGlCO0FBQUEsTUFDNUJDLE1BRDRCLFdBQzVCQSxNQUQ0QjtBQUVwQ0osRUFBQUEsWUFBWSxDQUFDQyxPQUFELENBQVo7QUFDQUEsRUFBQUEsT0FBTyxDQUFDSSxFQUFSLENBQVdELE1BQU0sQ0FBQ0UsT0FBbEIsRUFBMkJDLDRCQUEzQjtBQUNELENBSk0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoYW5kbGVOZXdVc2VyIH0gZnJvbSBcIi4vbm90aWZpY2F0aW9uc1wiO1xyXG5cclxubGV0IHNvY2tldCA9IG51bGw7XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0U29ja2V0ID0gKCkgPT4gc29ja2V0O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZVNvY2tldCA9IGFTb2NrZXQgPT4gKHNvY2tldCA9IGFTb2NrZXQpO1xyXG5cclxuLy8gZXhwb3J0IGNvbnN0IGluaXRTb2NrZXQgPSAoKSA9PiB7XHJcbi8vICAgY29uc3Qgc29ja2V0ID0gZ2V0U29ja2V0KCk7XHJcbi8vICAgc29ja2V0Lm9uKHdpbmRvdy5ldmVudHMubmV3VXNlciwgaGFuZGxlTmV3VXNlcik7XHJcbi8vIH07XHJcblxyXG5leHBvcnQgY29uc3QgaW5pdFNvY2tldHMgPSBhU29ja2V0ID0+IHtcclxuICBjb25zdCB7IGV2ZW50cyB9ID0gd2luZG93O1xyXG4gIHVwZGF0ZVNvY2tldChhU29ja2V0KTtcclxuICBhU29ja2V0Lm9uKGV2ZW50cy5uZXdVc2VyLCBoYW5kbGVOZXdVc2VyKTtcclxufTtcclxuIl19
},{"./notifications":3}]},{},[1])