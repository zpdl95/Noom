/* io() = 자동적으로 socket.io를 실행하는 서버를 찾음 */
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const button = form.querySelector("button");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.append(li);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
}

function handleRoomSubmit(e) {
  e.preventDefault();
  const input = form.querySelector("input");
  /* firstArgument = 우리가 정하고 싶은 event이름 */
  /* sec,thrd... arg = jsonObject, string number등 가능*/
  /* last arg = 이벤트 전달 완료시 실행되는 function */
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
button.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {
  addMessage("Someone joined!");
});
