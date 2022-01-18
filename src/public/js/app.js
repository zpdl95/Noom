const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");

/* ws = protocol 이름 */
/* window.location.host = localhost:3000 */
/* new WebSocket = frontend에서 웹소켓에 연결시도 */
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => console.log("Connected to Server ✅"));
socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});
socket.addEventListener("close", () =>
  console.log("Disconnected from Server ❌")
);

/* backend로 데이터를 보낼때 type을 정해줘야 구별이 가능하기 때문에 만듬 */
/* 서버로 json오브젝트를 string으로 바꿔서 보내줌 */
/* 서버로 데이터를 보낼때 string으로 보내야하는 이유는 모든서버가 js서버가 아니기 때문 */
function makeMessage(type, payload) {
  const message = { type, payload };
  return JSON.stringify(message);
}

function handleMessageSubmit(e) {
  e.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}

function handleNickSubmit(e) {
  e.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleMessageSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
