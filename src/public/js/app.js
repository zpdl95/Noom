/* io() = 자동적으로 socket.io를 실행하는 서버를 찾음 */
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const button = form.querySelector("button");

function handleRoomSubmit(e) {
  e.preventDefault();
  const input = form.querySelector("input");
  /* firstArgument = 우리가 정하고 싶은 event이름 */
  /* sec,thrd... arg = jsonObject, string number등 가능*/
  /* last arg = 이벤트 전달 완료시 실행되는 function */
  socket.emit("enter_room", { payload: input.value }, () =>
    console.log("server is done")
  );
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
button.addEventListener("submit", handleRoomSubmit);
