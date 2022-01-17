/* ws = protocol 이름 */
/* window.location.host = localhost:3000 */
/* new WebSocket = frontend에서 웹소켓에 연결시도 */
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => console.log("Connected to Server ✅"));
socket.addEventListener("message", (message) => console.log(message.data));
socket.addEventListener("close", () =>
  console.log("Disconnected from Server ❌")
);

setTimeout(() => {
  socket.send("안녕 서버야?");
}, 5000);
