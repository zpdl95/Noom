/* io() = 자동적으로 socket.io를 실행하는 서버를 찾음 */
const socket = io();

const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("#roomName");
const welcomeButton = welcomeForm.querySelector("button");
const room = document.getElementById("room");
const nameForm = document.querySelector("#name");

room.hidden = true;

let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.append(li);
}

function handleMessageSubmit(e) {
  e.preventDefault();
  const messageInput = room.querySelector("#message input");
  const msg = messageInput.value;
  socket.emit("new_message", msg, roomName, () => addMessage(`You: ${msg}`));
  messageInput.value = "";
}

function handleNameSubmit(e) {
  e.preventDefault();
  const nameInput = document.querySelector("#name input");
  const nickname = nameInput.value;
  socket.emit("nickname", nickname);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const messageForm = room.querySelector("#message");
  messageForm.addEventListener("submit", handleMessageSubmit);
}

function handleEnterRoomSubmit(e) {
  e.preventDefault();
  const input = welcomeForm.querySelector("input");
  /* firstArgument = 우리가 정하고 싶은 event이름 */
  /* sec,thrd... arg = jsonObject, string number등 가능*/
  /* last arg = 이벤트 전달 완료시 실행되는 function */
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
  const nickNameForm = welcome.querySelector("#name");
  const messageForm = room.querySelector("#message");
  room.insertBefore(nickNameForm, messageForm);
}

welcomeForm.addEventListener("submit", handleEnterRoomSubmit);
welcomeButton.addEventListener("submit", handleEnterRoomSubmit);
nameForm.addEventListener("submit", handleNameSubmit);

socket.on("welcome", (user) => {
  addMessage(`${user} joined!`);
});

socket.on("bye", (user) => {
  addMessage(`"${user}" left!`);
});

/* addMessage에 자동으로 서버의 msg값이 들어감 */
socket.on("new_message", addMessage);

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = "";
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});
