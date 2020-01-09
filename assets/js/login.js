const body = document.querySelector("body");
const loginForm = document.getElementById("jsLogin");

const NICKNAME = "nickname";
const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";

// local storage 의 nickname 변수에 들어있는 값.
const nickname = localStorage.getItem(NICKNAME);

const login = nickname => {
  // const socket = io("/"); // socket connection
  window.socket = io("/"); // 모든 파일에서 window를 통해서 socket에 접근할 수 있다.
  window.socket.emit(window.events.setNickname, { nickname }); // window.events.setNickname 이벤트("nickname")로 nickname 전달
};

if (nickname === null) {
  body.className = LOGGED_OUT; // body.loginBox 를 display:block
} else {
  body.className = LOGGED_IN; // body.gameContainer 의 display:block
  login(nickname);
}

const handleFormSubmit = event => {
  event.preventDefault(); // nickname 입력 후 페이지 이동을 막기 위해.
  const input = loginForm.querySelector("input");
  const { value } = input;
  input.value = "";
  localStorage.setItem(NICKNAME, value);
  body.className = LOGGED_IN;
  login(value);
};

if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}
