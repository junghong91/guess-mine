const socket = io("/");

socket.on("hello", () => console.log("Somebody join")); // hello 라는 이벤트가 server로 부터 발생하면, console.log()

setTimeout(() => socket.emit("helloGuys"), 4000);
