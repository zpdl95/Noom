const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

/* ws = protocol 이름 */
/* window.location.host = localhost:3000 */
/* new WebSocket = frontend에서 웹소켓에 연결시도 */
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => console.log("Connected to Server ✅"));
socket.addEventListener("message", (message) => console.log(message.data));
socket.addEventListener("close", () =>
  console.log("Disconnected from Server ❌")
);

function handleSubmit(e) {
  e.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
